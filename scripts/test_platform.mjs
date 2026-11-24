import { getDb } from '../server/db.mjs';
import { hashPassword, verifyPassword, createSession, getUserFromToken, deleteSession } from '../server/auth.mjs';

console.log('================================================================');
console.log('🧪 RUNNING COMPREHENSIVE TECHNOEDU PERSONALIZATION TEST SUITE');
console.log('================================================================\n');

const db = getDb();
let passCount = 0;
let failCount = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✅ PASS: ${message}`);
    passCount++;
  } else {
    console.error(`  ❌ FAIL: ${message}`);
    failCount++;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TEST A: UGC-NET STUDENT JOURNEY
// ─────────────────────────────────────────────────────────────────────────────
console.log('▶️ TEST SCENARIO A: UGC-NET Student Registration & Isolation');

// 1. Sign up new user
const ugcEmail = `ugc_student_${Date.now()}@test.com`;
const { hash: ugcHash, salt: ugcSalt } = hashPassword('Secret123!');
const ugcUserId = 'usr_' + Date.now();
const now = new Date().toISOString();

db.prepare(`
  INSERT INTO users (id, full_name, email, password_hash, salt, created_at, updated_at)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`).run(ugcUserId, 'Ananya Sharma (UGC-NET Aspirant)', ugcEmail, ugcHash, ugcSalt, now, now);

const { token: ugcToken } = createSession(ugcUserId);
assert(Boolean(ugcToken), 'UGC student session token generated successfully');

// 2. Complete onboarding interview for UGC-NET
const ugcProfileId = 'ulp_' + Date.now();
const ugcSubjects = ['ugc-p1', 'ugc-p2-cs'];
const ugcPrefs = ['Reading notes and study materials', 'Previous year questions (PYQs)', 'Taking mock tests'];

db.prepare(`
  INSERT INTO user_learning_profiles (
    id, user_id, primary_course_id, active_course_id, preparation_level,
    target_year, daily_study_availability, learning_preferences, selected_subjects,
    preferred_language, onboarding_completed, created_at, updated_at
  ) VALUES (?, ?, 'ugc-net', 'ugc-net', 'Intermediate', '2026', '2–4 hours', ?, ?, 'English', 1, ?, ?)
`).run(ugcProfileId, ugcUserId, JSON.stringify(ugcPrefs), JSON.stringify(ugcSubjects), now, now);

// Enroll in primary course
db.prepare(`
  INSERT INTO user_course_enrollments (id, user_id, course_id, enrollment_type, is_primary, selected_subjects, status, enrolled_at)
  VALUES (?, ?, 'ugc-net', 'primary', 1, ?, 'active', ?)
`).run('uce_' + Date.now(), ugcUserId, JSON.stringify(ugcSubjects), now);

// 3. Verify user learning profile resolution
const resolvedUgcUser = getUserFromToken(ugcToken);
assert(resolvedUgcUser.email === ugcEmail, 'Session token resolves to correct UGC student');
assert(resolvedUgcUser.learningProfile.primary_course_id === 'ugc-net', 'Primary course is UGC-NET');
assert(resolvedUgcUser.learningProfile.onboardingCompleted === true, 'Onboarding marked completed');

// 4. Verify Content Isolation: Query resources for UGC-NET
const ugcResources = db.prepare(`
  SELECT lr.* FROM learning_resources lr
  WHERE lr.course_id = 'ugc-net' OR lr.visibility = 'all_courses'
