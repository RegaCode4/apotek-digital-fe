/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown } from "lucide-react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

/**
 * Komponen CustomSelect
 * Dropdown kustom dengan animasi buka/tutup yang mendukung mode gelap (dark mode).
 */
export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Pilih salah satu...",
  className = "",
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown (menu tarik-turun) ketika klik di luar area
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      {/* Tombol Pemicu */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl bg-white dark:bg-navy-dark border border-slate-200 dark:border-white/10 hover:border-mint-green/50 focus:border-mint-green focus:ring-2 focus:ring-mint-green/20 text-slate-700 dark:text-slate-200 text-sm focus:outline-none transition-all shadow-xs cursor-pointer"
      >
        <span className={!selectedOption ? "text-slate-400 dark:text-slate-500" : ""}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </motion.div>
      </button>

      {/* Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute z-50 w-full mt-2 bg-white dark:bg-navy-elevated border border-slate-100 dark:border-white/10 rounded-xl shadow-xl overflow-hidden"
          >
            <ul className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
              {options.map((option) => (
                <li
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${
                    value === option.value
                      ? "bg-emerald-50 dark:bg-mint-green/10 text-emerald-700 dark:text-mint-green font-semibold"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
