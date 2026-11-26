import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-50/70 dark:bg-[#0B0C0F] border-t border-slate-100 dark:border-[#1E222A]" aria-labelledby="footer-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0" aria-label="Techno Wallah Home">
              <img
                src="/logo.png"
                alt="Techno Wallah"
                className="h-8 w-auto object-contain block dark:hidden"
              />
              <img
                src="/logowhite.png"
                alt="Techno Wallah"
                className="h-8 w-auto object-contain hidden dark:block"
              />
            </Link>
            <p className="text-sm text-slate-600 dark:text-[#A7AFBD] leading-relaxed max-w-xs">
              A personalized learning environment designed around your academic goals. Find your resources, organize your preparation, and make meaningful progress.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation" className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-[#F8FAFC]">Platform</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-slate-600 dark:text-[#A7AFBD] hover:text-brand-red transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-sm text-slate-600 dark:text-[#A7AFBD] hover:text-brand-red transition-colors">Contact</Link></li>
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal links" className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-[#F8FAFC]">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm text-slate-600 dark:text-[#A7AFBD] hover:text-brand-red transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-slate-600 dark:text-[#A7AFBD] hover:text-brand-red transition-colors">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-sm text-slate-600 dark:text-[#A7AFBD] hover:text-brand-red transition-colors">Cookie Policy</Link></li>
            </ul>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-8 border-t border-slate-200/80 dark:border-[#252932] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-slate-500 dark:text-[#7F8795]">
            &copy; {currentYear} Techno Wallah. All rights reserved.
          </p>
          <p className="text-xs text-slate-500 dark:text-[#7F8795]">
            Built for serious learners.
          </p>
        </div>
      </div>
    </footer>
  );
};