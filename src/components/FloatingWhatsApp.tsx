/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';
import { pharmacyProfile } from '../data/mockData';

/**
 * Komponen FloatingWhatsApp
 * Tombol WhatsApp mengambang di sudut bawah layar dengan tooltip sapaan otomatis.
 */
export default function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(false);

  // Secara otomatis memunculkan (trigger) tooltip sapaan WhatsApp setelah 4 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  const preFilledWhatsAppMessage = encodeURIComponent(
    `Halo Apoteker ${pharmacyProfile.name}, saya ingin memesan obat dan konsultasi resep dokter secara online.`
  );

  return (
    <div id="floating-whatsapp-container" className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 select-none">
      
      {/* Tooltip Pop-up Dinamis */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white dark:bg-navy-charcoal p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10 max-w-[260px] relative text-slate-800 dark:text-slate-200"
            id="whatsapp-greeting-tooltip"
          >
            {/* Tombol Tutup */}
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
              aria-label="Tutup sapaan"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-md block w-fit">
                Online Apoteker
              </span>
              <p className="text-xs font-semibold text-navy-dark dark:text-white pt-1">
                Butuh Bantuan Cepat?
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal font-light">
                Konsultasikan dosis obat dan tebus resep dokter instan via WhatsApp di sini.
              </p>
            </div>

            {/* Segitiga mikro balon percakapan */}
            <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white dark:bg-navy-charcoal border-r border-b border-slate-100 dark:border-white/10 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tombol Mengambang (Floating Button) */}
      <div className="relative">
        
        {/* Cincin aura berdenyut di belakang */}
        <div className="absolute inset-0 rounded-full bg-emerald-500/25 wa-pulse scale-125 -z-10" />

        <a
          id="whatsapp-floating-action-button"
          href={`https://wa.me/6282278954406?text=${preFilledWhatsAppMessage}`}
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center text-white shadow-lg hover:shadow-emerald-500/35 hover:scale-105 active:scale-95 transition-all outline-none"
          aria-label="Mulai Obrolan WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
        </a>
      </div>

    </div>
  );
}
