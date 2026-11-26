import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { useAuth } from '../context/AuthContext';
import { COURSE_CONFIGS } from '../lib/personalization/courseConfig';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  BookOpen,
  GraduationCap,
  Award,
  Stethoscope,
  Cpu,
  Binary,
  Landmark,
  Code2,
  Clock,
  Calendar,
  CheckCircle2,
  Search,
  Loader2,
  AlertCircle,
  Layers,
  FileCheck2,
  Compass,
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Award,
  Stethoscope,
  Cpu,
  Binary,
  Landmark,
  GraduationCap,
  Code2,
  BookOpen,
};

// Course options catalogue for Step 2
interface CourseOption {
  id: string;
  name: string;
  category: 'Competitive examinations' | 'Academic learning';
  description: string;
  icon: string;
  difficulty: string;
  popularSubjects: string[];
}

const AVAILABLE_COURSES: CourseOption[] = [
  {
    id: 'ugc-net',
    name: 'UGC-NET & JRF',
    category: 'Competitive examinations',
    description: 'Assistant Professor eligibility & Junior Research Fellowship across Indian Universities.',
    icon: 'Award',
    difficulty: 'National Eligibility',
    popularSubjects: ['Paper 1 (General)', 'Computer Science (Code 87)', 'Commerce', 'Management'],
  },
  {
    id: 'neet-ug',
    name: 'NEET UG',
    category: 'Competitive examinations',
    description: 'National Entrance Test for undergraduate medical admissions (MBBS, BDS, AYUSH).',
    icon: 'Stethoscope',
    difficulty: 'High Competition',
    popularSubjects: ['Biology (Botany & Zoology)', 'Physics', 'Chemistry'],
  },
  {
    id: 'jee-main',
    name: 'JEE Main & Advanced',
    category: 'Competitive examinations',
    description: 'Premier engineering entrance test for admissions to IITs, NITs, and top engineering institutes.',
    icon: 'Cpu',
    difficulty: 'National Elite',
    popularSubjects: ['Mathematics', 'Physics', 'Chemistry'],
  },
  {
    id: 'gate',
    name: 'GATE (Engineering)',
    category: 'Competitive examinations',
    description: 'Graduate Aptitude Test in Engineering for M.Tech admissions and PSU recruitments.',
    icon: 'Binary',
    difficulty: 'Graduate Level',
    popularSubjects: ['Computer Science & IT', 'Engineering Mathematics'],
  },
  {
    id: 'upsc-cse',
    name: 'UPSC Civil Services (CSE)',
    category: 'Competitive examinations',
    description: 'Civil Services Examination for recruitment to IAS, IPS, IFS, and central civil services.',
    icon: 'Landmark',
    difficulty: 'All India Elite',
    popularSubjects: ['Indian Polity', 'Modern History', 'Geography & Environment'],
  },
  {
    id: 'cuet',
    name: 'CUET UG/PG',
    category: 'Competitive examinations',
    description: 'Common University Entrance Test for admissions to Central Universities across India.',
    icon: 'GraduationCap',
    difficulty: 'National Level',
    popularSubjects: ['General Test', 'Domain Subjects', 'Language Comprehension'],
  },
  {
    id: 'comp-sci',
    name: 'Computer Science & AI',
    category: 'Academic learning',
    description: 'Comprehensive curriculum spanning Data Structures, Algorithms, AI, and Software Engineering.',
    icon: 'Code2',
    difficulty: 'All Levels',
    popularSubjects: ['Data Structures & Algorithms', 'Machine Learning', 'Operating Systems'],
  },
];

// Dynamic subject mapping per course for Step 3
interface SubjectOption {
  id: string;
  name: string;
  group?: string;
  description: string;
  badge?: string;
}

