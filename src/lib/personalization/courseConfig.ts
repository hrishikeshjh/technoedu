export interface CourseConfig {
  id: string;
  name: string;
  slug: string;
  shortCode: string;
  category: 'Competitive examinations' | 'Academic learning';
  description: string;
  icon: string;
  difficultyLevel: string;
  colorScheme: {
    primary: string;
    bgLight: string;
    badgeBg: string;
    badgeText: string;
  };
  defaultSubjects: {
    id: string;
    name: string;
    slug: string;
    description: string;
    topicsCount: number;
    isMandatory?: boolean;
  }[];
  navLinks: {
    name: string;
    path: string;
    badge?: string;
  }[];
  quickActions: {
    title: string;
    path: string;
    description: string;
    icon: string;
  }[];
}

export const COURSE_CONFIGS: Record<string, CourseConfig> = {
  'ugc-net': {
    id: 'ugc-net',
    name: 'UGC-NET & JRF',
    slug: 'ugc-net',
    shortCode: 'UGC-NET',
    category: 'Competitive examinations',
    description: 'National Eligibility Test & Junior Research Fellowship for Assistant Professor and Ph.D. admissions across Indian Universities.',
    icon: 'Award',
    difficultyLevel: 'National Level',
    colorScheme: {
      primary: 'text-rose-600 dark:text-rose-400',
      bgLight: 'bg-rose-50 dark:bg-rose-950/30',
      badgeBg: 'bg-rose-100 dark:bg-rose-900/40',
      badgeText: 'text-rose-800 dark:text-rose-300',
    },
    defaultSubjects: [
      { id: 'ugc-p1', name: 'Paper 1: Teaching & Research Aptitude', slug: 'paper-1', description: 'Mandatory general paper covering 10 foundational aptitude domains.', topicsCount: 10, isMandatory: true },
      { id: 'ugc-p2-cs', name: 'Paper 2: Computer Science & Applications', slug: 'computer-science', description: 'Subject code 87: 10 specialized units in core computer science disciplines.', topicsCount: 10 },
      { id: 'ugc-p2-comm', name: 'Paper 2: Commerce', slug: 'commerce', description: 'Subject code 08: Business environment, finance, accounting, and marketing.', topicsCount: 10 },
      { id: 'ugc-p2-mgmt', name: 'Paper 2: Management', slug: 'management', description: 'Subject code 17: Strategic management, organizational behavior, and corporate finance.', topicsCount: 10 },
      { id: 'ugc-p2-edu', name: 'Paper 2: Education', slug: 'education', description: 'Subject code 09: Philosophical foundations, curriculum studies, and educational research.', topicsCount: 10 },
    ],
    navLinks: [
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Lectures & Ladder', path: '/lectures' },
      { name: 'My Learning', path: '/my-learning' },
      { name: 'UGC-NET Hub', path: '/exams/ugc-net' },
      { name: 'Paper 1', path: '/courses/ugc-net/subjects/paper-1' },
      { name: 'Paper 2', path: '/courses/ugc-net/subjects/computer-science' },
      { name: 'Study Materials', path: '/courses/ugc-net/resources' },
      { name: 'PYQs', path: '/courses/ugc-net/pyq' },
      { name: 'Mock Tests', path: '/courses/ugc-net/mock-tests' },
      { name: 'Library', path: '/library' },
    ],
    quickActions: [
      { title: 'Paper 1 Syllabus', path: '/courses/ugc-net/subjects/paper-1', description: '10 High-Yield Units', icon: 'BookOpen' },
      { title: 'Computer Science (Paper 2)', path: '/courses/ugc-net/subjects/computer-science', description: 'Subject Code 87', icon: 'Code2' },
      { title: 'Official PYQs (2018–2024)', path: '/courses/ugc-net/pyq', description: 'Verified Solutions', icon: 'FileCheck' },
      { title: 'All-India CBT Mocks', path: '/courses/ugc-net/mock-tests', description: 'NTA Exam Pattern', icon: 'Sparkles' },
    ],
  },

  'neet-ug': {
    id: 'neet-ug',
    name: 'NEET UG (Medical Entrance)',
    slug: 'neet-ug',
    shortCode: 'NEET UG',
    category: 'Competitive examinations',
    description: 'National Eligibility cum Entrance Test for admission to undergraduate medical programs (MBBS, BDS, AYUSH) in India.',
    icon: 'Stethoscope',
    difficultyLevel: 'High Competition',
    colorScheme: {
      primary: 'text-emerald-600 dark:text-emerald-400',
      bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
      badgeBg: 'bg-emerald-100 dark:bg-emerald-900/40',
      badgeText: 'text-emerald-800 dark:text-emerald-300',
    },
    defaultSubjects: [
      { id: 'neet-bio', name: 'Biology (Botany & Zoology)', slug: 'biology', description: '50% of the examination weightage based on NCERT Classes 11 & 12.', topicsCount: 12, isMandatory: true },
      { id: 'neet-phy', name: 'Physics', slug: 'physics', description: 'Mechanics, Electrodynamics, Modern Physics, Thermodynamics, and Optics.', topicsCount: 10, isMandatory: true },
      { id: 'neet-chem', name: 'Chemistry', slug: 'chemistry', description: 'Physical Chemistry, Organic Mechanisms, and Inorganic NCERT Foundations.', topicsCount: 10, isMandatory: true },
    ],
    navLinks: [
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Lectures & Ladder', path: '/lectures' },
      { name: 'My Learning', path: '/my-learning' },
      { name: 'Biology', path: '/courses/neet-ug/subjects/biology' },
      { name: 'Physics', path: '/courses/neet-ug/subjects/physics' },
      { name: 'Chemistry', path: '/courses/neet-ug/subjects/chemistry' },
      { name: 'Study Materials', path: '/courses/neet-ug/resources' },
      { name: 'PYQs', path: '/courses/neet-ug/pyq' },
      { name: 'Mock Tests', path: '/courses/neet-ug/mock-tests' },
    ],
    quickActions: [
      { title: 'NCERT Biology Highlights', path: '/courses/neet-ug/subjects/biology', description: 'Classes 11 & 12 Line by Line', icon: 'BookOpen' },
      { title: 'Physics Formula Handbook', path: '/courses/neet-ug/resources?type=pdf', description: 'Quick Formula Revision', icon: 'FileText' },
      { title: 'NEET 10-Year Question Bank', path: '/courses/neet-ug/pyq', description: '2014–2024 Chapterwise', icon: 'FileCheck' },
      { title: 'Full CBT Simulation Test', path: '/courses/neet-ug/mock-tests', description: '720-Mark Timed Exam', icon: 'Sparkles' },
    ],
  },

  'jee-main': {
    id: 'jee-main',
    name: 'JEE Main & Advanced',
    slug: 'jee-main',
    shortCode: 'JEE Main',
    category: 'Competitive examinations',
    description: 'Joint Entrance Examination for undergraduate engineering admissions into prestigious IITs, NITs, and IIITs.',
    icon: 'Cpu',
    difficultyLevel: 'National Elite',
    colorScheme: {
      primary: 'text-indigo-600 dark:text-indigo-400',
      bgLight: 'bg-indigo-50 dark:bg-indigo-950/30',
      badgeBg: 'bg-indigo-100 dark:bg-indigo-900/40',
      badgeText: 'text-indigo-800 dark:text-indigo-300',
    },
    defaultSubjects: [
      { id: 'jee-math', name: 'Mathematics', slug: 'mathematics', description: 'Calculus, Vectors & 3D Geometry, Algebra, Coordinate Geometry, and Trigonometry.', topicsCount: 12, isMandatory: true },
      { id: 'jee-phy', name: 'Physics', slug: 'physics', description: 'Advanced problem solving across classical mechanics, electromagnetism, and modern physics.', topicsCount: 12, isMandatory: true },
      { id: 'jee-chem', name: 'Chemistry', slug: 'chemistry', description: 'Equilibrium, Thermodynamics, Organic Reaction Pathways, Coordination Chemistry.', topicsCount: 12, isMandatory: true },
    ],
    navLinks: [
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Lectures & Ladder', path: '/lectures' },
      { name: 'My Learning', path: '/my-learning' },
      { name: 'Mathematics', path: '/courses/jee-main/subjects/mathematics' },
      { name: 'Physics', path: '/courses/jee-main/subjects/physics' },
      { name: 'Chemistry', path: '/courses/jee-main/subjects/chemistry' },
      { name: 'Study Materials', path: '/courses/jee-main/resources' },
      { name: 'PYQs', path: '/courses/jee-main/pyq' },
      { name: 'Mock Tests', path: '/courses/jee-main/mock-tests' },
    ],
    quickActions: [
      { title: 'Advanced Calculus Drills', path: '/courses/jee-main/subjects/mathematics', description: 'Differential & Integral', icon: 'BookOpen' },
      { title: 'Rigid Body Mechanics', path: '/courses/jee-main/subjects/physics', description: 'Challenging Problems', icon: 'Zap' },
      { title: 'JEE Main Shift Papers', path: '/courses/jee-main/pyq', description: '2020–2024 Archive', icon: 'FileCheck' },
      { title: '300-Mark CBT Test', path: '/courses/jee-main/mock-tests', description: 'Real Exam Simulation', icon: 'Sparkles' },
    ],
  },

  'gate': {
    id: 'gate',
    name: 'GATE (Engineering)',
    slug: 'gate',
    shortCode: 'GATE',
    category: 'Competitive examinations',
    description: 'Graduate Aptitude Test in Engineering for M.Tech admissions and prestigious Public Sector Undertaking (PSU) recruitment.',
    icon: 'Binary',
    difficultyLevel: 'Graduate Level',
    colorScheme: {
      primary: 'text-amber-600 dark:text-amber-400',
      bgLight: 'bg-amber-50 dark:bg-amber-950/30',
      badgeBg: 'bg-amber-100 dark:bg-amber-900/40',
      badgeText: 'text-amber-800 dark:text-amber-300',
    },
    defaultSubjects: [
      { id: 'gate-cs', name: 'Computer Science & Information Technology', slug: 'cs-it', description: 'Algorithms, Operating Systems, Computer Architecture, Theory of Computation.', topicsCount: 10, isMandatory: true },
      { id: 'gate-math', name: 'Engineering Mathematics', slug: 'eng-math', description: 'Linear Algebra, Calculus, Differential Equations, Probability & Statistics.', topicsCount: 6, isMandatory: true },
    ],
    navLinks: [
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Lectures & Ladder', path: '/lectures' },
      { name: 'My Learning', path: '/my-learning' },
      { name: 'CS & IT', path: '/courses/gate/subjects/cs-it' },
      { name: 'Engineering Math', path: '/courses/gate/subjects/eng-math' },
      { name: 'Study Materials', path: '/courses/gate/resources' },
      { name: 'PYQs', path: '/courses/gate/pyq' },
      { name: 'Mock Tests', path: '/courses/gate/mock-tests' },
    ],
    quickActions: [
      { title: 'Algorithms & Data Structures', path: '/courses/gate/subjects/cs-it', description: 'CLRS Benchmark Drills', icon: 'BookOpen' },
      { title: 'Engineering Mathematics', path: '/courses/gate/subjects/eng-math', description: 'Calculus & Linear Algebra', icon: 'Zap' },
      { title: 'GATE Official PYQs', path: '/courses/gate/pyq', description: '2000–2024 Solved Papers', icon: 'FileCheck' },
      { title: 'GATE CBT Speed Test', path: '/courses/gate/mock-tests', description: '65 Questions / 3 Hours', icon: 'Sparkles' },
    ],
  },

  'upsc-cse': {
    id: 'upsc-cse',
    name: 'UPSC Civil Services (CSE)',
    slug: 'upsc-cse',
    shortCode: 'UPSC CSE',
    category: 'Competitive examinations',
    description: 'Union Public Service Commission examination for recruitment to IAS, IPS, IFS, and Central Group A Services.',
    icon: 'Landmark',
    difficultyLevel: 'All India Elite',
    colorScheme: {
      primary: 'text-blue-600 dark:text-blue-400',
      bgLight: 'bg-blue-50 dark:bg-blue-950/30',
      badgeBg: 'bg-blue-100 dark:bg-blue-900/40',
      badgeText: 'text-blue-800 dark:text-blue-300',
    },
    defaultSubjects: [
      { id: 'upsc-polity', name: 'Indian Polity & Governance', slug: 'polity', description: 'Constitution, Political System, Panchayati Raj, Public Policy, Rights Issues.', topicsCount: 8, isMandatory: true },
      { id: 'upsc-history', name: 'Indian & World History', slug: 'history', description: 'Ancient, Medieval, Modern Indian Freedom Struggle, and Post-Independence Consolidation.', topicsCount: 8, isMandatory: true },
      { id: 'upsc-geo', name: 'Geography & Environment', slug: 'geography', description: 'Physical, Social, Economic Geography of India & the World; Ecology & Climate Change.', topicsCount: 8, isMandatory: true },
    ],
    navLinks: [
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Lectures & Ladder', path: '/lectures' },
      { name: 'My Learning', path: '/my-learning' },
      { name: 'Indian Polity', path: '/courses/upsc-cse/subjects/polity' },
      { name: 'History', path: '/courses/upsc-cse/subjects/history' },
      { name: 'Geography', path: '/courses/upsc-cse/subjects/geography' },
      { name: 'Study Materials', path: '/courses/upsc-cse/resources' },
      { name: 'PYQs', path: '/courses/upsc-cse/pyq' },
      { name: 'Mock Tests', path: '/courses/upsc-cse/mock-tests' },
    ],
    quickActions: [
      { title: 'NCERT Indian Constitution', path: '/courses/upsc-cse/subjects/polity', description: 'Class 11 & Laxmikanth Basics', icon: 'BookOpen' },
      { title: 'Modern History Timeline', path: '/courses/upsc-cse/subjects/history', description: '1857 to 1947 Freedom Movement', icon: 'Zap' },
      { title: 'UPSC Prelims PYQs', path: '/courses/upsc-cse/pyq', description: '2014–2024 Solved Papers', icon: 'FileCheck' },
      { title: 'GS Paper 1 Mock Drill', path: '/courses/upsc-cse/mock-tests', description: '100 MCQs with Negative Marking', icon: 'Sparkles' },
    ],
  },
};

export function getCourseConfig(courseId: string): CourseConfig | null {
  return COURSE_CONFIGS[courseId] || null;
}
