import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { COURSE_CONFIGS } from '../lib/personalization/courseConfig';
import { Breadcrumb } from '../components/common/Breadcrumb';
import {
  Settings,
  GraduationCap,
  Plus,
  Trash2,
  Check,
  AlertTriangle,
  Sparkles,
  BookOpen,
  ArrowRight,
  Clock,
  Calendar,
  Loader2,
  CheckCircle2,
} from 'lucide-react';

const ALL_AVAILABLE_COURSES = [
  { id: 'ugc-net', name: 'UGC-NET & JRF', desc: 'Assistant Professor & Ph.D. Entrance' },
  { id: 'neet-ug', name: 'NEET UG', desc: 'Undergraduate Medical Entrance (MBBS/BDS)' },
  { id: 'jee-main', name: 'JEE Main & Advanced', desc: 'Premier Engineering Admission (IIT/NIT)' },
  { id: 'gate', name: 'GATE (Engineering)', desc: 'Graduate Aptitude Test for M.Tech & PSU' },
  { id: 'upsc-cse', name: 'UPSC Civil Services (CSE)', desc: 'IAS, IPS, IFS & Central Civil Services' },
  { id: 'cuet', name: 'CUET UG/PG', desc: 'Common University Entrance Test' },
  { id: 'comp-sci', name: 'Computer Science & AI', desc: 'Academic Curriculum in Software & ML' },
];