const COURSE_SUBJECTS_CATALOGUE: Record<string, SubjectOption[]> = {
  'ugc-net': [
    // Paper 1 Units
    { id: 'ugc-p1-ta', name: 'Teaching Aptitude', group: 'Paper 1: Core Units', description: 'Levels of teaching, learner characteristics, and evaluation systems.', badge: 'Paper 1' },
    { id: 'ugc-p1-ra', name: 'Research Aptitude', group: 'Paper 1: Core Units', description: 'Research methodologies, positivism, thesis formatting, and ethics.', badge: 'Paper 1' },
    { id: 'ugc-p1-rc', name: 'Reading Comprehension', group: 'Paper 1: Core Units', description: 'Analytical passages and critical textual interpretation.', badge: 'Paper 1' },
    { id: 'ugc-p1-comm', name: 'Communication', group: 'Paper 1: Core Units', description: 'Effective verbal/non-verbal communication and classroom dynamics.', badge: 'Paper 1' },
    { id: 'ugc-p1-mr', name: 'Mathematical Reasoning & Aptitude', group: 'Paper 1: Core Units', description: 'Number series, percentages, ratios, speed-time, and interest.', badge: 'Paper 1' },
    { id: 'ugc-p1-lr', name: 'Logical Reasoning & Indian Logic', group: 'Paper 1: Core Units', description: 'Pramanas, syllogisms, Venn diagrams, and fallacies.', badge: 'Paper 1' },
    { id: 'ugc-p1-di', name: 'Data Interpretation', group: 'Paper 1: Core Units', description: 'Quantitative evaluation of table charts, bar diagrams, and pie charts.', badge: 'Paper 1' },
    { id: 'ugc-p1-ict', name: 'ICT in Higher Education', group: 'Paper 1: Core Units', description: 'Digital initiatives (SWAYAM, NPTEL), internet fundamentals, and abbreviations.', badge: 'Paper 1' },
    { id: 'ugc-p1-pde', name: 'People, Development & Environment', group: 'Paper 1: Core Units', description: 'SDGs, MDGs, environmental pollution, and climate summits.', badge: 'Paper 1' },
    { id: 'ugc-p1-hes', name: 'Higher Education System', group: 'Paper 1: Core Units', description: 'Ancient Indian universities, post-independence commissions, and NEP 2020.', badge: 'Paper 1' },
    // Paper 2 Domains
    { id: 'ugc-p2-cs', name: 'Paper 2: Computer Science & Applications', group: 'Paper 2: Domain Electives', description: 'Algorithms, DBMS, OS, Computer Networks, Software Engineering, and AI.', badge: 'Code 87' },
    { id: 'ugc-p2-comm', name: 'Paper 2: Commerce', group: 'Paper 2: Domain Electives', description: 'Business environment, financial management, accounting, and marketing.', badge: 'Code 08' },
    { id: 'ugc-p2-mgmt', name: 'Paper 2: Management', group: 'Paper 2: Domain Electives', description: 'Strategic management, organizational behaviour, operations, and economics.', badge: 'Code 17' },
    { id: 'ugc-p2-edu', name: 'Paper 2: Education', group: 'Paper 2: Domain Electives', description: 'Pedagogy, educational philosophy, curriculum studies, and inclusive schooling.', badge: 'Code 09' },
  ],

  'neet-ug': [
    { id: 'neet-bio-botany', name: 'Biology — Botany', group: 'Biology (50% Weightage)', description: 'Plant Physiology, Plant Diversity, Genetics, Ecology & Environment.', badge: 'Core' },
    { id: 'neet-bio-zoology', name: 'Biology — Zoology', group: 'Biology (50% Weightage)', description: 'Human Physiology, Animal Kingdom, Reproduction & Evolution.', badge: 'Core' },
    { id: 'neet-phy-mech', name: 'Physics — Mechanics & Electrodynamics', group: 'Physics', description: 'Kinematics, Laws of Motion, Gravitation, Electrostatics, and Magnetism.', badge: 'Core' },
    { id: 'neet-phy-modern', name: 'Physics — Optics & Modern Physics', group: 'Physics', description: 'Ray & Wave Optics, Dual Nature of Radiation, Atoms, and Nuclei.', badge: 'Core' },
    { id: 'neet-chem-phys', name: 'Chemistry — Physical Chemistry', group: 'Chemistry', description: 'Mole concept, Thermodynamics, Equilibrium, and Chemical Kinetics.', badge: 'Core' },
    { id: 'neet-chem-org', name: 'Chemistry — Organic Reactions', group: 'Chemistry', description: 'Reaction mechanisms, hydrocarbons, oxygen/nitrogen functional groups.', badge: 'Core' },
    { id: 'neet-chem-inorg', name: 'Chemistry — Inorganic Chemistry', group: 'Chemistry', description: 'Periodic table, Chemical bonding, p-Block, and Coordination chemistry.', badge: 'Core' },
    { id: 'neet-pyqs', name: 'Previous Year Question Papers (PYQs)', group: 'Practice & Revision', description: '10 years of official NEET question papers with detailed step-by-step keys.', badge: 'High Yield' },
    { id: 'neet-mocks', name: 'All-India CBT Mock Tests', group: 'Practice & Revision', description: 'Timed 720-mark simulation tests based on the latest NTA format.', badge: 'High Yield' },
  ],

  'jee-main': [
    { id: 'jee-math-calc', name: 'Mathematics — Differential & Integral Calculus', group: 'Mathematics', description: 'Functions, Limits, Continuity, Definite Integrals, and Differential Equations.', badge: 'Core' },
    { id: 'jee-math-geom', name: 'Mathematics — Coordinate Geometry & Vectors', group: 'Mathematics', description: 'Conic sections, straight lines, 3D Geometry, and Vector Algebra.', badge: 'Core' },
    { id: 'jee-math-alg', name: 'Mathematics — Algebra & Complex Numbers', group: 'Mathematics', description: 'Matrices, Determinants, Quadratic equations, Permutations, and Probability.', badge: 'Core' },
    { id: 'jee-phy-mech', name: 'Physics — Advanced Mechanics & Waves', group: 'Physics', description: 'Rotational motion, SHM, gravitation, fluids, and wave motion.', badge: 'Core' },
    { id: 'jee-phy-electro', name: 'Physics — Electromagnetism & Modern Physics', group: 'Physics', description: 'Capacitance, Magnetism, EMI, AC, Optics, and Nuclear physics.', badge: 'Core' },
    { id: 'jee-chem-phys', name: 'Chemistry — Physical & Thermodynamics', group: 'Chemistry', description: 'States of matter, Electrochemistry, Surface chemistry, and Kinetics.', badge: 'Core' },
    { id: 'jee-chem-org', name: 'Chemistry — Organic Mechanisms & Synthesis', group: 'Chemistry', description: 'Named reactions, reaction intermediates, polymers, and biomolecules.', badge: 'Core' },
    { id: 'jee-prep-main', name: 'JEE Main Specific Preparation', group: 'Targeted Tracks', description: 'Speed drills, integer-type questions, and shift-wise past year analysis.', badge: 'NTA Pattern' },
    { id: 'jee-prep-adv', name: 'JEE Advanced High-Order Problem Solving', group: 'Targeted Tracks', description: 'Multi-concept problems, matrix match, and numerical value questions.', badge: 'IIT Track' },
  ],

  'gate': [
    { id: 'gate-cs-algo', name: 'Data Structures & Algorithms', group: 'CS & IT Core', description: 'Asymptotic analysis, trees, graphs, hashing, and dynamic programming.', badge: 'High Yield' },
    { id: 'gate-cs-os', name: 'Operating Systems & System Software', group: 'CS & IT Core', description: 'Process synchronization, virtual memory, scheduling, and file systems.', badge: 'Core' },
    { id: 'gate-cs-dbms', name: 'Database Management Systems', group: 'CS & IT Core', description: 'ER models, relational algebra, SQL, normalization, and concurrency control.', badge: 'Core' },
    { id: 'gate-cs-net', name: 'Computer Networks', group: 'CS & IT Core', description: 'Routing protocols, TCP/UDP sockets, flow control, and IP subnetting.', badge: 'Core' },
    { id: 'gate-math', name: 'Engineering Mathematics', group: 'Foundational', description: 'Linear algebra, calculus, discrete math, and probability.', badge: 'Mandatory' },
    { id: 'gate-pyqs', name: 'GATE 20-Year Solved Papers', group: 'Practice & Revision', description: 'Topic-wise past questions with official answer keys.', badge: 'High Yield' },
  ],

  'upsc-cse': [
    { id: 'upsc-polity', name: 'Indian Polity & Constitution', group: 'General Studies 2', description: 'Preamble, Fundamental Rights, Parliament, Judiciary, and Panchayats.', badge: 'Core GS' },
    { id: 'upsc-history', name: 'Modern Indian History & Culture', group: 'General Studies 1', description: '1857 Revolt, Indian National Movement, and Gandhian Era.', badge: 'Core GS' },
    { id: 'upsc-geo', name: 'Physical & Economic Geography', group: 'General Studies 1', description: 'Geomorphology, climatology, Indian river systems, and resources.', badge: 'Core GS' },
    { id: 'upsc-eco', name: 'Indian Economy & Budget Analysis', group: 'General Studies 3', description: 'Fiscal policy, banking, inflation, agriculture, and economic surveys.', badge: 'Core GS' },
    { id: 'upsc-pyqs', name: 'Prelims & Mains Official Question Papers', group: 'Practice & Revision', description: '2014 to 2024 solved papers with examiner trends.', badge: 'High Yield' },
  ],

  'cuet': [
    { id: 'cuet-gt', name: 'General Test (Aptitude & Reasoning)', group: 'Section 3', description: 'General Knowledge, Current Affairs, Mental Ability, and Quantitative Reasoning.', badge: 'General' },
    { id: 'cuet-lang', name: 'Language & Reading Comprehension', group: 'Section 1', description: 'Vocabulary, passage inference, synonyms/antonyms, and grammar.', badge: 'Language' },
    { id: 'cuet-domain-sci', name: 'Domain Science (Physics, Chemistry, Math, Bio)', group: 'Section 2: Science', description: 'Class 12 NCERT-aligned syllabus for university admission.', badge: 'Domain' },
    { id: 'cuet-domain-hum', name: 'Domain Humanities & Commerce', group: 'Section 2: Humanities', description: 'History, Political Science, Economics, and Accountancy.', badge: 'Domain' },
  ],

  'comp-sci': [
    { id: 'cs-dsa', name: 'Data Structures & Algorithms', group: 'Foundations', description: 'Arrays, Linked Lists, Trees, Graphs, Sorting, Dynamic Programming.', badge: 'Core' },
    { id: 'cs-ai-ml', name: 'Artificial Intelligence & Machine Learning', group: 'Advanced', description: 'Supervised/Unsupervised Learning, Deep Learning, and Neural Networks.', badge: 'Emerging' },
    { id: 'cs-web', name: 'Full-Stack Web Development', group: 'Applied', description: 'React, Node.js, REST APIs, Database Design, and Cloud Architecture.', badge: 'Industry' },
    { id: 'cs-systems', name: 'Computer Systems & OS', group: 'Foundations', description: 'Computer Architecture, Linux Systems, and Distributed Computing.', badge: 'Core' },
  ],
};

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, submitOnboarding } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [stepDirection, setStepDirection] = useState<'forward' | 'backward'>('forward');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // STEP 1 State: Student Profile
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [age, setAge] = useState<string>('');
  const [educationLevel, setEducationLevel] = useState<string>('Undergraduate');
  const [currentClassOrSemester, setCurrentClassOrSemester] = useState<string>('');
  const [institution, setInstitution] = useState<string>('');
  const [country, setCountry] = useState<string>('India');
  const [preferredLanguage, setPreferredLanguage] = useState<string>('English');

  // STEP 2 State: Goal / Examination
  const [primaryCourseId, setPrimaryCourseId] = useState<string>('ugc-net');
  const [courseSearch, setCourseSearch] = useState<string>('');
  const [courseCategoryFilter, setCourseCategoryFilter] = useState<'All' | 'Competitive examinations' | 'Academic learning'>('All');

  // STEP 3 State: Subjects / Units
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  // STEP 4 State: Learning Preferences
  const [learningPreferences, setLearningPreferences] = useState<string[]>([
    'Reading notes and study materials',
    'Previous year questions (PYQs)',
    'Taking mock tests',
  ]);
  const [preparationLevel, setPreparationLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced' | 'Revision'>('Intermediate');
  const [dailyStudyAvailability, setDailyStudyAvailability] = useState<string>('2–4 hours');
  const [targetYear, setTargetYear] = useState<string>('2026');

  // Auto-select initial subjects when course changes
  useEffect(() => {
    const subjectsForCourse = COURSE_SUBJECTS_CATALOGUE[primaryCourseId] || [];
    if (subjectsForCourse.length > 0) {
      // Pick first 3-4 subjects by default so student has a sensible pre-selection
      const defaults = subjectsForCourse.slice(0, 4).map((s) => s.id);
      setSelectedSubjects(defaults);
    } else {
      setSelectedSubjects([]);
    }
  }, [primaryCourseId]);

  // Update fullName if user loads later
  useEffect(() => {
    if (user?.fullName && !fullName) {
      setFullName(user.fullName);
    }
  }, [user, fullName]);

  const handleToggleSubject = (subjectId: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subjectId) ? prev.filter((id) => id !== subjectId) : [...prev, subjectId]
    );
  };

  const handleTogglePreference = (pref: string) => {
    setLearningPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  };

  const handleNext = () => {
    setError(null);
    if (currentStep === 1) {
      if (!fullName.trim()) {
        setError('Please enter your full name.');
        return;
      }
    }
    if (currentStep === 2) {
      if (!primaryCourseId) {
        setError('Please select your primary examination or course.');
        return;
      }
    }
    if (currentStep === 3) {
      if (selectedSubjects.length === 0) {
        setError('Please select at least one subject or unit to focus on.');
        return;
      }
    }
    setStepDirection('forward');
    const nextStep = Math.min(currentStep + 1, 5);
    setCurrentStep(nextStep);
    if (nextStep === 5) {
      try {
        confetti({
          particleCount: 55,
          spread: 65,
          origin: { y: 0.7 },
          colors: ['#dc2626', '#f43f5e', '#fbbf24', '#ffffff'],
        });
      } catch {
        // Ignore confetti errors in headless/restricted environments
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setError(null);
    setStepDirection('backward');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToStep = (stepNumber: number) => {
    if (stepNumber >= currentStep) return;
    setError(null);
    setStepDirection('backward');
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleConfirmAndFinish = async () => {
    setError(null);
    setIsSubmitting(true);
    try {
      await submitOnboarding({
        fullName: fullName.trim(),
        age: age ? parseInt(age, 10) : undefined,
        educationLevel,
        currentClassOrSemester,
        institution,
        country,
        preferredLanguage,
        primaryCourseId,
        selectedSubjects,
        learningPreferences,
        preparationLevel,
        dailyStudyAvailability,
        targetYear,
      });

      // Redirect directly to the personalized dashboard!
      navigate('/dashboard', { replace: true });
    } catch (err: any) {
      setError(err.message || 'Failed to save onboarding preferences. Please try again.');
      setIsSubmitting(false);
    }
  };

  const selectedCourseMeta = AVAILABLE_COURSES.find((c) => c.id === primaryCourseId) || AVAILABLE_COURSES[0];
  const activeCourseSubjects = COURSE_SUBJECTS_CATALOGUE[primaryCourseId] || [];

  const filteredCourseList = AVAILABLE_COURSES.filter((c) => {
    const matchesCategory = courseCategoryFilter === 'All' || c.category === courseCategoryFilter;
    const matchesSearch =
      c.name.toLowerCase().includes(courseSearch.toLowerCase()) ||
      c.description.toLowerCase().includes(courseSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] flex flex-col justify-between transition-colors">
      {/* Top Header */}
      <header className="w-full border-b border-slate-200/80 dark:border-[#1E222B] bg-white/80 dark:bg-[#0D0F14]/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="TechnoEdu"
              className="h-8 w-auto object-contain block dark:hidden"
            />
            <img
              src="/logowhite.png"
              alt="TechnoEdu"
              className="h-8 w-auto object-contain hidden dark:block"
            />
            <div className="hidden sm:block h-4 w-px bg-slate-200 dark:bg-slate-700" />
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-500 dark:text-[#A7AFBD]">
              Personalized Learning Setup
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-slate-500 dark:text-[#737B89]">
              Step {currentStep} of 5
            </span>
          </div>
        </div>
      </header>

      {/* Interactive Progress Bar & Stepper */}
      <div className="w-full bg-slate-200/60 dark:bg-[#181B22] h-1.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-brand-red to-rose-500 h-full transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / 5) * 100}%` }}
        />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-center">
        {/* Interactive Step Nodes */}
        <div className="mb-6 flex items-center justify-between gap-2 px-1" aria-label="Onboarding progress">
          {[
            { num: 1, label: 'Profile' },
            { num: 2, label: 'Goal' },
            { num: 3, label: 'Focus' },
            { num: 4, label: 'Pace' },
            { num: 5, label: 'Review' },
          ].map((s) => {
            const isCompleted = currentStep > s.num;
            const isActive = currentStep === s.num;
            return (
              <button
                key={s.num}
                type="button"
                onClick={() => handleJumpToStep(s.num)}
                disabled={!isCompleted}
                className={`group flex items-center gap-2 text-xs font-bold transition-all duration-200 ${
                  isCompleted
                    ? 'cursor-pointer text-slate-700 dark:text-slate-200 hover:text-brand-red'
                    : isActive
                    ? 'cursor-default text-brand-red'
                    : 'cursor-default text-slate-400 dark:text-[#646C7A]'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-extrabold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-500 text-white shadow-sm group-hover:scale-110'
                      : isActive
                      ? 'bg-brand-red text-white ring-4 ring-brand-red/20 scale-105'
                      : 'bg-slate-200/80 dark:bg-[#1A1D23] text-slate-500 dark:text-[#7F8795]'
                  }`}
                >
                  {isCompleted ? <Check className="w-3.5 h-3.5 animate-check-pop" /> : s.num}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-3 text-xs sm:text-sm text-rose-700 dark:text-rose-300 animate-input-shake">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div
          key={currentStep}
          className={stepDirection === 'forward' ? 'animate-step-forward' : 'animate-step-backward'}
        >

        {/* ─────────────────────────────────────────────────────────────────
            STEP 1: Student Profile
           ───────────────────────────────────────────────────────────────── */}
        {currentStep === 1 && (
          <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-6 sm:p-10 shadow-sm animate-fade-in-smooth">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/40 text-brand-red text-xs font-bold mb-4">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Step 1 of 5 • Student Profile</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC] mb-2">
              Let's Personalize Your Experience
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A7AFBD] mb-8 leading-relaxed">
              Tell us a little about your academic background so we can calibrate your study pace and resource recommendations.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ananya Sharma"
                  className="w-full h-11 px-4 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                  required
                />
              </div>

              {/* Current Educational Level */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Current Educational Level *
                </label>
                <select
                  value={educationLevel}
                  onChange={(e) => setEducationLevel(e.target.value)}
                  className="w-full h-11 px-3.5 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                >
                  <option value="School student">School student</option>
                  <option value="Class 10">Class 10</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                  <option value="Undergraduate">Undergraduate (UG)</option>
                  <option value="Postgraduate">Postgraduate (PG)</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Working professional">Working professional</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Age / Date of Birth */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Age (Optional)
                </label>
                <input
                  type="number"
                  min="10"
                  max="80"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 21"
                  className="w-full h-11 px-4 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                />
              </div>

              {/* Current Class, Semester or Year */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Current Class, Semester or Year
                </label>
                <input
                  type="text"
                  value={currentClassOrSemester}
                  onChange={(e) => setCurrentClassOrSemester(e.target.value)}
                  placeholder="e.g. Final Year (Sem 6) / Class 12"
                  className="w-full h-11 px-4 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                />
              </div>

              {/* Institution or University */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Institution or University (Optional)
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="e.g. Delhi University / Jadavpur University"
                  className="w-full h-11 px-4 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                />
              </div>

              {/* Preferred Language */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Preferred Language of Study
                </label>
                <select
                  value={preferredLanguage}
                  onChange={(e) => setPreferredLanguage(e.target.value)}
                  className="w-full h-11 px-3.5 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Bengali">Bengali (বাংলা)</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Country
                </label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="India"
                  className="w-full h-11 px-4 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────
            STEP 2: Primary Goal Selection
           ───────────────────────────────────────────────────────────────── */}
        {currentStep === 2 && (
          <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-6 sm:p-10 shadow-sm animate-fade-in-smooth">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/40 text-brand-red text-xs font-bold mb-4">
              <Compass className="w-3.5 h-3.5" />
              <span>Step 2 of 5 • Primary Learning Goal</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC] mb-2">
              What Are You Preparing For?
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A7AFBD] mb-6 leading-relaxed">
              Select your primary goal. Your entire dashboard, syllabus, roadmaps, and mock tests will be dedicated to this course.
            </p>

            {/* Search & Category Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={courseSearch}
                  onChange={(e) => setCourseSearch(e.target.value)}
                  placeholder="Search examinations (e.g. UGC-NET, NEET, JEE)..."
                  className="w-full h-10 pl-10 pr-4 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-xs text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-1.5 shrink-0">
                {(['All', 'Competitive examinations', 'Academic learning'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCourseCategoryFilter(cat)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-colors ${
                      courseCategoryFilter === cat
                        ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                        : 'bg-slate-100 dark:bg-[#15171C] text-slate-600 dark:text-[#A7AFBD] hover:bg-slate-200 dark:hover:bg-[#1E222B]'
                    }`}
                  >
                    {cat === 'All' ? 'All Goals' : cat === 'Competitive examinations' ? 'Exams' : 'Academic'}
                  </button>
                ))}
              </div>
            </div>

            {/* Course Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[460px] overflow-y-auto pr-1">
              {filteredCourseList.map((course) => {
                const isSelected = primaryCourseId === course.id;
                const Icon = iconMap[course.icon] || BookOpen;

                return (
                  <div
                    key={course.id}
                    onClick={() => setPrimaryCourseId(course.id)}
                    className={`cursor-pointer p-5 rounded-2xl border-2 text-left transition-all relative ${
                      isSelected
                        ? 'border-brand-red bg-red-50/50 dark:bg-red-950/20 shadow-md ring-2 ring-brand-red/20'
                        : 'border-slate-200 dark:border-[#252932] bg-white dark:bg-[#15171C] hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-brand-red text-white' : 'bg-slate-100 dark:bg-[#1E222B] text-slate-700 dark:text-slate-300'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#1A1D23] text-slate-600 dark:text-[#A7AFBD]">
                          {course.difficulty}
                        </span>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-brand-red text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900 dark:text-[#F8FAFC] mb-1">
                      {course.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-[#A7AFBD] leading-relaxed mb-3 line-clamp-2">
                      {course.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {course.popularSubjects.map((sub, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-50 dark:bg-[#1C1F26] text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-[#2A2E39]"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────
            STEP 3: Subject & Unit Selection (Dynamically based on Step 2)
           ───────────────────────────────────────────────────────────────── */}
        {currentStep === 3 && (
          <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-6 sm:p-10 shadow-sm animate-fade-in-smooth">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/40 text-brand-red text-xs font-bold mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Step 3 of 5 • Syllabus Focus</span>
            </div>

            <div className="flex items-center justify-between gap-3 mb-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC]">
                What Would You Like to Study in {selectedCourseMeta.name}?
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A7AFBD] mb-6 leading-relaxed">
              Select the subjects or units you are currently prioritizing. We will tailor your study queue and daily targets accordingly.
            </p>

            {/* Quick Actions to Select All / Clear */}
            <div className="flex items-center justify-between gap-3 mb-4 text-xs">
              <span className="font-bold text-slate-600 dark:text-slate-400">
                {selectedSubjects.length} of {activeCourseSubjects.length} selected
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSubjects(activeCourseSubjects.map((s) => s.id))}
                  className="font-bold text-brand-red hover:underline"
                >
                  Select All
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  type="button"
                  onClick={() => setSelectedSubjects([])}
                  className="font-medium text-slate-500 hover:underline"
                >
                  Clear Selection
                </button>
              </div>
            </div>

            {/* Subject Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
              {activeCourseSubjects.map((subject) => {
                const isSelected = selectedSubjects.includes(subject.id);

                return (
                  <div
                    key={subject.id}
                    onClick={() => handleToggleSubject(subject.id)}
                    className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-start gap-3 relative ${
                      isSelected
                        ? 'border-brand-red bg-red-50/60 dark:bg-red-950/20 shadow-xs ring-1 ring-brand-red/30'
                        : 'border-slate-200 dark:border-[#252932] bg-white dark:bg-[#15171C] hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isSelected ? 'bg-brand-red text-white' : 'border border-slate-300 dark:border-slate-600 bg-white dark:bg-[#1E222B]'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] truncate">
                          {subject.name}
                        </h4>
                        {subject.badge && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1E222B] text-slate-600 dark:text-[#A7AFBD] shrink-0">
                            {subject.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-[#737B89] leading-snug line-clamp-2">
                        {subject.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────
            STEP 4: Learning Preferences & Schedule
           ───────────────────────────────────────────────────────────────── */}
        {currentStep === 4 && (
          <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-6 sm:p-10 shadow-sm animate-fade-in-smooth">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/40 text-brand-red text-xs font-bold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 4 of 5 • Learning Preferences</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC] mb-2">
              How Do You Prefer to Learn?
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A7AFBD] mb-8 leading-relaxed">
              Customize your learning methodology so we present the right mix of study materials, practice problems, and tests.
            </p>

            <div className="space-y-6">
              {/* Preferred Format Multi-select */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Learning Formats (Select all that apply)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'Reading notes and study materials',
                    'Watching video lectures & courses',
                    'Solving practice questions',
                    'Previous year questions (PYQs)',
                    'Taking mock tests & CBT drills',
                    'Interactive quizzes',
                    'Revision notes & formula sheets',
                    'Structured learning roadmaps',
                  ].map((format) => {
                    const isSelected = learningPreferences.includes(format);
                    return (
                      <button
                        type="button"
                        key={format}
                        onClick={() => handleTogglePreference(format)}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all ${
                          isSelected
                            ? 'border-brand-red bg-red-50/60 dark:bg-red-950/20 text-brand-red dark:text-red-400'
                            : 'border-slate-200 dark:border-[#252932] bg-white dark:bg-[#15171C] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1A1D23]'
                        }`}
                      >
                        <span>{format}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-brand-red shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Current Preparation Level */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  What is your current preparation level?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(['Beginner', 'Intermediate', 'Advanced', 'Revision'] as const).map((lvl) => (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => setPreparationLevel(lvl)}
                      className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                        preparationLevel === lvl
                          ? 'border-brand-red bg-brand-red text-white shadow-red-glow'
                          : 'border-slate-200 dark:border-[#252932] bg-white dark:bg-[#15171C] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1A1D23]'
                      }`}
                    >
                      {lvl === 'Revision' ? 'Already Preparing (Revision)' : lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Daily Availability & Target Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Daily Study Availability</span>
                  </label>
                  <select
                    value={dailyStudyAvailability}
                    onChange={(e) => setDailyStudyAvailability(e.target.value)}
                    className="w-full h-11 px-3.5 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                  >
                    <option value="Less than 1 hour">Less than 1 hour</option>
                    <option value="1–2 hours">1–2 hours</option>
                    <option value="2–4 hours">2–4 hours (Recommended)</option>
                    <option value="4–6 hours">4–6 hours</option>
                    <option value="More than 6 hours">More than 6 hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Target Examination Year</span>
                  </label>
                  <select
                    value={targetYear}
                    onChange={(e) => setTargetYear(e.target.value)}
                    className="w-full h-11 px-3.5 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
                  >
                    <option value="2026">2026 (Upcoming cycle)</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────────
            STEP 5: Confirmation & Final Review
           ───────────────────────────────────────────────────────────────── */}
        {currentStep === 5 && (
          <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-6 sm:p-10 shadow-sm animate-fade-in-smooth">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold mb-4">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Step 5 of 5 • Final Review</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC] mb-2">
              Your Learning Space Is Ready!
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A7AFBD] mb-8 leading-relaxed">
              We have configured your personalized dashboard and tailored your study environment for {selectedCourseMeta.name}.
            </p>

            {/* Summary Details Card */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] space-y-4 mb-8">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#252932]">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Student Name</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">{fullName}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Level</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">{educationLevel}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#252932]">
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Selected Primary Goal</div>
                  <div className="text-sm font-bold text-brand-red dark:text-red-400 flex items-center gap-1.5 mt-0.5">
                    <GraduationCap className="w-4 h-4" />
                    <span>{selectedCourseMeta.name}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Target Year</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">{targetYear}</div>
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Selected Focus Areas ({selectedSubjects.length} subjects/units)
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSubjects.map((subId) => {
                    const match = activeCourseSubjects.find((s) => s.id === subId);
                    return (
                      <span
                        key={subId}
                        className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white dark:bg-[#1E222B] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#2A2E39]"
                      >
                        {match ? match.name : subId}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span>Pace: <strong>{preparationLevel}</strong></span>
                <span>Daily Availability: <strong>{dailyStudyAvailability}</strong></span>
                <span>Language: <strong>{preferredLanguage}</strong></span>
              </div>
            </div>
          </div>
        )}

        </div>

        {/* Step Navigation Actions */}
        <div className="mt-8 flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-[#252932] bg-white dark:bg-[#111318] text-xs sm:text-sm font-bold text-slate-700 dark:text-[#A7AFBD] hover:bg-slate-50 dark:hover:bg-[#1A1D23] transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-red-glow hover:-translate-y-0.5 transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleConfirmAndFinish}
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Configuring Dashboard...</span>
                </>
              ) : (
                <>
                  <span>Launch My Personalized Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-400">
        TechnoEdu Personalized Onboarding Engine • Safe &amp; Privacy-Conscious
      </footer>
    </div>
  );
};
