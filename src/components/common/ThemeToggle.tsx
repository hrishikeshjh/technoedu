import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, Check } from 'lucide-react';
import { useTheme, ThemeMode } from '../../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showDropdown?: boolean;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showDropdown = true }) => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const nextThemeTitle = resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  const themeOptions: { mode: ThemeMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'light', label: 'Light', icon: <Sun className="w-3.5 h-3.5 text-amber-500" /> },
    { mode: 'dark', label: 'Dark', icon: <Moon className="w-3.5 h-3.5 text-indigo-400" /> },
    { mode: 'system', label: 'System', icon: <Monitor className="w-3.5 h-3.5 text-slate-400" /> },
  ];

  return (
    <div className={`relative inline-block ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={toggleTheme}
        onContextMenu={(e) => {
          if (showDropdown) {
            e.preventDefault();
            setMenuOpen((prev) => !prev);
          }
        }}
        className="relative h-9 w-9 rounded-xl border border-slate-200 dark:border-[#252932] bg-slate-50 dark:bg-[#111318] hover:bg-slate-100 dark:hover:bg-[#1A1D23] text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-brand-red/30 no-min-touch group"
        aria-label={nextThemeTitle}
        title={`${nextThemeTitle} (Right-click for options)`}
      >
        <span className="sr-only">{nextThemeTitle}</span>

        {/* Animated Sun / Moon Icons */}
        <Sun
          className={`w-4 h-4 text-amber-500 transition-all duration-300 absolute ${
            resolvedTheme === 'dark'
              ? 'opacity-0 rotate-90 scale-50 pointer-events-none'
              : 'opacity-100 rotate-0 scale-100'
          }`}
        />
        <Moon
          className={`w-4 h-4 text-slate-200 transition-all duration-300 absolute ${
            resolvedTheme === 'dark'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-50 pointer-events-none'
          }`}
        />
      </button>

      {/* Small options indicator trigger if showDropdown */}
      {showDropdown && (
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-slate-200 dark:bg-[#1A1D23] border border-white dark:border-[#252932] text-[8px] font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-[#252932] flex items-center justify-center transition-colors no-min-touch"
          aria-label="Theme mode options"
          title="Select Light, Dark, or System mode"
        >
          {theme === 'system' ? 'A' : theme === 'dark' ? 'D' : 'L'}
        </button>
      )}

      {/* Dropdown Menu for Light / Dark / System */}
      {showDropdown && menuOpen && (
        <div className="absolute right-0 mt-2 w-36 py-1 bg-white dark:bg-[#111318] rounded-xl shadow-xl border border-slate-200 dark:border-[#252932] z-50 animate-fade-in-smooth text-xs">
          <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-[#252932]/70">
            Theme Mode
          </div>
          {themeOptions.map((opt) => {
            const isSelected = theme === opt.mode;
            return (
              <button
                key={opt.mode}
                onClick={() => {
                  setTheme(opt.mode);
                  setMenuOpen(false);
                }}
                className={`w-full px-3 py-2 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-[#15171C] transition-colors ${
                  isSelected
                    ? 'text-brand-red font-semibold bg-red-50/50 dark:bg-red-950/20'
                    : 'text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  {opt.icon}
                  <span>{opt.label}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-brand-red" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
