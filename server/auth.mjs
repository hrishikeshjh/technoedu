import crypto from 'node:crypto';
import { getDb } from './db.mjs';

export function hashPassword(password, existingSalt = null) {
  const salt = existingSalt || crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

export function verifyPassword(password, storedHash, salt) {
  const { hash } = hashPassword(password, salt);
  return hash === storedHash;
}

export function createSession(userId) {
  const db = getDb();
  const token = crypto.randomBytes(32).toString('hex');
  const id = 'sess_' + crypto.randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days

  db.prepare(`
    INSERT INTO sessions (id, token, user_id, expires_at, created_at)
    VALUES (?, ?, ?, ?, ?)
  `).run(id, token, userId, expiresAt, now.toISOString());

  return { token, expiresAt };
}

export function deleteSession(token) {
  if (!token) return;
  const db = getDb();
  db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
}

export function extractToken(req) {
  const authHeader = req.headers['authorization'] || req.headers['x-auth-token'] || '';
  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7).trim();
  }
  if (typeof authHeader === 'string' && authHeader) {
    return authHeader.trim();
  }
  // Optional: check cookie
  const cookieHeader = req.headers['cookie'] || '';
  const match = cookieHeader.match(/technoedu_token=([a-zA-Z0-9]+)/);
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

  // Also attach learning profile and enrollments
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
    ...user,
    learningProfile: learningProfile ? {
      ...learningProfile,
      learningPreferences: JSON.parse(learningProfile.learning_preferences || '[]'),
      selectedSubjects: JSON.parse(learningProfile.selected_subjects || '[]'),
      onboardingCompleted: Boolean(learningProfile.onboarding_completed)
    } : null,
    enrollments: enrollments.map(e => ({
      ...e,
      selectedSubjects: JSON.parse(e.selected_subjects || '[]'),
      isPrimary: Boolean(e.is_primary)
    }))
  };
}

export function requireAuth(req, res) {
  const token = extractToken(req);
  if (!token) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Authentication required. Missing session token.' }));
    return null;
  }

  const user = getUserFromToken(token);
  if (!user) {
    res.statusCode = 401;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Session expired or invalid. Please sign in again.' }));
    return null;
  }

  return user;
}
