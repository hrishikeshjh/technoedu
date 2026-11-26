import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { COURSE_CONFIGS } from '../../lib/personalization/courseConfig';
import {
  ChevronDown,
  Check,
  Plus,
  BookOpen,
  Award,
  Stethoscope,
  Cpu,
  Binary,
  Landmark,
  GraduationCap,
  Layers,
  ArrowRight,
} from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Award,
  Stethoscope,
  Cpu,
  Binary,
  Landmark,
  GraduationCap,
  BookOpen,
  Layers,
};

export const CourseSwitcher: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const { user, activeCourseId, enrollments, switchActiveCourse } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user || !user.learningProfile?.onboardingCompleted) {
    return null;
  }

  const currentCourseConfig = activeCourseId ? COURSE_CONFIGS[activeCourseId] : null;
  const ActiveIcon = (currentCourseConfig?.icon && iconMap[currentCourseConfig.icon]) || BookOpen;

  const handleSwitch = async (courseId: string) => {
    if (courseId === activeCourseId) {
      setIsOpen(false);
      return;
    }
    setIsSwitching(true);
    try {
      await switchActiveCourse(courseId);
      setIsOpen(false);
    } catch (err) {
      console.error('Error switching course:', err);
    } finally {
      setIsSwitching(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isSwitching}
        className={`flex items-center gap-2 rounded-xl border border-slate-200 dark:border-[#252932] bg-white dark:bg-[#111318] hover:bg-slate-50 dark:hover:bg-[#15171C] text-slate-800 dark:text-[#F8FAFC] transition-all shadow-xs ${
          compact ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs font-semibold'
        }`}
        title="Switch Active Examination Course"
      >
        <div className="w-5 h-5 rounded-lg bg-red-50 dark:bg-red-950/40 text-brand-red flex items-center justify-center shrink-0">
          <ActiveIcon className="w-3.5 h-3.5" />
        </div>
        <span className="font-bold tracking-tight truncate max-w-[130px] sm:max-w-[160px]">
          {currentCourseConfig?.shortCode || currentCourseConfig?.name || 'Selected Course'}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-white dark:bg-[#111318] rounded-2xl shadow-xl border border-slate-200/90 dark:border-[#252932] overflow-hidden z-50 animate-fade-in-smooth">
          <div className="px-4 py-3 bg-slate-50 dark:bg-[#15171C] border-b border-slate-100 dark:border-[#252932]">
            <p className="text-[11px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider">
              Enrolled Examinations
            </p>
          </div>

          <div className="py-1 max-h-64 overflow-y-auto">
            {enrollments.map((enrollment) => {
              const cfg = COURSE_CONFIGS[enrollment.courseId];
              const Icon = (cfg?.icon && iconMap[cfg.icon]) || BookOpen;
              const isActive = enrollment.courseId === activeCourseId;

              return (
                <button
                  key={enrollment.courseId}
                  onClick={() => handleSwitch(enrollment.courseId)}
                  className={`w-full px-4 py-2.5 text-left flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-red-50/70 dark:bg-red-950/30 text-brand-red dark:text-red-400'
                      : 'hover:bg-slate-50 dark:hover:bg-[#15171C] text-slate-700 dark:text-[#A7AFBD]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-brand-red text-white' : 'bg-slate-100 dark:bg-[#1A1D23] text-slate-600 dark:text-slate-300'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">
                        {cfg?.name || enrollment.courseName}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-[#737B89]">
                        {enrollment.isPrimary ? 'Primary Examination' : 'Secondary Goal'}
                      </div>
                    </div>
                  </div>

                  {isActive ? (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-brand-red bg-red-100/70 dark:bg-red-900/40 px-2 py-0.5 rounded-full">
                      <Check className="w-3 h-3" />
                      <span>Active</span>
                    </div>
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="p-2 bg-slate-50 dark:bg-[#15171C] border-t border-slate-100 dark:border-[#252932] flex items-center justify-between">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/settings/learning');
              }}
              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-red dark:hover:text-white flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-[#1A1D23] transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Enroll in Another Course</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
