import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search, RotateCcw, ExternalLink, AlertCircle } from 'lucide-react';

const GIL_SANS = { fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", "Helvetica Neue", Helvetica, Arial, sans-serif' };

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-[#08090B] text-slate-900 dark:text-[#F8FAFC] min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 transition-colors duration-200" style={GIL_SANS}>
      <div className="text-center max-w-md mx-auto py-12 sm:py-16">

        {/* Error Code */}
        <div className="mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-transparent dark:border-red-900/30 mb-4">
            <span className="text-4xl sm:text-6xl font-extrabold text-brand-red leading-none">404</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-[#F8FAFC] mb-2">
            Page Not Found
          </h1>
          <p className="text-slate-500 dark:text-[#A7AFBD] text-sm sm:text-base leading-relaxed">
            Sorry, we couldn't find the page you're looking for. It might have been moved,
            renamed, or never existed.
          </p>
        </div>

        {/* Search Suggestion */}
        <div className="card-subtle p-6 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-900 dark:text-[#F8FAFC] mb-3">
            <Search className="w-5 h-5 text-brand-red" />
            <span>Try Searching Instead</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-[#A7AFBD] mb-4">
            Search for exams, study materials, or topics across our open library:
          </p>
          <Link
            to="/library"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-red text-white text-sm font-semibold hover:bg-brand-darkred transition-all shadow-red-glow"
          >
            <Search className="w-4 h-4" />
            <span>Search Open Library</span>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="card-subtle p-6 mb-6 sm:mb-8">
          <p className="text-xs font-medium text-slate-700 dark:text-[#F8FAFC] mb-4">Or explore our main sections:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              to="/exams"
              className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] hover:border-brand-red/30 hover:bg-white dark:hover:bg-[#15171C] transition-all text-center"
            >
              <RotateCcw className="w-5 h-5 text-brand-red mx-auto mb-1" />
              <p className="text-xs font-medium text-slate-900 dark:text-[#F8FAFC]">Exams</p>
              <p className="text-[10px] text-slate-500 dark:text-[#7F8795]">Browse 100+ exams</p>
            </Link>
            <Link
              to="/directory"
              className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] hover:border-brand-red/30 hover:bg-white dark:hover:bg-[#15171C] transition-all text-center"
            >
              <ExternalLink className="w-5 h-5 text-blue-500 mx-auto mb-1" />
              <p className="text-xs font-medium text-slate-900 dark:text-[#F8FAFC]">Directory</p>
              <p className="text-[10px] text-slate-500 dark:text-[#7F8795]">All exams catalogued</p>
            </Link>
            <Link
              to="/library"
              className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] hover:border-brand-red/30 hover:bg-white dark:hover:bg-[#15171C] transition-all text-center"
            >
              <Search className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
              <p className="text-xs font-medium text-slate-900 dark:text-[#F8FAFC]">Library</p>
              <p className="text-[10px] text-slate-500 dark:text-[#7F8795]">Open materials</p>
            </Link>
            <Link
              to="/platforms"
              className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1015] border border-slate-200 dark:border-[#252932] hover:border-brand-red/30 hover:bg-white dark:hover:bg-[#15171C] transition-all text-center"
            >
              <ExternalLink className="w-5 h-5 text-purple-500 mx-auto mb-1" />
              <p className="text-xs font-medium text-slate-900 dark:text-[#F8FAFC]">Platforms</p>
              <p className="text-[10px] text-slate-500 dark:text-[#7F8795]">Global repositories</p>
            </Link>
          </div>
        </div>

        {/* Helpful Actions */}
        <div className="space-y-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-red hover:bg-brand-darkred text-white text-sm font-semibold transition-all"
          >
            <Home className="w-4 h-4" />
            <span>Back to Homepage</span>
          </Link>

          <p className="text-xs text-slate-400 dark:text-[#7F8795]">
            If you believe this is an error, please{' '}
            <Link to="/contact" className="text-brand-red hover:underline font-medium">
              contact us
            </Link>
            {' '}with the URL you were trying to access.
          </p>
        </div>

        {/* Brand Footer */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-[#252932]">
          <p className="text-xs text-slate-400 dark:text-[#7F8795]">
            Techno Wallah — Open Exam Resource Hub
          </p>
        </div>

      </div>
    </div>
  );
};