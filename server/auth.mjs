import crypto from 'node:crypto';
import { getDb } from './db.mjs';

const SESSION_COOKIE_NAME = 'technoedu_token';

export function hashPassword(password, existingSalt = null) {
  const salt = existingSalt || crypto.randomBytes(16).toString('hex');
  const derived = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return { hash: `pbkdf2_100k$${derived}`, salt };
}

export function verifyPassword(password, storedHash, salt) {
  if (!password || !storedHash || !salt) return false;

  let expectedHex = storedHash;
  let iterations = 10000;

  if (storedHash.startsWith('pbkdf2_100k$')) {
    expectedHex = storedHash.slice('pbkdf2_100k$'.length);
    iterations = 100000;
  }

  const derivedHex = crypto.pbkdf2Sync(password, salt, iterations, 64, 'sha512').toString('hex');
  const a = Buffer.from(derivedHex, 'hex');
  const b = Buffer.from(expectedHex, 'hex');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function hashToken(rawToken) {
  return crypto.createHash('sha256').update(String(rawToken)).digest('hex');
}

export function createSession(userId, ttlDays = 30) {
  const db = getDb();
  const token = crypto.randomBytes(32).toString('hex');
  const id = 'sess_' + crypto.randomUUID();
  const now = new Date();
  const safeDays = Math.max(1, Math.min(365, Number(ttlDays) || 30));
  const expiresAt = new Date(now.getTime() + safeDays * 24 * 60 * 60 * 1000).toISOString();

  db.prepare(`
    INSERT INTO sessions (id, token, user_id, expires_at, created_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(id, token, userId, expiresAt, now.toISOString());

  return { token, expiresAt, maxAgeSeconds: safeDays * 24 * 60 * 60 };
}

export function refreshSession(token, ttlDays = 30) {
  if (!token) return null;
  const db = getDb();
  const now = new Date();
  const session = db.prepare(`
    SELECT id, user_id, expires_at FROM sessions
    WHERE token = ? AND expires_at > ?
  `).get(token, now.toISOString());

  if (!session) return null;

  const safeDays = Math.max(1, Math.min(365, Number(ttlDays) || 30));
  const expiresAt = new Date(now.getTime() + safeDays * 24 * 60 * 60 * 1000).toISOString();
  db.prepare('UPDATE sessions SET expires_at = ? WHERE id = ?').run(expiresAt, session.id);

  return { token, expiresAt, maxAgeSeconds: safeDays * 24 * 60 * 60 };
}

export function deleteSession(token) {
  if (!token) return;
  const db = getDb();
  db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
}

export function deleteAllUserSessions(userId) {
  if (!userId) return;
  const db = getDb();
  db.prepare('DELETE FROM sessions WHERE user_id = ?').run(userId);
}

function isSecureRequest(req) {
  const proto = req?.headers?.['x-forwarded-proto'];
  if (typeof proto === 'string' && proto.split(',')[0].trim() === 'https') {
    return true;
  }
  return Boolean(req?.socket?.encrypted);
}

export function setSessionCookie(res, token, maxAgeSeconds, req) {
  const parts = [
    `${SESSION_COOKIE_NAME}=${token}`,
    'HttpOnly',
    'Path=/',
    'SameSite=Lax',
    `Max-Age=${Math.max(0, Math.floor(maxAgeSeconds))}`,
  ];
  if (isSecureRequest(req)) {
    parts.push('Secure');
  }
  res.setHeader('Set-Cookie', parts.join('; '));
}

export function clearSessionCookie(res, req) {
  const parts = [
    `${SESSION_COOKIE_NAME}=`,
    'HttpOnly',
    'Path=/',
    'SameSite=Lax',
    'Max-Age=0',
  ];
  if (isSecureRequest(req)) {
    parts.push('Secure');
  }
  res.setHeader('Set-Cookie', parts.join('; '));
}

export function extractToken(req) {
  const authHeader = req.headers['authorization'] || req.headers['x-auth-token'] || '';
  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    const t = authHeader.slice(7).trim();
    if (t) return t;
  } else if (typeof authHeader === 'string' && authHeader.trim()) {
    return authHeader.trim();
  }

  const cookieHeader = req.headers['cookie'] || '';
  const match = cookieHeader.match(/(?:^|;\s*)technoedu_token=([a-zA-Z0-9]+)/);
  if (match) {
    return match[1];
  }
  return null;
}

export function getUserFromToken(token) {
  if (!token) return null;
  const db = getDb();
  const now = new Date().toISOString();

  const session = db.prepare(`
    SELECT user_id, expires_at FROM sessions
    WHERE token = ? AND expires_at > ?
  `).get(token, now);

  if (!session) return null;

  const user = db.prepare(`
    SELECT id, full_name, email, date_of_birth, age, education_level,
           current_class_or_semester, institution, country, preferred_language,
           role, is_verified, created_at, updated_at
    FROM users
    WHERE id = ?
  `).get(session.user_id);

  if (!user) return null;

  const learningProfile = db.prepare(`
    SELECT * FROM user_learning_profiles WHERE user_id = ?
  `).get(user.id);

  const enrollments = db.prepare(`
    SELECT uce.*, c.name as course_name, c.slug as course_slug, c.category as course_category, c.icon as course_icon
    FROM user_course_enrollments uce
    JOIN courses c ON uce.course_id = c.id
    WHERE uce.user_id = ?
    ORDER BY uce.is_primary DESC, uce.enrolled_at ASC
  `).all(user.id);

  return {
    id: user.id,
    fullName: user.full_name,
    full_name: user.full_name,
    email: user.email,
    dateOfBirth: user.date_of_birth,
    age: user.age,
    educationLevel: user.education_level,
    currentClassOrSemester: user.current_class_or_semester,
    institution: user.institution,
    country: user.country,
    preferredLanguage: user.preferred_language,
    role: user.role,
    isVerified: Boolean(user.is_verified),
    is_verified: user.is_verified,
    createdAt: user.created_at,
    updatedAt: user.updated_at,
    learningProfile: learningProfile
      ? {
          id: learningProfile.id,
          userId: learningProfile.user_id,
          primaryCourseId: learningProfile.primary_course_id,
          activeCourseId: learningProfile.active_course_id,
          primary_course_id: learningProfile.primary_course_id,
          active_course_id: learningProfile.active_course_id,
          preparationLevel: learningProfile.preparation_level,
          targetYear: learningProfile.target_year,
          dailyStudyAvailability: learningProfile.daily_study_availability,
          learningPreferences: JSON.parse(learningProfile.learning_preferences || '[]'),
          selectedSubjects: JSON.parse(learningProfile.selected_subjects || '[]'),
          preferredLanguage: learningProfile.preferred_language,
          onboardingCompleted: Boolean(learningProfile.onboarding_completed),
          createdAt: learningProfile.created_at,
          updatedAt: learningProfile.updated_at,
        }
      : null,
    enrollments: enrollments.map((e) => ({
      id: e.id,
      userId: e.user_id,
      courseId: e.course_id,
      course_id: e.course_id,
      courseName: e.course_name,
      courseSlug: e.course_slug,
      courseCategory: e.course_category,
      courseIcon: e.course_icon,
      enrollmentType: e.enrollment_type,
      isPrimary: Boolean(e.is_primary),
      selectedSubjects: JSON.parse(e.selected_subjects || '[]'),
      status: e.status,
      enrolledAt: e.enrolled_at,
    })),
  };
}

export function requireAuth(req, res) {
  const token = extractToken(req);
  if (!token) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify({ error: 'Authentication required. Please sign in.' }));
    return null;
  }

  const user = getUserFromToken(token);
  if (!user) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    res.end(JSON.stringify({ error: 'Session expired or invalid. Please sign in again.', code: 'SESSION_EXPIRED' }));
    return null;
  }

  return user;
}
