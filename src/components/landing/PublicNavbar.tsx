import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface PublicNavbarProps {
  className?: string;
}

const PUBLIC_NAV_LINKS = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Study Materials', to: '/study-materials' },
  { label: 'Library', to: '/library' },
  { label: 'Blogs', to: '/blogs' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const PublicNavbar: React.FC<PublicNavbarProps> = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#090A0C]/95 backdrop-blur-xl shadow-soft dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] border-b border-slate-200/70 dark:border-[#252932] py-2'
          : 'bg-white dark:bg-[#090A0C] border-b border-slate-100 dark:border-[#252932] py-3'
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 lg:gap-5 h-12 lg:h-14">
          {/* Left: Brand Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0 group"
            aria-label="Techno Wallah Home"
          >
            <img
              src="/logo.png"
              alt="Techno Wallah"
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105 block dark:hidden"
            />
            <img
              src="/logowhite.png"
              alt="Techno Wallah"
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105 hidden dark:block"
            />
          </Link>

          {/* Center: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1" aria-label="Main navigation">
            {PUBLIC_NAV_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="h-10 flex items-center px-2.5 xl:px-3 text-[13px] xl:text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-red transition-colors rounded-xl whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right: Auth CTAs (Desktop) */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-full border border-slate-200 dark:border-[#252932] bg-white dark:bg-[#111318] hover:bg-slate-50 dark:hover:bg-[#1A1D23] text-sm font-semibold text-slate-700 dark:text-slate-300 transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-brand-red/40"
            >
              <span>Sign In</span>
            </Link>

            <Link
              to="/signup"
              className="inline-flex items-center gap-1.5 h-10 px-5 rounded-full bg-brand-red text-white text-sm font-bold hover:bg-brand-darkred transition-all shadow-red-glow hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-[#08090B]"
            >
              <span>Get Started</span>
            </Link>
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              className="h-10 w-10 p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#15171C] rounded-xl transition-colors flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
            >
              <span className={`hamburger-line w-5 h-0.5 bg-current rounded-full transition-all duration-300 ease-out ${mobileMenuOpen ? 'open' : ''}`} />
              <span className={`hamburger-line w-5 h-0.5 bg-current rounded-full transition-all duration-300 ease-out ${mobileMenuOpen ? 'open' : ''}`} />
              <span className={`hamburger-line w-5 h-0.5 bg-current rounded-full transition-all duration-300 ease-out ${mobileMenuOpen ? 'open' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#090A0C] border-t border-slate-100 dark:border-[#252932] px-4 pt-3 pb-5 space-y-2 shadow-soft dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)]">
          {PUBLIC_NAV_LINKS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-3.5 py-2.5 text-sm font-semibold text-slate-700 dark:text-[#A7AFBD] hover:text-brand-red dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#15171C] rounded-xl transition-colors"
            >
              <span>{item.label}</span>
              <ArrowRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-100 dark:border-[#252932] flex flex-col gap-2">
            <Link
              to="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-center bg-brand-red hover:bg-brand-darkred text-white rounded-full text-sm font-bold shadow-red-glow transition-colors"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center border border-slate-200 dark:border-[#252932] rounded-full text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#1A1D23] transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;
