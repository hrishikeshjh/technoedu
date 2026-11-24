import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchDashboard, DashboardData, togglePlannerTaskApi, recordProgressApi } from '../lib/personalization/userLearningProfile';
import { COURSE_CONFIGS } from '../lib/personalization/courseConfig';
import { CourseSwitcher } from '../components/common/CourseSwitcher';
import { Breadcrumb } from '../components/common/Breadcrumb';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Compass,
  FileCheck2,
  FileText,
  GraduationCap,
  Layers,
  PlayCircle,
  Plus,
  Sparkles,
  TrendingUp,
  Award,
  ArrowRight,
  ExternalLink,
  Target,
  BarChart3,
  Calendar,
  Loader2,
  AlertCircle,
  Check,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, token, activeCourseId, isAuthenticated, isLoading: authLoading } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  const loadDashboard = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetchDashboard(token);
      if ('needsOnboarding' in res && res.needsOnboarding) {
        navigate('/onboarding', { replace: true });
        return;
      }
      setData(res as DashboardData);
    } catch (err: any) {
      setError(err.message || 'Failed to load personalized dashboard');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated && !token) {
      navigate('/login');
      return;
    }
    loadDashboard();
  }, [activeCourseId, isAuthenticated, token, authLoading]);

  const handleToggleTask = async (taskId: string, currentStatus: number) => {
    if (!data) return;
    const newStatus = currentStatus === 1 ? false : true;
    try {
      await togglePlannerTaskApi(taskId, newStatus, token);
      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          planner: {
            ...prev.planner,
            tasks: prev.planner.tasks.map((t) =>
              t.id === taskId ? { ...t, is_completed: newStatus ? 1 : 0 } : t
            ),
          },
        };
      });
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim() || !data) return;

    try {
      const res = await fetch('/api/planner/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId: data.activeCourse.id,
          title: newTaskTitle.trim(),
          scheduledDate: new Date().toISOString().split('T')[0],
          durationMinutes: 45,
        }),
      });
      const resData = await res.json();
      if (res.ok) {
        setNewTaskTitle('');
        setIsAddingTask(false);
        loadDashboard();
      }
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  const handleMarkResourceComplete = async (resourceId: string) => {
    if (!data) return;
    try {
      await recordProgressApi(data.activeCourse.id, resourceId, 'completed', 100, token);
      loadDashboard();
    } catch (err) {
      console.error('Failed to update progress:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#08090B] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-brand-red animate-spin mx-auto mb-3" />
          <p className="text-xs font-bold text-slate-500 dark:text-[#A7AFBD]">
            Assembling your personalized learning space...
          </p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#08090B] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-2xl p-6 text-center">
          <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-3" />
          <h2 className="text-base font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
            Unable to Load Dashboard
          </h2>
          <p className="text-xs text-slate-500 dark:text-[#A7AFBD] mb-4">
            {error || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={loadDashboard}
            className="px-4 py-2 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-darkred transition-all"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const courseConfig = COURSE_CONFIGS[data.activeCourse.id] || null;
  const studentFirstName = data.user.fullName ? data.user.fullName.split(' ')[0] : 'Student';

  // Greeting by time of day
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] pt-6 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb & Switcher Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Breadcrumb
            items={[
              { label: 'Home', path: '/' },
              { label: 'Dashboard', path: '/dashboard' },
              { label: data.activeCourse.name },
            ]}
          />
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold text-slate-400 dark:text-[#737B89]">Active Goal:</span>
            <CourseSwitcher />
          </div>
        </div>

        {/* =====================================================================
            1. WELCOME BANNER (Course Isolated)
           ===================================================================== */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-[#111318] dark:via-[#161920] dark:to-[#111318] text-white p-6 sm:p-8 border border-slate-800 dark:border-[#252932] shadow-sm">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-red/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/20 border border-brand-red/30 text-rose-300 text-xs font-bold mb-3">
                <Sparkles className="w-3.5 h-3.5 text-brand-red" />
                <span>{data.activeCourse.name} Focused Learning Space</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
                {greeting}, {studentFirstName}!
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Continue your <strong>{data.activeCourse.name}</strong> preparation. All study modules, syllabus roadmaps, and mock test recommendations are strictly curated for this examination.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/10 text-slate-200">
                  Target: {data.learningProfile.targetYear}
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/10 text-slate-200">
                  Pace: {data.learningProfile.preparationLevel}
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/10 text-slate-200">
                  Daily: {data.learningProfile.dailyStudyAvailability}
                </span>
              </div>
            </div>

            <div className="shrink-0 flex flex-wrap sm:flex-col gap-2.5">
              <Link
                to={`/courses/${data.activeCourse.slug}/subjects`}
                className="px-4 py-2.5 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold flex items-center justify-center gap-2 shadow-red-glow hover:-translate-y-0.5 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>View Full Syllabus</span>
              </Link>

              <Link
                to={`/courses/${data.activeCourse.slug}/mock-tests`}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all border border-white/10"
              >
                <Target className="w-4 h-4" />
                <span>Take Mock Test</span>
              </Link>
            </div>
          </div>
        </div>

        {/* =====================================================================
            2. CONTINUE LEARNING & STUDY PLANNER (2-column layout)
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Continue Learning Widget (7 cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-950/40 text-brand-red flex items-center justify-center">
                    <PlayCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">
                      Continue Learning
                    </h2>
                    <p className="text-[11px] text-slate-500 dark:text-[#737B89]">
                      Pick up right where you left off
                    </p>
                  </div>
                </div>
                <Link
                  to={`/courses/${data.activeCourse.slug}/resources`}
                  className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1"
                >
                  <span>All Materials</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {data.continueLearning ? (
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] mb-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-red-50 dark:bg-red-950/40 text-brand-red">
                        {data.continueLearning.resource_type || 'Study Module'}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] mt-1.5 line-clamp-1">
                        {data.continueLearning.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-[#A7AFBD] mt-0.5">
                        {data.continueLearning.subject_name || data.activeCourse.name}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5 mt-3">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                      <span>Progress</span>
                      <span>{data.continueLearning.progress || 10}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-[#252932] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-brand-red h-full rounded-full transition-all"
                        style={{ width: `${Math.max(data.continueLearning.progress || 10, 5)}%` }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-slate-50 dark:bg-[#15171C] border border-dashed border-slate-200 dark:border-[#252932] text-center mb-4">
                  <BookOpen className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Ready to begin your first topic?
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-[#737B89] mt-0.5">
                    Start with your foundational {data.activeCourse.name} syllabus units.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-[#252932]">
              <Link
                to={`/courses/${data.activeCourse.slug}/subjects`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>Resume Study Queue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to={`/courses/${data.activeCourse.slug}/pyq`}
                className="text-xs font-semibold text-slate-600 dark:text-[#A7AFBD] hover:text-brand-red transition-colors"
              >
                Solve PYQs →
              </Link>
            </div>
          </div>

          {/* Study Planner Widget (5 cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-6 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">
                      Daily Study Planner
                    </h2>
                    <p className="text-[11px] text-slate-500 dark:text-[#737B89]">
                      Target schedule for {data.planner.today}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddingTask(!isAddingTask)}
                  className="w-7 h-7 rounded-lg border border-slate-200 dark:border-[#252932] flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-brand-red transition-colors"
                  title="Add custom task"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {isAddingTask && (
                <form onSubmit={handleAddTask} className="mb-3 flex gap-2">
                  <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Enter study task..."
                    className="flex-1 h-9 px-3 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-xs text-slate-900 dark:text-[#F8FAFC] focus:outline-none focus:border-brand-red"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-3 h-9 bg-brand-red text-white text-xs font-bold rounded-xl"
                  >
                    Add
                  </button>
                </form>
              )}

              {/* Tasks List */}
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {data.planner.tasks.length > 0 ? (
                  data.planner.tasks.map((task) => {
                    const isDone = task.is_completed === 1;
                    return (
                      <div
                        key={task.id}
                        onClick={() => handleToggleTask(task.id, task.is_completed)}
                        className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                          isDone
                            ? 'bg-slate-50/70 dark:bg-[#15171C]/50 border-slate-100 dark:border-[#1E222B] text-slate-400 line-through'
                            : 'bg-white dark:bg-[#15171C] border-slate-200 dark:border-[#252932] text-slate-800 dark:text-[#F8FAFC] hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className={`w-4 h-4 rounded flex items-center justify-center shrink-0 ${
                            isDone ? 'bg-emerald-500 text-white' : 'border border-slate-300 dark:border-slate-600'
                          }`}>
                            {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs font-medium truncate">{task.title}</span>
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400 shrink-0">
                          {task.duration_minutes}m
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs text-slate-400 py-4 text-center">
                    No tasks scheduled for today. Add one above!
                  </p>
                )}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-[#252932] flex items-center justify-between text-xs text-slate-500">
              <span>{data.planner.tasks.filter((t) => t.is_completed === 1).length} of {data.planner.tasks.length} tasks completed</span>
            </div>
          </div>
        </div>

        {/* =====================================================================
            3. PROGRESS OVERVIEW (Real Attempt Data Only - NEVER Fake Stats)
           ===================================================================== */}
        <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">
                  Progress Overview
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-[#737B89]">
                  Verified course analytics based strictly on your activity
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Metric 1: Topics Remaining / Completed */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#15171C] border border-slate-100 dark:border-[#252932]">
              <div className="text-[11px] font-bold text-slate-400 dark:text-[#737B89] uppercase tracking-wider mb-1">
                Topics Completed
              </div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-[#F8FAFC]">
                {data.progressOverview.topicsCompleted}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-[#737B89] mt-1">
                {data.progressOverview.topicsInProgress} in progress
              </p>
            </div>

            {/* Metric 2: Study Sessions */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#15171C] border border-slate-100 dark:border-[#252932]">
              <div className="text-[11px] font-bold text-slate-400 dark:text-[#737B89] uppercase tracking-wider mb-1">
                Study Sessions
              </div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-[#F8FAFC]">
                {data.progressOverview.studySessions}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-[#737B89] mt-1">
                Active study days
              </p>
            </div>

            {/* Metric 3: Mock Tests Attempted */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#15171C] border border-slate-100 dark:border-[#252932]">
              <div className="text-[11px] font-bold text-slate-400 dark:text-[#737B89] uppercase tracking-wider mb-1">
                Mock Tests Attempted
              </div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-[#F8FAFC]">
                {data.progressOverview.mockTestsAttempted}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-[#737B89] mt-1">
                {data.progressOverview.mockTestsAttempted === 0 ? 'No attempts yet' : 'Real test attempts'}
              </p>
            </div>

            {/* Metric 4: Average Accuracy */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#15171C] border border-slate-100 dark:border-[#252932]">
              <div className="text-[11px] font-bold text-slate-400 dark:text-[#737B89] uppercase tracking-wider mb-1">
                Test Accuracy
              </div>
              <div className="text-2xl font-extrabold text-slate-900 dark:text-[#F8FAFC]">
                {data.progressOverview.hasRealAttemptData
                  ? data.progressOverview.averageAccuracy
                  : '—'}
              </div>
              <p className="text-[11px] text-slate-500 dark:text-[#737B89] mt-1">
                {data.progressOverview.hasRealAttemptData
                  ? 'Based on completed tests'
                  : 'Awaiting first test attempt'}
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================================
            4. RECOMMENDED FOR YOU (Strictly Isolated to Active Course)
           ===================================================================== */}
        <div>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-[#F8FAFC]">
                Recommended For Your {data.activeCourse.name} Preparation
              </h2>
              <p className="text-xs text-slate-500 dark:text-[#A7AFBD]">
                Curated based on your selected subjects and {data.learningProfile.preparationLevel} level
              </p>
            </div>
            <Link
              to={`/courses/${data.activeCourse.slug}/resources`}
              className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1"
            >
              <span>Explore All Resources</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.recommendations.map((resource) => (
              <div
                key={resource.id}
                className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-red-50 dark:bg-red-950/40 text-brand-red dark:text-red-400">
                      {resource.resource_type}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      {resource.difficulty}
                    </span>
                  </div>

                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-[#F8FAFC] group-hover:text-brand-red transition-colors mb-2 line-clamp-2">
                    {resource.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-[#737B89] line-clamp-2 mb-4 leading-relaxed">
                    {resource.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-[#252932] flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-400 truncate max-w-[150px]">
                    {resource.subject_name || data.activeCourse.name}
                  </span>

                  {resource.file_url ? (
                    <a
                      href={resource.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => handleMarkResourceComplete(resource.id)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-red hover:underline"
                    >
                      <span>Access Material</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <Link
                      to={`/courses/${data.activeCourse.slug}/resources`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-red hover:underline"
                    >
                      <span>Study Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =====================================================================
            5. QUICK SUBJECT MATRIX
           ===================================================================== */}
        <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">
                {data.activeCourse.name} Syllabus Subjects
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-[#737B89]">
                Structured modules for complete syllabus coverage
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {data.subjects.map((sub) => (
              <Link
                key={sub.id}
                to={`/courses/${data.activeCourse.slug}/subjects/${sub.slug}`}
                className="p-4 rounded-xl border border-slate-200 dark:border-[#252932] bg-slate-50/50 dark:bg-[#15171C]/50 hover:bg-slate-50 dark:hover:bg-[#1A1D23] transition-all group"
              >
                <div className="font-bold text-xs text-slate-900 dark:text-[#F8FAFC] group-hover:text-brand-red transition-colors mb-1 truncate">
                  {sub.name}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-[#737B89] line-clamp-2">
                  {sub.description}
                </p>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
