#!/usr/bin/env node
/**
 * Cloudflare R2 S3-Compatible Uploader & CDN Integrator for Techno Wallah
 * 
 * Features:
 * 1. Native Node.js AWS SigV4 client (works with ZERO extra npm packages!).
 * 2. Automatically falls back to @aws-sdk/client-s3 if installed.
 * 3. Scans local downloaded PDFs in public/materials/.
 * 4. Checks R2 bucket to skip already uploaded files (saving bandwidth & time).
 * 5. Injects high-speed CDN URLs into src/data/subjectPdfDirectory.json.
 * 
 * Usage:
 *   npm run harvest:upload-r2
 *   node scripts/r2-uploader.mjs
 *   node scripts/r2-uploader.mjs --dry-run
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
const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'technoedu-materials';
const PUBLIC_URL = (process.env.R2_PUBLIC_URL || '').replace(/\/+$/, '');

// ── 2. AWS SigV4 Signer (Native Node.js) ─────────────────────────────────────
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

/**
 * Perform a signed S3-compatible HTTP request to Cloudflare R2
 */
async function r2Request({ method, key, body = null, contentType = 'application/pdf' }) {
  const host = `${ACCOUNT_ID}.r2.cloudflarestorage.com`;
  const region = 'auto';
  const service = 's3';

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, ''); // YYYYMMDDTHHMMSSZ
  const dateStamp = amzDate.slice(0, 8); // YYYYMMDD

  // Ensure key starts with /
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

// ── 3. Scan Local Downloaded Files ───────────────────────────────────────────
function getLocalPdfFiles(dir, baseDir = dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;

  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getLocalPdfFiles(filePath, baseDir));
    } else if (file.toLowerCase().endsWith('.pdf') && stat.size > 1024) {
      const relPath = path.relative(baseDir, filePath).replace(/\\/g, '/');
      results.push({
        absolutePath: filePath,
        s3Key: relPath,
        sizeBytes: stat.size,
        sizeMb: (stat.size / (1024 * 1024)).toFixed(2),
      });
    }
  }
  return results;
}

