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

const getStoredTheme = (): ThemeMode => {
  if (typeof window === 'undefined') return 'system';
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
  } catch {
    // Ignore localStorage access issues
  }
  return 'system';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => getStoredTheme());
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => {
    const initial = getStoredTheme();
    return initial === 'system' ? getSystemTheme() : initial;
  });

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

  const setTheme = useCallback((newTheme: ThemeMode) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch {
      // Ignore
    }

    const resolved = newTheme === 'system' ? getSystemTheme() : newTheme;
    setResolvedTheme(resolved);
    applyThemeToDOM(resolved, true);
  }, [applyThemeToDOM]);

  const toggleTheme = useCallback(() => {
    // Quick toggle between light and dark
    const nextTheme: ThemeMode = resolvedTheme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  }, [resolvedTheme, setTheme]);

  // Initial synchronization
  useEffect(() => {
    const currentResolved = theme === 'system' ? getSystemTheme() : theme;
    setResolvedTheme(currentResolved);
    applyThemeToDOM(currentResolved, false);
  }, [theme, applyThemeToDOM]);

  // Listen to OS scheme changes if in system mode
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const newResolved = e.matches ? 'dark' : 'light';
      setResolvedTheme(newResolved);
      applyThemeToDOM(newResolved, true);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, applyThemeToDOM]);

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
