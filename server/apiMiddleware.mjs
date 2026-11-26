import crypto from 'node:crypto';
import { getDb } from './db.mjs';
import {
  hashPassword,
  verifyPassword,
  hashToken,
  createSession,
  refreshSession,
  deleteSession,
  deleteAllUserSessions,
  setSessionCookie,
  clearSessionCookie,
  getUserFromToken,
  requireAuth,
  extractToken,
} from './auth.mjs';
import {
  validateStartupEnv,
  getConfiguredGoogleClientId,
  isEmailProviderConfigured,
} from './env.mjs';
import { getLocalPosts, addOrUpdatePost, removePost } from '../scripts/blogSyncServer.mjs';

function sendJson(res, statusCode, data) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Auth-Token');
  res.end(JSON.stringify(data));
}

function parseJsonBody(req) {
  if (req.body !== undefined) {
    if (typeof req.body === 'string') {
      try {
        return Promise.resolve(req.body ? JSON.parse(req.body) : {});
      } catch {
        return Promise.reject(new Error('Invalid JSON'));
      }
    }
    return Promise.resolve(req.body || {});
  }
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

async function sendTransactionalEmail({ to, subject, html, text }) {
  if (!isEmailProviderConfigured()) {
    return false;
  }
  const apiKey = process.env.EMAIL_PROVIDER_API_KEY.trim();
  const from = process.env.EMAIL_FROM.trim();
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from, to, subject, html, text }),
  });
  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`Email delivery failed (${response.status}): ${errText}`);
  }
  return true;
}

