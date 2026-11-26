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
  ArrowRight,
  Sparkles,
  User,
  LogOut,
  Target,
} from 'lucide-react';
import { examsData } from '../../data/examsData';
import { platformsData } from '../../data/platformsData';
import { useBlogPosts } from '../../data/blogData';
import { useAuth, getStoredToken } from '../../context/AuthContext';
import { getCourseNavigation } from '../../lib/personalization/navigationConfig';
import { CourseSwitcher } from '../common/CourseSwitcher';
import { UserMenu } from '../common/UserMenu';
import { COURSE_CONFIGS } from '../../lib/personalization/courseConfig';

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, activeCourseId, logout } = useAuth();
  const blogPosts = useBlogPosts();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [drawerAnimating, setDrawerAnimating] = useState(false);
  const [courseSearchResults, setCourseSearchResults] = useState<any[]>([]);
  const drawerRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const activeCourseConfig = activeCourseId ? COURSE_CONFIGS[activeCourseId] : null;
  const navLinks = getCourseNavigation(isAuthenticated ? activeCourseId : null, isAuthenticated);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Course-aware search effect (authenticated only)
  useEffect(() => {
    if (!isAuthenticated || !searchQuery.trim()) {
      setCourseSearchResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const token = getStoredToken();
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery.trim())}`, {
          credentials: 'include',
          headers: token && token !== 'cookie-session' ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.ok) {
          const data = await res.json();
          setCourseSearchResults(data.results || []);
        }
      } catch {
        // Fallback silently
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery, activeCourseId, isAuthenticated]);

  // Handle drawer animation
  useEffect(() => {
    if (mobileMenuOpen) {
      setDrawerAnimating(true);
      drawerRef.current?.getBoundingClientRect();
      requestAnimationFrame(() => {
        drawerRef.current?.classList.add('mobile-drawer-enter-active');
      });

      setTimeout(() => {
        navLinksRef.current.forEach((link, index) => {
          if (link) {
            setTimeout(() => {
              link.classList.add('visible');
            }, index * 60);
          }
        });
      }, 100);
    } else {
      drawerRef.current?.classList.remove('mobile-drawer-enter-active');
      drawerRef.current?.classList.add('mobile-drawer-exit-active');
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
    setMobileMenuOpen((prev) => !prev);
  };

  const filteredExams =
    searchQuery.trim() === ''
      ? []
      : examsData
          .filter(
            (exam) =>
              exam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              exam.shortCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
              exam.popularTopics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .slice(0, 4);

  const filteredPlatforms =
    searchQuery.trim() === ''
      ? []
      : platformsData
          .filter(
            (p) =>
              p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              p.organization.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .slice(0, 3);

  const filteredBlogs =
    searchQuery.trim() === ''
      ? []
      : blogPosts
          .filter(
            (b) =>
              b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              b.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              b.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
              b.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .slice(0, 3);

  const handleSelectExam = (examId: string) => {
    setSearchQuery('');
    setShowSearchDropdown(false);
    navigate(`/exams/${examId}`);
  };

  const handleSelectBlog = (slug: string) => {
    setSearchQuery('');
    setShowSearchDropdown(false);
    navigate(`/blogs/${slug}`);
  };

  const handleSelectCourseResource = (resItem: any) => {
    setSearchQuery('');
    setShowSearchDropdown(false);
    if (resItem.file_url) {
      window.open(resItem.file_url, '_blank');
    } else {
      navigate(`/courses/${resItem.course_slug || activeCourseId}/resources`);
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#090A0C]/95 backdrop-blur-xl shadow-soft dark:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] border-b border-slate-200/70 dark:border-[#252932] py-2'
          : 'bg-white dark:bg-[#090A0C] border-b border-slate-100 dark:border-[#252932] py-2.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 lg:gap-5 h-10">
          
          {/* 1. Left: Brand Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="/logo.png"
              alt="TechnoEdu"
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105 block dark:hidden"
            />
            <img
              src="/logowhite.png"
              alt="TechnoEdu"
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105 hidden dark:block"
            />
          </Link>

          {/* 2. Center: Dynamic Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`h-9 flex items-center px-2.5 xl:px-3 text-xs xl:text-[13px] font-semibold rounded-xl transition-all duration-200 ease-out ${
                    isActive
                      ? 'text-brand-red bg-red-50 dark:bg-red-950/40 dark:text-red-400 shadow-xs'
                      : 'text-slate-600 dark:text-[#A7AFBD] hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#15171C]'
                  }`}
                  style={{ transitionDelay: `${index * 20}ms` }}
                >
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* 3. Right: Universal Search, Course Switcher, User Menu & Theme Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
            
            {/* Desktop Search Input (Authenticated Only) */}
            {isAuthenticated && (
            <div className="hidden md:block relative w-44 lg:w-48 xl:w-56">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 dark:text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSearchDropdown(true);
                  }}
                  onFocus={() => setShowSearchDropdown(true)}
                  placeholder={
                    isAuthenticated && activeCourseConfig
                      ? `Search ${activeCourseConfig.shortCode}...`
                      : 'Search OER, exams...'
                  }
                  className="w-full h-9 pl-9 pr-7 bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] rounded-xl text-xs text-slate-900 dark:text-[#F8FAFC] placeholder:text-slate-400 dark:placeholder-[#737B89] focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red focus:bg-white dark:focus:bg-[#111318] transition-all shadow-xs"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 dark:text-slate-300 hover:text-slate-600 dark:hover:text-white bg-slate-200 dark:bg-[#252932] rounded-full w-4 h-4 flex items-center justify-center no-min-touch"
                  >
                    <X className="w-2.5 h-2.5" />
                  </button>
                )}
              </div>

              {/* Course-Aware Search Dropdown */}
              {showSearchDropdown && (courseSearchResults.length > 0 || filteredExams.length > 0 || filteredPlatforms.length > 0 || filteredBlogs.length > 0) && (
                <div
                  className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#111318] rounded-2xl shadow-xl border border-slate-200/90 dark:border-[#252932] overflow-hidden z-50 animate-fade-in-smooth"
                  onMouseLeave={() => setShowSearchDropdown(false)}
                >
                  {/* Course Isolated Search Results */}
                  {courseSearchResults.length > 0 && (
                    <div>
                      <div className="px-3.5 py-1.5 text-[10px] font-bold text-brand-red uppercase tracking-wider bg-red-50/70 dark:bg-red-950/40 border-b border-red-100 dark:border-red-900/30 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{activeCourseConfig?.name || 'Course'} Isolated Results</span>
                      </div>
                      {courseSearchResults.slice(0, 4).map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleSelectCourseResource(item)}
                          className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-[#15171C] flex items-center justify-between border-b border-slate-100 dark:border-[#252932] last:border-0 transition-colors"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] line-clamp-1">
                              {item.title}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-[#A7AFBD]">
                              {item.subject_name || item.course_name} • {item.resource_type.toUpperCase()}
                            </div>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-brand-red dark:bg-red-950/40 dark:text-red-400">
                            Open
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Public exams (when not in search results or unauthenticated) */}
                  {!isAuthenticated && filteredExams.length > 0 && (
                    <div>
                      <div className="px-3.5 py-1.5 text-[10px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider bg-slate-50 dark:bg-[#15171C] border-b border-slate-100 dark:border-[#252932]">
                        Examinations
                      </div>
                      {filteredExams.map((exam) => (
                        <button
                          key={exam.id}
                          onClick={() => handleSelectExam(exam.id)}
                          className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-[#15171C] flex items-center justify-between border-b border-slate-100 dark:border-[#252932] last:border-0 transition-colors"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">{exam.name}</div>
                            <div className="text-[11px] text-slate-500 dark:text-[#A7AFBD]">{exam.category}</div>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-brand-darkred dark:bg-red-950/40 dark:text-red-400">
                            {exam.shortCode}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}

                  {filteredBlogs.length > 0 && (
                    <div>
                      <div className="px-3.5 py-1.5 text-[10px] font-bold text-slate-400 dark:text-[#7F8795] uppercase tracking-wider bg-slate-50 dark:bg-[#15171C] border-b border-slate-100 dark:border-[#252932]">
                        Knowledge Hub
                      </div>
                      {filteredBlogs.map((blog) => (
                        <button
                          key={blog.id}
                          onClick={() => handleSelectBlog(blog.slug)}
                          className="w-full text-left px-3.5 py-2.5 hover:bg-slate-50 dark:hover:bg-[#15171C] flex items-center justify-between border-b border-slate-100 dark:border-[#252932] last:border-0 transition-colors"
                        >
                          <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC] line-clamp-1">{blog.title}</div>
                            <div className="text-[11px] text-slate-500 dark:text-[#A7AFBD]">{blog.category}</div>
                          </div>
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600 dark:bg-[#1A1D23] dark:text-[#A7AFBD]">
                            {blog.readingTime}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            )}

            {/* Course Switcher (Desktop - Authenticated Only) */}
            {isAuthenticated && (
              <div className="hidden sm:block">
                <CourseSwitcher compact />
              </div>
            )}

            {/* User Menu or Auth CTAs */}
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 h-9 px-3 rounded-xl border border-slate-200 dark:border-[#252932] bg-white dark:bg-[#111318] hover:bg-slate-50 dark:hover:bg-[#1A1D23] text-xs font-bold text-slate-700 dark:text-slate-300 transition-all shadow-xs"
                >
                  <span>Sign In</span>
                </Link>

                <Link
                  to="/signup"
                  className="inline-flex items-center gap-1.5 h-9 px-3.5 rounded-xl bg-brand-red text-white text-xs font-bold hover:bg-brand-darkred transition-all shadow-red-glow hover:-translate-y-0.5"
                >
                  <span>Get Started</span>
                </Link>
              </div>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden h-9 w-9 p-2 text-slate-600 dark:text-slate-300 hover:text-dark-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#15171C] rounded-xl transition-colors flex flex-col items-center justify-center gap-1"
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
          className="lg:hidden bg-white dark:bg-[#090A0C] border-b border-slate-200 dark:border-[#252932] px-4 pt-3 pb-6 space-y-3 shadow-soft dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)] safe-bottom max-h-[calc(100vh-65px)] overflow-y-auto mobile-drawer-enter"
        >
          {/* Authenticated user banner in mobile drawer */}
          {isAuthenticated && user && (
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#252932] flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-[#F8FAFC]">
                  {user.fullName}
                </div>
                <div className="text-[11px] text-slate-500">
                  Goal: {activeCourseConfig?.name || 'Active Course'}
                </div>
              </div>
              <CourseSwitcher compact />
            </div>
          )}

          {/* Theme Appearance Switcher Row in Mobile Menu */}
          {/* Dynamic Mobile Nav Links */}
          <div className="space-y-1">
            {navLinks.map((link, index) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  ref={(el) => {
                    navLinksRef.current[index] = el;
                  }}
                  className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold rounded-2xl transition-all ${
                    isActive
                      ? 'text-brand-red bg-red-50 dark:bg-red-950/40 dark:text-red-400'
                      : 'text-slate-700 dark:text-[#A7AFBD] hover:text-brand-red dark:hover:text-white hover:bg-slate-50 dark:hover:bg-[#15171C]'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-[#252932] space-y-2">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 px-3 rounded-xl border border-slate-200 dark:border-[#252932] text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>My Profile &amp; Settings</span>
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                    navigate('/');
                  }}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center bg-brand-red text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-red-glow"
                >
                  <span>Get Started</span>
                </Link>

                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center border border-slate-200 dark:border-[#252932] rounded-2xl text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  <span>Sign In</span>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