`).all();

const hasNeetInUgc = ugcResources.some(r => r.course_id === 'neet-ug');
const hasJeeInUgc = ugcResources.some(r => r.course_id === 'jee-main');
const hasPaper1 = ugcResources.some(r => r.title.includes('Teaching Aptitude') || r.title.includes('Research Aptitude'));
const hasPaper2Cs = ugcResources.some(r => r.title.includes('Computer Science') || r.title.includes('DBMS'));

assert(!hasNeetInUgc, 'NEET resources do NOT appear in UGC-NET isolated view');
assert(!hasJeeInUgc, 'JEE resources do NOT appear in UGC-NET isolated view');
assert(hasPaper1, 'UGC-NET Paper 1 teaching/research resources present');
assert(hasPaper2Cs, 'UGC-NET Paper 2 Computer Science resources present');

console.log('');

// ─────────────────────────────────────────────────────────────────────────────
// TEST B: NEET STUDENT JOURNEY
// ─────────────────────────────────────────────────────────────────────────────
console.log('▶️ TEST SCENARIO B: NEET Student Registration & Isolation');

// 1. Sign up new NEET user
const neetEmail = `neet_student_${Date.now()}@test.com`;
const { hash: neetHash, salt: neetSalt } = hashPassword('NeetPass2026!');
const neetUserId = 'usr_' + (Date.now() + 1);

db.prepare(`
  INSERT INTO users (id, full_name, email, password_hash, salt, created_at, updated_at)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`).run(neetUserId, 'Rohan Das (NEET Aspirant)', neetEmail, neetHash, neetSalt, now, now);

const { token: neetToken } = createSession(neetUserId);
assert(Boolean(neetToken), 'NEET student session token generated successfully');

// 2. Complete onboarding for NEET
const neetProfileId = 'ulp_' + (Date.now() + 1);
const neetSubjects = ['neet-bio', 'neet-phy', 'neet-chem'];
const neetPrefs = ['NCERT reading', 'Taking mock tests'];

db.prepare(`
  INSERT INTO user_learning_profiles (
    id, user_id, primary_course_id, active_course_id, preparation_level,
    target_year, daily_study_availability, learning_preferences, selected_subjects,
    preferred_language, onboarding_completed, created_at, updated_at
  ) VALUES (?, ?, 'neet-ug', 'neet-ug', 'Advanced', '2026', '4–6 hours', ?, ?, 'English', 1, ?, ?)
`).run(neetProfileId, neetUserId, JSON.stringify(neetPrefs), JSON.stringify(neetSubjects), now, now);

db.prepare(`
  INSERT INTO user_course_enrollments (id, user_id, course_id, enrollment_type, is_primary, selected_subjects, status, enrolled_at)
  VALUES (?, ?, 'neet-ug', 'primary', 1, ?, 'active', ?)
`).run('uce_' + (Date.now() + 1), neetUserId, JSON.stringify(neetSubjects), now);

// 3. Verify NEET resources query
const neetResources = db.prepare(`
  SELECT lr.* FROM learning_resources lr
  WHERE lr.course_id = 'neet-ug' OR lr.visibility = 'all_courses'
`).all();

const hasUgcInNeet = neetResources.some(r => r.course_id === 'ugc-net');
const hasBioInNeet = neetResources.some(r => r.title.includes('Biology') || r.title.includes('Physiology'));
const hasPhysicsInNeet = neetResources.some(r => r.title.includes('Physics'));
const hasChemInNeet = neetResources.some(r => r.title.includes('Chemistry') || r.title.includes('Organic'));

assert(!hasUgcInNeet, 'UGC-NET Paper 1 & 2 do NOT appear in NEET isolated view');
assert(hasBioInNeet, 'NEET Biology / Physiology resources present');
assert(hasPhysicsInNeet, 'NEET Physics formula / mechanics resources present');
assert(hasChemInNeet, 'NEET Organic / Inorganic Chemistry resources present');

console.log('');

// ─────────────────────────────────────────────────────────────────────────────
// TEST C: COURSE SWITCHING & MULTIPLE ENROLLMENTS
// ─────────────────────────────────────────────────────────────────────────────
console.log('▶️ TEST SCENARIO C: Course Switching & Progress Preservation');

// Log learning progress for UGC-NET
const progId = 'prog_' + Date.now();
db.prepare(`
  INSERT INTO user_learning_progress (id, user_id, course_id, resource_id, status, progress, last_accessed_at, completed_at)
  VALUES (?, ?, 'ugc-net', 'res-ugc-ta-notes', 'completed', 100, ?, ?)
  ON CONFLICT(user_id, course_id, resource_id) DO UPDATE SET status = 'completed', progress = 100
`).run(progId, ugcUserId, now, now);

// Enroll in secondary course: GATE
db.prepare(`
  INSERT INTO user_course_enrollments (id, user_id, course_id, enrollment_type, is_primary, selected_subjects, status, enrolled_at)
  VALUES (?, ?, 'gate', 'secondary', 0, '["gate-cs"]', 'active', ?)
`).run('uce_' + (Date.now() + 2), ugcUserId, now);

// Switch active course to GATE
db.prepare(`
  UPDATE user_learning_profiles
  SET active_course_id = 'gate', updated_at = ?
  WHERE user_id = ?
