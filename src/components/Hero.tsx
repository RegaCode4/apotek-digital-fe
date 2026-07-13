/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { animate, splitText, stagger } from 'animejs';
import { Search, Calendar, MessageSquare, ArrowDown, Activity, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { pharmacyProfile } from '../data/mockData';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  const checkIsOpen = () => {
    const now = new Date();
    const day = now.getDay(); // 0: Minggu, 1: Senin, ..., 6: Sabtu
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const currentTime = hours + minutes / 60;

    let openTime, closeTime;
    let timeString = '';

    if (day >= 1 && day <= 5) {
      // Hari kerja (Senin - Jumat)
      openTime = 7;
      closeTime = 22;
      timeString = pharmacyProfile.operatingHours.weekday.split(': ')[1];
    } else {
      // Akhir pekan (Sabtu - Minggu)
      openTime = 8;
      closeTime = 20;
      timeString = pharmacyProfile.operatingHours.weekend.split(': ')[1];
    }

    const isOpen = currentTime >= openTime && currentTime < closeTime;
    return { isOpen, timeString };
  };

  const [storeStatus, setStoreStatus] = useState(checkIsOpen());

  useEffect(() => {
    const interval = setInterval(() => {
      setStoreStatus(checkIsOpen());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Pengaturan Efek Hover 3D
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    let isMounted = true;
    let split: any = null;
    
    document.fonts.ready.then(() => {
      if (!isMounted || !titleRef.current) return;
      
      split = splitText(titleRef.current, {
        lines: { wrap: 'clip' },
      });

      split.addEffect(({ lines }: any) => animate(lines, {
        y: ['100%', '0%'],
        duration: 750,
        ease: 'out(3)',
        delay: stagger(200),
      }));
    });

    return () => {
      isMounted = false;
      if (split) {
        split.revert();
      }
    };
  }, []);
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const preFilledWhatsAppMessage = encodeURIComponent(
    `Halo ${pharmacyProfile.name}, saya ingin konsultasi mengenai ketersediaan obat dan tebus resep.`
  );

  return (
    <section 
      id="beranda" 
      className="relative min-h-screen pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden flex items-center bg-gradient-to-b from-emerald-50/20 via-white to-transparent dark:from-navy-dark dark:via-navy-dark dark:to-navy-dark"
    >
      {/* Latar belakang blur dekoratif (dihapus untuk mengurangi bayangan hijau berlebih) */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Konten Kiri Hero */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Badge Status Operasional Langsung */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wide uppercase ${
                storeStatus.isOpen 
                  ? "bg-mint-green/10 border-mint-green/30 text-teal-glow" 
                  : "bg-red-500/10 border-red-500/30 text-red-500"
              }`}
            >
              <span className="relative flex h-2 w-2">
                {storeStatus.isOpen && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mint-green opacity-75"></span>}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${storeStatus.isOpen ? "bg-mint-green" : "bg-red-500"}`}></span>
              </span>
              <span>{storeStatus.isOpen ? "Buka Sekarang" : "Tutup Sekarang"} • {storeStatus.timeString}</span>
            </motion.div>

            {/* Tipografi Judul Besar */}
            <div className="space-y-4">
              <h1
                ref={titleRef}
                className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-navy-dark dark:text-white tracking-tight leading-[1.1]"
              >
                Apotek Modern, <br className="hidden md:inline" />
                <span style={{ fontFamily: 'Latenza, serif' }} className="text-transparent bg-clip-text bg-gradient-to-r from-teal-glow to-emerald-600 dark:from-mint-green dark:to-teal-glow block sm:inline italic font-light">Pelayanan Terpercaya</span>
              </h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.7 }}
                className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
              >
                Temukan kemudahan luar biasa dalam pengecekan persediaan obat secara real-time, tebus resep praktis, dan konsultasi kesehatan langsung bersama apoteker berlisensi kami.
              </motion.p>
            </div>

            {/* Tombol Aksi */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                id="hero-cta-check-availability"
                href="#cek-ketersediaan"
                onClick={(e) => handleScrollToSection(e, '#cek-ketersediaan')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-tr from-mint-green to-teal-glow text-navy-dark font-bold hover:shadow-lg hover:shadow-mint-green/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
              >
                <Search className="w-5 h-5 text-navy-dark" />
                <span>Cek Ketersediaan Obat</span>
              </a>

              <a
                id="hero-cta-whatsapp-secondary"
                href={`https://wa.me/${pharmacyProfile.whatsApp.replace(/\D/g, '')}?text=${preFilledWhatsAppMessage}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-white dark:bg-navy-charcoal border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 font-semibold hover:border-mint-green/50 hover:bg-slate-50 dark:hover:bg-navy-elevated hover:scale-[1.01] active:scale-95 transition-all group"
              >
                <MessageSquare className="w-5 h-5 text-teal-glow group-hover:scale-110 transition-transform" />
                <span>Konsultasi Apoteker</span>
              </a>
            </motion.div>

            {/* Grid Manfaat Mikro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-100 dark:border-white/10 max-w-lg mx-auto lg:mx-0"
            >
              <div className="flex flex-col items-center lg:items-start gap-1">
                <div className="flex items-center gap-1.5 text-teal-glow font-bold text-lg sm:text-2xl font-display">
                  <ShieldCheck className="w-5 h-5 text-mint-green hidden sm:inline" />
                  <span>100%</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium text-center lg:text-left">Obat Asli & Resmi</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <div className="flex items-center gap-1.5 text-teal-glow font-bold text-lg sm:text-2xl font-display">
                  <Calendar className="w-5 h-5 text-mint-green hidden sm:inline" />
                  <span>7 Hari</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium text-center lg:text-left">Operasional Aktif</span>
              </div>
              <div className="flex flex-col items-center lg:items-start gap-1">
                <div className="flex items-center gap-1.5 text-teal-glow font-bold text-lg sm:text-2xl font-display">
                  <Activity className="w-5 h-5 text-mint-green hidden sm:inline" />
                  <span>Live</span>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium text-center lg:text-left">Sistem Cek Stok</span>
              </div>
            </motion.div>
          </div>

          {/* Visual Kanan Hero: Tumpukan Kartu Melayang Elegan */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[400px] sm:min-h-[460px] select-none" style={{ perspective: 1000 }}>
            
            {/* Panel glowing latar belakang (dihapus untuk mengurangi bayangan hijau berlebih) */}

            {/* Item melayang bertumpuk dengan elegan */}
            <motion.div 
              className="relative w-full max-w-[400px] h-[360px] flex items-center justify-center cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >

              {/* Kartu 1: Decolgen (kiri belakang) */}
              <motion.div
                initial={{ opacity: 0, rotate: -20, x: -60, y: -20 }}
                animate={{ opacity: 1, rotate: -15, x: -75, y: -25 }}
                transition={{ duration: 0.9, delay: 0.3 }}
                className="absolute w-52 p-5 rounded-3xl bg-white dark:bg-navy-charcoal border border-slate-100 dark:border-white/10 shadow-xl opacity-90"
              >
                <div className="flex justify-between items-start mb-3">
                  {/* <div className="w-8 h-8 rounded-lg bg-pink-50 dark:bg-pink-500/10 flex items-center justify-center text-pink-500">
                    <Heart className="w-4 h-4 fill-pink-500" />
                  </div> */}
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 dark:text-slate-400 font-bold">Kategori: Alergi</span>
                </div>
                <h4 className="font-display font-bold text-sm text-slate-800 dark:text-slate-100">Decolgen Kaplet</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 font-mono">Phenylpropanolamine</p>
                <div className="mt-4 flex items-center justify-between border-t border-slate-50 dark:border-white/5 pt-2.5">
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-500/10 px-2 py-0.5 rounded-md">Stok Aman</span>
                  <span className="font-display text-xs font-bold text-slate-700 dark:text-slate-300">Rp 6.400 / strip</span>
                </div>
              </motion.div>

              {/* Kartu 2: Kartu utama di tengah mewakili sistem digital premium */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute w-64 p-6 rounded-[32px] bg-navy-dark text-white shadow-2xl border-2 border-mint-green/30 z-20"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] px-2.5 py-1 rounded-full bg-mint-green/20 text-mint-green font-bold tracking-wider uppercase">Sistem Pintar</span>
                  {/*<Sparkles className="w-5 h-5 text-mint-green animate-spin-slow" />*/}
                </div>
                <h3 className="font-display font-bold text-lg leading-tight">Gunting Resep Dokter Digital</h3>
                <p className="text-xs text-slate-400 mt-1 font-light leading-relaxed">
                  Unggah resep Anda, apoteker kami akan memvalidasi secara instan harganya.
                </p>
                <div className="mt-6 flex flex-col gap-2 bg-navy-charcoal p-3.5 rounded-2xl border border-white/5">
                  <span className="text-[10px] text-slate-400 block font-mono">ID TRANSAKSI: TX-89021</span>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs font-semibold text-white">Teofilin Kapsul</span>
                    <span className="text-xs font-bold text-mint-green">Tersedia</span>
                  </div>
                </div>
              </motion.div>

              {/* Kartu 3: Amoxicillin melayang (kanan, dengan indikator wajib resep) */}
              <motion.div
                initial={{ opacity: 0, rotate: 18, x: 60, y: 30 }}
                animate={{ opacity: 1, rotate: 12, x: 75, y: 25 }}
                transition={{ duration: 0.9, delay: 0.4 }}
                className="absolute w-52 p-5 rounded-3xl bg-white dark:bg-navy-charcoal border border-slate-100 dark:border-white/10 shadow-xl z-10"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-500">
                    <Activity className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-500/10 text-red-500 font-bold">Wajib Resep</span>
                </div>
                <h4 className="font-display font-semibold text-sm text-slate-800 dark:text-slate-100 leading-none">Amoxicillin</h4>
                <p className="text-[10px] text-slate-400 mt-1 font-mono">Kategori: Antibiotik</p>
                <div className="mt-4 pt-3 border-t border-slate-50 dark:border-white/5 flex flex-col gap-1.5">
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Status stok:</span>
                  <span className="inline-block text-center text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2 py-1 rounded-lg">Stok Terbatas</span>
                </div>
              </motion.div>

              {/* Tag/chip mikro pengguna yang melayang */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-2 left-6 bg-emerald-600 text-white text-[10px] font-semibold py-1 px-3 rounded-full shadow-lg z-30 flex items-center gap-1.5"
              >
                <span>@apotek_berlisensi</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-4 right-2 bg-gradient-to-r from-teal-glow to-teal-600 text-white text-[10px] font-semibold py-1 px-3 rounded-full shadow-lg z-30 flex items-center gap-1.5"
                style={{ z: 20 } as any}
              >
                <span>@kemenkes_bpom</span>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Panah Indikator Scroll */}
        <div className="flex justify-center mt-8 md:mt-12">
          <a
            href="#tentang"
            onClick={(e) => handleScrollToSection(e, '#tentang')}
            className="p-3 rounded-full bg-white dark:bg-navy-charcoal border border-slate-100 dark:border-white/10 text-slate-400 hover:text-teal-glow hover:border-mint-green/50 active:scale-95 transition-all shadow-md flex items-center justify-center animate-bounce-subtle"
            aria-label="Scroll ke Bawah"
          >
            <ArrowDown className="w-5 h-5 text-teal-glow" />
          </a>
        </div>
      </div>
    </section>
  );
}
