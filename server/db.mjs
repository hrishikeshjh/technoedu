import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DB_PATH = path.resolve(ROOT_DIR, 'data/technoedu.db');

// Ensure data directory exists
fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

let dbInstance = null;

export function getDb() {
  if (!dbInstance) {
    dbInstance = new DatabaseSync(DB_PATH);
    initDatabase(dbInstance);
  }
  return dbInstance;
}

export function initDatabase(db) {
  // Enable foreign keys
  db.exec('PRAGMA foreign_keys = ON;');

  // 1. Users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      salt TEXT NOT NULL,
      date_of_birth TEXT,
      age INTEGER,
      education_level TEXT,
      current_class_or_semester TEXT,
      institution TEXT,
      country TEXT DEFAULT 'India',
      preferred_language TEXT DEFAULT 'English',
      role TEXT DEFAULT 'student',
      is_verified INTEGER DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  // 2. Sessions table
  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      token TEXT UNIQUE NOT NULL,
      user_id TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
    CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
  `);

  // 3. Courses table
  db.exec(`
    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      category TEXT NOT NULL,
      icon TEXT,
      banner_image TEXT,
      difficulty_level TEXT DEFAULT 'All Levels',
      is_active INTEGER DEFAULT 1,
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_courses_slug ON courses(slug);
  `);

  // 4. User Learning Profiles
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_learning_profiles (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      primary_course_id TEXT NOT NULL,
      active_course_id TEXT NOT NULL,
      preparation_level TEXT DEFAULT 'Intermediate',
      target_year TEXT,
      daily_study_availability TEXT,
      learning_preferences TEXT DEFAULT '[]',
      selected_subjects TEXT DEFAULT '[]',
      preferred_language TEXT DEFAULT 'English',
      onboarding_completed INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (primary_course_id) REFERENCES courses(id),
      FOREIGN KEY (active_course_id) REFERENCES courses(id)
    );
    CREATE INDEX IF NOT EXISTS idx_ulp_user_id ON user_learning_profiles(user_id);
  `);

  // 5. User Course Enrollments (Supports primary + secondary enrollments)
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_course_enrollments (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      course_id TEXT NOT NULL,
      enrollment_type TEXT DEFAULT 'primary',
      is_primary INTEGER DEFAULT 1,
      selected_subjects TEXT DEFAULT '[]',
      status TEXT DEFAULT 'active',
      enrolled_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
      UNIQUE(user_id, course_id)
    );
    CREATE INDEX IF NOT EXISTS idx_uce_user_course ON user_course_enrollments(user_id, course_id);
  `);

  // 6. Course Subjects
  db.exec(`
    CREATE TABLE IF NOT EXISTS course_subjects (
      id TEXT PRIMARY KEY,
      course_id TEXT NOT NULL,
      name TEXT NOT NULL,
      slug TEXT NOT NULL,
      description TEXT,
      display_order INTEGER DEFAULT 0,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
      UNIQUE(course_id, slug)
    );
    CREATE INDEX IF NOT EXISTS idx_cs_course_id ON course_subjects(course_id);
  `);

  // 7. Course Topics
  db.exec(`
    CREATE TABLE IF NOT EXISTS course_topics (
      id TEXT PRIMARY KEY,
      subject_id TEXT NOT NULL,
      course_id TEXT NOT NULL,
      name TEXT NOT NULL,
      slug TEXT NOT NULL,
      description TEXT,
      display_order INTEGER DEFAULT 0,
      FOREIGN KEY (subject_id) REFERENCES course_subjects(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
      UNIQUE(subject_id, slug)
    );
    CREATE INDEX IF NOT EXISTS idx_ct_subject_id ON course_topics(subject_id);
    CREATE INDEX IF NOT EXISTS idx_ct_course_id ON course_topics(course_id);
  `);

  // 8. Learning Resources (Strictly associated with course_id)
  db.exec(`
    CREATE TABLE IF NOT EXISTS learning_resources (
      id TEXT PRIMARY KEY,
      course_id TEXT NOT NULL,
      subject_id TEXT,
      topic_id TEXT,
      title TEXT NOT NULL,
      description TEXT,
      resource_type TEXT NOT NULL,
      content TEXT,
      file_url TEXT,
      video_url TEXT,
      difficulty TEXT DEFAULT 'Intermediate',
      visibility TEXT DEFAULT 'course_only',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
      FOREIGN KEY (subject_id) REFERENCES course_subjects(id) ON DELETE SET NULL,
      FOREIGN KEY (topic_id) REFERENCES course_topics(id) ON DELETE SET NULL
    );
    CREATE INDEX IF NOT EXISTS idx_lr_course_id ON learning_resources(course_id);
    CREATE INDEX IF NOT EXISTS idx_lr_subject_id ON learning_resources(subject_id);
    CREATE INDEX IF NOT EXISTS idx_lr_type ON learning_resources(resource_type);
  `);

  // 9. User Learning Progress (Per-course progress tracking)
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_learning_progress (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      course_id TEXT NOT NULL,
      resource_id TEXT NOT NULL,
      status TEXT DEFAULT 'not_started',
      progress INTEGER DEFAULT 0,
      last_accessed_at TEXT,
      completed_at TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
      UNIQUE(user_id, course_id, resource_id)
    );
    CREATE INDEX IF NOT EXISTS idx_ulp_user_course ON user_learning_progress(user_id, course_id);
  `);

  // 10. User Preferences
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_preferences (
      id TEXT PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      dashboard_preferences TEXT DEFAULT '{}',
      notification_preferences TEXT DEFAULT '{}',
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // 11. Study Planner Tasks
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_study_planner_tasks (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      course_id TEXT NOT NULL,
      title TEXT NOT NULL,
      scheduled_date TEXT NOT NULL,
      duration_minutes INTEGER DEFAULT 45,
      is_completed INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_tasks_user_course ON user_study_planner_tasks(user_id, course_id);
  `);

  // 12. Mock Attempts
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_mock_attempts (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      course_id TEXT NOT NULL,
      mock_title TEXT NOT NULL,
      score INTEGER NOT NULL,
      total_marks INTEGER NOT NULL,
      accuracy_percent REAL NOT NULL,
      attempted_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_mocks_user_course ON user_mock_attempts(user_id, course_id);
  `);

  seedInitialData(db);
}

