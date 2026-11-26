import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const STORAGE_KEY = 'technoedu-theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const theme: ThemeMode = 'system';
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => getSystemTheme());

  // Apply theme to DOM with a temporary transition class
  const applyThemeToDOM = useCallback((targetTheme: ResolvedTheme, withTransition = false) => {
    const root = document.documentElement;
    if (withTransition) {
      root.classList.add('theme-transition');
    }

    if (targetTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    if (withTransition) {
      window.setTimeout(() => {
        root.classList.remove('theme-transition');
      }, 250);
    }
  }, []);

  const setTheme = useCallback((_newTheme: ThemeMode) => {
    // Theme strictly follows device settings
  }, []);

  const toggleTheme = useCallback(() => {
    // Theme strictly follows device settings
  }, []);

  // Initial synchronization with device preference
  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore localStorage access issues
    }
    const currentResolved = getSystemTheme();
    setResolvedTheme(currentResolved);
    applyThemeToDOM(currentResolved, false);
  }, [applyThemeToDOM]);

  // Listen to OS/device scheme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const newResolved = e.matches ? 'dark' : 'light';
      setResolvedTheme(newResolved);
      applyThemeToDOM(newResolved, true);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [applyThemeToDOM]);

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
