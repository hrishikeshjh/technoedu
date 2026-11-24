import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { COURSE_CONFIGS, CourseConfig } from '../lib/personalization/courseConfig';
import { Breadcrumb } from '../components/common/Breadcrumb';
import { CourseSwitcher } from '../components/common/CourseSwitcher';
import {
  BookOpen,
  ArrowLeft,
  ArrowRight,
  FileCheck2,
  FileText,
  Sparkles,
  ExternalLink,
  GraduationCap,
  PlayCircle,
  Award,
  Layers,
  CheckCircle2,
  Clock,
  Target,
  Search,
  Check,
  AlertCircle,
  HelpCircle,
  Loader2,
  Download,
} from 'lucide-react';

interface MockQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const SAMPLE_MOCKS_DATA: Record<string, { title: string; durationMins: number; totalMarks: number; questions: MockQuestion[] }> = {
  'ugc-net': {
    title: 'UGC-NET Paper 1 All-India CBT Mock Test',
    durationMins: 60,
    totalMarks: 100,
    questions: [
      {
        id: 1,
        question: 'Which of the following levels of teaching emphasizes critical thinking and independent problem-solving?',
        options: ['Memory Level', 'Understanding Level', 'Reflective Level', 'Autonomous Development Level'],
        correctIndex: 2,
        explanation: 'Reflective level of teaching (Hunt model) is highest in the cognitive hierarchy, focusing on independent problem solving and critical reflection.',
      },
      {
        id: 2,
        question: 'In Indian Logic (Nyaya), which source of valid knowledge (Pramana) involves inference based on universal relation (Vyapti)?',
        options: ['Pratyaksha (Perception)', 'Anumana (Inference)', 'Upamana (Comparison)', 'Shabda (Testimony)'],
        correctIndex: 1,
        explanation: 'Anumana is knowledge derived through prior perception and the invariable concomitance (Vyapti) between middle term (Hetu) and major term (Sadhya).',
      },
      {
        id: 3,
        question: 'Which digital initiative of the Ministry of Education provides free open postgraduate e-books and curriculum modules?',
        options: ['SWAYAM PRABHA', 'e-PG Pathshala', 'NAD (National Academic Depository)', 'Virtual Labs'],
        correctIndex: 1,
        explanation: 'e-PG Pathshala is an initiative by INFLIBNET/UGC providing high-quality, curriculum-based interactive content across 70+ PG disciplines.',
      },
      {
        id: 4,
        question: 'What is the full form of NPTEL in the context of Indian online higher education?',
        options: [
          'National Programme on Technology Enhanced Learning',
          'National Policy for Technological Educational Leadership',
          'Network Platform for Technical & Engineering Lectures',
          'National Portal for Teaching Excellence & Logistics',
        ],
        correctIndex: 0,
        explanation: 'NPTEL stands for National Programme on Technology Enhanced Learning, initiated by IITs and IISc.',
      },
      {
        id: 5,
        question: 'Under Sustainable Development Goals (SDGs), Goal 4 specifically addresses which dimension?',
        options: ['Clean Water and Sanitation', 'Quality Education', 'Zero Hunger', 'Affordable and Clean Energy'],
        correctIndex: 1,
        explanation: 'SDG 4 is dedicated to ensuring inclusive and equitable quality education and promoting lifelong learning opportunities for all.',
      },
    ],
  },

  'neet-ug': {
    title: 'NEET UG Full Syllabus Simulation Test',
    durationMins: 60,
    totalMarks: 100,
    questions: [
      {
        id: 1,
        question: 'Which cell organelle is known as the site of aerobic respiration and ATP production?',
        options: ['Ribosome', 'Mitochondria', 'Golgi Apparatus', 'Endoplasmic Reticulum'],
        correctIndex: 1,
        explanation: 'Mitochondria produce cellular energy through oxidative phosphorylation and Krebs cycle inside the mitochondrial matrix.',
      },
      {
        id: 2,
        question: 'In Human Physiology, which hormone regulates calcium homeostasis by promoting calcium reabsorption in kidney tubules?',
        options: ['Thyroxine', 'Parathyroid Hormone (PTH)', 'Insulin', 'Glucagon'],
        correctIndex: 1,
        explanation: 'PTH increases blood Ca2+ levels by stimulating bone resorption and renal reabsorption of calcium.',
      },
      {
        id: 3,
        question: 'What is the SI unit of Magnetic Flux in Physics?',
        options: ['Tesla', 'Weber', 'Henry', 'Gauss'],
        correctIndex: 1,
        explanation: 'Weber (Wb) is the SI unit of magnetic flux, equivalent to Volt-seconds (T·m²).',
      },
      {
        id: 4,
        question: 'Which of the following compounds exhibits optical isomerism due to a chiral carbon?',
        options: ['Ethanol', '2-Chlorobutane', '1-Propanol', 'Acetone'],
        correctIndex: 1,
        explanation: 'In 2-Chlorobutane, the second carbon is attached to four distinct groups (-H, -Cl, -CH3, -C2H5), making it a stereocenter.',
      },
      {
        id: 5,
        question: 'During photosynthesis in C4 plants, the primary carbon dioxide acceptor is:',
        options: ['RuBP', 'Phosphoenolpyruvate (PEP)', 'Oxaloacetate', 'Malate'],
        correctIndex: 1,
        explanation: 'In mesophyll cells of C4 plants, PEP is the primary CO2 acceptor catalyzed by PEP carboxylase.',
      },
    ],
  },

