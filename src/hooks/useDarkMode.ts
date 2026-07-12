/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';

/**
 * Hook kustom untuk mengelola state mode gelap (dark mode).
 * - Menyimpan preferensi pengguna di localStorage dengan key 'theme'
 * - Otomatis menggunakan `prefers-color-scheme: dark` dari sistem jika belum ada preferensi
 * - Menambahkan/menghapus class `dark` pada elemen `<html>` untuk Tailwind CSS v4 @custom-variant
 */
export function useDarkMode() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Periksa preferensi tersimpan di localStorage terlebih dahulu
    const stored = localStorage.getItem('theme');
    if (stored === 'dark') return true;
    if (stored === 'light') return false;
    // Jika tidak ada, gunakan preferensi dari sistem (OS)
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Sinkronkan penambahan/penghapusan class `dark` pada <html> setiap kali state isDark berubah
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

  // Dengarkan perubahan preferensi sistem (jika belum ada preferensi tersimpan)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Hanya beralih otomatis jika pengguna belum mengatur preferensi manual
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