export function createApiRequestHandler() {
  validateStartupEnv();
  const db = getDb();

  return async (req, res, next) => {
        const urlObj = new URL(req.url, 'http://localhost');
        const pathname = urlObj.pathname;

        // Only handle /api/*
        if (!pathname.startsWith('/api')) {
          return next();
        }

        // Enable CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Auth-Token');

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          return res.end();
        }

        try {
          // ───────────────────────────────────────────────────────────────────
          // 1. /api/blogs (Protected behind authentication)
          // ───────────────────────────────────────────────────────────────────
          if (pathname === '/api/blogs') {
            const user = requireAuth(req, res);
            if (!user) return;
            if (req.method === 'GET') {
              const posts = getLocalPosts();
              return sendJson(res, 200, posts);
            }
            if (req.method === 'POST') {
              const data = await parseJsonBody(req);
              const { post, posts } = await addOrUpdatePost(data);
              return sendJson(res, 200, { success: true, post, posts, total: posts.length });
            }
            if (req.method === 'DELETE') {
              let id = urlObj.searchParams.get('id');
              if (!id) {
                const body = await parseJsonBody(req);
                id = body.id;
              }
              if (!id) return sendJson(res, 400, { error: 'Missing id parameter' });
              const updated = await removePost(id);
              return sendJson(res, 200, { success: true, id, posts: updated, total: updated.length });
            }
          }

          // ───────────────────────────────────────────────────────────────────
          // 2. Authentication: /api/auth/*
          // ───────────────────────────────────────────────────────────────────

          // GET /api/auth/config
          if (pathname === '/api/auth/config' && req.method === 'GET') {
            return sendJson(res, 200, {
              googleClientId: getConfiguredGoogleClientId(),
              emailVerificationRequired: isEmailProviderConfigured(),
            });
          }

          // POST /api/auth/google
          if (pathname === '/api/auth/google' && req.method === 'POST') {
            const body = await parseJsonBody(req);
            const { email, name, avatarUrl, credential, accessToken } = body;

            let userEmail = '';
            let userName = '';
            let userAvatar = avatarUrl || '';
            const configuredClientId = getConfiguredGoogleClientId();

            // 1. Verify Google OAuth2 access token via Google userinfo endpoint
            if (accessToken && typeof accessToken === 'string') {
              const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` },
              });
              if (!userInfoRes.ok) {
                return sendJson(res, 401, { error: 'Invalid or expired Google access token.' });
              }
              const profile = await userInfoRes.json();
              if (!profile.email || profile.email_verified === false) {
                return sendJson(res, 401, { error: 'Google account email is not verified.' });
              }
              userEmail = profile.email;
              userName = profile.name || '';
              userAvatar = profile.picture || userAvatar;
            }
            // 2. Verify Google Identity Services ID token (JWT) via Google tokeninfo endpoint
            else if (credential && typeof credential === 'string') {
              const tokenInfoRes = await fetch(
                `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(credential)}`
              );
              if (!tokenInfoRes.ok) {
                return sendJson(res, 401, { error: 'Invalid or expired Google ID token.' });
              }
              const payload = await tokenInfoRes.json();
              if (configuredClientId && payload.aud !== configuredClientId) {
                return sendJson(res, 401, { error: 'Google token audience mismatch.' });
              }
              if (!payload.email || payload.email_verified !== 'true') {
                return sendJson(res, 401, { error: 'Google account email is not verified.' });
              }
              userEmail = payload.email;
              userName = payload.name || '';
              userAvatar = payload.picture || userAvatar;
            }
            // 3. No unverified fallback allowed
            else {
              return sendJson(res, configuredClientId ? 401 : 503, {
                error: configuredClientId
                  ? 'A verified Google token is required.'
                  : 'Google Sign-In is not configured on this server. Please sign in with your email and password.',
              });
            }

            if (!userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
              return sendJson(res, 400, { error: 'A valid email address is required for Google Sign-In.' });
            }

            const cleanEmail = userEmail.trim().toLowerCase();
            let userRow = db.prepare('SELECT * FROM users WHERE email = ?').get(cleanEmail);

            if (!userRow) {
              // Create new user authenticated via Google
              const userId = 'usr_' + crypto.randomUUID();
              const displayName = (userName && userName.trim()) || cleanEmail.split('@')[0];
              const now = new Date().toISOString();
              const { hash, salt } = hashPassword('oauth_google_' + crypto.randomBytes(32).toString('hex'));

              db.prepare(`
                INSERT INTO users (id, full_name, email, password_hash, salt, role, is_verified, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, 'student', 1, ?, ?)
              `).run(userId, displayName, cleanEmail, hash, salt, now, now);

              userRow = db.prepare('SELECT * FROM users WHERE id = ?').get(userId);
            } else {
              // Ensure verified flag is true for Google authenticated users
              if (!userRow.is_verified) {
                db.prepare('UPDATE users SET is_verified = 1 WHERE id = ?').run(userRow.id);
                userRow.is_verified = 1;
              }
            }

            // Create persistent 30-day session
            const { token, expiresAt, maxAgeSeconds } = createSession(userRow.id, 30);
            setSessionCookie(res, token, maxAgeSeconds, req);
            const user = getUserFromToken(token);
            const needsOnboarding = !user?.learningProfile?.onboardingCompleted;

            return sendJson(res, 200, {
              success: true,
              token,
              expiresAt,
              user,
              needsOnboarding,
              message: needsOnboarding
                ? 'Google sign-in successful. Please complete your onboarding.'
                : 'Signed in with Google successfully.',
            });
          }

          // POST /api/auth/signup
          if (pathname === '/api/auth/signup' && req.method === 'POST') {
            const body = await parseJsonBody(req);
            const { name, email, password } = body;

            if (!name || typeof name !== 'string' || name.trim().length < 2) {
              return sendJson(res, 400, { error: 'Full name must be at least 2 characters.' });
            }
            if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
              return sendJson(res, 400, { error: 'A valid email address is required.' });
            }
            if (!password || typeof password !== 'string' || password.length < 6) {
              return sendJson(res, 400, { error: 'Password must be at least 6 characters.' });
            }
            if (password.length > 128) {
              return sendJson(res, 400, { error: 'Password must be 128 characters or fewer.' });
            }

            const cleanEmail = email.trim().toLowerCase();
            const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(cleanEmail);
            if (existing) {
              return sendJson(res, 409, { error: 'An account with this email address already exists.' });
            }

            const { hash, salt } = hashPassword(password);
            const userId = 'usr_' + crypto.randomUUID();
            const now = new Date().toISOString();
            const requireEmailVerification = isEmailProviderConfigured();

            db.prepare(`
              INSERT INTO users (id, full_name, email, password_hash, salt, is_verified, created_at, updated_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `).run(userId, name.trim(), cleanEmail, hash, salt, requireEmailVerification ? 0 : 1, now, now);

            if (requireEmailVerification) {
              const code = String(crypto.randomInt(100000, 999999));
              const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
              db.prepare('DELETE FROM email_verifications WHERE email = ?').run(cleanEmail);
              db.prepare(`
                INSERT INTO email_verifications (id, user_id, email, code_hash, expires_at, attempts, created_at)
                VALUES (?, ?, ?, ?, ?, 0, ?)
              `).run('ev_' + crypto.randomUUID(), userId, cleanEmail, hashToken(code), expiresAt, now);

              await sendTransactionalEmail({
                to: cleanEmail,
                subject: 'Verify your TechnoEdu email address',
                text: `Your TechnoEdu verification code is: ${code}. It expires in 15 minutes.`,
                html: `<p>Welcome to <strong>TechnoEdu</strong>!</p><p>Your verification code is: <strong style="font-size:20px;letter-spacing:2px;">${code}</strong></p><p>This code expires in 15 minutes.</p>`,
              });

              return sendJson(res, 201, {
                success: true,
                requiresEmailVerification: true,
                email: cleanEmail,
                needsOnboarding: true,
                message: 'Account created! Please check your email for the 6-digit verification code.',
              });
            }

            // Create persistent session when email verification provider is not configured
            const { token, expiresAt, maxAgeSeconds } = createSession(userId, 30);
            setSessionCookie(res, token, maxAgeSeconds, req);
            const user = getUserFromToken(token);

            return sendJson(res, 201, {
              success: true,
              token,
              expiresAt,
              user,
              needsOnboarding: true,
              message: 'Account created successfully. Please complete your onboarding.',
            });
          }

          // POST /api/auth/login
          if (pathname === '/api/auth/login' && req.method === 'POST') {
            const body = await parseJsonBody(req);
            const { email, password, rememberMe = true } = body;

            if (!email || !password) {
              return sendJson(res, 400, { error: 'Email and password are required.' });
            }

            const cleanEmail = String(email).trim().toLowerCase();
            const userRow = db.prepare('SELECT * FROM users WHERE email = ?').get(cleanEmail);
            if (!userRow) {
              return sendJson(res, 401, { error: 'Invalid email or password.' });
            }

            const isValid = verifyPassword(password, userRow.password_hash, userRow.salt);
            if (!isValid) {
              return sendJson(res, 401, { error: 'Invalid email or password.' });
            }

            if (!userRow.is_verified) {
              return sendJson(res, 403, {
                error: 'Please verify your email address before signing in.',
                code: 'EMAIL_NOT_VERIFIED',
                email: userRow.email,
              });
            }

            const { token, expiresAt, maxAgeSeconds } = createSession(userRow.id, rememberMe ? 30 : 1);
            setSessionCookie(res, token, maxAgeSeconds, req);
            const user = getUserFromToken(token);
            const needsOnboarding = !user?.learningProfile?.onboardingCompleted;

            return sendJson(res, 200, {
              success: true,
              token,
              expiresAt,
              user,
              needsOnboarding,
              message: 'Signed in successfully.',
            });
          }

          // POST /api/auth/refresh
          if (pathname === '/api/auth/refresh' && req.method === 'POST') {
            const currentToken = extractToken(req);
            if (!currentToken) {
              return sendJson(res, 401, { error: 'Authentication required.' });
            }
            const refreshed = refreshSession(currentToken, 30);
            if (!refreshed) {
              clearSessionCookie(res, req);
              return sendJson(res, 401, { error: 'Session expired or invalid.', code: 'SESSION_EXPIRED' });
            }
            setSessionCookie(res, refreshed.token, refreshed.maxAgeSeconds, req);
            const user = getUserFromToken(refreshed.token);
            return sendJson(res, 200, {
              success: true,
              token: refreshed.token,
              expiresAt: refreshed.expiresAt,
              user,
            });
          }

          // POST /api/auth/logout
          if (pathname === '/api/auth/logout' && req.method === 'POST') {
            const token = extractToken(req);
            if (token) {
              deleteSession(token);
            }
            clearSessionCookie(res, req);
            return sendJson(res, 200, { success: true, message: 'Signed out successfully.' });
          }

          // GET /api/auth/me
          if (pathname === '/api/auth/me' && req.method === 'GET') {
            const user = requireAuth(req, res);
            if (!user) return;
            return sendJson(res, 200, { success: true, user });
          }

          // POST /api/auth/verify-email (and /api/auth/verify-otp alias)
          if ((pathname === '/api/auth/verify-email' || pathname === '/api/auth/verify-otp') && req.method === 'POST') {
            const body = await parseJsonBody(req);
            const { email, otp, code } = body;
            const submittedCode = String(code || otp || '').trim();
            const cleanEmail = String(email || '').trim().toLowerCase();

            if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
              return sendJson(res, 400, { error: 'A valid email address is required.' });
            }
            if (!submittedCode || submittedCode.length < 4) {
              return sendJson(res, 400, { error: 'Enter a valid verification code.' });
            }

            const userRow = db.prepare('SELECT * FROM users WHERE email = ?').get(cleanEmail);
            if (!userRow) {
              return sendJson(res, 404, { error: 'Account not found for this email address.' });
            }

            if (userRow.is_verified) {
              const { token, expiresAt, maxAgeSeconds } = createSession(userRow.id, 30);
              setSessionCookie(res, token, maxAgeSeconds, req);
              const user = getUserFromToken(token);
              return sendJson(res, 200, {
                success: true,
                token,
                expiresAt,
                user,
                needsOnboarding: !user?.learningProfile?.onboardingCompleted,
                message: 'Email is already verified.',
              });
            }

            const evRow = db.prepare(`
              SELECT * FROM email_verifications WHERE email = ? ORDER BY created_at DESC LIMIT 1
            `).get(cleanEmail);

            if (!evRow) {
              return sendJson(res, 400, { error: 'No active verification code found. Please request a new code.' });
            }
            if (evRow.expires_at <= new Date().toISOString()) {
              return sendJson(res, 400, { error: 'Verification code has expired. Please request a new code.' });
            }
            if (evRow.attempts >= 5) {
              return sendJson(res, 429, { error: 'Too many invalid attempts. Please request a new verification code.' });
            }

            if (hashToken(submittedCode) !== evRow.code_hash) {
              db.prepare('UPDATE email_verifications SET attempts = attempts + 1 WHERE id = ?').run(evRow.id);
              return sendJson(res, 400, { error: 'Invalid verification code. Please try again.' });
            }

            db.prepare('UPDATE users SET is_verified = 1, updated_at = ? WHERE id = ?').run(new Date().toISOString(), userRow.id);
            db.prepare('DELETE FROM email_verifications WHERE email = ?').run(cleanEmail);

            const { token, expiresAt, maxAgeSeconds } = createSession(userRow.id, 30);
            setSessionCookie(res, token, maxAgeSeconds, req);
            const user = getUserFromToken(token);

            return sendJson(res, 200, {
              success: true,
              token,
              expiresAt,
              user,
              needsOnboarding: !user?.learningProfile?.onboardingCompleted,
              message: 'Email verified successfully.',
            });
          }

          // POST /api/auth/resend-verification
          if (pathname === '/api/auth/resend-verification' && req.method === 'POST') {
            const body = await parseJsonBody(req);
            const cleanEmail = String(body.email || '').trim().toLowerCase();
            if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
              return sendJson(res, 400, { error: 'A valid email address is required.' });
            }

            const userRow = db.prepare('SELECT id, is_verified FROM users WHERE email = ?').get(cleanEmail);
            if (userRow && !userRow.is_verified) {
              const code = String(crypto.randomInt(100000, 999999));
              const now = new Date().toISOString();
              const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
              db.prepare('DELETE FROM email_verifications WHERE email = ?').run(cleanEmail);
              db.prepare(`
                INSERT INTO email_verifications (id, user_id, email, code_hash, expires_at, attempts, created_at)
                VALUES (?, ?, ?, ?, ?, 0, ?)
              `).run('ev_' + crypto.randomUUID(), userRow.id, cleanEmail, hashToken(code), expiresAt, now);

              await sendTransactionalEmail({
                to: cleanEmail,
                subject: 'Your new TechnoEdu verification code',
                text: `Your TechnoEdu verification code is: ${code}. It expires in 15 minutes.`,
                html: `<p>Your new TechnoEdu verification code is: <strong style="font-size:20px;letter-spacing:2px;">${code}</strong></p><p>This code expires in 15 minutes.</p>`,
              });
            }

            return sendJson(res, 200, {
              success: true,
              message: 'If an unverified account exists for this email, a new verification code has been sent.',
            });
          }

          // POST /api/auth/forgot-password
          if (pathname === '/api/auth/forgot-password' && req.method === 'POST') {
            const body = await parseJsonBody(req);
            const cleanEmail = String(body.email || '').trim().toLowerCase();
            if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
              return sendJson(res, 400, { error: 'A valid email address is required.' });
            }

            const userRow = db.prepare('SELECT id, email FROM users WHERE email = ?').get(cleanEmail);
            if (userRow) {
              const rawToken = crypto.randomBytes(32).toString('hex');
              const now = new Date().toISOString();
              const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString();

              db.prepare('DELETE FROM password_resets WHERE user_id = ?').run(userRow.id);
              db.prepare(`
                INSERT INTO password_resets (id, user_id, token_hash, expires_at, created_at)
                VALUES (?, ?, ?, ?, ?)
              `).run('pr_' + crypto.randomUUID(), userRow.id, hashToken(rawToken), expiresAt, now);

              const appUrl = (process.env.APP_URL || process.env.VITE_APP_URL || 'http://localhost:3000').replace(/\/$/, '');
              const resetUrl = `${appUrl}/forgot-password?token=${rawToken}`;

              if (isEmailProviderConfigured()) {
                await sendTransactionalEmail({
                  to: userRow.email,
                  subject: 'Reset your TechnoEdu password',
                  text: `Reset your TechnoEdu password using this link (valid for 1 hour): ${resetUrl}`,
                  html: `<p>Click the link below to reset your TechnoEdu password (valid for 1 hour):</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
                });
              } else if (process.env.NODE_ENV !== 'production') {
                console.info(`[TechnoEdu Dev] Password reset link for ${userRow.email}: ${resetUrl}`);
              }
            }

            return sendJson(res, 200, {
              success: true,
              message: 'If an account exists with this email, password recovery instructions have been sent.',
            });
          }

          // POST /api/auth/reset-password
          if (pathname === '/api/auth/reset-password' && req.method === 'POST') {
            const body = await parseJsonBody(req);
            const { token: resetToken, password: newPassword } = body;

            if (!resetToken || typeof resetToken !== 'string') {
              return sendJson(res, 400, { error: 'A valid password reset token is required.' });
            }
            if (!newPassword || typeof newPassword !== 'string' || newPassword.length < 6) {
              return sendJson(res, 400, { error: 'New password must be at least 6 characters.' });
            }

            const now = new Date().toISOString();
            const resetRow = db.prepare(`
              SELECT * FROM password_resets
              WHERE token_hash = ? AND used_at IS NULL AND expires_at > ?
            `).get(hashToken(resetToken.trim()), now);

            if (!resetRow) {
              return sendJson(res, 400, { error: 'This password reset link is invalid or has expired.' });
            }

            const { hash, salt } = hashPassword(newPassword);
            db.prepare('UPDATE users SET password_hash = ?, salt = ?, updated_at = ? WHERE id = ?')
              .run(hash, salt, now, resetRow.user_id);
            db.prepare('UPDATE password_resets SET used_at = ? WHERE id = ?').run(now, resetRow.id);
            // Invalidate all active sessions for security
            deleteAllUserSessions(resetRow.user_id);

            return sendJson(res, 200, {
              success: true,
              message: 'Your password has been reset. Please sign in with your new password.',
            });
          }

          // ───────────────────────────────────────────────────────────────────
          // 3. Onboarding Interview: /api/onboarding
          // ───────────────────────────────────────────────────────────────────
          if (pathname === '/api/onboarding' && req.method === 'POST') {
            const user = requireAuth(req, res);
            if (!user) return;

            const body = await parseJsonBody(req);
            const {
              fullName,
              age,
              educationLevel,
              currentClassOrSemester,
              institution,
              country,
              preferredLanguage,
              primaryCourseId,
              selectedSubjects = [],
              learningPreferences = [],
              preparationLevel = 'Intermediate',
              dailyStudyAvailability = '2–4 hours',
              targetYear = '2026',
            } = body;

            if (!primaryCourseId) {
              return sendJson(res, 400, { error: 'A primary course selection is required.' });
            }

            // Verify course exists
            const course = db.prepare('SELECT id, name FROM courses WHERE id = ?').get(primaryCourseId);
            if (!course) {
              return sendJson(res, 400, { error: 'Selected course not found.' });
            }

            const now = new Date().toISOString();

            // 1. Update basic user profile
            db.prepare(`
              UPDATE users
              SET full_name = COALESCE(?, full_name),
                  age = ?,
                  education_level = ?,
                  current_class_or_semester = ?,
                  institution = ?,
                  country = COALESCE(?, 'India'),
                  preferred_language = COALESCE(?, 'English'),
                  updated_at = ?
              WHERE id = ?
            `).run(
              fullName?.trim() || user.fullName || user.full_name,
              age ? parseInt(age, 10) : (user.age ?? null),
              educationLevel ?? user.educationLevel ?? null,
              currentClassOrSemester ?? user.currentClassOrSemester ?? null,
              institution ?? user.institution ?? null,
              country ?? user.country ?? 'India',
              preferredLanguage ?? user.preferredLanguage ?? 'English',
              now,
              user.id
            );

            // 2. Upsert user_learning_profiles
            const existingProfile = db.prepare('SELECT id FROM user_learning_profiles WHERE user_id = ?').get(user.id);
            const subjectsJson = JSON.stringify(selectedSubjects);
            const prefsJson = JSON.stringify(learningPreferences);

            if (existingProfile) {
              db.prepare(`
                UPDATE user_learning_profiles
                SET primary_course_id = ?,
                    active_course_id = ?,
                    preparation_level = ?,
                    target_year = ?,
                    daily_study_availability = ?,
                    learning_preferences = ?,
                    selected_subjects = ?,
                    preferred_language = ?,
                    onboarding_completed = 1,
                    updated_at = ?
                WHERE user_id = ?
              `).run(
                primaryCourseId,
                primaryCourseId,
                preparationLevel,
                targetYear,
                dailyStudyAvailability,
                prefsJson,
                subjectsJson,
                preferredLanguage || 'English',
                now,
                user.id
              );
            } else {
              const profileId = 'ulp_' + crypto.randomUUID();
              db.prepare(`
                INSERT INTO user_learning_profiles (
                  id, user_id, primary_course_id, active_course_id, preparation_level,
                  target_year, daily_study_availability, learning_preferences, selected_subjects,
                  preferred_language, onboarding_completed, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?)
              `).run(
                profileId,
                user.id,
                primaryCourseId,
                primaryCourseId,
                preparationLevel,
                targetYear,
                dailyStudyAvailability,
                prefsJson,
                subjectsJson,
                preferredLanguage || 'English',
                now,
                now
              );
            }

            // 3. Upsert primary course enrollment in user_course_enrollments
            const enrollId = 'uce_' + crypto.randomUUID();
            db.prepare(`
              INSERT INTO user_course_enrollments (id, user_id, course_id, enrollment_type, is_primary, selected_subjects, status, enrolled_at)
              VALUES (?, ?, ?, 'primary', 1, ?, 'active', ?)
              ON CONFLICT(user_id, course_id) DO UPDATE SET
                is_primary = 1,
                selected_subjects = excluded.selected_subjects,
                status = 'active'
            `).run(enrollId, user.id, primaryCourseId, subjectsJson, now);

            // 4. Seed initial realistic study planner tasks for this course
            const existingTasks = db.prepare('SELECT COUNT(*) as cnt FROM user_study_planner_tasks WHERE user_id = ? AND course_id = ?').get(user.id, primaryCourseId);
            if (!existingTasks || existingTasks.cnt === 0) {
              const initialTasks = [
                { title: `Review ${course.name} Syllabus Blueprint & Exam Pattern`, mins: 45 },
                { title: `Complete Unit 1 Foundational Notes & Diagnostic Drill`, mins: 60 },
                { title: `Solve 10 Previous Year Questions (PYQs) with explanations`, mins: 45 },
              ];
              const insertTask = db.prepare(`
                INSERT INTO user_study_planner_tasks (id, user_id, course_id, title, scheduled_date, duration_minutes, is_completed, created_at)
                VALUES (?, ?, ?, ?, ?, ?, 0, ?)
              `);
              for (let i = 0; i < initialTasks.length; i++) {
                const t = initialTasks[i];
                const taskDate = new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
                insertTask.run('task_' + crypto.randomUUID(), user.id, primaryCourseId, t.title, taskDate, t.mins, now);
              }
            }

            const updatedUser = getUserFromToken(extractToken(req));
            return sendJson(res, 200, {
              success: true,
              message: 'Personalization profile completed! Welcome to your learning space.',
              user: updatedUser,
            });
          }

          // ───────────────────────────────────────────────────────────────────
          // 4. Courses & Subjects: /api/courses/*
          // ───────────────────────────────────────────────────────────────────

          // GET /api/courses (Authenticated only)
          if (pathname === '/api/courses' && req.method === 'GET') {
            const user = requireAuth(req, res);
            if (!user) return;
            const category = urlObj.searchParams.get('category');
            let query = 'SELECT * FROM courses WHERE is_active = 1';
            const params = [];
            if (category) {
              query += ' AND category = ?';
              params.push(category);
            }
            query += ' ORDER BY name ASC';
            const courses = db.prepare(query).all(...params);
            return sendJson(res, 200, { success: true, courses });
          }

          // GET /api/courses/:slug (Authenticated only)
          const courseMatch = pathname.match(/^\/api\/courses\/([a-zA-Z0-9_-]+)$/);
          if (courseMatch && req.method === 'GET') {
            const user = requireAuth(req, res);
            if (!user) return;
            const slugOrId = courseMatch[1];
            const course = db.prepare('SELECT * FROM courses WHERE slug = ? OR id = ?').get(slugOrId, slugOrId);
            if (!course) {
              return sendJson(res, 404, { error: 'Course not found' });
            }

            const subjects = db.prepare(`
              SELECT * FROM course_subjects WHERE course_id = ? ORDER BY display_order ASC
            `).all(course.id);

            const topics = db.prepare(`
              SELECT * FROM course_topics WHERE course_id = ? ORDER BY display_order ASC
            `).all(course.id);

            const subjectsWithTopics = subjects.map((s) => ({
              ...s,
              topics: topics.filter((t) => t.subject_id === s.id),
            }));

            return sendJson(res, 200, {
              success: true,
              course: {
                ...course,
                subjects: subjectsWithTopics,
              },
            });
          }

          // GET /api/courses/:slug/subjects (Authenticated only)
          const subjectsMatch = pathname.match(/^\/api\/courses\/([a-zA-Z0-9_-]+)\/subjects$/);
          if (subjectsMatch && req.method === 'GET') {
            const user = requireAuth(req, res);
            if (!user) return;
            const slugOrId = subjectsMatch[1];
            const course = db.prepare('SELECT id FROM courses WHERE slug = ? OR id = ?').get(slugOrId, slugOrId);
            if (!course) return sendJson(res, 404, { error: 'Course not found' });

            const subjects = db.prepare(`
              SELECT * FROM course_subjects WHERE course_id = ? ORDER BY display_order ASC
            `).all(course.id);

            const topics = db.prepare(`
              SELECT * FROM course_topics WHERE course_id = ? ORDER BY display_order ASC
            `).all(course.id);

            const result = subjects.map((s) => ({
              ...s,
              topics: topics.filter((t) => t.subject_id === s.id),
            }));

            return sendJson(res, 200, { success: true, subjects: result });
          }

          // ───────────────────────────────────────────────────────────────────
          // 5. Course-Isolated Learning Resources: /api/resources
          // ───────────────────────────────────────────────────────────────────
          if (pathname === '/api/resources' && req.method === 'GET') {
            const user = requireAuth(req, res);
            if (!user) return;
            let requestedCourseId = urlObj.searchParams.get('courseId');
            const subjectId = urlObj.searchParams.get('subjectId');
            const resourceType = urlObj.searchParams.get('type');
            const search = urlObj.searchParams.get('search');

            // Course isolation enforcement:
            // If user is authenticated, their learning is strictly scoped to their enrolled/active course
            if (user && user.learningProfile) {
              const activeCourseId = user.learningProfile.active_course_id || user.learningProfile.primary_course_id;
              const enrolledCourseIds = (user.enrollments || []).map((e) => e.course_id);

              if (requestedCourseId) {
                // Check if user is enrolled in the requested course
                if (!enrolledCourseIds.includes(requestedCourseId)) {
                  // Unauthorized cross-course access rejected server-side
                  return sendJson(res, 403, {
                    error: 'Unauthorized access. You are not enrolled in this examination course.',
                    permittedCourses: enrolledCourseIds,
                  });
                }
              } else {
                requestedCourseId = activeCourseId;
              }
            }

            let query = `
              SELECT lr.*, c.name as course_name, c.slug as course_slug,
                     cs.name as subject_name, ct.name as topic_name
              FROM learning_resources lr
              JOIN courses c ON lr.course_id = c.id
              LEFT JOIN course_subjects cs ON lr.subject_id = cs.id
              LEFT JOIN course_topics ct ON lr.topic_id = ct.id
              WHERE 1=1
            `;
            const params = [];

            if (requestedCourseId) {
              // Only return resources for this course or universally accessible guides
              query += " AND (lr.course_id = ? OR lr.visibility = 'all_courses')";
              params.push(requestedCourseId);
            }

            if (subjectId) {
              query += ' AND lr.subject_id = ?';
              params.push(subjectId);
            }

            if (resourceType) {
              query += ' AND lr.resource_type = ?';
              params.push(resourceType);
            }

            if (search && search.trim()) {
              query += ' AND (lr.title LIKE ? OR lr.description LIKE ? OR lr.content LIKE ?)';
              const term = `%${search.trim()}%`;
              params.push(term, term, term);
            }

            query += ' ORDER BY lr.created_at DESC';
            const resources = db.prepare(query).all(...params);

            // If authenticated, attach user's progress for each resource
            let enriched = resources;
            if (user && requestedCourseId) {
              const progressRows = db.prepare(`
                SELECT resource_id, status, progress, last_accessed_at, completed_at
                FROM user_learning_progress
                WHERE user_id = ? AND course_id = ?
              `).all(user.id, requestedCourseId);

              const progressMap = new Map();
              for (const p of progressRows) {
                progressMap.set(p.resource_id, p);
              }

              enriched = resources.map((r) => ({
                ...r,
                userProgress: progressMap.get(r.id) || { status: 'not_started', progress: 0 },
              }));
            }

            return sendJson(res, 200, {
              success: true,
              courseId: requestedCourseId,
              total: enriched.length,
              resources: enriched,
            });
          }

          // GET /api/resources/:id (Authenticated only)
          const resourceIdMatch = pathname.match(/^\/api\/resources\/([a-zA-Z0-9_-]+)$/);
          if (resourceIdMatch && req.method === 'GET') {
            const user = requireAuth(req, res);
            if (!user) return;
            const id = resourceIdMatch[1];
            const resource = db.prepare(`
              SELECT lr.*, c.name as course_name, c.slug as course_slug,
                     cs.name as subject_name, ct.name as topic_name
              FROM learning_resources lr
              JOIN courses c ON lr.course_id = c.id
              LEFT JOIN course_subjects cs ON lr.subject_id = cs.id
              LEFT JOIN course_topics ct ON lr.topic_id = ct.id
              WHERE lr.id = ?
            `).get(id);

            if (!resource) {
              return sendJson(res, 404, { error: 'Learning resource not found.' });
            }

            // Enforce course-level access control
            if (user.learningProfile && resource.visibility !== 'all_courses') {
              const enrolledCourseIds = (user.enrollments || []).map((e) => e.course_id);
              if (!enrolledCourseIds.includes(resource.course_id)) {
                return sendJson(res, 403, {
                  error: 'Unauthorized access. This resource belongs to a course you are not enrolled in.',
                });
              }
            }

            // Record progress / last accessed
            if (user) {
              const now = new Date().toISOString();
              db.prepare(`
                INSERT INTO user_learning_progress (id, user_id, course_id, resource_id, status, progress, last_accessed_at)
                VALUES (?, ?, ?, ?, 'in_progress', 10, ?)
                ON CONFLICT(user_id, course_id, resource_id) DO UPDATE SET
                  last_accessed_at = excluded.last_accessed_at,
                  progress = MAX(user_learning_progress.progress, 10),
                  status = CASE WHEN user_learning_progress.status = 'completed' THEN 'completed' ELSE 'in_progress' END
              `).run('prog_' + crypto.randomUUID(), user.id, resource.course_id, resource.id, now);
            }

            return sendJson(res, 200, { success: true, resource });
          }

          // ───────────────────────────────────────────────────────────────────
          // 6. Course-Aware Search: /api/search (Authenticated only)
          // ───────────────────────────────────────────────────────────────────
          if (pathname === '/api/search' && req.method === 'GET') {
            const user = requireAuth(req, res);
            if (!user) return;
            const query = urlObj.searchParams.get('q') || '';

            if (!query.trim()) {
              return sendJson(res, 200, { success: true, results: [] });
            }

            const term = `%${query.trim()}%`;
            let sql = `
              SELECT lr.id, lr.title, lr.description, lr.resource_type, lr.difficulty,
                     lr.course_id, c.name as course_name, c.slug as course_slug,
                     cs.name as subject_name, ct.name as topic_name
              FROM learning_resources lr
              JOIN courses c ON lr.course_id = c.id
              LEFT JOIN course_subjects cs ON lr.subject_id = cs.id
              LEFT JOIN course_topics ct ON lr.topic_id = ct.id
              WHERE (lr.title LIKE ? OR lr.description LIKE ? OR lr.content LIKE ? OR cs.name LIKE ? OR ct.name LIKE ?)
            `;
            const params = [term, term, term, term, term];

            // If user is authenticated, restrict search STRICTLY to their active course + secondary enrollments
            if (user && user.learningProfile) {
              const activeCourseId = user.learningProfile.active_course_id || user.learningProfile.primary_course_id;
              sql += " AND (lr.course_id = ? OR lr.visibility = 'all_courses')";
              params.push(activeCourseId);
            }

            sql += ' LIMIT 15';
            const results = db.prepare(sql).all(...params);

            return sendJson(res, 200, {
              success: true,
              query,
              total: results.length,
              results,
            });
          }

          // ───────────────────────────────────────────────────────────────────
          // 7. Personalized Dashboard: /api/dashboard
          // ─────────────────────────────────────────────────────────────────
          if (pathname === '/api/dashboard' && req.method === 'GET') {
            const user = requireAuth(req, res);
            if (!user) return;

            if (!user.learningProfile || !user.learningProfile.onboardingCompleted) {
              return sendJson(res, 200, {
                needsOnboarding: true,
                message: 'Please complete your learning onboarding.',
              });
            }

            const activeCourseId = user.learningProfile.active_course_id || user.learningProfile.primary_course_id;

            // 1. Fetch active course
            const course = db.prepare('SELECT * FROM courses WHERE id = ?').get(activeCourseId);
            if (!course) {
              return sendJson(res, 404, { error: 'Active course not found.' });
            }

            // 2. Fetch subjects for active course
            const subjects = db.prepare(`
              SELECT * FROM course_subjects WHERE course_id = ? ORDER BY display_order ASC
            `).all(activeCourseId);

            // 3. Continue Learning item: Find most recently accessed resource or topic
            const continueLearningRow = db.prepare(`
              SELECT ulp.*, lr.title, lr.resource_type, lr.difficulty,
                     cs.name as subject_name, ct.name as topic_name
              FROM user_learning_progress ulp
              JOIN learning_resources lr ON ulp.resource_id = lr.id
              LEFT JOIN course_subjects cs ON lr.subject_id = cs.id
              LEFT JOIN course_topics ct ON lr.topic_id = ct.id
              WHERE ulp.user_id = ? AND ulp.course_id = ?
              ORDER BY ulp.last_accessed_at DESC
              LIMIT 1
            `).get(user.id, activeCourseId);

            // 4. Recommendations for active course (Filtered strictly to active course!)
            const userSubjects = user.learningProfile.selectedSubjects || [];
            let recQuery = `
              SELECT lr.*, cs.name as subject_name, ct.name as topic_name
              FROM learning_resources lr
              LEFT JOIN course_subjects cs ON lr.subject_id = cs.id
              LEFT JOIN course_topics ct ON lr.topic_id = ct.id
              WHERE lr.course_id = ?
            `;
            const recParams = [activeCourseId];

            if (userSubjects.length > 0) {
              const placeholders = userSubjects.map(() => '?').join(',');
              recQuery += ` AND (lr.subject_id IN (${placeholders}) OR lr.subject_id IS NULL)`;
              recParams.push(...userSubjects);
            }
            recQuery += ' ORDER BY lr.created_at DESC LIMIT 6';
            const recommendations = db.prepare(recQuery).all(...recParams);

            // 5. Study Planner tasks for active course
            const today = new Date().toISOString().split('T')[0];
            const tasks = db.prepare(`
              SELECT * FROM user_study_planner_tasks
              WHERE user_id = ? AND course_id = ?
              ORDER BY scheduled_date ASC, created_at ASC
              LIMIT 8
            `).all(user.id, activeCourseId);

            // 6. Real Progress Overview (NEVER fake stats!)
            const totalResourcesRow = db.prepare(`
              SELECT COUNT(*) as cnt FROM learning_resources WHERE course_id = ?
            `).get(activeCourseId);

            const completedResourcesRow = db.prepare(`
              SELECT COUNT(*) as cnt FROM user_learning_progress
              WHERE user_id = ? AND course_id = ? AND status = 'completed'
            `).get(user.id, activeCourseId);

            const inProgressResourcesRow = db.prepare(`
              SELECT COUNT(*) as cnt FROM user_learning_progress
              WHERE user_id = ? AND course_id = ? AND status = 'in_progress'
            `).get(user.id, activeCourseId);

            const totalTopicsRow = db.prepare(`
              SELECT COUNT(*) as cnt FROM course_topics WHERE course_id = ?
            `).get(activeCourseId);

            // Real mock test attempts
            const mockAttempts = db.prepare(`
              SELECT * FROM user_mock_attempts
              WHERE user_id = ? AND course_id = ?
              ORDER BY attempted_at DESC
            `).all(user.id, activeCourseId);

            const avgAccuracy = mockAttempts.length > 0
              ? (mockAttempts.reduce((acc, m) => acc + m.accuracy_percent, 0) / mockAttempts.length).toFixed(1)
              : null;

            // Study sessions count
            const totalStudySessions = db.prepare(`
              SELECT COUNT(DISTINCT DATE(last_accessed_at)) as cnt
              FROM user_learning_progress
              WHERE user_id = ? AND course_id = ?
            `).get(user.id, activeCourseId)?.cnt || 0;

            return sendJson(res, 200, {
              success: true,
              user: {
                id: user.id,
                fullName: user.full_name,
                email: user.email,
                role: user.role,
              },
              activeCourse: course,
              learningProfile: user.learningProfile,
              enrollments: user.enrollments,
              subjects,
              continueLearning: continueLearningRow || null,
              recommendations,
              planner: {
                today,
                tasks,
              },
              progressOverview: {
                totalTopics: totalTopicsRow?.cnt || 0,
                topicsCompleted: completedResourcesRow?.cnt || 0,
                topicsInProgress: inProgressResourcesRow?.cnt || 0,
                studySessions: totalStudySessions,
                mockTestsAttempted: mockAttempts.length,
                averageAccuracy: avgAccuracy ? `${avgAccuracy}%` : null,
                hasRealAttemptData: mockAttempts.length > 0,
              },
            });
          }

          // ───────────────────────────────────────────────────────────────────
          // 8. Learning Profile & Course Switching: /api/learning-profile/*
          // ───────────────────────────────────────────────────────────────────

          // GET /api/learning-profile
          if (pathname === '/api/learning-profile' && req.method === 'GET') {
            const user = requireAuth(req, res);
            if (!user) return;
            return sendJson(res, 200, {
              success: true,
              learningProfile: user.learningProfile,
              enrollments: user.enrollments,
            });
          }

          // PUT /api/learning-profile
          if (pathname === '/api/learning-profile' && req.method === 'PUT') {
            const user = requireAuth(req, res);
            if (!user) return;

            const body = await parseJsonBody(req);
            const { preparationLevel, targetYear, dailyStudyAvailability, learningPreferences, preferredLanguage } = body;
            const now = new Date().toISOString();

            db.prepare(`
              UPDATE user_learning_profiles
              SET preparation_level = COALESCE(?, preparation_level),
                  target_year = COALESCE(?, target_year),
                  daily_study_availability = COALESCE(?, daily_study_availability),
                  learning_preferences = COALESCE(?, learning_preferences),
                  preferred_language = COALESCE(?, preferred_language),
                  updated_at = ?
              WHERE user_id = ?
            `).run(
              preparationLevel,
              targetYear,
              dailyStudyAvailability,
              learningPreferences ? JSON.stringify(learningPreferences) : null,
              preferredLanguage,
              now,
              user.id
            );

            const updatedUser = getUserFromToken(extractToken(req));
            return sendJson(res, 200, {
              success: true,
              message: 'Learning preferences updated.',
              learningProfile: updatedUser.learningProfile,
            });
          }

          // POST /api/learning-profile/switch-course (Fast course switcher)
          if (pathname === '/api/learning-profile/switch-course' && req.method === 'POST') {
            const user = requireAuth(req, res);
            if (!user) return;

            const body = await parseJsonBody(req);
            const { courseId } = body;

            if (!courseId) return sendJson(res, 400, { error: 'Course ID is required.' });

            // Verify that the user is enrolled in this course
            const enrollment = db.prepare(`
              SELECT * FROM user_course_enrollments WHERE user_id = ? AND course_id = ?
            `).get(user.id, courseId);

            if (!enrollment) {
              return sendJson(res, 403, { error: 'You are not enrolled in this course.' });
            }

            const now = new Date().toISOString();
            db.prepare(`
              UPDATE user_learning_profiles
              SET active_course_id = ?, updated_at = ?
              WHERE user_id = ?
            `).run(courseId, now, user.id);

            const updatedUser = getUserFromToken(extractToken(req));
            return sendJson(res, 200, {
              success: true,
              activeCourseId: courseId,
              message: `Switched active course to ${enrollment.course_name || courseId}.`,
              user: updatedUser,
            });
          }

          // POST /api/learning-profile/change-primary (Change primary examination)
          if (pathname === '/api/learning-profile/change-primary' && req.method === 'POST') {
            const user = requireAuth(req, res);
            if (!user) return;

            const body = await parseJsonBody(req);
            const { newPrimaryCourseId } = body;

            if (!newPrimaryCourseId) return sendJson(res, 400, { error: 'New primary course ID is required.' });

            const course = db.prepare('SELECT id, name FROM courses WHERE id = ?').get(newPrimaryCourseId);
            if (!course) return sendJson(res, 404, { error: 'Course not found.' });

            const now = new Date().toISOString();

            // Set all existing enrollments to is_primary = 0, enrollment_type = 'secondary'
            db.prepare(`
              UPDATE user_course_enrollments
              SET is_primary = 0, enrollment_type = 'secondary'
              WHERE user_id = ?
            `).run(user.id);

            // Upsert new primary enrollment
            const enrollId = 'uce_' + crypto.randomUUID();
            db.prepare(`
              INSERT INTO user_course_enrollments (id, user_id, course_id, enrollment_type, is_primary, selected_subjects, status, enrolled_at)
              VALUES (?, ?, ?, 'primary', 1, '[]', 'active', ?)
              ON CONFLICT(user_id, course_id) DO UPDATE SET
                is_primary = 1,
                enrollment_type = 'primary',
                status = 'active'
            `).run(enrollId, user.id, newPrimaryCourseId, now);

            // Update user_learning_profiles
            db.prepare(`
              UPDATE user_learning_profiles
              SET primary_course_id = ?,
                  active_course_id = ?,
                  updated_at = ?
              WHERE user_id = ?
            `).run(newPrimaryCourseId, newPrimaryCourseId, now, user.id);

            const updatedUser = getUserFromToken(extractToken(req));
            return sendJson(res, 200, {
              success: true,
              message: `Primary examination successfully updated to ${course.name}.`,
              user: updatedUser,
            });
          }

          // POST /api/learning-profile/enroll (Add secondary course)
          if (pathname === '/api/learning-profile/enroll' && req.method === 'POST') {
            const user = requireAuth(req, res);
            if (!user) return;

            const body = await parseJsonBody(req);
            const { courseId, selectedSubjects = [] } = body;

            if (!courseId) return sendJson(res, 400, { error: 'Course ID is required.' });
            const course = db.prepare('SELECT id, name FROM courses WHERE id = ?').get(courseId);
            if (!course) return sendJson(res, 404, { error: 'Course not found.' });

            const now = new Date().toISOString();
            const enrollId = 'uce_' + crypto.randomUUID();

            db.prepare(`
              INSERT INTO user_course_enrollments (id, user_id, course_id, enrollment_type, is_primary, selected_subjects, status, enrolled_at)
              VALUES (?, ?, ?, 'secondary', 0, ?, 'active', ?)
              ON CONFLICT(user_id, course_id) DO UPDATE SET
                status = 'active',
                selected_subjects = excluded.selected_subjects
            `).run(enrollId, user.id, courseId, JSON.stringify(selectedSubjects), now);

            const updatedUser = getUserFromToken(extractToken(req));
            return sendJson(res, 200, {
              success: true,
              message: `Successfully enrolled in ${course.name} as a secondary course.`,
              enrollments: updatedUser.enrollments,
            });
          }

          // POST /api/learning-profile/unenroll (Remove secondary course)
          if (pathname === '/api/learning-profile/unenroll' && req.method === 'POST') {
            const user = requireAuth(req, res);
            if (!user) return;

            const body = await parseJsonBody(req);
            const { courseId } = body;

            if (!courseId) return sendJson(res, 400, { error: 'Course ID is required.' });

            if (user.learningProfile?.primary_course_id === courseId) {
              return sendJson(res, 400, {
                error: 'Cannot unenroll from your primary course. Please change your primary course first.',
              });
            }

            db.prepare(`
              DELETE FROM user_course_enrollments WHERE user_id = ? AND course_id = ?
            `).run(user.id, courseId);

            // If active course was this course, switch active course back to primary
            if (user.learningProfile?.active_course_id === courseId) {
              db.prepare(`
                UPDATE user_learning_profiles
                SET active_course_id = primary_course_id, updated_at = ?
                WHERE user_id = ?
              `).run(new Date().toISOString(), user.id);
            }

            const updatedUser = getUserFromToken(extractToken(req));
            return sendJson(res, 200, {
              success: true,
              message: 'Successfully removed course enrollment.',
              enrollments: updatedUser.enrollments,
            });
          }

          // POST /api/learning-profile/update-subjects
          if (pathname === '/api/learning-profile/update-subjects' && req.method === 'POST') {
            const user = requireAuth(req, res);
            if (!user) return;

            const body = await parseJsonBody(req);
            const { courseId, selectedSubjects = [] } = body;

            if (!courseId) return sendJson(res, 400, { error: 'Course ID is required.' });

            const subjectsJson = JSON.stringify(selectedSubjects);
            db.prepare(`
              UPDATE user_course_enrollments
              SET selected_subjects = ?
              WHERE user_id = ? AND course_id = ?
            `).run(subjectsJson, user.id, courseId);

            if (user.learningProfile?.primary_course_id === courseId) {
              db.prepare(`
                UPDATE user_learning_profiles
                SET selected_subjects = ?, updated_at = ?
                WHERE user_id = ?
              `).run(subjectsJson, new Date().toISOString(), user.id);
            }

            return sendJson(res, 200, { success: true, message: 'Subjects updated successfully.' });
          }

          // ───────────────────────────────────────────────────────────────────
          // 9. Learning Progress & Mock Tests: /api/progress & /api/mock
          // ───────────────────────────────────────────────────────────────────

          // GET /api/progress?courseId=...
          if (pathname === '/api/progress' && req.method === 'GET') {
            const user = requireAuth(req, res);
            if (!user) return;

            const courseId = url.searchParams.get('courseId') || '';
            const rows = courseId
              ? db.prepare(`
                  SELECT resource_id, status, progress, last_accessed_at, completed_at
                  FROM user_learning_progress
                  WHERE user_id = ? AND course_id = ?
                `).all(user.id, courseId)
              : db.prepare(`
                  SELECT course_id, resource_id, status, progress, last_accessed_at, completed_at
                  FROM user_learning_progress
                  WHERE user_id = ?
                `).all(user.id);

            return sendJson(res, 200, { success: true, progress: rows });
          }

          // POST /api/progress
          if (pathname === '/api/progress' && req.method === 'POST') {
            const user = requireAuth(req, res);
            if (!user) return;

            const body = await parseJsonBody(req);
            const { courseId, resourceId, status = 'in_progress', progress = 10 } = body;

            if (!courseId || !resourceId) {
              return sendJson(res, 400, { error: 'courseId and resourceId are required.' });
            }

            const enrolledIds = (user.enrollments || []).map((e) => e.course_id);
            if (courseId !== 'general' && !enrolledIds.includes(courseId)) {
              return sendJson(res, 403, { error: 'You are not enrolled in this course.' });
            }

            const now = new Date().toISOString();
            const completedAt = status === 'completed' ? now : null;

            db.prepare(`
              INSERT INTO user_learning_progress (
                id, user_id, course_id, resource_id, status, progress, last_accessed_at, completed_at
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
              ON CONFLICT(user_id, course_id, resource_id) DO UPDATE SET
                status = excluded.status,
                progress = excluded.progress,
                last_accessed_at = excluded.last_accessed_at,
                completed_at = COALESCE(excluded.completed_at, user_learning_progress.completed_at)
            `).run('prog_' + crypto.randomUUID(), user.id, courseId, resourceId, status, progress, now, completedAt);

            return sendJson(res, 200, { success: true, message: 'Progress saved.' });
          }

          // POST /api/planner/task
          if (pathname === '/api/planner/task' && req.method === 'POST') {
            const user = requireAuth(req, res);
            if (!user) return;

            const body = await parseJsonBody(req);
            const { taskId, courseId, title, scheduledDate, durationMinutes = 45, isCompleted } = body;

            if (taskId && isCompleted !== undefined) {
              // Toggle task status
              db.prepare(`
                UPDATE user_study_planner_tasks
                SET is_completed = ?
                WHERE id = ? AND user_id = ?
              `).run(isCompleted ? 1 : 0, taskId, user.id);
              return sendJson(res, 200, { success: true, message: 'Task updated.' });
            }

            if (!courseId || !title || !scheduledDate) {
              return sendJson(res, 400, { error: 'courseId, title, and scheduledDate are required.' });
            }

            const newId = 'task_' + crypto.randomUUID();
            db.prepare(`
              INSERT INTO user_study_planner_tasks (id, user_id, course_id, title, scheduled_date, duration_minutes, is_completed, created_at)
              VALUES (?, ?, ?, ?, ?, ?, 0, ?)
            `).run(newId, user.id, courseId, title, scheduledDate, durationMinutes, new Date().toISOString());

            return sendJson(res, 201, { success: true, id: newId, message: 'Task created.' });
          }

          // POST /api/mock/attempt
          if (pathname === '/api/mock/attempt' && req.method === 'POST') {
            const user = requireAuth(req, res);
            if (!user) return;

            const body = await parseJsonBody(req);
            const { courseId, mockTitle, score, totalMarks } = body;

            if (!courseId || !mockTitle || score === undefined || !totalMarks) {
              return sendJson(res, 400, { error: 'Missing mock attempt parameters.' });
            }

            const enrolledIds = (user.enrollments || []).map((e) => e.course_id);
            if (courseId !== 'general' && !enrolledIds.includes(courseId)) {
              return sendJson(res, 403, { error: 'You are not enrolled in this course.' });
            }

            const accuracy = parseFloat(((score / totalMarks) * 100).toFixed(1));
            const now = new Date().toISOString();
            const id = 'mock_' + crypto.randomUUID();

            db.prepare(`
              INSERT INTO user_mock_attempts (id, user_id, course_id, mock_title, score, total_marks, accuracy_percent, attempted_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `).run(id, user.id, courseId, mockTitle, score, totalMarks, accuracy, now);

            return sendJson(res, 201, { success: true, id, accuracy, message: 'Mock attempt recorded.' });
          }

          // ───────────────────────────────────────────────────────────────────
          // 10. Admin Content Management: /api/admin/*
          // ───────────────────────────────────────────────────────────────────

          // POST /api/admin/courses
          if (pathname === '/api/admin/courses' && req.method === 'POST') {
            const user = requireAuth(req, res);
            if (!user) return;
            if (user.role !== 'admin') {
              return sendJson(res, 403, { error: 'Admin privileges required.' });
            }

            const body = await parseJsonBody(req);
            const { name, slug, description, category, icon, difficultyLevel } = body;

            if (!name || !slug || !category) {
              return sendJson(res, 400, { error: 'Name, slug, and category are required.' });
            }

            const id = slug.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
            const now = new Date().toISOString();

            db.prepare(`
              INSERT INTO courses (id, name, slug, description, category, icon, difficulty_level, is_active, created_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)
            `).run(id, name, slug, description || '', category, icon || 'BookOpen', difficultyLevel || 'All Levels', now);

            return sendJson(res, 201, { success: true, id, message: 'Course created.' });
          }

          // POST /api/admin/resources
          if (pathname === '/api/admin/resources' && req.method === 'POST') {
            const user = requireAuth(req, res);
            if (!user) return;
            if (user.role !== 'admin') {
              return sendJson(res, 403, { error: 'Admin privileges required.' });
            }

            const body = await parseJsonBody(req);
            const {
              courseId,
              subjectId,
              topicId,
              title,
              description,
              resourceType,
              content,
              fileUrl,
              videoUrl,
              difficulty,
              visibility = 'course_only',
            } = body;

            // Strict validation: course association is mandatory!
            if (!courseId) {
              return sendJson(res, 400, { error: 'A valid courseId association is strictly required.' });
            }
            if (!title || !resourceType) {
              return sendJson(res, 400, { error: 'Title and resourceType are required.' });
            }

            // Only allow all_courses if explicitly requested for universal guides
            const validVisibility = visibility === 'all_courses' ? 'all_courses' : 'course_only';

            const id = 'res_' + crypto.randomUUID();
            const now = new Date().toISOString();

            db.prepare(`
              INSERT INTO learning_resources (
                id, course_id, subject_id, topic_id, title, description, resource_type,
                content, file_url, video_url, difficulty, visibility, created_at, updated_at
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `).run(
              id,
              courseId,
              subjectId || null,
              topicId || null,
              title,
              description || '',
              resourceType,
              content || '',
              fileUrl || null,
              videoUrl || null,
              difficulty || 'Intermediate',
              validVisibility,
              now,
              now
            );

            return sendJson(res, 201, { success: true, id, message: 'Resource created with strict course association.' });
          }

          // Unmatched /api/* route
          return sendJson(res, 404, { error: `Endpoint not found: ${pathname}` });
        } catch (error) {
          console.error('API Server Error:', error);
          return sendJson(res, 500, { error: 'Internal server error', details: error.message });
        }
  };
}

export function apiMiddleware() {
  const handler = createApiRequestHandler();

  return {
    name: 'technoedu-api-middleware',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}