  'jee-main': {
    title: 'JEE Main Full CBT Simulation Test',
    durationMins: 60,
    totalMarks: 100,
    questions: [
      {
        id: 1,
        question: 'The value of the limit lim(x->0) [(sin x - x) / x³] is equal to:',
        options: ['0', '1/6', '-1/6', '1/3'],
        correctIndex: 2,
        explanation: 'Using Taylor expansion: sin x = x - x³/6 + O(x⁵). (sin x - x)/x³ = -1/6.',
      },
      {
        id: 2,
        question: 'In mechanics, what is the moment of inertia of a solid cylinder of mass M and radius R about its longitudinal axis?',
        options: ['MR²', '1/2 MR²', '2/5 MR²', '1/12 MR²'],
        correctIndex: 1,
        explanation: 'The moment of inertia of a uniform solid cylinder around its central axis is I = 1/2 MR².',
      },
      {
        id: 3,
        question: 'For a spontaneous process at constant temperature and pressure, the Gibbs free energy change (ΔG) must be:',
        options: ['Positive (ΔG > 0)', 'Negative (ΔG < 0)', 'Zero (ΔG = 0)', 'Independent of temperature'],
        correctIndex: 1,
        explanation: 'A negative change in Gibbs free energy (ΔG < 0) is the thermodynamic criterion for spontaneity.',
      },
      {
        id: 4,
        question: 'The number of real solutions of the equation e^(x) = x is:',
        options: ['0', '1', '2', 'Infinitely many'],
        correctIndex: 0,
        explanation: 'Since e^x > x for all real x (min difference occurs at x=1 where e - 1 > 0), the graphs never intersect in real numbers.',
      },
      {
        id: 5,
        question: 'Which of the following coordination compounds exhibits d²sp³ inner orbital hybridization?',
        options: ['[Fe(CN)6]³⁻', '[NiCl4]²⁻', '[Zn(NH3)4]²⁺', '[CoF6]³⁻'],
        correctIndex: 0,
        explanation: 'Strong field ligand CN⁻ causes pairing of d electrons in Fe³⁺ (3d⁵), leaving two 3d orbitals vacant for d²sp³ hybridization.',
      },
    ],
  },
};

