import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { COURSE_CONFIGS } from '../../lib/personalization/courseConfig';
import {
  User,
  LogOut,
  Settings,
  BookOpen,
  LayoutDashboard,
  GraduationCap,
  ChevronDown,
  Shield,
} from 'lucide-react';

export const UserMenu: React.FC = () => {
  const { user, activeCourseId, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
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

  if (!user) return null;

  const currentCourse = activeCourseId ? COURSE_CONFIGS[activeCourseId] : null;
  const initials = user.fullName
    ? user.fullName
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'ST';

  const handleLogout = async () => {
    setIsOpen(false);
    await logout();
    navigate('/');
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-xl border border-slate-200 dark:border-[#252932] bg-white dark:bg-[#111318] hover:bg-slate-50 dark:hover:bg-[#15171C] transition-all shadow-xs"
        aria-label="User navigation menu"
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-red to-rose-500 text-white font-bold text-xs flex items-center justify-center shadow-xs">
          {initials}
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-xs font-bold text-slate-800 dark:text-[#F8FAFC] leading-none truncate max-w-[100px]">
            {user.fullName.split(' ')[0]}
          </div>
          {currentCourse && (
            <div className="text-[10px] font-medium text-brand-red dark:text-red-400 leading-tight">
              {currentCourse.shortCode}
            </div>
          )}
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-[#111318] rounded-2xl shadow-xl border border-slate-200/90 dark:border-[#252932] overflow-hidden z-50 animate-fade-in-smooth">
          {/* Header */}
          <div className="p-3.5 bg-slate-50 dark:bg-[#15171C] border-b border-slate-100 dark:border-[#252932]">
            <div className="font-bold text-xs text-slate-900 dark:text-[#F8FAFC] truncate">
              {user.fullName}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-[#737B89] truncate">
              {user.email}
            </div>
            {currentCourse && (
              <div className="mt-2 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-950/40 text-[10px] font-bold text-brand-red dark:text-red-400">
                <GraduationCap className="w-3 h-3" />
                <span>{currentCourse.name}</span>
              </div>
            )}
          </div>

          {/* Links */}
          <div className="p-1.5">
            <Link
              to="/dashboard"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-[#A7AFBD] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#1A1D23] rounded-xl transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-slate-400" />
              <span>Personalized Dashboard</span>
            </Link>

            <Link
              to="/my-learning"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-[#A7AFBD] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#1A1D23] rounded-xl transition-colors"
            >
              <BookOpen className="w-4 h-4 text-slate-400" />
              <span>My Learning Space</span>
            </Link>

            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-[#A7AFBD] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#1A1D23] rounded-xl transition-colors"
            >
              <User className="w-4 h-4 text-slate-400" />
              <span>Student Profile</span>
            </Link>

            <Link
              to="/settings/learning"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-[#A7AFBD] hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#1A1D23] rounded-xl transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-400" />
              <span>Course &amp; Learning Settings</span>
            </Link>
          </div>

          {/* Logout */}
          <div className="p-1.5 border-t border-slate-100 dark:border-[#252932] bg-slate-50/50 dark:bg-[#15171C]/50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
