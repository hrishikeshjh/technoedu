import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

let envLoaded = false;

/**
 * Loads .env and .env.local into process.env without overwriting existing variables.
 */
export function loadEnvFiles() {
  if (envLoaded) return;
  envLoaded = true;

  for (const filename of ['.env', '.env.local']) {
    const envPath = path.join(ROOT_DIR, filename);
    if (!fs.existsSync(envPath)) continue;

    const lines = fs.readFileSync(envPath, 'utf-8').split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let val = trimmed.slice(eqIdx + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!(key in process.env)) {
        process.env[key] = val;
      }
    }
  }
}

const PLACEHOLDER_MARKERS = [
  'your_',
  'replace_with_',
  'example',
  'xxxxxxxx',
];

export function isPlaceholderValue(val) {
  if (!val || typeof val !== 'string') return true;
  const trimmed = val.trim();
  if (!trimmed) return true;
  const lower = trimmed.toLowerCase();
  return PLACEHOLDER_MARKERS.some((marker) => lower.startsWith(marker) || lower.includes('xxxxxxxxxxxxxxxx'));
}

export function getConfiguredGoogleClientId() {
  const id = (process.env.GOOGLE_CLIENT_ID || process.env.VITE_GOOGLE_CLIENT_ID || '').trim();
  if (isPlaceholderValue(id)) return null;
  return id;
}

export function isEmailProviderConfigured() {
  const apiKey = (process.env.EMAIL_PROVIDER_API_KEY || '').trim();
  const from = (process.env.EMAIL_FROM || '').trim();
  return !isPlaceholderValue(apiKey) && !isPlaceholderValue(from);
}

/**
 * Validates required environment variables at startup without printing any secret values.
 */
export function validateStartupEnv() {
  loadEnvFiles();

  const isProd = process.env.NODE_ENV === 'production';
  const missingRequired = [];
  const missingOptional = [];

  if (isPlaceholderValue(process.env.AUTH_SESSION_SECRET)) {
    if (isProd) {
      missingRequired.push('AUTH_SESSION_SECRET');
    } else {
      missingOptional.push('AUTH_SESSION_SECRET (using ephemeral dev secret; set a 64-char hex secret for production)');
    }
  }

  if (!getConfiguredGoogleClientId()) {
    missingOptional.push('GOOGLE_CLIENT_ID / VITE_GOOGLE_CLIENT_ID (Google OAuth Sign-In disabled until configured)');
  }

  if (!isEmailProviderConfigured()) {
    missingOptional.push('EMAIL_PROVIDER_API_KEY / EMAIL_FROM (Email verification & password recovery emails disabled in local mode)');
  }

  if (missingRequired.length > 0) {
    const msg = `[TechnoEdu Startup Error] Missing required environment variables: ${missingRequired.join(', ')}. Check .env.example for setup instructions.`;
    console.error(msg);
    throw new Error(msg);
  }

  if (missingOptional.length > 0 && !process.env.TECHNOEDU_SUPPRESS_ENV_WARNINGS) {
    console.warn(`[TechnoEdu Env Notice] Optional services not configured:\n  - ${missingOptional.join('\n  - ')}`);
  }

  return {
    valid: true,
    missingRequired,
    missingOptional,
    googleOAuthEnabled: Boolean(getConfiguredGoogleClientId()),
    emailProviderEnabled: isEmailProviderConfigured(),
  };
}
