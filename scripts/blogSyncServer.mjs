import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const POSTS_FILE = path.resolve(ROOT_DIR, 'public/blogs/posts.json');

// ── 1. Simple .env Loader ────────────────────────────────────────────────────
function loadEnv() {
  const envPath = path.resolve(ROOT_DIR, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const value = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '');
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  }
}

loadEnv();

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID || '88f615b88df00f68a1cc2fbd77fa647c';
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID || '4efa220ed1ed19e91681b167ef50df4b';
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY || '4137a43c78bd0095b81775e00ef968fdbf4165e6d3fdc8c06d68bc9a2c41f567';
const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'technoedu-blogs';
const PUBLIC_URL = (process.env.R2_PUBLIC_URL || 'https://pub-3f62a1750c20425f95e67ab76e9d98ea.r2.dev').replace(/\/+$/, '');

// ── 2. AWS SigV4 Signer for Cloudflare R2 ─────────────────────────────────────
function hmacSha256(key, data) {
  return crypto.createHmac('sha256', key).update(data).digest();
}

function sha256Hex(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function getSignatureKey(key, dateStamp, regionName, serviceName) {
  const kDate = hmacSha256('AWS4' + key, dateStamp);
  const kRegion = hmacSha256(kDate, regionName);
  const kService = hmacSha256(kRegion, serviceName);
  return hmacSha256(kService, 'aws4_request');
}

export async function uploadToR2(key, body, contentType = 'application/json') {
  if (!ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
    console.warn('⚠️ Cloudflare R2 credentials not configured. Skipping R2 sync.');
    return false;
  }

  try {
    const host = `${ACCOUNT_ID}.r2.cloudflarestorage.com`;
    const region = 'auto';
    const service = 's3';

    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
    const dateStamp = amzDate.slice(0, 8);

    const canonicalUri = `/${BUCKET_NAME}/${key}`;
    const payloadHash = sha256Hex(body);

    const headersToSign = {
      'content-type': contentType,
      'host': host,
      'x-amz-content-sha256': payloadHash,
      'x-amz-date': amzDate,
    };

    const sortedHeaderKeys = Object.keys(headersToSign).sort();
    const canonicalHeaders = sortedHeaderKeys.map((k) => `${k}:${headersToSign[k]}\n`).join('');
    const signedHeaders = sortedHeaderKeys.join(';');

    const canonicalRequest = ['PUT', canonicalUri, '', canonicalHeaders, signedHeaders, payloadHash].join('\n');
    const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
    const stringToSign = ['AWS4-HMAC-SHA256', amzDate, credentialScope, sha256Hex(canonicalRequest)].join('\n');

    const signingKey = getSignatureKey(SECRET_ACCESS_KEY, dateStamp, region, service);
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');
    const authorization = `AWS4-HMAC-SHA256 Credential=${ACCESS_KEY_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const url = `https://${host}${canonicalUri}`;
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        ...headersToSign,
        'Authorization': authorization,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
      body,
    });

    if (res.ok) {
      console.log(`☁️ Synced to Cloudflare R2: ${key} (${res.status})`);
      return true;
    } else {
      console.error(`❌ Failed to sync to R2: ${res.status} ${res.statusText}`);
      return false;
    }
  } catch (err) {
    console.error('❌ Error uploading to R2:', err);
    return false;
  }
}

// ── 3. File Operations ────────────────────────────────────────────────────────
export function getLocalPosts() {
  try {
    if (fs.existsSync(POSTS_FILE)) {
      const raw = fs.readFileSync(POSTS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (err) {
    console.error('Error reading local posts:', err);
  }
  return [];
}

export async function saveLocalPosts(posts) {
  try {
    fs.mkdirSync(path.dirname(POSTS_FILE), { recursive: true });
    const content = JSON.stringify(posts, null, 2);
    fs.writeFileSync(POSTS_FILE, content, 'utf-8');
    // Also trigger cloud sync
    const r2Ok = await uploadToR2('blogs/posts.json', content, 'application/json');
    return { success: true, r2Ok };
  } catch (err) {
    console.error('Error saving local posts:', err);
    return { success: false, error: err };
  }
}

export async function addOrUpdatePost(newPost) {
  const current = getLocalPosts();
  const normalized = {
    ...newPost,
    status: 'approved',
    submittedAt: newPost.submittedAt || new Date().toISOString(),
  };
  const updated = [normalized, ...current.filter((p) => p.id !== normalized.id)];
  await saveLocalPosts(updated);
  return { post: normalized, posts: updated };
}

export async function removePost(id) {
  const current = getLocalPosts();
  const updated = current.filter((p) => p.id !== id);
  await saveLocalPosts(updated);
  return updated;
}

// ── 4. Connect Middleware for Vite Server ──────────────────────────────────────
export function blogApiMiddleware() {
  return {
    name: 'technoedu-blog-api-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const urlObj = new URL(req.url, 'http://localhost');
        if (urlObj.pathname !== '/api/blogs') {
          return next();
        }

        // Enable CORS & strict no-cache
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Pragma, Cache-Control');
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          return res.end();
        }

        if (req.method === 'GET') {
          const posts = getLocalPosts();
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          return res.end(JSON.stringify(posts));
        }

        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body);
              const { post, posts } = await addOrUpdatePost(data);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              return res.end(JSON.stringify({ success: true, post, posts, total: posts.length }));
            } catch (err) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Invalid JSON body' }));
            }
          });
          return;
        }

        if (req.method === 'DELETE') {
          let id = urlObj.searchParams.get('id');
          if (!id) {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk;
            });
            req.on('end', async () => {
              try {
                const data = JSON.parse(body || '{}');
                id = data.id;
                if (!id) {
                  res.statusCode = 400;
                  return res.end(JSON.stringify({ error: 'Missing id parameter' }));
                }
                const updated = await removePost(id);
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 200;
                return res.end(JSON.stringify({ success: true, id, posts: updated, total: updated.length }));
              } catch (err) {
                res.statusCode = 400;
                return res.end(JSON.stringify({ error: 'Invalid request' }));
              }
            });
            return;
          }

          const updated = await removePost(id);
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 200;
          return res.end(JSON.stringify({ success: true, id, posts: updated, total: updated.length }));
        }

        next();
      });
    },
  };
}
