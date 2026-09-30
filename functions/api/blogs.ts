/**
 * Cloudflare Pages Function for /api/blogs
 * Automatically persists blog posts to Cloudflare R2 bucket in production.
 */

interface Env {
  CLOUDFLARE_ACCOUNT_ID?: string;
  R2_ACCESS_KEY_ID?: string;
  R2_SECRET_ACCESS_KEY?: string;
  R2_BUCKET_NAME?: string;
  R2_PUBLIC_URL?: string;
  technoedu_blogs?: any; // R2 Bucket binding if configured in dashboard
}

const R2_PUBLIC_DEFAULT = 'https://pub-3f62a1750c20425f95e67ab76e9d98ea.r2.dev';

export const onRequestGet = async (context: { env: Env }) => {
  const { env } = context;

  // 1. Try R2 binding if available
  if (env.technoedu_blogs) {
    try {
      const obj = await env.technoedu_blogs.get('blogs/posts.json');
      if (obj) {
        const text = await obj.text();
        return new Response(text, {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache',
          },
        });
      }
    } catch (e) {}
  }

  // 2. Fallback to public R2 CDN URL
  const publicUrl = (env.R2_PUBLIC_URL || R2_PUBLIC_DEFAULT).replace(/\/+$/, '');
  try {
    const res = await fetch(`${publicUrl}/blogs/posts.json`, {
      headers: { 'Cache-Control': 'no-cache' },
    });
    if (res.ok) {
      const text = await res.text();
      return new Response(text, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',
        },
      });
    }
  } catch (e) {}

  return new Response('[]', {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;

  try {
    const newPost = await request.json() as any;
    if (!newPost || !newPost.id) {
      return new Response(JSON.stringify({ error: 'Missing post data' }), { status: 400 });
    }

    // If R2 binding is configured
    if (env.technoedu_blogs) {
      let currentPosts: any[] = [];
      try {
        const existing = await env.technoedu_blogs.get('blogs/posts.json');
        if (existing) {
          currentPosts = JSON.parse(await existing.text());
        }
      } catch (e) {}

      const updated = [newPost, ...currentPosts.filter((p: any) => p.id !== newPost.id)];
      await env.technoedu_blogs.put('blogs/posts.json', JSON.stringify(updated, null, 2), {
        httpMetadata: {
          contentType: 'application/json',
          cacheControl: 'public, max-age=60',
        },
      });

      return new Response(JSON.stringify({ success: true, post: newPost }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    return new Response(JSON.stringify({ success: true, post: newPost }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
};

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
