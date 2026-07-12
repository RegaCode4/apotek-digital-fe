/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  Pill,
  MapPin,
  Mail,
  MessageSquare,
  Instagram,
  Facebook,
  Heart,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { pharmacyProfile } from "../data/mockData";

/**
 * Komponen Footer
 * Bagian penutup bawah situs yang memuat navigasi cepat, kontak, jam operasional, dan info hak cipta.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Beranda Utama", href: "#beranda" },
    { name: "Tentang Kami", href: "#tentang" },
    { name: "Cek Ketersediaan", href: "#cek-ketersediaan" },
    { name: "Kategori Obat", href: "#kategori-obat" },
    { name: "Peta Lokasi", href: "#lokasi" },
    { name: "Hubungi Kontak", href: "#kontak" },
  ];

  const handleScrollToSegment = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop =
        element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer
      id="footer-root"
      className="bg-navy-dark text-slate-350 border-t border-white/5 pt-16 pb-8 select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/5">
          {/* Kolom 1: Merek & Deskripsi */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-mint-green to-teal-glow flex items-center justify-center text-white">
                <Pill className="w-4 h-4 fill-white text-teal-glow" />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                Apotek<span className="text-mint-green">Digital</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Membangun fondasi kesehatan berkelanjutan melalui kemudahan sistem
              konsultasi resep digital yang ringkas, transparan, serta didukung
              penuh oleh tim apoteker berlisensi resmi.
            </p>

            {/* Segel Kredensial */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[9px] text-teal-glow font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>BPOM RESMI</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[9px] text-teal-glow font-bold uppercase tracking-wider">
                <span>DINKES RI</span>
              </div>
            </div>
          </div>

          {/* Kolom 2: Tautan Peta Situs (Sitemap) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-display font-semibold text-xs text-white uppercase tracking-wider">
              Navigasi Cepat
            </h4>
            <ul className="space-y-2.5 text-xs">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScrollToSegment(e, link.href)}
                    className="hover:text-mint-green text-slate-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Kolom 3: Ringkasan detail kontak */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-semibold text-xs text-white uppercase tracking-wider">
              Kontak Utama
            </h4>
            <ul className="space-y-3 text-xs text-slate-400 font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-mint-green shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  {pharmacyProfile.address}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-mint-green shrink-0" />
                <a
                  href="https://wa.me/6282278954406"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-mint-green transition-colors"
                >
                  WhatsApp: {pharmacyProfile.whatsApp}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-mint-green shrink-0" />
                <a
                  href={`mailto:${pharmacyProfile.email}`}
                  className="hover:text-mint-green transition-colors"
                >
                  {pharmacyProfile.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Operasional & Media Sosial */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-display font-semibold text-xs text-white uppercase tracking-wider">
              Jam operasional
            </h4>
            <div className="text-xs text-slate-400 space-y-1.5 font-light">
              <p className="font-semibold text-white">Senin - Jumat:</p>
              <p>07:00 WIB - 22:00 WIB</p>
              <p className="font-semibold text-white pt-1">Sabtu - Minggu:</p>
              <p>08:00 WIB - 20:00 WIB</p>
            </div>

            {/* Koneksi media sosial */}
            <div className="pt-4 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-mint-green hover:text-navy-dark flex items-center justify-center text-slate-400 transition-all"
                aria-label="Instagram Apotek Digital"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-mint-green hover:text-navy-dark flex items-center justify-center text-slate-400 transition-all"
                aria-label="Facebook Apotek Digital"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Baris bawah hak cipta (Copyright) */}
        <div className="pt-8 flex flex-col items-center justify-center gap-4 text-xs text-slate-500 font-light">
          <div className="flex items-center gap-1">
            <span>
              © {currentYear} {pharmacyProfile.name}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
