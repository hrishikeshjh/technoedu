declare global {
  interface Window {
    google?: {
      accounts?: {
        oauth2?: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token?: string; error?: string; error_description?: string }) => void;
            error_callback?: (error: { type: string; message?: string }) => void;
          }) => {
            requestAccessToken: (overrideConfig?: { prompt?: string }) => void;
          };
        };
      };
    };
  }
}

const PLACEHOLDER_PREFIX = 'your_google_oauth_client_id';

export function getGoogleClientId(): string {
  return (import.meta.env.VITE_GOOGLE_CLIENT_ID || '').trim();
}

export function isGoogleOAuthConfigured(): boolean {
  const clientId = getGoogleClientId();
  return Boolean(clientId && !clientId.startsWith(PLACEHOLDER_PREFIX) && clientId.includes('.apps.googleusercontent.com'));
}

let gsiScriptPromise: Promise<void> | null = null;

function loadGoogleIdentityScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Google Sign-In is only available in the browser.'));
  }
  if (window.google?.accounts?.oauth2) {
    return Promise.resolve();
  }
  if (gsiScriptPromise) {
    return gsiScriptPromise;
  }

  gsiScriptPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[src="https://accounts.google.com/gsi/client"]');
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject(new Error('Failed to load Google Identity Services.')));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => {
      gsiScriptPromise = null;
      reject(new Error('Failed to load Google Identity Services. Check your internet connection.'));
    };
    document.head.appendChild(script);
  });

  return gsiScriptPromise;
}

/**
 * Opens Google's OAuth 2.0 popup via Google Identity Services and resolves with an access token.
 */
export async function requestGoogleAccessToken(): Promise<string> {
  const clientId = getGoogleClientId();
  if (!isGoogleOAuthConfigured()) {
    throw new Error('Google OAuth Client ID is not configured.');
  }

  await loadGoogleIdentityScript();

  return new Promise((resolve, reject) => {
    const oauth2 = window.google?.accounts?.oauth2;
    if (!oauth2) {
      reject(new Error('Google OAuth client failed to initialize.'));
      return;
    }

    const client = oauth2.initTokenClient({
      client_id: clientId,
      scope: 'openid email profile',
      callback: (response) => {
        if (response.error || !response.access_token) {
          reject(new Error(response.error_description || response.error || 'Google sign-in was cancelled.'));
          return;
        }
        resolve(response.access_token);
      },
      error_callback: (err) => {
        reject(new Error(err.message || 'Google sign-in popup was closed or blocked.'));
      },
    });

    client.requestAccessToken({ prompt: 'select_account' });
  });
}
