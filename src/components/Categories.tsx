/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import {
  Pill, HeartPulse, Brain, ShieldAlert, Wind, FlaskConical, Ribbon, Hand,
  Bone, Eye, Stethoscope, Droplet, Bug, Package, Sparkles, LayoutGrid, LucideIcon
} from 'lucide-react';
import { buildCategories, MedicineCategory, Medicine } from '../data/mockData';
import SectionReveal from './ui/SectionReveal';
import AnimatedHeading from './ui/AnimatedHeading';

interface CategoriesProps {
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
  medicines?: Medicine[];
}

// Pemetaan nama ikon ke komponen Lucide asli untuk rendering dinamis
const iconMap: Record<string, LucideIcon> = {
  Pill, HeartPulse, Brain, ShieldAlert, Wind, FlaskConical, Ribbon, Hand,
  Bone, Eye, Stethoscope, Droplet, Bug, Package, Sparkles, LayoutGrid,
};

/**
 * Komponen Bagian Kategori
 * Menampilkan kategori obat dalam format bento grid.
 * Memungkinkan pengguna untuk memilih kategori yang kemudian akan menggulir layar dengan halus ke bagian ketersediaan obat.
 */
export default function Categories({ selectedCategory, setSelectedCategory, medicines = [] }: CategoriesProps) {
  // Susun statistik kategori berdasarkan data obat saat ini
  const categories = buildCategories(medicines);

  // Menangani klik pada kartu kategori: perbarui kategori terpilih dan gulir ke bagian pencarian
  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const element = document.querySelector('#cek-ketersediaan');
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <section id="kategori-obat" className="py-20 md:py-24 bg-slate-50/50 dark:bg-navy-charcoal/30 border-y border-slate-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Blok Judul */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <SectionReveal>
            <span className="text-xs font-bold text-teal-glow tracking-widest uppercase bg-mint-green/10 px-3 py-1.5 rounded-full">
              Katalog Farmasi
            </span>
            <AnimatedHeading className="text-3xl sm:text-4xl font-display font-bold text-navy-dark dark:text-white tracking-tight mt-3">
              Telusuri Berdasarkan Kategori Obat
            </AnimatedHeading>
            <p className="text-slate-500 dark:text-slate-400 mt-4 leading-relaxed font-light">
              Pilih klaster obat di bawah ini untuk melihat ketersediaan stok, takaran dosis umum, informasi kewajiban resep praktisi medis, dan penawaran harganya secara instan.
            </p>
          </SectionReveal>
        </div>

        {/* Spanduk Berjalan (Marquee) */}
        <div className="relative overflow-hidden w-full bg-navy-dark py-4 rounded-3xl mb-12 shadow-sm border border-white/5 flex items-center select-none">
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-navy-dark to-transparent z-10 pointer-events-none" />
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-navy-dark to-transparent z-10 pointer-events-none" />
          <div className="flex whitespace-nowrap animate-marquee items-center gap-12 font-display text-xs font-bold text-mint-green/75 tracking-wider uppercase">
            <span>• 100% OBAT BERSTANDAR BPOM KEMENKES</span>
            <span>• STOK SINKRON REAL-TIME DENGAN SISTEM APOTEK</span>
            <span>• INFORMASI KETERSEDIAAN OBAT TRANSPARAN</span>
            <span>• KONSULTASI BERSAMA APOTEKER RESMI</span>
            <span>• 100% OBAT BERSTANDAR BPOM KEMENKES</span>
            <span>• STOK SINKRON REAL-TIME DENGAN SISTEM APOTEK</span>
            <span>• INFORMASI KETERSEDIAAN OBAT TRANSPARAN</span>
            <span>• KONSULTASI BERSAMA APOTEKER RESMI</span>
          </div>
        </div>

        {/* Grid Bento Kategori */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat: MedicineCategory, idx: number) => {
            const IconComponent = iconMap[cat.iconName] || LayoutGrid;
            const isSelected = selectedCategory === cat.id;
            return (
              <div key={cat.id} className="h-full">
                <SectionReveal delay={idx * 0.05} className="h-full">
                  <div
                    id={`category-card-${cat.id}`}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`h-full flex flex-col justify-between p-6 rounded-2xl border cursor-pointer outline-none transition-all duration-300 group ${
                      isSelected
                        ? 'bg-navy-dark border-mint-green text-white shadow-xl scale-[1.03] shadow-mint-green/10'
                        : 'bg-white dark:bg-navy-charcoal border-slate-100 dark:border-white/10 hover:border-mint-green text-slate-700 dark:text-slate-300 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-mint-green/10 text-mint-green'
                          : 'bg-emerald-50 dark:bg-emerald-500/10 text-teal-glow group-hover:bg-mint-green/10 group-hover:text-teal-glow'
                      }`}>
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className={`font-display font-bold text-base transition-colors ${
                          isSelected ? 'text-white' : 'text-navy-dark dark:text-white group-hover:text-teal-glow'
                        }`}>
                          {cat.name}
                        </h3>
                        <p className={`text-xs mt-1 leading-relaxed ${
                          isSelected ? 'text-slate-400 font-light' : 'text-slate-500 dark:text-slate-400 font-light'
                        }`}>
                          {cat.description}
                        </p>
                      </div>
                    </div>
                    <div className={`mt-8 pt-4 border-t border-dashed flex items-center justify-between ${
                      isSelected ? 'border-slate-100/20' : 'border-slate-100 dark:border-white/10'
                    }`}>
                      <span className={`text-[11px] font-mono ${
                        isSelected ? 'text-mint-green' : 'text-slate-400 font-semibold'
                      }`}>
                        {cat.itemCount} JENIS PRODUK
                      </span>
                      <span className={`text-xs font-bold flex items-center gap-1 transition-transform group-hover:translate-x-1 ${
                        isSelected ? 'text-mint-green' : 'text-teal-glow'
                      }`}>
                        <span>Lihat Stok</span>
                        <span>→</span>
                      </span>
                    </div>
                  </div>
                </SectionReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}