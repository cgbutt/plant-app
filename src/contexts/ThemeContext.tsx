import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthService } from '../services/auth';

export type ThemeMode = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  themeMode: ThemeMode;
  resolvedTheme: ResolvedTheme;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const THEME_STORAGE_KEY = 'leafy_theme_preference';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const getSystemTheme = (): ResolvedTheme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'system';
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    if (stored === 'light' || stored === 'dark' || stored === 'system') {
      return stored;
    }
    return 'system';
  });

  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(getSystemTheme());

  // Listen for OS system theme changes
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  const resolvedTheme: ResolvedTheme = themeMode === 'system' ? systemTheme : themeMode;

  // Apply theme to document element
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    document.documentElement.classList.add(`theme-${resolvedTheme}`);
  }, [resolvedTheme]);

  // Update theme mode and persist locally + sync to cloud profile
  const setThemeMode = useCallback(async (newMode: ThemeMode) => {
    setThemeModeState(newMode);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newMode);
    } catch {
      // localStorage may fail in restricted iframes
    }

    // Synchronize to Supabase profile if user is authenticated
    try {
      const user = await AuthService.getCurrentUser();
      if (user) {
        const profile = await AuthService.getCurrentProfile();
        if (profile) {
          await AuthService.updateProfile({
            preferences: {
              ...(profile.preferences || {}),
              theme: newMode
            }
          });
        }
      }
    } catch {
      // Silently ignore network sync errors during theme toggling
    }
  }, []);

  // Sync theme from authenticated profile on login (if not recently overridden locally)
  useEffect(() => {
    AuthService.getCurrentProfile().then((profile) => {
      const cloudTheme = profile?.preferences?.theme as ThemeMode | undefined;
      const localTheme = localStorage.getItem(THEME_STORAGE_KEY);
      // Only adopt cloud preference if user has not explicitly set a local preference
      if (!localTheme && cloudTheme && (cloudTheme === 'light' || cloudTheme === 'dark' || cloudTheme === 'system')) {
        setThemeModeState(cloudTheme);
      }
    }).catch(() => {
      // ignore
    });
  }, []);

  const toggleTheme = useCallback(() => {
    const nextMode: ThemeMode = resolvedTheme === 'dark' ? 'light' : 'dark';
    setThemeMode(nextMode);
  }, [resolvedTheme, setThemeMode]);

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        resolvedTheme,
        setThemeMode,
        toggleTheme
      }}
    >
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
