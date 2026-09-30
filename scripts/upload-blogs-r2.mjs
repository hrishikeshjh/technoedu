#!/usr/bin/env node
/**
 * Cloudflare R2 Blog Assets Uploader for Techno Wallah
 * 
 * Features:
 * 1. Native Node.js AWS SigV4 signer (Zero extra npm packages).
 * 2. Uploads blog assets (images, markdown, json) to Cloudflare R2 bucket.
 * 3. Applies proper content types (webp, png, jpg, json, markdown) and long-lived cache headers.
 * 4. Supports --dry-run flag to test without writing to R2.
 * 
 * Usage:
 *   npm run blogs:upload-r2
 *   node scripts/upload-blogs-r2.mjs
 *   node scripts/upload-blogs-r2.mjs --dry-run
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// ── 1. Simple .env Loader (Zero Dependency) ──────────────────────────────────
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

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'technoedu-blogs';
const PUBLIC_URL = (process.env.R2_PUBLIC_URL || '').replace(/\/+$/, '');

// ── 2. AWS SigV4 Signer ──────────────────────────────────────────────────────
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
  const kSigning = hmacSha256(kService, 'aws4_request');
  return kSigning;
}

const MIME_MAP = {
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.md': 'text/markdown',
  '.pdf': 'application/pdf',
};

async function r2Request({ method, key, body = null, contentType = 'application/octet-stream' }) {
  const host = `${ACCOUNT_ID}.r2.cloudflarestorage.com`;
  const region = 'auto';
  const service = 's3';

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.slice(0, 8);

  const canonicalUri = `/${BUCKET_NAME}/${key.split('/').map(encodeURIComponent).join('/')}`;
  const canonicalQuery = '';
  const payloadHash = body ? sha256Hex(body) : sha256Hex('');

  const headersToSign = {
    'host': host,
    'x-amz-content-sha256': payloadHash,
    'x-amz-date': amzDate,
  };

  if (contentType && method === 'PUT') {
    headersToSign['content-type'] = contentType;
  }

  const sortedHeaderKeys = Object.keys(headersToSign).sort();
  const canonicalHeaders = sortedHeaderKeys
    .map(k => `${k}:${headersToSign[k]}\n`)
    .join('');
  const signedHeaders = sortedHeaderKeys.join(';');

  const canonicalRequest = [
    method,
    canonicalUri,
    canonicalQuery,
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n');

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    sha256Hex(canonicalRequest),
  ].join('\n');

  const signingKey = getSignatureKey(SECRET_ACCESS_KEY, dateStamp, region, service);
  const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');
  const authorization = `AWS4-HMAC-SHA256 Credential=${ACCESS_KEY_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const requestHeaders = {
    ...headersToSign,
    'Authorization': authorization,
  };

  if (method === 'PUT') {
    requestHeaders['Cache-Control'] = 'public, max-age=31536000, immutable';
  }

  const url = `https://${host}${canonicalUri}`;

  return fetch(url, {
    method,
    headers: requestHeaders,
    body: body || undefined,
  });
}

function getLocalAssets(dir, baseDir = dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getLocalAssets(filePath, baseDir));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (MIME_MAP[ext]) {
        const relPath = path.relative(baseDir, filePath).replace(/\\/g, '/');
        results.push({
          absolutePath: filePath,
          s3Key: `blogs/${relPath}`,
          contentType: MIME_MAP[ext],
          sizeBytes: stat.size,
          sizeKb: (stat.size / 1024).toFixed(1),
        });
      }
    }
  }
  return results;
}

async function main() {
  const isDryRun = process.argv.includes('--dry-run');

  console.log(`
╔════════════════════════════════════════════════════════════════════════╗
║         🚀 Techno Wallah Cloudflare R2 Blog Assets Uploader            ║
╚════════════════════════════════════════════════════════════════════════╝
`);

  if (!ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
    console.error(`❌ Cloudflare R2 Credentials Missing in .env!
Ensure CLOUDFLARE_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY are set.`);
    process.exit(1);
  }

  console.log(`🎯 Target R2 Bucket: ${BUCKET_NAME}`);
  console.log(`🌐 Public CDN URL:   ${PUBLIC_URL}`);

  // Test bucket connectivity
  try {
    const testRes = await r2Request({ method: 'HEAD', key: '' });
    console.log(`📡 R2 Bucket Connection Test: Status ${testRes.status === 200 || testRes.status === 404 ? '✅ Connected' : testRes.status}`);
  } catch (err) {
    console.error(`❌ Failed to connect to Cloudflare R2:`, err.message);
    process.exit(1);
  }

  const blogAssetsDir = path.resolve(ROOT_DIR, 'public/blog-assets');
  if (!fs.existsSync(blogAssetsDir)) {
    fs.mkdirSync(blogAssetsDir, { recursive: true });
    console.log(`📁 Created local blog-assets folder at public/blog-assets/`);
  }

  const localFiles = getLocalAssets(blogAssetsDir);
  console.log(`📦 Found ${localFiles.length} file(s) in public/blog-assets/ to sync.`);

  if (localFiles.length === 0) {
    console.log(`💡 Tip: Drop images (covers, author avatars, diagrams) into public/blog-assets/ and run this script to upload them to R2.`);
    return;
  }

  for (const file of localFiles) {
    console.log(`\n📤 Uploading ${file.s3Key} (${file.sizeKb} KB, ${file.contentType})...`);
    if (!isDryRun) {
      const buffer = fs.readFileSync(file.absolutePath);
      const res = await r2Request({
        method: 'PUT',
        key: file.s3Key,
        body: buffer,
        contentType: file.contentType,
      });

      if (res.ok) {
        console.log(`   ✅ Uploaded -> ${PUBLIC_URL}/${file.s3Key}`);
      } else {
        console.error(`   ❌ Failed with status ${res.status}: ${await res.text()}`);
      }
    } else {
      console.log(`   [DRY RUN] Would upload to -> ${PUBLIC_URL}/${file.s3Key}`);
    }
  }

  console.log(`\n✨ All done!`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
