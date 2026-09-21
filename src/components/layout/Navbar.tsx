import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  X,
  BookOpen,
  ExternalLink,
  Layers,
  GraduationCap,
  Library,
  Globe,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { examsData } from '../../data/examsData';
import { platformsData } from '../../data/platformsData';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [drawerAnimating, setDrawerAnimating] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle drawer animation
  useEffect(() => {
    if (mobileMenuOpen) {
      setDrawerAnimating(true);
      // Force reflow for animation
      drawerRef.current?.getBoundingClientRect();
      requestAnimationFrame(() => {
        drawerRef.current?.classList.add('mobile-drawer-enter-active');
      });

      // Trigger staggered animations for nav links
      setTimeout(() => {
        navLinksRef.current.forEach((link, index) => {
          if (link) {
            setTimeout(() => {
              link.classList.add('visible');
            }, index * 80);
          }
        });
      }, 100);
    } else {
      drawerRef.current?.classList.remove('mobile-drawer-enter-active');
      drawerRef.current?.classList.add('mobile-drawer-exit-active');
      // Reset nav links visibility
      navLinksRef.current.forEach((link) => {
        if (link) link.classList.remove('visible');
      });
      setDrawerAnimating(true);
      setTimeout(() => {
        setDrawerAnimating(false);
        drawerRef.current?.classList.remove('mobile-drawer-exit-active');
      }, 250);
    }
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };

  const filteredExams = searchQuery.trim() === '' ? [] : examsData.filter(exam =>
    exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.popularTopics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  ).slice(0, 4);

  const filteredPlatforms = searchQuery.trim() === '' ? [] : platformsData.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.organization.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 3);

  const handleSelectExam = (examId: string) => {
    setSearchQuery('');
    setShowSearchDropdown(false);
    navigate(`/exams/${examId}`);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Exams', path: '/exams' },
    { name: 'Directory', path: '/directory' },
    { name: 'Library', path: '/library' },
    { name: 'Platforms', path: '/platforms' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-soft border-b border-slate-200/70 py-2' 
          : 'bg-white border-b border-slate-100 py-2.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 lg:gap-5 h-10">
          
          {/* 1. Left: Brand Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="/logo.png"
              alt="Techno Wallah"
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* 2. Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`h-9 flex items-center px-2.5 xl:px-3 text-xs xl:text-[13px] font-semibold rounded-xl transition-all duration-200 ease-out ${
                    isActive
                      ? 'text-brand-red bg-red-50 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  style={{ transitionDelay: `${index * 25}ms` }}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* 3. Right: Universal Search & CTA Actions */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">

            {/* Desktop Search Input (Fixed width, never crushed) */}
            <div className="hidden md:block relative w-44 lg:w-52 xl:w-60">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchDropdown(true);
                  }}
                  onFocus={() => setShowSearchDropdown(true)}
                  placeholder="Search OER, exams..."
                  className="w-full h-9 pl-9 pr-7 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red focus:bg-white transition-all shadow-xs"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full w-4 h-4 flex items-center justify-center no-min-touch"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>

              {/* Search Dropdown positioned nicely to the right */}
              {showSearchDropdown && (filteredExams.length > 0 || filteredPlatforms.length > 0) && (
                <div
                  className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden z-50 animate-fade-in-smooth"
                  onMouseLeave={() => setShowSearchDropdown(false)}
                >
                  {filteredExams.length > 0 && (
                    <div>
                      <div className="px-3.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 border-b border-slate-100">
                        Examinations
                      </div>
                      {filteredExams.map((exam) => (
                        <button
                          key={exam.id}
                          onClick={() => handleSelectExam(exam.id)}
                          className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 flex items-center justify-between border-b border-slate-100 last:border-0 transition-colors"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-900">{exam.name}</div>
                            <div className="text-[11px] text-slate-500">{exam.category} • {exam.openSourcePlatforms.length} Open Platforms</div>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-brand-darkred">
                            {exam.shortCode}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredPlatforms.length > 0 && (
                    <div>
                      <div className="px-3.5 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-50 border-b border-slate-100">
                        Open Educational Platforms
                      </div>
                      {filteredPlatforms.map((plat) => (
                        <a
                          key={plat.id}
                          href={plat.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 flex items-center justify-between border-b border-slate-100 last:border-0 transition-colors"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                              <span>{plat.name}</span>
                              <ExternalLink className="w-3 h-3 text-slate-400" />
                            </div>
                            <div className="text-[11px] text-slate-500">{plat.organization}</div>
                          </div>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {plat.accessType}
                          </span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Direct CTA Button */}
            <Link
              to="/library"
              className="hidden sm:inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-darkred transition-all shadow-red-glow hover:-translate-y-0.5"
            >
              <Library className="w-3.5 h-3.5" />
              <span>Browse Library</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden h-9 w-9 p-2 text-slate-600 hover:text-dark-900 hover:bg-slate-100 rounded-xl transition-colors flex flex-col items-center justify-center gap-1"
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
            >
              <span className={`hamburger-line w-4 h-0.5 bg-current rounded-full transition-all duration-300 ease-out ${mobileMenuOpen ? 'open' : ''}`} style={{ transformOrigin: 'center' }} />
              <span className={`hamburger-line w-4 h-0.5 bg-current rounded-full transition-all duration-300 ease-out ${mobileMenuOpen ? 'open' : ''}`} style={{ transformOrigin: 'center' }} />
              <span className={`hamburger-line w-4 h-0.5 bg-current rounded-full transition-all duration-300 ease-out ${mobileMenuOpen ? 'open' : ''}`} style={{ transformOrigin: 'center' }} />
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          ref={drawerRef}
          className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-soft safe-bottom max-h-[calc(100vh-65px)] overflow-y-auto mobile-drawer-enter"
        >
          {/* Mobile Search with live results */}
          <div className="relative mb-2">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search exams, NCERT, NPTEL..."
              className="w-full pl-10 pr-9 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full w-5 h-5 flex items-center justify-center no-min-touch"
              >
                <X className="w-3 h-3" />
              </button>
            )}

            {/* Live Search Results inside Mobile Drawer */}
            {searchQuery.trim() !== '' && (filteredExams.length > 0 || filteredPlatforms.length > 0) && (
              <div className="mt-2 bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                {filteredExams.map((exam) => (
                  <button
                    key={exam.id}
                    onClick={() => {
                      handleSelectExam(exam.id);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left p-3 hover:bg-white flex items-center justify-between transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900">{exam.name}</div>
                      <div className="text-[10px] text-slate-500">{exam.category}</div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-brand-darkred">
                      {exam.shortCode}
                    </span>
                  </button>
                ))}
                {filteredPlatforms.map((plat) => (
                  <a
                    key={plat.id}
                    href={plat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-left p-3 hover:bg-white flex items-center justify-between transition-colors block"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                        <span>{plat.name}</span>
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                      </div>
                      <div className="text-[10px] text-slate-500">{plat.organization}</div>
                    </div>
                    <span className="text-[9px] font-medium px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                      {plat.accessType}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  ref={(el) => { navLinksRef.current[index] = el; }}
                  className={`flex items-center justify-between px-3.5 py-3 text-sm font-semibold rounded-2xl transition-all duration-200 ease-out lazy-slide-in-right stagger-${Math.min(index + 1, 8)} ${
                    isActive
                      ? 'text-brand-red bg-red-50'
                      : 'text-slate-700 hover:text-brand-red hover:bg-red-50'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/library"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-center bg-brand-red text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-red-glow lazy-scale-in stagger-9"
              ref={(el) => { navLinksRef.current[navLinks.length] = el; }}
            >
              <Library className="w-4 h-4" />
              <span>Explore Open Study Material</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

