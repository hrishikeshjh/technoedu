const rawBaseUrl = (import.meta.env.VITE_API_BASE_URL || '').trim();
const API_BASE_URL = rawBaseUrl.endsWith('/') ? rawBaseUrl.slice(0, -1) : rawBaseUrl;

/**
 * Resolves an API path against VITE_API_BASE_URL when configured,
 * falling back to same-origin relative paths (e.g. /api/...).
 */
export function getApiUrl(path: string): string {
  if (!path.startsWith('/')) {
    return `${API_BASE_URL}/${path}`;
  }
  return `${API_BASE_URL}${path}`;
}

/**
 * Safely parses a JSON response without throwing raw SyntaxError on empty or HTML bodies
 * (e.g. when the API server is offline or a proxy returns 404/502).
 */
export async function parseJsonResponse<T = any>(res: Response): Promise<T> {
  const text = await res.text();
  if (!text || !text.trim()) {
    if (!res.ok) {
      throw new Error(`Authentication service returned an empty response (HTTP ${res.status}). Please ensure the API server is running.`);
    }
    return {} as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    if (!res.ok) {
      throw new Error(`Authentication service is unavailable (HTTP ${res.status}). Please ensure the API server is running.`);
    }
    throw new Error('Server returned an invalid response format.');
  }
}
