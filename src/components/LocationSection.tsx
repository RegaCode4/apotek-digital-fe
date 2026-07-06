/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MapPin, Navigation, Map, Compass, ExternalLink } from "lucide-react";
import { pharmacyProfile } from "../data/mockData";
import SectionReveal from "./ui/SectionReveal";

/**
 * Location Section Component
 * Displays the physical pharmacy address, transit information, and an embedded Google Maps view.
 */
export default function LocationSection() {
  return (
    <section id="lokasi" className="py-20 md:py-28 bg-white dark:bg-navy-dark relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionReveal>
            <span className="text-xs font-bold text-teal-glow tracking-widest uppercase bg-mint-green/10 px-3 py-1.5 rounded-full">
              Peta Lokasi Fisik
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-dark dark:text-white tracking-tight mt-3">
              Kunjungi Apotek Kami Secara Fisik
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-3 font-light leading-relaxed">
              Kami berlokasi strategis di pusat kota dengan akses mudah, tempat
              parkir aman, dan ruang konsultasi privat apoteker yang sejuk untuk
              menunjang kenyamanan maksimal Anda.
            </p>
          </SectionReveal>
        </div>

        {/* Location Grid Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct address panel */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 md:p-10 rounded-[32px] bg-navy-dark text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-mint-green/5 rounded-full blur-3xl pointer-events-none" />

            <SectionReveal className="space-y-8">
              <div className="w-12 h-12 rounded-xl bg-mint-green/10 text-mint-green flex items-center justify-center shrink-0">
                <Compass className="w-6 h-6" />
              </div>

              <div className="space-y-3">
                <h4 className="font-display font-bold text-xl tracking-tight">
                  Detail Alamat Utama:
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed font-light">
                  {pharmacyProfile.address}
                </p>
                <div className="flex items-center gap-2 pt-2">
                  <span className="text-xs font-semibold bg-navy-charcoal text-mint-green border border-white/5 py-1 px-3 rounded-full">
                    Kecamatan Pauh
                  </span>
                  <span className="text-xs font-semibold bg-navy-charcoal text-white border border-white/5 py-1 px-3 rounded-full">
                    {pharmacyProfile.city}
                  </span>
                </div>
              </div>

              {/* Transit hints */}
              <div className="space-y-4 pt-6 border-t border-white/15">
                <div className="flex gap-3">
                  <Navigation className="w-5 h-5 text-mint-green shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-white block font-semibold">
                      Petunjuk Transportasi Umum:
                    </strong>
                    <p className="text-slate-400 mt-1 leading-relaxed font-light">
                      Akses mudah dicapai menggunakan sarana transportasi lokal
                      Kota Padang (seperti angkot jurusan Pauh/Kampus Unand).
                      Berlokasi strategis di kawasan Jl. Benteng, dekat area
                      pemukiman warga dan fasilitas pendidikan.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Map className="w-5 h-5 text-mint-green shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-white block font-semibold">
                      Fasilitas Apotek Fisik:
                    </strong>
                    <p className="text-slate-400 mt-1 leading-relaxed font-light">
                      Akses kursi roda, parkir kendaraan bermotor harian gratis,
                      pendingin ruangan (AC), serta dispenser air minum steril
                      bagi konsumen.
                    </p>
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Direct Open in Maps Link */}
            <div className="pt-8 mt-8 border-t border-white/10">
              <a
                id="location-cta-open-maps-directions"
                href={pharmacyProfile.googleMapsShareUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-tr from-mint-green to-teal-glow text-navy-dark font-bold hover:scale-[1.01] active:scale-95 transition-all shadow-md cursor-pointer"
              >
                <span>Buka Petunjuk di Google Maps</span>
                <ExternalLink className="w-4 h-4 text-navy-dark" />
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps IFrame wrapper (Sleek minimalist panel styling) */}
          <div className="lg:col-span-7 h-[380px] lg:h-auto min-h-[400px] rounded-[32px] border border-slate-100 dark:border-white/10 shadow-sm overflow-hidden relative bg-slate-50 dark:bg-navy-charcoal group">
            {/* Custom overlay message that user is viewing Google Maps */}
            <div className="absolute top-4 right-4 bg-white/95 dark:bg-navy-charcoal/95 backdrop-blur-md px-4 py-2.5 rounded-xl text-[11px] font-medium text-slate-700 dark:text-slate-300 shadow-md border border-slate-100 dark:border-white/10 z-10 flex items-center gap-2 pointer-events-none transition-opacity duration-300 group-hover:opacity-100">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-bounce" />
              <span>Kec. Pauh, Kota Padang</span>
            </div>

            <iframe
              id="location-google-maps-iframe"
              src={pharmacyProfile.googleMapsEmbedUrl}
              className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-700"
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Apotek Digital Padang"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
