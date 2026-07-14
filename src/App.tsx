/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BottleShowcase from './components/BottleShowcase';
import About from './components/About';
import Categories from './components/Categories';
import MedicineAvailability from './components/MedicineAvailability';
import LocationSection from './components/LocationSection';
import ContactSection from './components/ContactSection';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Footer from './components/Footer';
import { useMedicines } from './hooks/useMedicines';
import { useDarkMode } from './hooks/useDarkMode';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const { medicines, isLoading, error, refetch } = useMedicines();
  const { isDark, toggleDark } = useDarkMode();

  useLayoutEffect(() => {
    // Buat smooth scroller PERTAMA KALI!
    let smoother = ScrollSmoother.create({
      smooth: 2, // tingkatkan kehalusan (smoothness)
      effects: true,
      normalizeScroll: true, // paksa perilaku gulir standar di semua perangkat (sangat halus)
      smoothTouch: 0.1
    });

    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <div id="app-viewport-root" className="min-h-screen selection:bg-mint-green selection:text-navy-dark dark:bg-navy-dark dark:text-slate-200">
      
      {/* Header Navbar Tetap (Sticky) */}
      <Navbar isDark={isDark} toggleDark={toggleDark} />

      <div id="smooth-wrapper">
        <div id="smooth-content" className="flex flex-col justify-between min-h-screen">
          {/* Bagian Tata Letak Halaman Utama */}
          <main className="flex-grow">
            
            {/* 1. Blok Hero (Tampilan Utama) */}
            <Hero />

            {/* 1.5. Etalase Gulir Botol Interaktif GSAP */}
            <BottleShowcase />

            {/* 2. Grid Bento Profil Apotek (Tentang) */}
            <About />

            {/* 3. Grid Kategori Interaktif (menyaring daftar Cek Ketersediaan) */}
            <Categories 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
              medicines={medicines}
            />

            {/* 4. Panel Cek Stok Real-time (Waktu Nyata) */}
            <MedicineAvailability 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
              medicines={medicines}
              isLoading={isLoading}
              error={error}
              refetch={refetch}
            />

            {/* 5. Bagian Koordinat Peta Geografis */}
            <LocationSection />

            {/* 6. Formulir Kontak yang Divalidasi Klien */}
            <ContactSection />

          </main>

          {/* 7. Tautan peta navigasi Footer */}
          <Footer />
        </div>
      </div>

      <FloatingWhatsApp />
    </div>
  );
}