function seedInitialData(db) {
  const courseCountRow = db.prepare('SELECT COUNT(*) as cnt FROM courses').get();
  if (courseCountRow && courseCountRow.cnt > 0) {
    return; // Already seeded
  }

  const now = new Date().toISOString();

  // ── 1. Seed Courses ──────────────────────────────────────────────────────────
  const courses = [
    {
      id: 'ugc-net',
      name: 'UGC-NET & JRF',
      slug: 'ugc-net',
      description: 'National Eligibility Test & Junior Research Fellowship for Assistant Professor and Ph.D. admissions across Indian Universities.',
      category: 'Competitive examinations',
      icon: 'Award',
      banner_image: '/materials/ugc-banner.jpg',
      difficulty_level: 'Advanced',
    },
    {
      id: 'neet-ug',
      name: 'NEET UG',
      slug: 'neet-ug',
      description: 'National Eligibility cum Entrance Test for admission to undergraduate medical programs (MBBS, BDS, AYUSH) in India.',
      category: 'Competitive examinations',
      icon: 'Stethoscope',
      banner_image: '/materials/neet-banner.jpg',
      difficulty_level: 'High Competition',
    },
    {
      id: 'jee-main',
      name: 'JEE Main & Advanced',
      slug: 'jee-main',
      description: 'Joint Entrance Examination for undergraduate engineering admissions into prestigious IITs, NITs, and IIITs.',
      category: 'Competitive examinations',
      icon: 'Cpu',
      banner_image: '/materials/jee-banner.jpg',
      difficulty_level: 'Advanced',
    },
    {
      id: 'gate',
      name: 'GATE (Engineering)',
      slug: 'gate',
      description: 'Graduate Aptitude Test in Engineering for M.Tech admissions and prestigious Public Sector Undertaking (PSU) recruitment.',
      category: 'Competitive examinations',
      icon: 'Binary',
      banner_image: '/materials/gate-banner.jpg',
      difficulty_level: 'Graduate Level',
    },
    {
      id: 'upsc-cse',
      name: 'UPSC Civil Services (CSE)',
      slug: 'upsc-cse',
      description: 'Union Public Service Commission examination for recruitment to IAS, IPS, IFS, and Central Group A Services.',
      category: 'Competitive examinations',
      icon: 'Landmark',
      banner_image: '/materials/upsc-banner.jpg',
      difficulty_level: 'All India Elite',
    },
    {
      id: 'cuet',
      name: 'CUET UG/PG',
      slug: 'cuet',
      description: 'Common University Entrance Test for undergraduate and postgraduate admissions to Central Universities across India.',
      category: 'Competitive examinations',
      icon: 'GraduationCap',
      banner_image: '/materials/cuet-banner.jpg',
      difficulty_level: 'National Level',
    },
    {
      id: 'comp-sci',
      name: 'Computer Science & AI',
      slug: 'comp-sci',
      description: 'Comprehensive academic curriculum covering Data Structures, Algorithms, Artificial Intelligence, and Modern Software Engineering.',
      category: 'Academic learning',
      icon: 'Code2',
      banner_image: '/materials/cs-banner.jpg',
      difficulty_level: 'All Levels',
    },
    {
      id: 'general',
      name: 'General Student Guidance',
      slug: 'general',
      description: 'Universal learning methodologies, time blocking, and psychological peak performance protocols.',
      category: 'Academic learning',
      icon: 'BookOpen',
      banner_image: '/materials/general-banner.jpg',
      difficulty_level: 'All Levels',
    },
  ];

  const insertCourse = db.prepare(`
    INSERT INTO courses (id, name, slug, description, category, icon, banner_image, difficulty_level, is_active, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?)
  `);

  for (const c of courses) {
    insertCourse.run(c.id, c.name, c.slug, c.description, c.category, c.icon, c.banner_image, c.difficulty_level, now);
  }

  // ── 2. Seed Subjects ────────────────────────────────────────────────────────
  const subjects = [
    // UGC-NET Subjects
    { id: 'ugc-p1', course_id: 'ugc-net', name: 'Paper 1: Teaching & Research Aptitude', slug: 'paper-1', description: 'Mandatory general paper covering 10 foundational aptitude domains.', display_order: 1 },
    { id: 'ugc-p2-cs', course_id: 'ugc-net', name: 'Paper 2: Computer Science & Applications', slug: 'computer-science', description: 'Subject code 87: 10 specialized units in core computer science disciplines.', display_order: 2 },
    { id: 'ugc-p2-comm', course_id: 'ugc-net', name: 'Paper 2: Commerce', slug: 'commerce', description: 'Subject code 08: Business environment, finance, accounting, and marketing.', display_order: 3 },
    { id: 'ugc-p2-mgmt', course_id: 'ugc-net', name: 'Paper 2: Management', slug: 'management', description: 'Subject code 17: Strategic management, organizational behavior, and corporate finance.', display_order: 4 },
    { id: 'ugc-p2-edu', course_id: 'ugc-net', name: 'Paper 2: Education', slug: 'education', description: 'Subject code 09: Philosophical foundations, curriculum studies, and educational research.', display_order: 5 },

    // NEET Subjects
    { id: 'neet-bio', course_id: 'neet-ug', name: 'Biology (Botany & Zoology)', slug: 'biology', description: 'Comprises 50% of the NEET examination weightage based on NCERT Classes 11 & 12.', display_order: 1 },
    { id: 'neet-phy', course_id: 'neet-ug', name: 'Physics', slug: 'physics', description: 'Mechanics, Electrodynamics, Modern Physics, Thermodynamics, and Optics.', display_order: 2 },
    { id: 'neet-chem', course_id: 'neet-ug', name: 'Chemistry', slug: 'chemistry', description: 'Physical Chemistry, Organic Mechanisms, and Inorganic NCERT Foundations.', display_order: 3 },

    // JEE Subjects
    { id: 'jee-math', course_id: 'jee-main', name: 'Mathematics', slug: 'mathematics', description: 'Calculus, Vectors & 3D Geometry, Algebra, Coordinate Geometry, and Trigonometry.', display_order: 1 },
    { id: 'jee-phy', course_id: 'jee-main', name: 'Physics', slug: 'physics', description: 'Advanced problem solving across classical mechanics, electromagnetism, and modern physics.', display_order: 2 },
    { id: 'jee-chem', course_id: 'jee-main', name: 'Chemistry', slug: 'chemistry', description: 'Equilibrium, Thermodynamics, Organic Reaction Pathways, Coordination Chemistry.', display_order: 3 },

    // GATE Subjects
    { id: 'gate-cs', course_id: 'gate', name: 'Computer Science & Information Technology', slug: 'cs-it', description: 'Algorithms, Operating Systems, Computer Architecture, Theory of Computation.', display_order: 1 },
    { id: 'gate-math', course_id: 'gate', name: 'Engineering Mathematics', slug: 'eng-math', description: 'Linear Algebra, Calculus, Differential Equations, Probability & Statistics.', display_order: 2 },

    // UPSC CSE Subjects
    { id: 'upsc-polity', course_id: 'upsc-cse', name: 'Indian Polity & Governance', slug: 'polity', description: 'Constitution, Political System, Panchayati Raj, Public Policy, Rights Issues.', display_order: 1 },
    { id: 'upsc-history', course_id: 'upsc-cse', name: 'Indian & World History', slug: 'history', description: 'Ancient, Medieval, Modern Indian Freedom Struggle, and Post-Independence Consolidation.', display_order: 2 },
    { id: 'upsc-geo', course_id: 'upsc-cse', name: 'Geography & Environment', slug: 'geography', description: 'Physical, Social, Economic Geography of India & the World; Ecology & Climate Change.', display_order: 3 },
  ];

  const insertSubject = db.prepare(`
    INSERT INTO course_subjects (id, course_id, name, slug, description, display_order)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  for (const s of subjects) {
    insertSubject.run(s.id, s.course_id, s.name, s.slug, s.description, s.display_order);
  }

  // ── 3. Seed Topics ──────────────────────────────────────────────────────────
  const topics = [
    // UGC-NET Paper 1 Topics (10 units)
    { id: 'top-ugc-ta', subject_id: 'ugc-p1', course_id: 'ugc-net', name: 'Teaching Aptitude', slug: 'teaching-aptitude', description: 'Levels of teaching, learner characteristics, methods of teaching, and evaluation systems.', display_order: 1 },
    { id: 'top-ugc-ra', subject_id: 'ugc-p1', course_id: 'ugc-net', name: 'Research Aptitude', slug: 'research-aptitude', description: 'Research meaning, types, positivism, post-positivistic approach, thesis writing, and research ethics.', display_order: 2 },
    { id: 'top-ugc-rc', subject_id: 'ugc-p1', course_id: 'ugc-net', name: 'Reading Comprehension', slug: 'reading-comprehension', description: 'Critical passage reading, inference extraction, and analytical text evaluation.', display_order: 3 },
    { id: 'top-ugc-comm', subject_id: 'ugc-p1', course_id: 'ugc-net', name: 'Communication', slug: 'communication', description: 'Effective verbal and non-verbal communication, intercultural barriers, and classroom communication.', display_order: 4 },
    { id: 'top-ugc-mr', subject_id: 'ugc-p1', course_id: 'ugc-net', name: 'Mathematical Reasoning & Aptitude', slug: 'mathematical-reasoning', description: 'Number series, letter codes, ratios, proportions, percentage, profit & loss, and speed-time-distance.', display_order: 5 },
    { id: 'top-ugc-lr', subject_id: 'ugc-p1', course_id: 'ugc-net', name: 'Logical Reasoning & Pramanas', slug: 'logical-reasoning', description: 'Categorical syllogism, Venn diagrams, Indian logic (Pramanas: Pratyaksha, Anumana, Upamana, Shabda).', display_order: 6 },
    { id: 'top-ugc-di', subject_id: 'ugc-p1', course_id: 'ugc-net', name: 'Data Interpretation', slug: 'data-interpretation', description: 'Quantitative analysis from table charts, bar charts, pie diagrams, and data governance.', display_order: 7 },
    { id: 'top-ugc-ict', subject_id: 'ugc-p1', course_id: 'ugc-net', name: 'Information & Communication Technology (ICT)', slug: 'ict', description: 'ICT abbreviations, basics of internet/intranet, digital initiatives in higher education (SWAYAM, NPTEL).', display_order: 8 },
    { id: 'top-ugc-pde', subject_id: 'ugc-p1', course_id: 'ugc-net', name: 'People, Development & Environment', slug: 'environment', description: 'Millennium & Sustainable Development goals (MDGs/SDGs), environmental pollution, climate accords.', display_order: 9 },
    { id: 'top-ugc-hes', subject_id: 'ugc-p1', course_id: 'ugc-net', name: 'Higher Education System', slug: 'higher-education', description: 'Institutions of higher learning in ancient India, evolution of post-independence education, NEP 2020.', display_order: 10 },

    // UGC-NET CS Topics
    { id: 'top-ugc-cs-algo', subject_id: 'ugc-p2-cs', course_id: 'ugc-net', name: 'Data Structures & Algorithms', slug: 'algorithms', description: 'Asymptotic analysis, divide & conquer, dynamic programming, graph algorithms, NP-completeness.', display_order: 1 },
    { id: 'top-ugc-cs-dbms', subject_id: 'ugc-p2-cs', course_id: 'ugc-net', name: 'Database Management Systems', slug: 'dbms', description: 'Relational algebra, SQL, normal forms (1NF-BCNF), ACID properties, concurrency control, indexing.', display_order: 2 },
    { id: 'top-ugc-cs-os', subject_id: 'ugc-p2-cs', course_id: 'ugc-net', name: 'System Software & Operating Systems', slug: 'operating-systems', description: 'Process synchronization, semaphores, CPU scheduling, virtual memory, paging, and deadlocks.', display_order: 3 },
    { id: 'top-ugc-cs-net', subject_id: 'ugc-p2-cs', course_id: 'ugc-net', name: 'Computer Networks', slug: 'networks', description: 'OSI/TCP-IP models, flow control, routing algorithms, IPv4/IPv6 subnetting, cryptography.', display_order: 4 },
    { id: 'top-ugc-cs-ai', subject_id: 'ugc-p2-cs', course_id: 'ugc-net', name: 'Artificial Intelligence', slug: 'artificial-intelligence', description: 'Search strategies (A*, minimax, alpha-beta), knowledge representation, neural networks, genetic algorithms.', display_order: 5 },

    // NEET Topics
    { id: 'top-neet-cell', subject_id: 'neet-bio', course_id: 'neet-ug', name: 'Cell Biology & Genetics', slug: 'cell-biology-genetics', description: 'Cell structure, mitosis, meiosis, Mendelian inheritance, and molecular basis of inheritance.', display_order: 1 },
    { id: 'top-neet-physio', subject_id: 'neet-bio', course_id: 'neet-ug', name: 'Human Physiology', slug: 'human-physiology', description: 'Circulatory, respiratory, excretory, nervous, endocrine, and locomotion systems.', display_order: 2 },
    { id: 'top-neet-plant', subject_id: 'neet-bio', course_id: 'neet-ug', name: 'Plant Physiology & Ecology', slug: 'plant-physiology-ecology', description: 'Photosynthesis, respiration in plants, plant growth, ecosystems, and biodiversity conservation.', display_order: 3 },
    { id: 'top-neet-mech', subject_id: 'neet-phy', course_id: 'neet-ug', name: 'Mechanics & Kinematics', slug: 'mechanics', description: 'Laws of motion, work-energy-power, rotational dynamics, gravitation, and fluid mechanics.', display_order: 1 },
    { id: 'top-neet-electro', subject_id: 'neet-phy', course_id: 'neet-ug', name: 'Electrodynamics & Optics', slug: 'electrodynamics-optics', description: 'Electrostatics, current electricity, magnetic effects, wave optics, and ray optics.', display_order: 2 },
    { id: 'top-neet-chem-org', subject_id: 'neet-chem', course_id: 'neet-ug', name: 'Organic Chemistry Reactions', slug: 'organic-chemistry', description: 'Hydrocarbons, haloalkanes, alcohols, carbonyl compounds, amines, and biomolecules.', display_order: 1 },
    { id: 'top-neet-chem-inorg', subject_id: 'neet-chem', course_id: 'neet-ug', name: 'Inorganic Chemistry & Coordination', slug: 'inorganic-chemistry', description: 'Periodic trends, chemical bonding, p-block elements, d & f-block, and coordination complexes.', display_order: 2 },

    // JEE Topics
    { id: 'top-jee-calc', subject_id: 'jee-math', course_id: 'jee-main', name: 'Differential & Integral Calculus', slug: 'calculus', description: 'Limits, continuity, differentiability, definite integrals, differential equations, and area under curves.', display_order: 1 },
    { id: 'top-jee-geom', subject_id: 'jee-math', course_id: 'jee-main', name: 'Coordinate Geometry & Vectors', slug: 'coordinate-geometry', description: 'Straight lines, circles, parabola, ellipse, hyperbola, 3D geometry, and vector algebra.', display_order: 2 },
    { id: 'top-jee-phy-mech', subject_id: 'jee-phy', course_id: 'jee-main', name: 'Advanced Mechanics', slug: 'mechanics', description: 'Center of mass, rotational inertia, simple harmonic motion, wave motion, and fluid dynamics.', display_order: 1 },
    { id: 'top-jee-phy-modern', subject_id: 'jee-phy', course_id: 'jee-main', name: 'Modern Physics & Electromagnetism', slug: 'modern-physics', description: 'Photoelectric effect, Bohr atom, nuclear physics, electromagnetic induction, and alternating currents.', display_order: 2 },
    { id: 'top-jee-chem-phys', subject_id: 'jee-chem', course_id: 'jee-main', name: 'Thermodynamics & Equilibrium', slug: 'thermodynamics-equilibrium', description: 'First and second laws, Gibbs free energy, chemical equilibrium, ionic equilibrium, and electrochemistry.', display_order: 1 },
  ];

  const insertTopic = db.prepare(`
    INSERT INTO course_topics (id, subject_id, course_id, name, slug, description, display_order)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (const t of topics) {
    insertTopic.run(t.id, t.subject_id, t.course_id, t.name, t.slug, t.description, t.display_order);
  }

  // ── 4. Seed Learning Resources ──────────────────────────────────────────────
  const resources = [
    // ── UGC-NET Resources ──
    {
      id: 'res-ugc-ta-notes',
      course_id: 'ugc-net',
      subject_id: 'ugc-p1',
      topic_id: 'top-ugc-ta',
      title: 'Teaching Aptitude: Comprehensive Theoretical Framework & Models',
      description: 'Covers Bloom taxonomy, Gagné nine events of instruction, formative vs summative evaluation, and CBT assessment criteria.',
      resource_type: 'notes',
      content: 'Complete structured lecture notes for UGC-NET Paper 1 Teaching Aptitude.',
      file_url: 'https://epgp.inflibnet.ac.in/',
      video_url: 'https://www.youtube.com/watch?v=swayam_teaching_aptitude',
      difficulty: 'Intermediate',
      visibility: 'course_only',
    },
    {
      id: 'res-ugc-ra-blueprint',
      course_id: 'ugc-net',
      subject_id: 'ugc-p1',
      topic_id: 'top-ugc-ra',
      title: 'Research Aptitude Master Guide: Positivism to APA Referencing',
      description: 'Exhaustive notes on qualitative vs quantitative methodologies, hypothesis formulation, sampling methods, and research ethics.',
      resource_type: 'pdf',
      content: 'Official OER study guide compiled from e-PG Pathshala and Swayam higher education modules.',
      file_url: 'https://raw.githubusercontent.com/hrishikeshjh/technoedu/main/public/materials/ncert/keps2/keps201.pdf',
      video_url: null,
      difficulty: 'Advanced',
      visibility: 'course_only',
    },
    {
      id: 'res-ugc-pyq-2024',
      course_id: 'ugc-net',
      subject_id: 'ugc-p1',
      topic_id: 'top-ugc-ta',
      title: 'UGC-NET Paper 1 Official Solved Papers (2018–2024 Shift-wise Archive)',
      description: 'Contains verified question keys, step-by-step logic derivations, and frequency analysis for all 10 Paper 1 units.',
      resource_type: 'pyq',
      content: 'Official NTA question papers with comprehensive explanations and distractor analyses.',
      file_url: 'https://ugcnet.nta.ac.in/previous-year-question-papers',
      video_url: null,
      difficulty: 'Intermediate',
      visibility: 'course_only',
    },
    {
      id: 'res-ugc-mock-full-1',
      course_id: 'ugc-net',
      subject_id: 'ugc-p1',
      topic_id: null,
      title: 'All-India CBT Mock Test 1: Full Length Paper 1 (50 MCQs / 60 Mins)',
      description: 'Simulates the exact NTA exam pattern with timer, negative-free marking system (+2 per correct), and instant performance analysis.',
      resource_type: 'mock',
      content: 'Full CBT mock test covering 5 questions from each of the 10 Paper 1 units.',
      file_url: null,
      video_url: null,
      difficulty: 'Advanced',
      visibility: 'course_only',
    },
    {
      id: 'res-ugc-roadmap-12w',
      course_id: 'ugc-net',
      subject_id: 'ugc-p1',
      topic_id: null,
      title: 'UGC-NET 12-Week Strategic Roadmap: Zero to JRF Ranker',
      description: 'Step-by-step weekly milestone planner balancing Paper 1 aptitude concepts with Paper 2 core subject mastery.',
      resource_type: 'roadmap',
      content: '12-week preparation strategy with daily study schedules, revision intervals, and mock attempt cycles.',
      file_url: null,
      video_url: null,
      difficulty: 'All Levels',
      visibility: 'course_only',
    },
    {
      id: 'res-ugc-cs-dbms-notes',
      course_id: 'ugc-net',
      subject_id: 'ugc-p2-cs',
      topic_id: 'top-ugc-cs-dbms',
      title: 'Paper 2 Computer Science: DBMS Normalization & Concurrency Control',
      description: 'Decomposition algorithms for 3NF and BCNF, conflict serializability testing, 2PL protocol, and B+ Tree indexing.',
      resource_type: 'notes',
      content: 'Comprehensive lecture series and practice sets curated for Paper 2 Computer Science aspirants.',
      file_url: 'https://nptel.ac.in/courses/106/105/106105175/',
      video_url: 'https://www.youtube.com/watch?v=nptel_dbms',
      difficulty: 'Advanced',
      visibility: 'course_only',
    },
    {
      id: 'res-ugc-cs-pyq-archive',
      course_id: 'ugc-net',
      subject_id: 'ugc-p2-cs',
      topic_id: 'top-ugc-cs-algo',
      title: 'UGC-NET Computer Science Official Subject PYQs (2019–2024)',
      description: '100 questions per exam session categorized by unit with detailed algorithmic proofs and code trace diagrams.',
      resource_type: 'pyq',
      content: 'Extensive question bank covering all 10 Paper 2 CS units.',
      file_url: 'https://ugcnet.nta.ac.in/',
      video_url: null,
      difficulty: 'Advanced',
      visibility: 'course_only',
    },

    // ── NEET UG Resources ──
    {
      id: 'res-neet-bio-cell-ncert',
      course_id: 'neet-ug',
      subject_id: 'neet-bio',
      topic_id: 'top-neet-cell',
      title: 'NCERT Biology Class 11: Unit 3 — Cell Structure and Function',
      description: 'The definitive word-for-word NCERT source text for NEET Biology with high-resolution cellular diagrams and organelle functions.',
      resource_type: 'pdf',
      content: 'Direct official NCERT textbook chapter for Cell Biology.',
      file_url: 'https://ncert.nic.in/textbook/pdf/kebo108.pdf',
      video_url: null,
      difficulty: 'Intermediate',
      visibility: 'course_only',
    },
    {
      id: 'res-neet-bio-physio-guide',
      course_id: 'neet-ug',
      subject_id: 'neet-bio',
      topic_id: 'top-neet-physio',
      title: 'Human Physiology Mastery Notes: Neural & Endocrine Coordination',
      description: 'High-yield memory tables, reflex arc diagrams, hormone feedback loops, and nephron counter-current multiplier mechanics.',
      resource_type: 'notes',
      content: 'Curated high-yield notes for NEET Human Physiology with NCERT line references.',
      file_url: 'https://openstax.org/details/books/anatomy-and-physiology',
      video_url: 'https://www.youtube.com/watch?v=khan_human_biology',
      difficulty: 'Intermediate',
      visibility: 'course_only',
    },
    {
      id: 'res-neet-pyq-10yr',
      course_id: 'neet-ug',
      subject_id: 'neet-bio',
      topic_id: null,
      title: 'NEET UG 10-Year Question Bank (Physics, Chemistry & Biology 2014–2024)',
      description: 'Complete 720-mark official papers with assertion-reason explanations and NCERT chapter cross-references.',
      resource_type: 'pyq',
      content: 'Official NTA NEET question papers with verified answer keys.',
      file_url: 'https://neet.nta.nic.in',
      video_url: null,
      difficulty: 'Advanced',
      visibility: 'course_only',
    },
    {
      id: 'res-neet-mock-cbt-1',
      course_id: 'neet-ug',
      subject_id: null,
      topic_id: null,
      title: 'NEET Full Syllabus Mock Test: 180 Questions (Physics, Chemistry, Bio)',
      description: 'Timed 3 hour 20 minute test simulating NTA test pattern: Section A (35 mandatory) and Section B (10 of 15 optional).',
      resource_type: 'mock',
      content: 'Full length mock test following latest NTA NEET guidelines.',
      file_url: null,
      video_url: null,
      difficulty: 'High Competition',
      visibility: 'course_only',
    },
    {
      id: 'res-neet-chem-organic',
      course_id: 'neet-ug',
      subject_id: 'neet-chem',
      topic_id: 'top-neet-chem-org',
      title: 'Named Organic Reactions and Reaction Mechanisms for NEET',
      description: 'Aldol condensation, Cannizzaro, Reimer-Tiemann, Kolbe, and electrophilic aromatic substitution chart.',
      resource_type: 'notes',
      content: 'Visual reaction roadmaps and named reaction flashcards for organic chemistry.',
      file_url: 'https://openstax.org/details/books/chemistry-2e',
      video_url: null,
      difficulty: 'Intermediate',
      visibility: 'course_only',
    },
    {
      id: 'res-neet-phy-formula',
      course_id: 'neet-ug',
      subject_id: 'neet-phy',
      topic_id: 'top-neet-mech',
      title: 'NEET Physics Formula Handbook & Dimensional Constants',
      description: 'Pocket formula sheet covering all mechanics, optics, thermodynamics, and electromagnetism equations.',
      resource_type: 'pdf',
      content: 'Comprehensive formula sheet for rapid revision before test day.',
      file_url: 'https://openstax.org/details/books/college-physics',
      video_url: null,
      difficulty: 'Intermediate',
      visibility: 'course_only',
    },

    // ── JEE Main & Advanced Resources ──
    {
      id: 'res-jee-math-calculus-guide',
      course_id: 'jee-main',
      subject_id: 'jee-math',
      topic_id: 'top-jee-calc',
      title: 'Calculus for JEE Advanced: Integration Techniques & Differential Equations',
      description: 'Master Leibniz rule, integration by parts tricks, variable separable forms, and geometrical applications of integrals.',
      resource_type: 'notes',
      content: 'Advanced problem sets with rigorous proofs and multi-concept challenge problems.',
      file_url: 'https://openstax.org/details/books/calculus-volume-1',
      video_url: 'https://www.youtube.com/watch?v=mit_ocw_single_var_calc',
      difficulty: 'Advanced',
      visibility: 'course_only',
    },
    {
      id: 'res-jee-phy-rotational',
      course_id: 'jee-main',
      subject_id: 'jee-phy',
      topic_id: 'top-jee-phy-mech',
      title: 'Rotational Motion & Rigid Body Dynamics Problem Collection',
      description: 'Moment of inertia theorems, rolling without slipping, angular momentum conservation, and collision problems.',
      resource_type: 'notes',
      content: 'Comprehensive problem collection curated from Irodov, Krotov, and past JEE Advanced benchmarks.',
      file_url: 'https://openstax.org/details/books/university-physics-volume-1',
      video_url: null,
      difficulty: 'Advanced',
      visibility: 'course_only',
    },
    {
      id: 'res-jee-main-pyq-2024',
      course_id: 'jee-main',
      subject_id: null,
      topic_id: null,
      title: 'JEE Main 2024 Official Shift Papers (January & April Sessions)',
      description: 'All 24 shifts question papers with step-by-step mathematical solutions and percentile score cutoffs.',
      resource_type: 'pyq',
      content: 'Complete shift papers with verified keys and solution walkthroughs.',
      file_url: 'https://jeemain.nta.nic.in',
      video_url: null,
      difficulty: 'Advanced',
      visibility: 'course_only',
    },
    {
      id: 'res-jee-adv-pyq-15yr',
      course_id: 'jee-main',
      subject_id: null,
      topic_id: null,
      title: 'JEE Advanced 15-Year Archive (Paper 1 & Paper 2: 2010–2024)',
      description: 'Matrix match, integer type, comprehension passages, and multi-correct questions with in-depth solutions.',
      resource_type: 'pyq',
      content: 'The definitive collection of JEE Advanced problem papers.',
      file_url: 'https://jeeadv.ac.in/archive.html',
      video_url: null,
      difficulty: 'Advanced',
      visibility: 'course_only',
    },
    {
      id: 'res-jee-mock-cbt-main',
      course_id: 'jee-main',
      subject_id: null,
      topic_id: null,
      title: 'JEE Main Full CBT Simulation Test: 300 Marks / 3 Hours',
      description: '75 questions (25 Math, 25 Physics, 25 Chemistry) with numerical value integer type questions.',
      resource_type: 'mock',
      content: 'Full CBT mock test mirroring exact NTA testing engine.',
      file_url: null,
      video_url: null,
      difficulty: 'Advanced',
      visibility: 'course_only',
    },

    // ── GATE Resources ──
    {
      id: 'res-gate-cs-algo',
      course_id: 'gate',
      subject_id: 'gate-cs',
      topic_id: null,
      title: 'GATE CS: Asymptotic Complexity and Dynamic Programming Paradigms',
      description: 'Master Master Theorem, recurrences, matrix chain multiplication, and Bellman-Ford shortest paths.',
      resource_type: 'notes',
      content: 'In-depth notes based on standard references like CLRS and NPTEL IIT Kharagpur courseware.',
      file_url: 'https://nptel.ac.in',
      video_url: null,
      difficulty: 'Graduate Level',
      visibility: 'course_only',
    },
    {
      id: 'res-gate-pyq-archive',
      course_id: 'gate',
      subject_id: 'gate-cs',
      topic_id: null,
      title: 'GATE CS Official Previous Years Papers (2000–2024 with Answer Keys)',
      description: 'Contains 65 questions per paper with 1-mark and 2-mark negative evaluation schemes.',
      resource_type: 'pyq',
      content: 'Comprehensive GATE CS archive with verified key explanations.',
      file_url: 'https://gate2026.iitr.ac.in',
      video_url: null,
      difficulty: 'Graduate Level',
      visibility: 'course_only',
    },

    // ── Universal Learning Guidance (Controlled all_courses visibility) ──
    {
      id: 'res-gen-time-management',
      course_id: 'general',
      subject_id: null,
      topic_id: null,
      title: 'Scientific Time Blocking & Spaced Repetition for Competitive Exams',
      description: 'Proven cognitive science techniques: Pomodoro cycles, Leitner flashcard boxes, and active recall schedules.',
      resource_type: 'article',
      content: 'Universal study efficiency techniques applicable across all competitive examinations.',
      file_url: null,
      video_url: null,
      difficulty: 'All Levels',
      visibility: 'all_courses',
    },
    {
      id: 'res-gen-exam-anxiety',
      course_id: 'general',
      subject_id: null,
      topic_id: null,
      title: 'Managing Exam Stress, Sleep Cycles & Test-Day Peak Performance',
      description: 'Evidence-based mindfulness, hydration, and nutritional protocols for long study sessions.',
      resource_type: 'article',
      content: 'Psychological strategies for managing high-stakes test pressure.',
      file_url: null,
      video_url: null,
      difficulty: 'All Levels',
      visibility: 'all_courses',
    },
  ];

  const insertResource = db.prepare(`
    INSERT INTO learning_resources (
      id, course_id, subject_id, topic_id, title, description, resource_type, content, file_url, video_url, difficulty, visibility, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const r of resources) {
    insertResource.run(
      r.id,
      r.course_id,
      r.subject_id,
      r.topic_id,
      r.title,
      r.description,
      r.resource_type,
      r.content,
      r.file_url,
      r.video_url,
      r.difficulty,
      r.visibility,
      now,
      now
    );
  }
}
