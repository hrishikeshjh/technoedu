import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { COURSE_CONFIGS } from '../lib/personalization/courseConfig';
import { CourseSwitcher } from '../components/common/CourseSwitcher';
import { Breadcrumb } from '../components/common/Breadcrumb';
import {
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  GraduationCap,
  Plus,
  PlayCircle,
  FileCheck2,
  Target,
  Sparkles,
} from 'lucide-react';

export const MyLearningPage: React.FC = () => {
  const { user, activeCourseId, enrollments, switchActiveCourse, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#08090B] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const activeCourseConfig = activeCourseId ? COURSE_CONFIGS[activeCourseId] : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] pt-6 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb & Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <Breadcrumb
            items={[
              { label: 'Home', path: '/' },
              { label: 'Dashboard', path: '/dashboard' },
              { label: 'My Learning Space' },
            ]}
          />
          <CourseSwitcher />
        </div>

        {/* Page Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F8FAFC]">
            My Learning Space
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#A7AFBD] mt-1">
            Access all your enrolled examination spaces and study tracks in one place.
          </p>
        </div>

        {/* Active Examination Spotlight */}
        {activeCourseConfig && (
          <div className="bg-white dark:bg-[#111318] border-2 border-brand-red/30 dark:border-brand-red/40 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-50 dark:bg-red-950/40 text-[10px] font-bold text-brand-red dark:text-red-400 mb-2">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Currently Active Goal</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F8FAFC] mb-1">
                  {activeCourseConfig.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-[#A7AFBD] max-w-xl leading-relaxed">
                  {activeCourseConfig.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5 shrink-0">
                <Link
                  to="/dashboard"
                  className="px-4 py-2.5 rounded-xl bg-brand-red hover:bg-brand-darkred text-white text-xs font-bold transition-all shadow-xs flex items-center gap-2"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Open Dashboard</span>
                </Link>
                <Link
                  to={`/courses/${activeCourseConfig.slug}/subjects`}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#252932] bg-white dark:bg-[#15171C] text-slate-800 dark:text-[#F8FAFC] text-xs font-bold hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Syllabus</span>
                </Link>
              </div>
            </div>

            {/* Quick Actions for Active Course */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-[#252932]">
              {activeCourseConfig.quickActions.map((action, idx) => (
                <Link
                  key={idx}
                  to={action.path}
                  className="p-3.5 rounded-xl border border-slate-100 dark:border-[#1E222B] bg-slate-50/70 dark:bg-[#15171C]/70 hover:bg-white dark:hover:bg-[#1E222B] transition-all group"
                >
                  <div className="font-bold text-xs text-slate-900 dark:text-[#F8FAFC] group-hover:text-brand-red transition-colors">
                    {action.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-[#737B89] mt-0.5">
                    {action.description}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Enrolled Courses Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-[#F8FAFC]">
              Your Enrolled Examinations ({enrollments.length})
            </h2>
            <Link
              to="/settings/learning"
              className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Another Goal</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enrollments.map((e) => {
              const cfg = COURSE_CONFIGS[e.courseId];
              const isActive = e.courseId === activeCourseId;

              return (
                <div
                  key={e.courseId}
                  className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                    isActive
                      ? 'bg-white dark:bg-[#111318] border-brand-red/40 shadow-xs'
                      : 'bg-white dark:bg-[#111318] border-slate-200 dark:border-[#252932]'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-[#F8FAFC]">
                          {cfg?.name || e.courseName}
                        </h3>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          e.isPrimary
                            ? 'bg-red-50 text-brand-red dark:bg-red-950/40'
                            : 'bg-slate-100 text-slate-600 dark:bg-[#1E222B] dark:text-[#A7AFBD]'
                        }`}>
                          {e.isPrimary ? 'Primary Goal' : 'Secondary'}
                        </span>
                      </div>
                      {isActive && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-red text-white">
                          Active Now
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-500 dark:text-[#A7AFBD] line-clamp-2 mb-4 leading-relaxed">
                      {cfg?.description || 'Enrolled learning course.'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-[#252932] flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      {cfg?.defaultSubjects.length || 3} Core Subjects
                    </span>

                    {isActive ? (
                      <Link
                        to="/dashboard"
                        className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1"
                      >
                        <span>Open Dashboard</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => switchActiveCourse(e.courseId)}
                        className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-brand-red flex items-center gap-1"
                      >
                        <span>Switch to this Course</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