export const LearningSettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    activeCourseId,
    primaryCourseId,
    enrollments,
    changePrimaryCourse,
    enrollCourse,
    unenrollCourse,
    updateLearningPreferences,
    isAuthenticated,
    isLoading,
  } = useAuth();

  const [prepLevel, setPrepLevel] = useState<any>(user?.learningProfile?.preparationLevel || 'Intermediate');
  const [targetYear, setTargetYear] = useState<string>(user?.learningProfile?.targetYear || '2026');
  const [dailyHours, setDailyHours] = useState<string>(user?.learningProfile?.dailyStudyAvailability || '2–4 hours');
  const [isSaving, setIsSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modal State for Changing Primary Course
  const [showPrimaryModal, setShowPrimaryModal] = useState(false);
  const [pendingPrimaryCourseId, setPendingPrimaryCourseId] = useState<string | null>(null);

  // Enroll new course state
  const [selectedCourseToEnroll, setSelectedCourseToEnroll] = useState<string>('');

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, navigate]);

  const handleSavePreferences = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMsg(null);
    try {
      await updateLearningPreferences({
        preparationLevel: prepLevel,
        targetYear,
        dailyStudyAvailability: dailyHours,
      });
      setSuccessMsg('Learning preferences saved successfully.');
      setTimeout(() => setSuccessMsg(null), 3500);
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleConfirmPrimaryChange = async () => {
    if (!pendingPrimaryCourseId) return;
    setIsSaving(true);
    try {
      await changePrimaryCourse(pendingPrimaryCourseId);
      setShowPrimaryModal(false);
      setPendingPrimaryCourseId(null);
      setSuccessMsg('Primary examination changed. Your dashboard has been updated.');
      setTimeout(() => setSuccessMsg(null), 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEnrollCourse = async () => {
    if (!selectedCourseToEnroll) return;
    setIsSaving(true);
    try {
      await enrollCourse(selectedCourseToEnroll);
      setSelectedCourseToEnroll('');
      setSuccessMsg('Enrolled in additional course. You can switch to it from the top navigation bar.');
      setTimeout(() => setSuccessMsg(null), 3500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleUnenrollCourse = async (courseId: string) => {
    if (confirm('Are you sure you want to remove this secondary enrollment? Your progress for this course will remain preserved in the database.')) {
      setIsSaving(true);
      try {
        await unenrollCourse(courseId);
        setSuccessMsg('Course removed from your active enrollments.');
        setTimeout(() => setSuccessMsg(null), 3500);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSaving(false);
      }
    }
  };

  const unenrolledCourses = ALL_AVAILABLE_COURSES.filter(
    (c) => !enrollments.some((e) => e.courseId === c.id)
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] pt-6 pb-20 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'Learning Settings' },
          ]}
        />

        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC]">
            Course &amp; Learning Preferences
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A7AFBD] mt-1">
            Manage your enrolled courses, primary examination goal, and study availability.
          </p>
        </div>

        {successMsg && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-3 text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 animate-fade-in-smooth">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* =====================================================================
            1. PRIMARY COURSE SWITCHER (With Confirmation Dialog)
           ===================================================================== */}
        <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <GraduationCap className="w-5 h-5 text-brand-red" />
            <h2 className="text-base font-bold text-slate-900 dark:text-[#F8FAFC]">
              Primary Examination Goal
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-[#A7AFBD] mb-6 leading-relaxed">
            Your primary course dictates your default dashboard, main syllabus roadmap, and primary recommendations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {ALL_AVAILABLE_COURSES.map((course) => {
              const isPrimary = primaryCourseId === course.id;
              return (
                <div
                  key={course.id}
                  onClick={() => {
                    if (!isPrimary) {
                      setPendingPrimaryCourseId(course.id);
                      setShowPrimaryModal(true);
                    }
                  }}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                    isPrimary
                      ? 'border-brand-red bg-red-50/70 dark:bg-red-950/30 ring-2 ring-brand-red/20'
                      : 'border-slate-200 dark:border-[#252932] bg-white dark:bg-[#15171C] hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">
                      {course.name}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-[#737B89] mt-0.5">
                      {course.desc}
                    </div>
                  </div>

                  {isPrimary ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-red text-white flex items-center gap-1 shrink-0">
                      <Check className="w-3 h-3" />
                      <span>Primary</span>
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-slate-400 hover:text-brand-red shrink-0">
                      Set as Primary
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            2. SECONDARY ENROLLMENTS (Multiple Courses)
           ===================================================================== */}
        <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
            Active Enrollments ({enrollments.length})
          </h2>
          <p className="text-xs text-slate-500 dark:text-[#A7AFBD] mb-6">
            You can prepare for multiple examinations simultaneously. Switch between them instantly without losing progress.
          </p>

          <div className="space-y-3 mb-6">
            {enrollments.map((e) => (
              <div
                key={e.courseId}
                className="p-4 rounded-2xl border border-slate-200 dark:border-[#252932] bg-slate-50 dark:bg-[#15171C] flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">
                      {e.courseName}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      e.isPrimary
                        ? 'bg-red-50 text-brand-red dark:bg-red-950/40'
                        : 'bg-slate-200 dark:bg-[#252932] text-slate-600 dark:text-slate-300'
                    }`}>
                      {e.isPrimary ? 'Primary Goal' : 'Secondary Goal'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-[#737B89] mt-0.5">
                    Enrolled on {new Date(e.enrolledAt).toLocaleDateString()}
                  </div>
                </div>

                {!e.isPrimary && (
                  <button
                    onClick={() => handleUnenrollCourse(e.courseId)}
                    className="p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    title="Remove enrollment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add Another Course */}
          {unenrolledCourses.length > 0 && (
            <div className="pt-4 border-t border-slate-100 dark:border-[#252932] flex flex-col sm:flex-row items-center gap-3">
              <select
                value={selectedCourseToEnroll}
                onChange={(e) => setSelectedCourseToEnroll(e.target.value)}
                className="w-full sm:w-72 h-10 px-3 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-xs text-slate-900 dark:text-[#F8FAFC]"
              >
                <option value="">Select an examination to add...</option>
                {unenrolledCourses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={handleEnrollCourse}
                disabled={!selectedCourseToEnroll || isSaving}
                className="w-full sm:w-auto h-10 px-4 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-darkred transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>Enroll in Course</span>
              </button>
            </div>
          )}
        </div>

        {/* =====================================================================
            3. STUDY PACE & AVAILABILITY
           ===================================================================== */}
        <form onSubmit={handleSavePreferences} className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-6 sm:p-8 shadow-sm">
          <h2 className="text-base font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
            Preparation Pace &amp; Schedule
          </h2>
          <p className="text-xs text-slate-500 dark:text-[#A7AFBD] mb-6">
            Adjust your daily availability to recalibrate your study planner.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Preparation Level
              </label>
              <select
                value={prepLevel}
                onChange={(e) => setPrepLevel(e.target.value as any)}
                className="w-full h-11 px-3 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-xs text-slate-900 dark:text-[#F8FAFC]"
              >
                <option value="Beginner">Beginner (Foundations)</option>
                <option value="Intermediate">Intermediate (Core Concepts)</option>
                <option value="Advanced">Advanced (Problem Solving)</option>
                <option value="Revision">Revision (Exam Ready)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Daily Study Availability
              </label>
              <select
                value={dailyHours}
                onChange={(e) => setDailyHours(e.target.value)}
                className="w-full h-11 px-3 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-xs text-slate-900 dark:text-[#F8FAFC]"
              >
                <option value="Less than 1 hour">Less than 1 hour</option>
                <option value="1–2 hours">1–2 hours</option>
                <option value="2–4 hours">2–4 hours</option>
                <option value="4–6 hours">4–6 hours</option>
                <option value="More than 6 hours">More than 6 hours</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                Target Attempt Year
              </label>
              <select
                value={targetYear}
                onChange={(e) => setTargetYear(e.target.value)}
                className="w-full h-11 px-3 bg-slate-50 dark:bg-[#15171C] border border-slate-200 dark:border-[#252932] rounded-xl text-xs text-slate-900 dark:text-[#F8FAFC]"
              >
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 transition-all disabled:opacity-50"
            >
              {isSaving ? 'Saving Changes...' : 'Save Learning Preferences'}
            </button>
          </div>
        </form>

      </div>

      {/* Confirmation Modal for Changing Primary Course */}
      {showPrimaryModal && pendingPrimaryCourseId && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-6 shadow-2xl animate-fade-in-smooth">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-5 h-5" />
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-[#F8FAFC] mb-2">
              Change Primary Examination Goal?
            </h3>

            <p className="text-xs text-slate-500 dark:text-[#A7AFBD] leading-relaxed mb-6">
              Switching your primary goal to <strong>{ALL_AVAILABLE_COURSES.find((c) => c.id === pendingPrimaryCourseId)?.name}</strong> will update your personalized dashboard and navigation. Your learning history and progress for previous courses will remain fully preserved.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowPrimaryModal(false);
                  setPendingPrimaryCourseId(null);
                }}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-[#252932] text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmPrimaryChange}
                disabled={isSaving}
                className="px-5 py-2 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-darkred transition-all"
              >
                {isSaving ? 'Updating...' : 'Confirm Change'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
