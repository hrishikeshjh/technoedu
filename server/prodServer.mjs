import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { createApiRequestHandler } from './apiMiddleware.mjs';
import { validateStartupEnv } from './env.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

validateStartupEnv();

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.pdf': 'application/pdf',
};

const apiHandler = createApiRequestHandler();
const port = Number(process.env.PORT) || 3000;

const server = http.createServer((req, res) => {
  const urlPath = (req.url || '/').split('?')[0];

  if (urlPath.startsWith('/api')) {
    return apiHandler(req, res, () => {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'API endpoint not found' }));
    });
  }

  if (!fs.existsSync(distDir)) {
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Production build not found. Run `npm run build` first.');
    return;
  }

  const safeRelPath = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
  let filePath = path.join(distDir, safeRelPath === '/' ? 'index.html' : safeRelPath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    // SPA fallback to index.html
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  res.setHeader('Content-Type', MIME_TYPES[ext] || 'application/octet-stream');
  fs.createReadStream(filePath).pipe(res);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`TechnoEdu production server listening on http://localhost:${port}`);
});