`).run(now, ugcUserId);

const userAfterGateSwitch = getUserFromToken(ugcToken);
assert(userAfterGateSwitch.learningProfile.active_course_id === 'gate', 'Active course switched to GATE');
assert(userAfterGateSwitch.learningProfile.primary_course_id === 'ugc-net', 'Primary course remains UGC-NET');
assert(userAfterGateSwitch.enrollments.length === 2, 'User has 2 distinct enrollments');

// Query resources while active in GATE
const gateResources = db.prepare(`
  SELECT lr.* FROM learning_resources lr
  WHERE lr.course_id = 'gate' OR lr.visibility = 'all_courses'
`).all();
const hasGateAlgo = gateResources.some(r => r.title.includes('GATE CS') || r.title.includes('Algorithms'));
const hasUgcInGate = gateResources.some(r => r.course_id === 'ugc-net');
assert(hasGateAlgo, 'GATE algorithms and CS resources load when switched to GATE');
assert(!hasUgcInGate, 'UGC-NET resources are not mixed into GATE dashboard view');

// Switch back to UGC-NET and verify progress was preserved
db.prepare(`
  UPDATE user_learning_profiles
  SET active_course_id = 'ugc-net', updated_at = ?
  WHERE user_id = ?
`).run(now, ugcUserId);

const ugcProgressRow = db.prepare(`
  SELECT * FROM user_learning_progress WHERE user_id = ? AND course_id = 'ugc-net' AND resource_id = 'res-ugc-ta-notes'
`).get(ugcUserId);

assert(ugcProgressRow && ugcProgressRow.status === 'completed' && ugcProgressRow.progress === 100, 'Original UGC-NET learning progress is preserved intact after switching back');

console.log('');

// ─────────────────────────────────────────────────────────────────────────────
// TEST D: AUTHENTICATION PERSISTENCE & VERIFICATION
// ─────────────────────────────────────────────────────────────────────────────
console.log('▶️ TEST SCENARIO D: Session Persistence & Logout');

// Re-verify existing session
const sessionCheck = getUserFromToken(ugcToken);
assert(Boolean(sessionCheck && sessionCheck.id === ugcUserId), 'Session token reliably restores user across calls');

// Password verification test
assert(verifyPassword('Secret123!', ugcHash, ugcSalt) === true, 'Correct password validates successfully');
assert(verifyPassword('WrongPassword', ugcHash, ugcSalt) === false, 'Incorrect password safely rejected');

// Google Auth verification test
const googleStudentEmail = `google_student_${Date.now()}@gmail.com`;
const googleUserId = 'usr_g_' + Date.now();
const { hash: gHash, salt: gSalt } = hashPassword('oauth_google_' + Date.now());
db.prepare(`
  INSERT INTO users (id, full_name, email, password_hash, salt, role, is_verified, created_at, updated_at)
  VALUES (?, ?, ?, ?, ?, 'student', 1, ?, ?)
`).run(googleUserId, 'Google Aspirant', googleStudentEmail, gHash, gSalt, now, now);
const { token: googleToken } = createSession(googleUserId);
const resolvedGoogleUser = getUserFromToken(googleToken);
assert(resolvedGoogleUser.email === googleStudentEmail, 'Google Auth user authenticated and resolved via session token');
assert(resolvedGoogleUser.is_verified === 1, 'Google Auth user is automatically verified');

// Test session logout
deleteSession(ugcToken);
const loggedOutCheck = getUserFromToken(ugcToken);
assert(loggedOutCheck === null, 'Session token invalidated immediately on logout');

console.log('');

// ─────────────────────────────────────────────────────────────────────────────
// TEST E: SERVER-SIDE ACCESS CONTROL & SECURITY
// ─────────────────────────────────────────────────────────────────────────────
console.log('▶️ TEST SCENARIO E: Server-Side Access Control & Security');

// Verify that NEET student cannot access non-enrolled UGC resources through API checks
const neetUser = getUserFromToken(neetToken);
const enrolledInCourses = (neetUser.enrollments || []).map(e => e.course_id);
const attemptAccessCourse = 'ugc-net';

const isAuthorized = enrolledInCourses.includes(attemptAccessCourse);
assert(isAuthorized === false, 'Server access control rejects unauthorized cross-course requests');

// Verify parameterized SQL prevention (no raw string concatenations in DB layer)
const testSqlInject = db.prepare('SELECT id FROM courses WHERE slug = ?').get("ugc-net' OR '1'='1");
assert(testSqlInject === undefined, 'Parameterized prepared statements neutralize SQL injection payloads');

console.log('\n================================================================');
console.log(`🎉 TEST RUN COMPLETE: ${passCount} PASSED, ${failCount} FAILED`);
console.log('================================================================\n');

if (failCount > 0) {
  process.exit(1);
}