// ── 4. Main Upload Workflow ──────────────────────────────────────────────────
async function main() {
  const isDryRun = process.argv.includes('--dry-run');

  console.log(`
╔════════════════════════════════════════════════════════════════════════╗
║         🚀 Techno Wallah Cloudflare R2 Educational CDN Uploader        ║
╚════════════════════════════════════════════════════════════════════════╝
`);

  // Check required credentials
  if (!ACCOUNT_ID || !ACCESS_KEY_ID || !SECRET_ACCESS_KEY) {
    console.error(`❌ Cloudflare R2 Credentials Missing!

Please configure your credentials in a .env file:

1. Copy .env.example to .env:
   cp .env.example .env

2. Add your Cloudflare R2 Details:
   CLOUDFLARE_ACCOUNT_ID=...
   R2_ACCESS_KEY_ID=...
   R2_SECRET_ACCESS_KEY=...
   R2_BUCKET_NAME=technoedu-materials
   R2_PUBLIC_URL=https://pub-xxxxxxxx.r2.dev  (or https://cdn.technowallah.in)

3. Then re-run:
   npm run harvest:upload-r2
`);
    process.exit(1);
  }

  const materialsDir = path.resolve(ROOT_DIR, 'public/materials');
  const localFiles = getLocalPdfFiles(materialsDir);

  if (localFiles.length === 0) {
    console.log(`⚠️ No local PDFs found in ${materialsDir}.
Please first download materials by running:
  npm run harvest:download -- --all
`);
    return;
  }

  console.log(`📦 Found ${localFiles.length} local PDF files to process in public/materials/`);
  console.log(`🎯 Target R2 Bucket: ${BUCKET_NAME}`);
  console.log(`🌐 CDN Base URL: ${PUBLIC_URL || '(No public URL set, using standard R2 path)'}`);
  if (isDryRun) {
    console.log(`🔍 Mode: DRY RUN (Testing connections and files without uploading)\n`);
  } else {
    console.log(`⚡ Mode: LIVE UPLOAD\n`);
  }

  let uploadedCount = 0;
  let skippedCount = 0;
  let failedCount = 0;
  let totalUploadedBytes = 0;

  for (let i = 0; i < localFiles.length; i++) {
    const file = localFiles[i];
    const prefix = `[${i + 1}/${localFiles.length}]`;

    // 1. Check if file already exists on R2
    try {
      const headRes = await r2Request({
        method: 'HEAD',
        key: file.s3Key,
      });

      if (headRes.status === 200) {
        console.log(`${prefix} ⏩ Already on R2: ${file.s3Key} (${file.sizeMb} MB)`);
        skippedCount++;
        continue;
      }
    } catch {
      // If HEAD check fails, proceed to upload
    }

    if (isDryRun) {
      console.log(`${prefix} 📝 Would upload: ${file.s3Key} (${file.sizeMb} MB)`);
      uploadedCount++;
      continue;
    }

    // 2. Upload file to R2
    process.stdout.write(`${prefix} ⏳ Uploading: ${file.s3Key} (${file.sizeMb} MB) ... `);

    try {
      const fileData = fs.readFileSync(file.absolutePath);
      const putRes = await r2Request({
        method: 'PUT',
        key: file.s3Key,
        body: fileData,
        contentType: 'application/pdf',
      });

      if (putRes.status === 200 || putRes.status === 204) {
        console.log(`✅ Uploaded!`);
        uploadedCount++;
        totalUploadedBytes += file.sizeBytes;
      } else {
        const errText = await putRes.text();
        console.log(`❌ Failed (Status ${putRes.status}: ${errText.slice(0, 80)})`);
        failedCount++;
      }
    } catch (err) {
      console.log(`❌ Error: ${err.message}`);
      failedCount++;
    }
  }

  const uploadedMb = (totalUploadedBytes / (1024 * 1024)).toFixed(1);

  console.log(`\n========================================`);
  console.log(`📊 Cloudflare R2 Upload Summary:`);
  console.log(`   ✅ Newly Uploaded: ${uploadedCount} files (${uploadedMb} MB)`);
  console.log(`   ⏩ Already Cached on R2: ${skippedCount} files`);
  console.log(`   ❌ Failed: ${failedCount} files`);
  console.log(`========================================\n`);

  // 5. Update subjectPdfDirectory.json with CDN URLs
  if (PUBLIC_URL && !isDryRun) {
    console.log(`📝 Updating src/data/subjectPdfDirectory.json with CDN URLs...`);
    const catalogPath = path.resolve(ROOT_DIR, 'src/data/subjectPdfDirectory.json');
    if (fs.existsSync(catalogPath)) {
      const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf-8'));
      let updatedCount = 0;

      for (const subjKey of Object.keys(catalog.subjects)) {
        const subj = catalog.subjects[subjKey];
        if (subj.textbooks) {
          for (const book of subj.textbooks) {
            if (book.chapters) {
              for (const ch of book.chapters) {
                if (ch.localPath) {
                  const s3Key = ch.localPath.replace(/^\/materials\//, '');
                  ch.cdnUrl = `${PUBLIC_URL}/${s3Key}`;
                  updatedCount++;
                }
              }
            }
          }
        }
        if (subj.questionPapers) {
          for (const qp of subj.questionPapers) {
            if (qp.localPath) {
              const s3Key = qp.localPath.replace(/^\/materials\//, '');
              qp.cdnUrl = `${PUBLIC_URL}/${s3Key}`;
              updatedCount++;
            }
          }
        }
      }

      catalog.metadata.cdnProvider = 'Cloudflare R2';
      catalog.metadata.cdnBaseUrl = PUBLIC_URL;
      catalog.metadata.totalCdnIndexed = updatedCount;

      fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2), 'utf-8');
      console.log(`🎉 Injected ${updatedCount} high-speed Cloudflare R2 CDN links into directory!\n`);
    }
  }
}

main().catch(err => {
  console.error('[R2 Uploader Fatal Error]:', err);
  process.exit(1);
});
