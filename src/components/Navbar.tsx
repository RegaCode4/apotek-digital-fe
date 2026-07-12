/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Pill, Menu, X, Search, ChevronRight, Sun, Moon } from "lucide-react";

interface NavbarProps {
  isDark: boolean;
  toggleDark: () => void;
}

/**
 * Komponen Bilah Navigasi Utama (Navbar)
 * Memiliki fitur efek gulir dinamis, toggle menu seluler, dan tombol sakelar mode gelap.
 */
export default function Navbar({ isDark, toggleDark }: NavbarProps) {
  // State untuk melacak apakah pengguna sudah menggulir ke bawah (untuk transisi visual navbar)
  const [isScrolled, setIsScrolled] = useState(false);
  // State untuk mengatur visibilitas menu seluler (mobile)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const panelInitial = { opacity: 0, height: 0 };
  const panelAnimate = { opacity: 1, height: "auto" };
  const panelExit = { opacity: 0, height: 0 };
  const panelTransition = { duration: 0.3, ease: "easeInOut" as const };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Array tautan navigasi untuk menu desktop dan seluler
  const navLinks = [
    { name: "Beranda", href: "#beranda" },
    { name: "Tentang", href: "#tentang" },
    { name: "Kategori", href: "#kategori-obat" },
    { name: "Lokasi Kami", href: "#lokasi" },
    { name: "Hubungi Kontak", href: "#kontak" },
  ];

  // Helper untuk menggulir halus ke suatu bagian di halaman berdasarkan ID-nya
  const handleScrollToSegment = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop =
        element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header
        id="navbar-root"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "pt-3" : "pt-5"
        }`}
      >
        {/* Container luar: kasih padding samping biar navbar nggak nempel tepi */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Container dalam: INI yang jadi "kapsul" mengambang */}
          <div
            className={`flex items-center justify-between rounded-full pl-4 pr-3 transition-all duration-300 ${
              isScrolled
                ? "bg-white/70 dark:bg-navy-charcoal/80 backdrop-blur-lg shadow-lg border border-gray-100 dark:border-white/10 py-2"
                : "bg-navy-dark/95 backdrop-blur-md shadow-xl py-2.5"
            }`}
          >
            {/* Logo */}
            <a
              id="navbar-logo-link"
              href="#beranda"
              onClick={(e) => handleScrollToSegment(e, "#beranda")}
              className="flex items-center gap-2 group focus:outline-none"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-mint-green to-teal-glow flex items-center justify-center text-white shadow-md shadow-mint-green/20 group-hover:scale-105 transition-transform">
                <Pill className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span
                  className={`font-display font-bold text-lg md:text-xl tracking-tight leading-none block transition-colors ${
                    isScrolled ? "text-navy-dark dark:text-white" : "text-white"
                  }`}
                >
                  Apotek<span className="text-teal-glow">Digital</span>
                </span>
                <span
                  className={`text-[10px] font-medium tracking-wider uppercase block transition-colors ${
                    isScrolled ? "text-gray-400 dark:text-slate-500" : "text-gray-300"
                  }`}
                >
                  Sistem Farmasi Modern
                </span>
              </div>
            </a>

            {/* Navigasi Desktop */}
            <nav id="desktop-nav" className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  id={`nav-link-${link.href.replace("#", "")}`}
                  href={link.href}
                  onClick={(e) => handleScrollToSegment(e, link.href)}
                  className={`text-sm font-medium transition-colors duration-200 relative py-1 group ${
                    isScrolled
                      ? "text-slate-600 dark:text-slate-300 hover:text-teal-glow"
                      : "text-slate-200 hover:text-white"
                  }`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-mint-green transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Tombol CTA Utama Desktop + Toggle Mode Gelap */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Toggle Mode Gelap */}
              <button
                id="dark-mode-toggle-desktop"
                onClick={toggleDark}
                className={`relative w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none overflow-hidden ${
                  isScrolled
                    ? "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/15"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
                aria-label={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
                title={isDark ? "Mode Terang" : "Mode Gelap"}
              >
                <motion.div
                  key={isDark ? "sun" : "moon"}
                  initial={{ rotate: -90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {isDark ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </motion.div>
              </button>

              {/* Tombol CTA (Call to Action) */}
              <a
                id="cta-cek-ketersediaan-desktop"
                href="#cek-ketersediaan"
                onClick={(e) => handleScrollToSegment(e, '#cek-ketersediaan')}
                className={`inline-flex items-center justify-center rounded-full font-semibold bg-navy-dark dark:bg-mint-green/15 dark:border dark:border-mint-green/30 text-white hover:bg-slate-800 dark:hover:bg-mint-green/25 active:scale-95 transition-all duration-300 shadow-md shadow-navy-dark/10 group cursor-pointer overflow-hidden ${
                  isScrolled ? "w-9 h-9" : "px-5 py-2.5 text-sm gap-2"
                }`}
                title="Cek Ketersediaan Obat"
              >
                <Search className="w-4 h-4 text-mint-green group-hover:translate-x-0.5 transition-transform shrink-0" />
                <span className={`transition-all duration-300 whitespace-nowrap ${
                  isScrolled ? "w-0 opacity-0" : "opacity-100"
                }`}>
                  Cek Ketersediaan
                </span>
              </a>
            </div>

            {/* Tombol Menu Seluler */}
            <div className="flex lg:hidden items-center gap-2">
              {/* Toggle Mode Gelap Seluler */}
              <button
                id="dark-mode-toggle-mobile"
                onClick={toggleDark}
                className={`p-2 rounded-full transition-all cursor-pointer focus:outline-none ${
                  isScrolled
                    ? "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300"
                    : "bg-white/10 text-white"
                }`}
                aria-label={isDark ? "Beralih ke mode terang" : "Beralih ke mode gelap"}
              >
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              <a
                id="cta-cek-ketersediaan-mobile-short"
                href="#cek-ketersediaan"
                onClick={(e) => handleScrollToSegment(e, '#cek-ketersediaan')}
                className="p-2 rounded-full bg-navy-dark dark:bg-white/10 text-white cursor-pointer"
                aria-label="Cek Ketersediaan Obat"
              >
                <Search className="w-4 h-4 text-mint-green" />
              </a>
              <button
                id="mobile-menu-hamburger"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-full border focus:outline-none transition-colors ${
                  isScrolled
                    ? "border-gray-200 dark:border-white/15 hover:bg-gray-50 dark:hover:bg-white/10 text-navy-dark dark:text-white"
                    : "border-white/20 hover:bg-white/10 text-white"
                }`}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Panel Menu Seluler */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={panelInitial}
            animate={panelAnimate}
            exit={panelExit}
            transition={panelTransition}
            className="fixed top-[80px] left-4 right-4 z-40 bg-white dark:bg-navy-charcoal rounded-2xl border border-gray-100 dark:border-white/10 shadow-xl overflow-hidden lg:hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  id={`mobile-nav-link-${link.href.replace("#", "")}`}
                  href={link.href}
                  onClick={(e) => handleScrollToSegment(e, link.href)}
                  className="flex items-center justify-between p-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-200 hover:text-teal-glow hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 opacity-50 text-slate-400 dark:text-slate-500" />
                </a>
              ))}
              <div className="pt-4 border-t border-gray-100 dark:border-white/10 mt-2">
                <a
                  id="cta-cek-ketersediaan-mobile-panel"
                  href="#cek-ketersediaan"
                  onClick={(e) => handleScrollToSegment(e, '#cek-ketersediaan')}
                  className="flex items-center justify-center gap-2 w-full p-3.5 rounded-xl text-base font-semibold bg-navy-dark dark:bg-mint-green/15 dark:border dark:border-mint-green/30 text-white hover:bg-slate-800 dark:hover:bg-mint-green/25 transition-colors cursor-pointer"
                >
                  <Search className="w-5 h-5 text-mint-green" />
                  <span>Cek Ketersediaan Obat</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
