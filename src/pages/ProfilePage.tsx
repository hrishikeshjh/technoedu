import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { COURSE_CONFIGS } from '../lib/personalization/courseConfig';
import { Breadcrumb } from '../components/common/Breadcrumb';
import {
  User,
  Mail,
  GraduationCap,
  Calendar,
  Clock,
  Globe,
  Settings,
  BookOpen,
  Award,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { user, activeCourseId, enrollments, isAuthenticated, isLoading } = useAuth();

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

  const primaryConfig = user.learningProfile?.primaryCourseId
    ? COURSE_CONFIGS[user.learningProfile.primaryCourseId]
    : null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] pt-6 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: 'Home', path: '/' },
            { label: 'Dashboard', path: '/dashboard' },
            { label: 'Student Profile' },
          ]}
        />

        {/* Profile Card Header */}
        <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-brand-red to-rose-500 text-white font-extrabold text-xl flex items-center justify-center shadow-md">
                {user.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')
                  .toUpperCase()}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                    {user.fullName}
                  </h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verified Student</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-[#A7AFBD] mt-0.5">{user.email}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-slate-600 dark:text-slate-400">
                  <span>Level: <strong>{user.educationLevel || 'Undergraduate'}</strong></span>
                  <span>•</span>
                  <span>Language: <strong>{user.preferredLanguage || 'English'}</strong></span>
                </div>
              </div>
            </div>

            <Link
              to="/settings/learning"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#252932] bg-white dark:bg-[#15171C] hover:bg-slate-50 dark:hover:bg-[#1E222B] text-xs font-bold text-slate-800 dark:text-[#F8FAFC] transition-colors shadow-xs"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Manage Learning Settings</span>
            </Link>
          </div>
        </div>

        {/* 2-Column Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Academic & Demographic Details */}
          <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-brand-red" />
              <span>Academic Profile</span>
            </h2>

            <dl className="space-y-3.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-[#1E222B]">
                <dt className="text-slate-400">Education Level</dt>
                <dd className="font-semibold text-slate-800 dark:text-[#F8FAFC]">{user.educationLevel || 'Undergraduate'}</dd>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-[#1E222B]">
                <dt className="text-slate-400">Current Semester/Class</dt>
                <dd className="font-semibold text-slate-800 dark:text-[#F8FAFC]">{user.currentClassOrSemester || 'Not specified'}</dd>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-[#1E222B]">
                <dt className="text-slate-400">Institution</dt>
                <dd className="font-semibold text-slate-800 dark:text-[#F8FAFC]">{user.institution || 'Self-study'}</dd>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100 dark:border-[#1E222B]">
                <dt className="text-slate-400">Country</dt>
                <dd className="font-semibold text-slate-800 dark:text-[#F8FAFC]">{user.country || 'India'}</dd>
              </div>
              <div className="flex justify-between py-1.5">
                <dt className="text-slate-400">Preferred Language</dt>
                <dd className="font-semibold text-slate-800 dark:text-[#F8FAFC]">{user.preferredLanguage || 'English'}</dd>
              </div>
            </dl>
          </div>

          {/* Card 2: Current Examination Goals */}
          <div className="bg-white dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-3xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC] mb-4 flex items-center gap-2">
              <Award className="w-4 h-4 text-brand-red" />
              <span>Examination Goals &amp; Enrollments</span>
            </h2>

            {user.learningProfile ? (
              <div className="space-y-4">
                <div className="p-3.5 rounded-2xl bg-red-50/60 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
                  <div className="text-[10px] font-bold text-brand-red uppercase tracking-wider mb-1">
                    Primary Examination Goal
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-[#F8FAFC]">
                    {primaryConfig?.name || user.learningProfile.primaryCourseId}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-[#A7AFBD] mt-0.5">
                    Target Year: {user.learningProfile.targetYear} • Pace: {user.learningProfile.preparationLevel}
                  </div>
                </div>

                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                    Enrolled Courses ({enrollments.length})
                  </div>
                  <div className="space-y-2">
                    {enrollments.map((e) => (
                      <div
                        key={e.courseId}
                        className="p-2.5 rounded-xl border border-slate-200 dark:border-[#252932] flex items-center justify-between text-xs"
                      >
                        <span className="font-bold text-slate-800 dark:text-[#F8FAFC]">{e.courseName}</span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-[#1E222B] text-slate-600 dark:text-[#A7AFBD]">
                          {e.isPrimary ? 'Primary' : 'Secondary'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400">No examination goals selected yet.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
