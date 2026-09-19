import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Search, 
  Menu, 
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
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    { name: 'Exam Aggregator', path: '/exams' },
    { name: 'Complete Directory', path: '/directory' },
    { name: 'Open Library', path: '/library' },
    { name: 'Open Platforms', path: '/platforms' },
    { name: 'About Initiative', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-soft border-b border-slate-200/70 py-2' 
          : 'bg-white border-b border-slate-100 py-3'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo & Tag */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3 group flex-shrink-0">
            <img
              src="/logo.png"
              alt="Techno Wallah"
              className="h-8 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div>
              <div className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-tight leading-tight">
                Techno Wallah
              </div>
              <div className="text-[9px] sm:text-[10px] text-slate-500 font-medium">
                Open Exam Resource Hub
              </div>
            </div>
          </Link>

          {/* Universal Open Resource Search (Desktop) */}
          <div className="hidden md:flex relative flex-1 max-w-md mx-2">
            <div className="relative w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder="Search exams, NCERT, NPTEL, MIT OCW, PYQs..."
                className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red focus:bg-white transition-all shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200 rounded-full w-5 h-5 flex items-center justify-center no-min-touch"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Live Search Autocomplete Dropdown */}
            {showSearchDropdown && (filteredExams.length > 0 || filteredPlatforms.length > 0) && (
              <div 
                className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-soft-lg border border-slate-200/80 overflow-hidden z-50 animate-fade-in"
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

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-xs font-semibold rounded-xl transition-all ${
                    isActive 
                      ? 'text-brand-red bg-red-50 shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Direct CTA & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <Link
              to="/library"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-brand-red text-white text-xs font-bold hover:bg-brand-darkred transition-all shadow-red-glow"
            >
              <Library className="w-3.5 h-3.5" />
              <span>Browse Library</span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-dark-900 hover:bg-slate-100 rounded-xl transition-colors flex items-center justify-center"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-soft safe-bottom max-h-[calc(100vh-65px)] overflow-y-auto">
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
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-3 text-sm font-semibold rounded-2xl transition-all ${
                    isActive
                      ? 'text-brand-red bg-red-50'
                      : 'text-slate-700 hover:text-brand-red hover:bg-red-50'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/library"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-center bg-brand-red text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-red-glow"
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

