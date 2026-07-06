/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Clock, MapPin, Mail, Shield, UserCheck, RefreshCw, Star } from 'lucide-react';
import { pharmacyProfile } from '../data/mockData';
import SectionReveal from './ui/SectionReveal';

export default function About() {
  const features = [
    {
      icon: Shield,
      title: "100% Produk Terjamin Asli",
      text: "Seluruh obat kami diambil secara eksklusif dari pedagang besar farmasi (PBF) resmi dan dipacking khusus dengan segel keaslian."
    },
    {
      icon: UserCheck,
      title: "Asistensi Apoteker Berlisensi",
      text: "Konsultasi dosis obat, kontraindikasi, hingga petunjuk konsumsi khusus dibimbing langsung oleh Apoteker bersertifikat STRA resmi."
    },
    {
      icon: RefreshCw,
      title: "Integrasi Stok Real-Time",
      text: "Website kami ditenagai oleh sinkronisasi otomatis agar persediaan obat harian tampil presisi bagi pengunjung publik."
    }
  ];

  return (
    <section id="tentang" className="py-20 md:py-28 bg-white dark:bg-navy-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with display font */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionReveal>
            <span className="text-xs font-bold text-teal-glow tracking-widest uppercase bg-mint-green/10 px-3 py-1.5 rounded-full">
              Profil & Pelayanan Kami
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-dark dark:text-white tracking-tight mt-3">
              Mengenal Lebih Dekat Layanan Farmasi {pharmacyProfile.name}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed font-light">
              Kami menggabungkan dedikasi medis tradisional dengan inovasi digital untuk menghadirkan layanan kefarmasian yang responsif, terpercaya, dan mudah diakses oleh seluruh lapisan masyarakat secara transparan.
            </p>
          </SectionReveal>
        </div>

        {/* Bento Grid layout representing Core Info and Operations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left card: Pharmacy details overview */}
          <div className="lg:col-span-7 flex flex-col justify-between p-8 md:p-10 rounded-[32px] bg-gradient-to-br from-slate-50 to-emerald-50/10 dark:from-navy-charcoal dark:to-navy-charcoal border border-slate-100 dark:border-white/10 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-mint-green/5 rounded-full blur-2xl pointer-events-none" />
            
            <SectionReveal className="space-y-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-mint-green fill-mint-green" />
                <Star className="w-5 h-5 text-mint-green fill-mint-green" />
                <Star className="w-5 h-5 text-mint-green fill-mint-green" />
                <Star className="w-5 h-5 text-mint-green fill-mint-green" />
                <Star className="w-5 h-5 text-mint-green fill-mint-green" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-navy-dark dark:text-white leading-tight">
                Visi Kami: Solusi Sehat Modern Berkualitas
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                {pharmacyProfile.description}
              </p>
              <div className="pt-4 flex flex-wrap gap-3">
                <span className="text-xs font-semibold bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-xl shadow-xs">
                  Amanah Kesehatan Publik
                </span>
                <span className="text-xs font-semibold bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-xl shadow-xs">
                  Standar Mutu Kemenkes
                </span>
                <span className="text-xs font-semibold bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 text-slate-600 dark:text-slate-300 px-3 py-1.5 rounded-xl shadow-xs">
                  Layanan Online Cepat
                </span>
              </div>
            </SectionReveal>
          </div>

          {/* Right card layout: Direct Operational Coordinates & Hours */}
          <div className="lg:col-span-5 grid grid-cols-1 gap-6">
            
            {/* Hour detail item */}
            <SectionReveal delay={0.1}>
              <div className="p-6 rounded-2xl bg-white dark:bg-navy-charcoal border border-slate-150 dark:border-white/10 shadow-sm hover:border-mint-green/30 transition-all flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-teal-glow shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-navy-dark dark:text-white text-base">Jam Operasional Layanan</h4>
                  <p className="text-xs font-semibold text-teal-glow uppercase tracking-wider">Senin - Jumat</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{pharmacyProfile.operatingHours.weekday}</p>
                  <p className="text-xs font-semibold text-teal-glow uppercase tracking-wider pt-1.5">Sabtu - Minggu</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{pharmacyProfile.operatingHours.weekend}</p>
                  <p className="text-[11px] text-orange-500 dark:text-orange-400 font-medium italic mt-2 block">{pharmacyProfile.operatingHours.notes}</p>
                </div>
              </div>
            </SectionReveal>

            {/* Address detail item */}
            <SectionReveal delay={0.2}>
              <div className="p-6 rounded-2xl bg-white dark:bg-navy-charcoal border border-slate-150 dark:border-white/10 shadow-sm hover:border-mint-green/30 transition-all flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-teal-glow shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-navy-dark dark:text-white text-base">Lokasi Fisik Apotek</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pharmacyProfile.address}
                  </p>
                  <span className="inline-block text-xs font-bold text-teal-glow mt-1 bg-mint-green/10 px-2 py-0.5 rounded-md">
                    {pharmacyProfile.city}
                  </span>
                </div>
              </div>
            </SectionReveal>

            {/* WhatsApp & Email detail item */}
            <SectionReveal delay={0.3}>
              <div className="p-6 rounded-2xl bg-white dark:bg-navy-charcoal border border-slate-150 dark:border-white/10 shadow-sm hover:border-mint-green/30 transition-all flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-teal-glow shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-display font-bold text-navy-dark dark:text-white text-base">Kontak Hubungan Layanan</h4>
                  <p className="text-xs font-semibold text-teal-glow uppercase tracking-wider">WhatsApp Resmi</p>
                  <a
                    href="https://wa.me/6282278954406"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-slate-600 dark:text-slate-300 hover:text-teal-glow hover:underline font-bold block"
                  >
                    {pharmacyProfile.whatsApp}
                  </a>
                  <p className="text-xs font-semibold text-teal-glow uppercase tracking-wider pt-1.5">Email Layanan</p>
                  <a
                    href={`mailto:${pharmacyProfile.email}`}
                    className="text-sm text-slate-600 dark:text-slate-300 hover:text-teal-glow hover:underline font-bold block"
                  >
                    {pharmacyProfile.email}
                  </a>
                </div>
              </div>
            </SectionReveal>

          </div>
        </div>

        {/* Feature values block */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx}>
                <SectionReveal delay={idx * 0.1} className="flex flex-col p-6 rounded-2xl bg-slate-50/50 dark:bg-navy-charcoal/50 border border-slate-100 dark:border-white/10 hover:bg-white dark:hover:bg-navy-charcoal hover:shadow-md transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-mint-green/10 text-teal-glow flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-teal-glow" />
                  </div>
                  <h4 className="font-display font-bold text-base text-navy-dark dark:text-white mb-2">{feature.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">{feature.text}</p>
                </SectionReveal>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
