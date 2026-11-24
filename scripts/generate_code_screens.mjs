import puppeteer from 'puppeteer-core';
import fs from 'fs';

if (!fs.existsSync('screenshots')) fs.mkdirSync('screenshots');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const renderCodeWindow = async (title, code, outputPath) => {
    const page = await browser.newPage();
    await page.setViewport({ width: 960, height: 640, deviceScaleFactor: 2 });
    
    const escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          margin: 0;
          padding: 30px;
          background: #F8FAFC;
          font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .window {
          width: 900px;
          background: #18181B;
          border-radius: 14px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.08);
          overflow: hidden;
        }
        .titlebar {
          background: #27272A;
          padding: 12px 18px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .controls {
          display: flex;
          gap: 8px;
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        .dot.red { background: #EF4444; }
        .dot.yellow { background: #F59E0B; }
        .dot.green { background: #10B981; }
        .title {
          flex: 1;
          text-align: center;
          color: #A1A1AA;
          font-size: 13px;
          font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
          font-weight: 500;
          margin-right: 48px;
        }
        .content {
          padding: 24px;
          color: #E4E4E7;
          font-size: 13.5px;
          line-height: 1.65;
          overflow: hidden;
        }
        pre {
          margin: 0;
          white-space: pre-wrap;
          word-break: break-all;
        }
      </style>
    </head>
    <body>
      <div class="window">
        <div class="titlebar">
          <div class="controls">
            <div class="dot red"></div>
            <div class="dot yellow"></div>
            <div class="dot green"></div>
          </div>
          <div class="title">${title}</div>
        </div>
        <div class="content">
          <pre><code>${escaped}</code></pre>
        </div>
      </div>
    </body>
    </html>
    `;
    
    await page.setContent(html);
    const windowEl = await page.$('.window');
    await windowEl.screenshot({ path: outputPath, omitBackground: false });
    console.log('Rendered', outputPath, fs.statSync(outputPath).size);
    await page.close();
  };

  const apiCode = `/**
 * Vercel Serverless / Edge Function: /api/blogs
 * Persists blog posts to Cloudflare R2 bucket with AWS SigV4
 */
export const config = { runtime: "edge" };

export default async function handler(request: Request) {
  const method = request.method.toUpperCase();

  if (method === "GET") {
    // Authenticated load directly from Cloudflare R2 S3 or CDN
    const posts = await loadPostsFromR2();
    return new Response(JSON.stringify(posts), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
    });
  }

  if (method === "POST") {
    // S3 SigV4 signed request with Web Crypto Subtle (zero external deps)
    const body = await request.json();
    const currentPosts = await loadPostsFromR2();
    const merged = [...newPosts, ...currentPosts];
    const saved = await persistPostsToR2(merged);

    return new Response(JSON.stringify({ success: true, count: merged.length }), {
      status: 200,
      headers: { ...CORS_HEADERS, "Content-Type": "application/json" }
    });
  }
}`;
  await renderCodeWindow("api/blogs.ts — Vercel Edge Runtime & Cloudflare R2", apiCode, "screenshots/code_api_blogs.png");

  const dataCode = `import { ExamInfo } from "../types";

export const examsData: ExamInfo[] = [
  {
    id: "upsc",
    name: "UPSC Civil Services Examination (CSE)",
    shortCode: "UPSC CSE",
    category: "Government",
    tag: "Civil Services Flagship",
    officialPortalUrl: "https://upsc.gov.in",
    syllabusHighlights: [
      "Prelims GS Paper I (History, Polity, Economy, Geography, Environment)",
      "Prelims Paper II CSAT (Reading Comprehension, Logical Reasoning)",
      "Mains GS I to IV (Heritage, Governance, Economy, Ethics) & Essay"
    ],
    openSourcePlatforms: [
      { id: "ncert", name: "NCERT e-Pathshala", type: "Textbooks & Notes", badge: "Core Foundation" },
      { id: "nptel", name: "NPTEL Social Sciences", type: "Video Lectures", badge: "Courseware" },
      { id: "prs", name: "PRS Legislative Research", type: "Policy Reports", badge: "Policy Source" }
    ],
    topicResources: [
      {
        topicName: "Indian Polity & Constitution",
        platformName: "Ministry of Law & Justice / Indian Kanoon",
        resourceUrl: "https://legislative.gov.in/sites/default/files/COI_English.pdf",
        isFreeOpenSource: true
      }
    ]
  }
];`;
  await renderCodeWindow("src/data/examsData.ts — Single Source of Truth (Static Typed)", dataCode, "screenshots/code_exams_data.png");

  const deployCode = `// vercel.json — Single Page Application Rewrites & Edge Forwarding
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    },
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}

// vite.config.ts — Fast ESM Build & Zero-Config React Bundle
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true
  }
});`;
  await renderCodeWindow("vercel.json & vite.config.ts — Production Deployment Architecture", deployCode, "screenshots/code_deploy_config.png");

  await browser.close();
  console.log("All code editor windows generated successfully!");
})();
