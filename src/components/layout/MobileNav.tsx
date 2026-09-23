import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Library, Globe2 } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const items = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Exams', path: '/exams', icon: BookOpen },
    { label: 'Library', path: '/library', icon: Library },
    { label: 'Platforms', path: '/platforms', icon: Globe2 },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#090A0C]/95 backdrop-blur-xl border-t border-slate-200/90 dark:border-[#252932] pt-1.5 pb-[max(0.5rem,env(safe-area-inset-bottom))] px-2 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-2.5 rounded-xl text-[10px] transition-all no-min-touch ${
                  isActive
                    ? 'text-brand-red font-bold bg-red-50/80 dark:bg-red-950/40 dark:text-red-400 scale-105'
                    : 'text-slate-500 dark:text-[#A7AFBD] hover:text-slate-900 dark:hover:text-[#F8FAFC] font-medium'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 mb-0.5 transition-transform ${isActive ? 'stroke-[2.4px] -translate-y-0.5' : 'stroke-[1.8px]'}`} />
                  <span className="leading-tight">{item.label}</span>
                </>
              )}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

