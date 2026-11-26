const AUTH_ROUTES = ['/login', '/signin', '/signup', '/verify-email', '/forgot-password'];

/**
 * Validates that a redirect target is a safe internal application path.
 * Never allows external URLs, protocol-relative URLs, or auth-page loops.
 */
export function getSafeRedirectPath(raw: string | null | undefined, fallback = '/dashboard'): string {
  if (!raw || typeof raw !== 'string') return fallback;
  const trimmed = raw.trim();
  if (!trimmed.startsWith('/') || trimmed.startsWith('//') || trimmed.startsWith('/\\')) {
    return fallback;
  }
  if (trimmed.includes('://') || /[\r\n]/.test(trimmed)) {
    return fallback;
  }
  const pathOnly = trimmed.split('?')[0].split('#')[0];
  if (AUTH_ROUTES.includes(pathOnly)) {
    return fallback;
  }
  return trimmed;
}

export function buildLoginRedirectUrl(pathname: string, search = '', reason?: string): string {
  const fullPath = `${pathname}${search || ''}`;
  const safeTarget = getSafeRedirectPath(fullPath, '');
  const params = new URLSearchParams();
  if (safeTarget) {
    params.set('redirect', safeTarget);
  }
  if (reason) {
    params.set('reason', reason);
  }
  const qs = params.toString();
  return qs ? `/login?${qs}` : '/login';
}