export const CourseHubPage: React.FC = () => {
  const { slug, subject: subjectSlug } = useParams<{ slug?: string; subject?: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token, activeCourseId, switchActiveCourse, enrollCourse, enrollments, isAuthenticated } = useAuth();

  const [courseData, setCourseData] = useState<any | null>(null);
  const [resources, setResources] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'all' | 'pdf' | 'notes' | 'pyq' | 'mock'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Interactive Mock Test State
  const [activeMockModal, setActiveMockModal] = useState(false);
  const [mockUserAnswers, setMockUserAnswers] = useState<Record<number, number>>({});
  const [mockResult, setMockResult] = useState<{ score: number; total: number; accuracy: number } | null>(null);
  const [isSubmittingMock, setIsSubmittingMock] = useState(false);

  const activeSlug = slug || activeCourseId || 'ugc-net';
  const courseConfig: CourseConfig | null = COURSE_CONFIGS[activeSlug] || null;

  // Determine section view based on URL pathname
  const isSyllabusView = location.pathname.includes('/subjects');
  const isPyqView = location.pathname.includes('/pyq');
  const isMockView = location.pathname.includes('/mock-tests');
  const isResourcesView = location.pathname.includes('/resources');

  const isEnrolledInThisCourse = enrollments.some((e) => e.courseId === activeSlug);

  useEffect(() => {
    const fetchCourseAndResources = async () => {
      setIsLoading(true);
      try {
        // Fetch course info
        const courseRes = await fetch(`/api/courses/${activeSlug}`);
        if (courseRes.ok) {
          const cData = await courseRes.json();
          setCourseData(cData.course);
        }

        // Fetch course-isolated resources
        const resQuery = new URLSearchParams({ courseId: activeSlug });
        if (isPyqView) resQuery.set('type', 'pyq');
        if (isMockView) resQuery.set('type', 'mock');
        if (activeTab !== 'all') resQuery.set('type', activeTab);
        if (searchQuery.trim()) resQuery.set('search', searchQuery.trim());

        const resRes = await fetch(`/api/resources?${resQuery.toString()}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (resRes.ok) {
          const rData = await resRes.json();
          setResources(rData.resources || []);
        }
      } catch (err) {
        console.error('Error fetching course data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourseAndResources();
  }, [activeSlug, isPyqView, isMockView, activeTab, searchQuery, token]);

  const handleEnrollAndActivate = async () => {
    if (!isAuthenticated) {
      navigate('/signup');
      return;
    }
    await enrollCourse(activeSlug);
    await switchActiveCourse(activeSlug);
  };

  const handleStartMockTest = () => {
    setMockUserAnswers({});
    setMockResult(null);
    setActiveMockModal(true);
  };

  const handleSelectMockOption = (questionId: number, optionIdx: number) => {
    setMockUserAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleSubmitMockTest = async () => {
    const mockDataset = SAMPLE_MOCKS_DATA[activeSlug] || SAMPLE_MOCKS_DATA['ugc-net'];
    const totalQuestions = mockDataset.questions.length;
    let correctCount = 0;

    for (const q of mockDataset.questions) {
      if (mockUserAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    }

    const marksPerQ = Math.round(mockDataset.totalMarks / totalQuestions);
    const score = correctCount * marksPerQ;
    const accuracy = parseFloat(((correctCount / totalQuestions) * 100).toFixed(1));

    setIsSubmittingMock(true);
    try {
      if (token) {
        await fetch('/api/mock/attempt', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            courseId: activeSlug,
            mockTitle: mockDataset.title,
            score,
            totalMarks: mockDataset.totalMarks,
          }),
        });
      }
      setMockResult({ score, total: mockDataset.totalMarks, accuracy });
    } catch (err) {
      console.error('Error recording mock attempt:', err);
    } finally {
      setIsSubmittingMock(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#08090B] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-brand-red animate-spin" />
      </div>
    );
  }

  const mockDataset = SAMPLE_MOCKS_DATA[activeSlug] || SAMPLE_MOCKS_DATA['ugc-net'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] pt-6 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb & Navigation Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Breadcrumb
            items={[
              { label: 'Home', path: '/' },
              { label: 'Courses', path: '/courses' },
              { label: courseConfig?.name || activeSlug },
              ...(subjectSlug ? [{ label: subjectSlug }] : []),
            ]}
          />
          {isAuthenticated && <CourseSwitcher />}
        </div>

        {/* Hero Header */}
        <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/40 text-brand-red flex items-center justify-center shrink-0">
                <GraduationCap className="w-7 h-7" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900 text-white dark:bg-[#252932]">
                    {courseConfig?.shortCode || activeSlug.toUpperCase()}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-[#1E222B] text-slate-600 dark:text-[#A7AFBD]">
                    {courseConfig?.category || 'Competitive examinations'}
                  </span>
                  {isEnrolledInThisCourse && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
                      Enrolled
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC]">
                  {courseConfig?.name || courseData?.name || activeSlug}
                </h1>

                <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A7AFBD] mt-1 max-w-2xl leading-relaxed">
                  {courseConfig?.description || courseData?.description}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
              {isEnrolledInThisCourse ? (
                <Link
                  to="/dashboard"
                  className="px-4 py-2.5 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Open Personalized Dashboard</span>
                </Link>
              ) : (
                <button
                  onClick={handleEnrollAndActivate}
                  className="px-5 py-2.5 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold transition-all shadow-red-glow flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Enroll in this Course</span>
                </button>
              )}

              <button
                onClick={handleStartMockTest}
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#252932] bg-white dark:bg-[#15171C] text-slate-800 dark:text-[#F8FAFC] text-xs font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                <Target className="w-4 h-4 text-brand-red" />
                <span>Simulate CBT Mock Test</span>
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-100 dark:border-[#252932]">
            <Link
              to={`/courses/${activeSlug}`}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                !isSyllabusView && !isPyqView && !isMockView && !isResourcesView
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-[#A7AFBD] hover:bg-slate-100 dark:hover:bg-[#1E222B]'
              }`}
            >
              Overview &amp; Resources
            </Link>

            <Link
              to={`/courses/${activeSlug}/subjects`}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                isSyllabusView
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-[#A7AFBD] hover:bg-slate-100 dark:hover:bg-[#1E222B]'
              }`}
            >
              Complete Syllabus &amp; Units
            </Link>

            <Link
              to={`/courses/${activeSlug}/pyq`}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                isPyqView
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-[#A7AFBD] hover:bg-slate-100 dark:hover:bg-[#1E222B]'
              }`}
            >
              Previous Year Questions (PYQs)
            </Link>

            <Link
              to={`/courses/${activeSlug}/mock-tests`}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                isMockView
                  ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                  : 'text-slate-600 dark:text-[#A7AFBD] hover:bg-slate-100 dark:hover:bg-[#1E222B]'
              }`}
            >
              CBT Mock Tests
            </Link>
          </div>
        </div>

        {/* =====================================================================
            VIEW 1: SYLLABUS & UNITS BREAKDOWN
           ===================================================================== */}
        {isSyllabusView && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                  Official {courseConfig?.name} Syllabus Modules
                </h2>
                <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                  Structured syllabus hierarchy with high-yield units and topic notes
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(courseData?.subjects || courseConfig?.defaultSubjects || []).map((sub: any) => (
                <div
                  key={sub.id}
                  className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-6 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-[#F8FAFC]">
                      {sub.name}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 dark:bg-red-950/40 text-brand-red shrink-0">
                      {sub.slug}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-[#737B89] leading-relaxed mb-4">
                    {sub.description}
                  </p>

                  {/* Topics List */}
                  {sub.topics && sub.topics.length > 0 && (
                    <div className="space-y-2 mb-4 pt-3 border-t border-slate-100 dark:border-[#252932]">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        High-Yield Topics
                      </div>
                      <div className="space-y-1.5">
                        {sub.topics.map((t: any) => (
                          <div
                            key={t.id}
                            className="p-2 rounded-lg bg-slate-50 dark:bg-[#15171C] text-xs font-medium text-slate-700 dark:text-[#A7AFBD] flex items-center justify-between"
                          >
                            <span>{t.name}</span>
                            <CheckCircle2 className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Link
                    to={`/courses/${activeSlug}/resources?subjectId=${sub.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red hover:underline"
                  >
                    <span>View Study Materials</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =====================================================================
            VIEW 2: CBT MOCK TESTS & SIMULATION
           ===================================================================== */}
        {isMockView && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                  {courseConfig?.name} CBT Mock Test Series
                </h2>
                <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                  Exam-condition test drills with verified answer keys and instant accuracy tracking
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-[#252932]">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 text-xs font-bold mb-2">
                    <Target className="w-3.5 h-3.5" />
                    <span>Real Interactive Simulation</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-[#F8FAFC]">
                    {mockDataset.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                    <span>{mockDataset.questions.length} Questions</span>
                    <span>•</span>
                    <span>{mockDataset.totalMarks} Total Marks</span>
                    <span>•</span>
                    <span>{mockDataset.durationMins} Mins Duration</span>
                  </div>
                </div>

                <button
                  onClick={handleStartMockTest}
                  className="px-6 py-3 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold shadow-red-glow hover:-translate-y-0.5 transition-all self-start sm:self-auto"
                >
                  Start Test Now
                </button>
              </div>

              <div className="pt-6">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
                  Test Instructions &amp; Marking Scheme
                </h4>
                <ul className="space-y-2 text-xs text-slate-500 dark:text-[#A7AFBD]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Timer starts immediately upon launching test simulator.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Score and accuracy are saved to your profile progress in real-time upon submission.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Detailed answer rationales and distractor analyses provided after test completion.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            VIEW 3: DEFAULT OVERVIEW & LEARNING RESOURCES
           ===================================================================== */}
        {(!isSyllabusView && !isMockView) && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                  {isPyqView ? 'Official Previous Year Papers (PYQs)' : 'Course Learning Resources'}
                </h2>
                <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                  Verified open educational materials curated strictly for {courseConfig?.name}
                </p>
              </div>

              {/* Resource Filter Tabs */}
              {!isPyqView && (
                <div className="flex flex-wrap gap-1.5">
                  {(['all', 'pdf', 'notes', 'pyq', 'mock'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                        activeTab === tab
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                          : 'bg-white dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] text-slate-600 dark:text-[#A7AFBD]'
                      }`}
                    >
                      {tab === 'all' ? 'All' : tab.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Resources List */}
            {resources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {resources.map((res) => (
                  <div
                    key={res.id}
                    className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-red-50 dark:bg-red-950/40 text-brand-red">
                          {res.resource_type}
                        </span>
                        <span className="text-[10px] font-medium text-slate-400">
                          {res.difficulty}
                        </span>
                      </div>

                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] mb-2 line-clamp-2">
                        {res.title}
                      </h3>

                      <p className="text-xs text-slate-500 dark:text-[#737B89] line-clamp-2 mb-4">
                        {res.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-[#252932] flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 truncate max-w-[140px]">
                        {res.subject_name || courseConfig?.name}
                      </span>

                      {res.file_url ? (
                        <a
                          href={res.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-brand-red hover:underline"
                        >
                          <span>Open Resource</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <button
                          onClick={handleStartMockTest}
                          className="inline-flex items-center gap-1 text-xs font-bold text-brand-red hover:underline"
                        >
                          <span>Start Simulation</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-8 text-center">
                <BookOpen className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  No resources matching this filter.
                </p>
              </div>
            )}
          </div>
        )}

      </div>

      {/* =====================================================================
          INTERACTIVE CBT MOCK TEST RUNNER MODAL
         ===================================================================== */}
      {activeMockModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-3xl w-full max-h-[90vh] bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-smooth">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-[#252932] flex items-center justify-between bg-slate-50 dark:bg-[#15171C]">
              <div>
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-[#F8FAFC]">
                  {mockDataset.title}
                </h3>
                <p className="text-[11px] text-slate-500">
                  {mockDataset.questions.length} Questions • 60 Minutes Simulation
                </p>
              </div>
              <button
                onClick={() => setActiveMockModal(false)}
                className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-[#252932] text-slate-600 dark:text-slate-400 hover:bg-slate-100"
              >
                Close
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              {mockResult ? (
                /* Results View */
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 mx-auto flex items-center justify-center mb-4">
                    <Award className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                    Test Completed!
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-[#A7AFBD] mb-6">
                    Your results have been recorded to your learning profile and dashboard.
                  </p>

                  <div className="grid grid-cols-3 gap-4 max-w-md mx-auto mb-6">
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932]">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Score</div>
                      <div className="text-xl font-bold text-brand-red">{mockResult.score} / {mockResult.total}</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932]">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Accuracy</div>
                      <div className="text-xl font-bold text-emerald-600">{mockResult.accuracy}%</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932]">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Attempted</div>
                      <div className="text-xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                        {Object.keys(mockUserAnswers).length} / {mockDataset.questions.length}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveMockModal(false);
                      navigate('/dashboard');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-darkred transition-all"
                  >
                    Return to Dashboard
                  </button>
                </div>
              ) : (
                /* Question List */
                mockDataset.questions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-[#252932] bg-slate-50/50 dark:bg-[#15171C]/50"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-[#252932] text-slate-700 dark:text-slate-300">
                        Q{idx + 1}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-[#F8FAFC] mb-4">
                      {q.question}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = mockUserAnswers[q.id] === optIdx;
                        return (
                          <div
                            key={optIdx}
                            onClick={() => handleSelectMockOption(q.id, optIdx)}
                            className={`cursor-pointer p-3 rounded-xl border text-xs flex items-center gap-3 transition-colors ${
                              isSelected
                                ? 'border-brand-red bg-red-50/70 dark:bg-red-950/30 text-brand-red dark:text-red-400 font-bold'
                                : 'border-slate-200 dark:border-[#252932] bg-white dark:bg-[#111318] text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                              isSelected ? 'bg-brand-red text-white' : 'border border-slate-300 dark:border-slate-600 text-slate-500'
                            }`}>
                              {String.fromCharCode(65 + optIdx)}
                            </div>
                            <span>{opt}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Modal Footer */}
            {!mockResult && (
              <div className="p-4 bg-slate-50 dark:bg-[#15171C] border-t border-slate-200 dark:border-[#252932] flex items-center justify-between">
                <span className="text-xs font-medium text-slate-500">
                  {Object.keys(mockUserAnswers).length} of {mockDataset.questions.length} answered
                </span>
                <button
                  onClick={handleSubmitMockTest}
                  disabled={isSubmittingMock}
                  className="px-6 py-2.5 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold transition-all shadow-xs disabled:opacity-50"
                >
                  {isSubmittingMock ? 'Recording Score...' : 'Submit Mock Test'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
