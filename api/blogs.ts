/**
 * Vercel Serverless / Edge Function for /api/blogs
 * Persists blog posts to Cloudflare R2 bucket.
 */

export const config = {
  runtime: 'edge',
};

const DEFAULT_ACCOUNT_ID = '88f615b88df00f68a1cc2fbd77fa647c';
const DEFAULT_ACCESS_KEY_ID = '4efa220ed1ed19e91681b167ef50df4b';
const DEFAULT_SECRET_ACCESS_KEY = '4137a43c78bd0095b81775e00ef968fdbf4165e6d3fdc8c06d68bc9a2c41f567';
const DEFAULT_BUCKET_NAME = 'technoedu-blogs';
const DEFAULT_PUBLIC_URL = 'https://pub-3f62a1750c20425f95e67ab76e9d98ea.r2.dev';

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Pragma, Cache-Control',
  'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
};

function getCredentials() {
  const env: any = (globalThis as any).process?.env || {};
  return {
    accountId: env.CLOUDFLARE_ACCOUNT_ID || DEFAULT_ACCOUNT_ID,
    accessKeyId: env.R2_ACCESS_KEY_ID || DEFAULT_ACCESS_KEY_ID,
    secretAccessKey: env.R2_SECRET_ACCESS_KEY || DEFAULT_SECRET_ACCESS_KEY,
    bucket: env.R2_BUCKET_NAME || DEFAULT_BUCKET_NAME,
    publicUrl: (env.R2_PUBLIC_URL || DEFAULT_PUBLIC_URL).replace(/\/+$/, ''),
  };
}

async function hmacSha256(key: Uint8Array | string, data: Uint8Array | string): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const k = typeof key === 'string' ? enc.encode(key) : key;
  const d = typeof data === 'string' ? enc.encode(data) : data;
  const cryptoKey = await crypto.subtle.importKey('raw', k as any, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, d as any);
  return new Uint8Array(sig);
}

