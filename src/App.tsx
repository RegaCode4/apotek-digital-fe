/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
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

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('semua');
  const { medicines, isLoading, error, refetch } = useMedicines();

  return (
    <div id="app-viewport-root" className="min-h-screen flex flex-col justify-between selection:bg-mint-green selection:text-navy-dark">
      
      {/* Sticky Header Navbar */}
      <Navbar />

      {/* Main Page Layout Sections */}
      <main className="flex-grow">
        
        {/* 1. Hero Block */}
        <Hero />

        {/* 1.5. Interactive GSAP Bottle Scroll Showcase */}
        <BottleShowcase />

        {/* 2. About Pharm Profile Bento Grid */}
        <About />

        {/* 3. Interactive Category Grid (filters Cek Ketersediaan list) */}
        <Categories 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
          medicines={medicines}
        />

        {/* 4. Real-time Stock Check Panel */}
        <MedicineAvailability 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
          medicines={medicines}
          isLoading={isLoading}
          error={error}
          refetch={refetch}
        />

        {/* 5. Geographic Map Coordinates Section */}
        <LocationSection />

        {/* 6. Client-Validated Contact Form */}
        <ContactSection />

      </main>

      {/* 7. Footer navigation map links */}
      <Footer />

      {/* 8. Timed greeting floating WhatsApp button */}
      <FloatingWhatsApp />

    </div>
  );
}
