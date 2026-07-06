/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to manage dark mode state.
 * - Persists preference in localStorage under key 'theme'
 * - Falls back to `prefers-color-scheme: dark` if no stored preference
 * - Toggles `dark` class on `<html>` element for Tailwind CSS v4 @custom-variant
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Check localStorage first
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    // Fallback to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Sync the `dark` class on <html> whenever isDark changes
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Listen for system preference changes (when no stored preference)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-switch if user hasn't manually set a preference
      const stored = localStorage.getItem('theme');
      if (!stored) {
        setIsDark(e.matches);
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDark = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  return { isDark, toggleDark } as const;
}