async function sha256Hex(data: string | Uint8Array): Promise<string> {
  const enc = new TextEncoder();
  const d = typeof data === 'string' ? enc.encode(data) : data;
  const hash = await crypto.subtle.digest('SHA-256', d as any);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

async function getSignatureKey(key: string, dateStamp: string, regionName: string, serviceName: string): Promise<Uint8Array> {
  const enc = new TextEncoder();
  const kDate = await hmacSha256(enc.encode('AWS4' + key), dateStamp);
  const kRegion = await hmacSha256(kDate, regionName);
  const kService = await hmacSha256(kRegion, serviceName);
  return hmacSha256(kService, 'aws4_request');
}

async function signS3Request({
  method,
  accountId,
  accessKeyId,
  secretAccessKey,
  bucket,
  key,
  body = '',
  contentType = 'application/json',
}: {
  method: 'GET' | 'PUT' | 'DELETE' | 'HEAD';
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucket: string;
  key: string;
  body?: string;
  contentType?: string;
}) {
  const host = `${accountId}.r2.cloudflarestorage.com`;
  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');
  const dateStamp = amzDate.slice(0, 8);
  const canonicalUri = `/${bucket}/${key}`;
  const payloadHash = await sha256Hex(body);

  const headersToSign: Record<string, string> = {
    'host': host,
    'x-amz-content-sha256': payloadHash,
    'x-amz-date': amzDate,
  };
  if (method === 'PUT' && contentType) {
    headersToSign['content-type'] = contentType;
  }

  const sortedKeys = Object.keys(headersToSign).sort();
  const canonicalHeaders = sortedKeys.map((k) => `${k}:${headersToSign[k]}\n`).join('');
  const signedHeaders = sortedKeys.join(';');

  const canonicalRequest = [method, canonicalUri, '', canonicalHeaders, signedHeaders, payloadHash].join('\n');
  const credentialScope = `${dateStamp}/auto/s3/aws4_request`;
  const stringToSign = ['AWS4-HMAC-SHA256', amzDate, credentialScope, await sha256Hex(canonicalRequest)].join('\n');

  const signingKey = await getSignatureKey(secretAccessKey, dateStamp, 'auto', 's3');
  const enc = new TextEncoder();
  const cryptoKey = await crypto.subtle.importKey('raw', signingKey as any, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sigBuffer = await crypto.subtle.sign('HMAC', cryptoKey, enc.encode(stringToSign) as any);
  const signature = Array.from(new Uint8Array(sigBuffer)).map((b) => b.toString(16).padStart(2, '0')).join('');

  const authorization = `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const requestHeaders: Record<string, string> = {
    ...headersToSign,
    'Authorization': authorization,
  };
  if (method === 'PUT') {
    requestHeaders['Cache-Control'] = 'no-cache, no-store, must-revalidate';
  }

  const url = `https://${host}${canonicalUri}`;
  return { url, headers: requestHeaders };
}

async function loadPostsFromR2(): Promise<any[]> {
  try {
    const creds = getCredentials();
    const { url, headers } = await signS3Request({
      method: 'GET',
      ...creds,
      key: 'blogs/posts.json',
    });
    const res = await fetch(url, { headers, cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch (e) {
    console.warn('Vercel API S3 SigV4 GET error:', e);
  }

  // Fallback to Public CDN
  try {
    const creds = getCredentials();
    const res = await fetch(`${creds.publicUrl}/blogs/posts.json?_t=${Date.now()}`, {
      headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache' },
      cache: 'no-store',
    });
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data)) return data;
    }
  } catch (e) {
    console.warn('Vercel API Public CDN fetch error:', e);
  }

  return [];
}

async function persistPostsToR2(posts: any[]): Promise<boolean> {
  const jsonContent = JSON.stringify(posts, null, 2);
  try {
    const creds = getCredentials();
    const { url, headers } = await signS3Request({
      method: 'PUT',
      ...creds,
      key: 'blogs/posts.json',
      body: jsonContent,
      contentType: 'application/json',
    });
    const res = await fetch(url, {
      method: 'PUT',
      headers,
      body: jsonContent,
    });
    return res.ok;
  } catch (e) {
    console.error('Vercel API S3 SigV4 PUT error:', e);
    return false;
  }
}

export default async function handler(request: Request) {
  const method = request.method.toUpperCase();

  if (method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }

  if (method === 'GET') {
    try {
      const posts = await loadPostsFromR2();
      return new Response(JSON.stringify(posts), {
        status: 200,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message || 'Failed to load posts' }), {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }
  }

  if (method === 'POST') {
    try {
      const body = (await request.json()) as any;
      if (!body) {
        return new Response(JSON.stringify({ error: 'Missing request body' }), {
          status: 400,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      }

      const newPosts: any[] = Array.isArray(body) ? body : [body];
      for (const p of newPosts) {
        if (!p || !p.id) {
          return new Response(JSON.stringify({ error: 'Each post must contain a valid id' }), {
            status: 400,
            headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
          });
        }
        p.status = 'approved';
        p.submittedAt = p.submittedAt || new Date().toISOString();
      }

      const currentPosts = await loadPostsFromR2();
      const newIds = new Set(newPosts.map((p) => p.id));
      const merged = [...newPosts, ...currentPosts.filter((p) => !newIds.has(p.id))];

      const saved = await persistPostsToR2(merged);

      return new Response(
        JSON.stringify({
          success: true,
          savedToR2: saved,
          posts: merged,
          total: merged.length,
        }),
        {
          status: 200,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        }
      );
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message || 'Failed to save post' }), {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }
  }

  if (method === 'DELETE') {
    try {
      const url = new URL(request.url);
      let id = url.searchParams.get('id');

      if (!id) {
        try {
          const body = (await request.json()) as any;
          id = body?.id;
        } catch (e) {}
      }

      if (!id) {
        return new Response(JSON.stringify({ error: 'Missing id parameter for deletion' }), {
          status: 400,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        });
      }

      const currentPosts = await loadPostsFromR2();
      const filtered = currentPosts.filter((p) => p.id !== id);
      const saved = await persistPostsToR2(filtered);

      return new Response(
        JSON.stringify({
          success: true,
          deletedId: id,
          savedToR2: saved,
          posts: filtered,
          total: filtered.length,
        }),
        {
          status: 200,
          headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
        }
      );
    } catch (err: any) {
      return new Response(JSON.stringify({ error: err.message || 'Failed to delete post' }), {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }
  }

  return new Response('Method Not Allowed', { status: 405, headers: CORS_HEADERS });
}
