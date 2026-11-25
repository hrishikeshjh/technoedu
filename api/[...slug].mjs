import { createApiRequestHandler } from '../server/apiMiddleware.mjs';

const handler = createApiRequestHandler();

export default async function vercelApiHandler(req, res) {
  return handler(req, res, () => {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'API endpoint not found' }));
  });
}
