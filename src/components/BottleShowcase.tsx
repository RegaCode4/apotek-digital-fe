/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Activity, MessageSquare } from "lucide-react";
import bottleImg from "../assets/image.png";

// Register ScrollTrigger plugin once
gsap.registerPlugin(ScrollTrigger);

export default function BottleShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        // Fallback layout for prefers-reduced-motion (no scroll pins, simple fade-in)
        gsap.fromTo(
          ".showcase-animated-element",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.2 },
        );
        return;
      }

      const isMobile = window.innerWidth < 768;
      const pinDistance = isMobile ? "+=120%" : "+=200%";

      // 1. Create scrub scroll timeline pinned to the viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: pinDistance,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 2. Animate elements as user scrolls
      // Big background heading fades in, scales, and rises gently
      tl.fromTo(
        ".showcase-bg-heading",
        { opacity: 0.1, scale: 0.85, y: isMobile ? 30 : 60 },
        { opacity: 0.75, scale: 1.05, y: isMobile ? -10 : -30, duration: 2 },
        0,
      );

      // Bottle scales up from small to large, rotates slightly, and moves up
      tl.fromTo(
        ".showcase-bottle",
        { scale: isMobile ? 0.85 : 1.0, rotation: -8, y: isMobile ? 40 : 80 },
        {
          scale: isMobile ? 0.95 : 1.15,
          rotation: 8,
          y: isMobile ? -20 : -60,
          duration: 3.5,
          ease: "none",
        },
        0,
      );

      // Callout 1 (Original Medicine, left side) fades in and slides to left position
      tl.fromTo(
        ".callout-1",
        { opacity: 0, x: isMobile ? -30 : -100, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1 },
        0.5,
      );
      // Soft fade-out of callout-1 as scroll deepens to make room or highlight next features
      tl.to(
        ".callout-1",
        { opacity: 0.25, x: isMobile ? -10 : -30, duration: 0.8 },
        1.3,
      );

      // Callout 2 (Live Stock, right side) fades in and slides right
      tl.fromTo(
        ".callout-2",
        { opacity: 0, x: isMobile ? 30 : 100, scale: 0.9 },
        { opacity: 1, x: 0, scale: 1, duration: 1 },
        1.2,
      );
      tl.to(
        ".callout-2",
        { opacity: 0.25, x: isMobile ? 10 : 30, duration: 0.8 },
        2.0,
      );

      // Callout 3 (Live Advice, bottom-centerish or left) slides up
      tl.fromTo(
        ".callout-3",
        { opacity: 0, y: isMobile ? 30 : 80, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1 },
        1.9,
      );
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={triggerRef}
      className="w-full bg-slate-50/50 dark:bg-navy-dark relative border-b border-slate-100 dark:border-white/5 overflow-hidden"
    >
      {/* Decorative gradient spot at background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-mint-green/5 dark:bg-mint-green/3 rounded-full blur-3xl pointer-events-none" />

      {/* Main pinned full page viewport view */}
      <div
        ref={containerRef}
        className="w-full min-h-screen flex flex-col justify-center items-center px-4 relative"
      >
        {/* Massive watermark title text behind bottle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none px-4 z-0">
          <h2 className="showcase-bg-heading font-display font-extrabold text-4xl sm:text-5xl md:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-navy-dark/10 via-teal-glow/15 to-mint-green/10 dark:from-white/5 dark:via-teal-glow/10 dark:to-mint-green/5 uppercase tracking-tighter text-center leading-none">
            APOTEK
            <br />
            MASA DEPAN
          </h2>
        </div>

        {/* Dynamic features layout wrapper */}
        <div className="w-full max-w-5xl mx-auto h-[500px] md:h-[600px] relative flex items-center justify-center showcase-content">
          {/* Centered Product Showcase Bottle */}
          <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 md:w-[28rem] md:h-[28rem] flex items-center justify-center pointer-events-none">
            <img
              src={bottleImg}
              alt="Obat Herbal & Medis Pilihan Apotek Digital"
              referrerPolicy="no-referrer"
              className="showcase-bottle w-full h-full object-contain drop-shadow-[0_25px_60px_rgba(15,213,159,0.3)] filter showcase-animated-element"
            />
          </div>

          {/* Floating Feature callout cards */}
          {/* Feature 1 - Left */}
          <div className="callout-1 showcase-animated-element absolute left-2 sm:left-6 md:left-12 top-[10%] sm:top-[20%] md:top-[25%] z-20 max-w-[170px] sm:max-w-[240px] md:max-w-xs p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-navy-charcoal/90 backdrop-blur-md border border-emerald-50 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex items-start gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <h4 className="font-display font-bold text-navy-dark dark:text-white text-[11px] sm:text-xs md:text-sm">
                Obat 100% Original
              </h4>
              <p className="text-[9px] sm:text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                Jaminan legalitas resmi bersertifikat BPOM & Kemenkes RI.
              </p>
            </div>
          </div>

          {/* Feature 2 - Right */}
          <div className="callout-2 showcase-animated-element absolute right-2 sm:right-6 md:right-12 top-[40%] sm:top-[42%] md:top-[40%] z-20 max-w-[170px] sm:max-w-[240px] md:max-w-xs p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-navy-charcoal/90 backdrop-blur-md border border-teal-50 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex items-start gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-teal-50 dark:bg-teal-500/10 text-teal-glow flex items-center justify-center shrink-0">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <h4 className="font-display font-bold text-navy-dark dark:text-white text-[11px] sm:text-xs md:text-sm">
                Stok Live Real-Time
              </h4>
              <p className="text-[9px] sm:text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                Pencarian obat langsung sinkron ke database apotek fisik.
              </p>
            </div>
          </div>

          {/* Feature 3 - Bottom-Centerish or Bottom-Left responsive */}
          <div className="callout-3 showcase-animated-element absolute left-4 sm:left-[15%] md:left-[20%] bottom-[4%] sm:bottom-[8%] md:bottom-[12%] z-20 max-w-[170px] sm:max-w-[240px] md:max-w-xs p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-navy-charcoal/90 backdrop-blur-md border border-indigo-50 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.2)] flex items-start gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <h4 className="font-display font-bold text-navy-dark dark:text-white text-[11px] sm:text-xs md:text-sm">
                Tanya Apoteker (WA)
              </h4>
              <p className="text-[9px] sm:text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed font-sans">
                Konsultasi dosis & resep gratis dilayani apoteker berlisensi.
              </p>
            </div>
          </div>
        </div>

        {/* Mini interactive scroll cue indicator at bottom layout */}
        <div className="absolute bottom-6 flex flex-col items-center gap-1.5 opacity-80 pointer-events-none z-10 text-center animate-pulse">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Scroll atau Usap Berurutan
          </span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-slate-300 dark:border-slate-600 flex justify-center p-1">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-teal-glow rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
