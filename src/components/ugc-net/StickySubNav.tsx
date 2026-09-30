import React, { useEffect, useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  Map, 
  HelpCircle, 
  Library, 
  Sparkles, 
  Award 
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'blueprint', label: 'Blueprint', icon: <Layers className="w-3.5 h-3.5" /> },
  { id: 'paper-1', label: 'Paper 1', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { id: 'paper-2', label: 'Paper 2', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { id: 'roadmap', label: 'Roadmap', icon: <Map className="w-3.5 h-3.5" /> },
  { id: 'pyq-strategy', label: 'PYQ Strategy', icon: <HelpCircle className="w-3.5 h-3.5" /> },
  { id: 'study-material', label: 'Study Material', icon: <Library className="w-3.5 h-3.5" /> },
  { id: 'oer-library', label: 'OER Library', icon: <Sparkles className="w-3.5 h-3.5" /> },
  { id: 'mocks', label: 'Mocks & CBT', icon: <Award className="w-3.5 h-3.5" /> },
];

export const StickySubNav: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('blueprint');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      for (let i = navItems.length - 1; i >= 0; i--) {
        const item = navItems[i];
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -72;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav 
      aria-label="UGC-NET Hub Navigation" 
      className="sticky top-16 z-30 w-full bg-white/95 dark:bg-[#08090B]/95 backdrop-blur-md border-b border-slate-200 dark:border-[#252932] shadow-sm transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5 py-2.5 overflow-x-auto scrollbar-none no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-brand-red dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-[#A7AFBD] hover:text-slate-900 dark:hover:text-[#F8FAFC] hover:bg-slate-100 dark:hover:bg-[#15171C]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
