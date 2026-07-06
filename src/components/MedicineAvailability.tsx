/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  AlertTriangle,
  CheckCircle2,
  ShoppingBag,
  XCircle,
  FileText,
  Info,
  Building,
  CalendarRange,
  Box,
} from "lucide-react";
import { buildCategories, Medicine, MedicineCategory } from "../data/mockData";
import SectionReveal from "./ui/SectionReveal";
import CustomSelect from "./ui/CustomSelect";

interface MedicineAvailabilityProps {
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
  medicines: Medicine[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Helper to compute stock status based on real DB properties (stock and min_stock)
 * Calculates status by comparing current stock against minimum stock threshold.
 */
const getStockStatus = (med: Medicine): "tersedia" | "menipis" | "habis" => {
  if (med.stock === 0) return "habis";
  if (med.stock <= med.min_stock) return "menipis";
  return "tersedia";
};

/**
 * Medicine Availability Section Component
 * Displays a searchable, filterable grid of medicine inventory with pagination.
 */
export default function MedicineAvailability({
  selectedCategory,
  setSelectedCategory,
  medicines,
  isLoading,
  error,
  refetch,
}: MedicineAvailabilityProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [prescriptionFilter, setPrescriptionFilter] = useState<
    "semua" | "bebas" | "resep"
  >("semua");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;
  const categories = buildCategories(medicines);

  // Rupiah currency formatter helper
  const formatRupiah = (value?: number) => {
    if (value === undefined || value === null) return "";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Real-time filtering logic
  const filteredMedicines = useMemo(() => {
    return medicines.filter((med) => {
      // 1. Search Query Match (Name / Generic Name)
      const matchesSearch =
        med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (med.generic_name &&
          med.generic_name.toLowerCase().includes(searchQuery.toLowerCase()));

      // 2. Category Match
      const matchesCategory =
        selectedCategory === "semua" ||
        String(med.category_id) === selectedCategory;

      // 3. Prescription Status Filter
      const matchesPrescription =
        prescriptionFilter === "semua" ||
        (prescriptionFilter === "resep" && med.requires_prescription) ||
        (prescriptionFilter === "bebas" && !med.requires_prescription);

      return matchesSearch && matchesCategory && matchesPrescription;
    });
  }, [medicines, searchQuery, selectedCategory, prescriptionFilter]);

  // Resets all search and filter states back to default values
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("semua");
    setPrescriptionFilter("semua");
    setCurrentPage(1);
  };

  // Reset to page 1 whenever filters change
  const totalPages = Math.ceil(filteredMedicines.length / ITEMS_PER_PAGE);
  const paginatedMedicines = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredMedicines.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMedicines, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, prescriptionFilter]);

  // Pre-calculate statistics
  const countTersedia = useMemo(
    () => medicines.filter((m) => getStockStatus(m) === "tersedia").length,
    [medicines],
  );
  const countMenipis = useMemo(
    () => medicines.filter((m) => getStockStatus(m) === "menipis").length,
    [medicines],
  );
  const countHabis = useMemo(
    () => medicines.filter((m) => getStockStatus(m) === "habis").length,
    [medicines],
  );

  // Loading skeleton state
  if (isLoading) {
    return (
      <section
        id="cek-ketersediaan"
        className="py-20 md:py-28 bg-white dark:bg-navy-dark relative"
      >
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-50/20 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 animate-pulse">
            <div className="max-w-2xl space-y-3">
              <div className="h-6 w-36 bg-slate-200 dark:bg-white/10 rounded-full" />
              <div className="h-10 w-96 bg-slate-200 dark:bg-white/10 rounded-2xl" />
              <div className="h-4 w-72 bg-slate-200 dark:bg-white/10 rounded-lg" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-slate-50 dark:bg-navy-charcoal border border-slate-100 dark:border-white/10 rounded-2xl p-6 space-y-6 animate-pulse"
              >
                <div className="flex justify-between">
                  <div className="h-5 w-24 bg-slate-200 dark:bg-white/10 rounded-md" />
                  <div className="h-5 w-20 bg-slate-200 dark:bg-white/10 rounded-full" />
                </div>
                <div className="space-y-2">
                  <div className="h-6 w-48 bg-slate-200 dark:bg-white/10 rounded-lg" />
                  <div className="h-4 w-32 bg-slate-200 dark:bg-white/10 rounded-md" />
                </div>
                <div className="py-4 border-y border-slate-200/50 dark:border-white/5 space-y-2">
                  <div className="h-4 w-full bg-slate-200 dark:bg-white/10 rounded-md" />
                  <div className="h-4 w-3/4 bg-slate-200 dark:bg-white/10 rounded-md" />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-5 w-32 bg-slate-200 dark:bg-white/10 rounded-md" />
                  <div className="h-10 w-28 bg-slate-200 dark:bg-white/10 rounded-xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error boundary fallback with Retry support
  if (error) {
    return (
      <section
        id="cek-ketersediaan"
        className="py-20 md:py-28 bg-white dark:bg-navy-dark relative"
      >
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-red-50/20 dark:bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-xl mx-auto px-4 text-center py-10">
          <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h3 className="font-display font-bold text-2xl text-navy-dark dark:text-white">
            Koneksi Database Terputus
          </h3>
          <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm leading-relaxed font-light">
            {error.message ||
              "Gagal menyelaraskan stok obat live dari database Apotek Digital."}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={refetch}
              className="px-6 py-3 bg-navy-dark dark:bg-mint-green/15 dark:border dark:border-mint-green/30 text-white rounded-xl text-xs font-bold hover:bg-slate-800 dark:hover:bg-mint-green/25 transition-all cursor-pointer shadow-md inline-flex items-center gap-2 justify-center hover:scale-[1.02] active:scale-95"
            >
              Coba Sinkronisasi Ulang ↻
            </button>
            <a
              href="https://wa.me/6282278954406?text=Halo%20Apotek%20Digital"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-white/5 transition-all inline-flex items-center gap-2 justify-center"
            >
              Tanya CS Apoteker (WA)
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="cek-ketersediaan" className="py-20 md:py-28 bg-white dark:bg-navy-dark relative">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-50/20 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Title Segment */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-teal-glow tracking-widest uppercase bg-mint-green/10 px-3 py-1.5 rounded-full inline-block">
              Sistem Cek Stok Live
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-dark dark:text-white tracking-tight mt-3">
              Cek Ketersediaan Obat Real-Time
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 font-light">
              Masukkan nama obat atau bahan aktif penunjang medis di bawah ini.
              Status persediaan terhubung langsung dengan sistem inventaris
              fisik apoteker kami.
            </p>
          </div>

          {/* Quick Stats Banner inside search section */}
          <div className="flex items-center gap-4 bg-slate-50 dark:bg-navy-charcoal p-4 rounded-2xl border border-slate-100 dark:border-white/10 self-start lg:self-auto">
            <div className="text-center px-4 border-r border-slate-200 dark:border-white/10">
              <span className="text-2xl font-display font-bold text-emerald-600 dark:text-emerald-400 block leading-none">
                {countTersedia}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-1">
                Tersedia
              </span>
            </div>
            <div className="text-center px-4 border-r border-slate-200 dark:border-white/10">
              <span className="text-2xl font-display font-bold text-amber-500 dark:text-amber-400 block leading-none">
                {countMenipis}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-1">
                Hampir Habis
              </span>
            </div>
            <div className="text-center px-4">
              <span className="text-2xl font-display font-bold text-red-500 dark:text-red-400 block leading-none">
                {countHabis}
              </span>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block mt-1">
                Kosong
              </span>
            </div>
          </div>
        </div>

        {/* Multi-Filter Search Bar */}
        <div className="bg-slate-50 dark:bg-navy-charcoal p-6 rounded-[24px] border border-slate-100 dark:border-white/10 shadow-xs mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Search Input Bar */}
            <div className="md:col-span-6 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              <input
                id="medicine-search-input"
                type="text"
                placeholder="Cari Paracetamol, Amoxicillin, Cebion..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white dark:bg-navy-dark border border-slate-200 dark:border-white/10 focus:border-mint-green focus:ring-2 focus:ring-mint-green/20 text-slate-800 dark:text-white text-sm focus:outline-none transition-all shadow-xs placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
            </div>

            {/* Category Select Dropdown */}
            <div className="md:col-span-3">
              <CustomSelect
                options={categories.map((cat) => ({ value: cat.id, label: cat.name }))}
                value={selectedCategory}
                onChange={(val) => setSelectedCategory(val)}
              />
            </div>

            {/* Prescription Filter Drops */}
            <div className="md:col-span-3">
              <CustomSelect
                options={[
                  { value: "semua", label: "Semua Tipe Resep" },
                  { value: "bebas", label: "Obat Bebas (Tanpa Resep)" },
                  { value: "resep", label: "Obat Keras (Wajib Resep)" },
                ]}
                value={prescriptionFilter}
                onChange={(val) => setPrescriptionFilter(val as any)}
              />
            </div>
          </div>

          {/* Filters Footer Summary */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <span>Menampilkan: </span>
              <span className="font-bold text-navy-dark dark:text-white">
                {filteredMedicines.length} Obat
              </span>
              {(searchQuery !== "" ||
                selectedCategory !== "semua" ||
                prescriptionFilter !== "semua") && (
                <span className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-500/20 font-bold">
                  Saringan Aktif
                </span>
              )}
            </div>

            {(searchQuery !== "" ||
              selectedCategory !== "semua" ||
              prescriptionFilter !== "semua") && (
              <button
                id="reset-filters-button"
                onClick={handleResetFilters}
                className="text-xs font-semibold text-teal-glow hover:text-emerald-700 dark:hover:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer focus:outline-none"
              >
                Reset Semua Saringan pencarian ✕
              </button>
            )}
          </div>
        </div>

        {/* Medicines Result Grid */}
        {filteredMedicines.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {paginatedMedicines.map((med: Medicine) => {
                const status = getStockStatus(med);
                return (
                  <motion.div
                    key={med.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    id={`medicine-card-${med.id}`}
                    className="bg-white dark:bg-navy-charcoal rounded-2xl border border-slate-100 dark:border-white/10 hover:border-mint-green/45 p-6 hover:shadow-lg transition-all flex flex-col justify-between group relative overflow-hidden"
                  >
                    {/* Inner top decorations for branding */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-mint-green/5 to-transparent" />

                    <div>
                      {/* Badge & Stock Row */}
                      <div className="flex items-center justify-between mb-4 gap-2">
                        <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 px-2 py-0.5 rounded-md uppercase text-ellipsis overflow-hidden whitespace-nowrap max-w-[150px]">
                          {med.category?.name ?? "Lainnya"}
                        </span>

                        {/* Stock Badges mapping */}
                        {status === "tersedia" && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-0.5 rounded-full shrink-0">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Tersedia</span>
                          </span>
                        )}
                        {status === "menipis" && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 px-2.5 py-0.5 rounded-full shrink-0">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>Stok Menipis</span>
                          </span>
                        )}
                        {status === "habis" && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 px-2.5 py-0.5 rounded-full shrink-0">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Habis</span>
                          </span>
                        )}
                      </div>

                      {/* Name block */}
                      <div className="space-y-1">
                        <h3 className="font-display font-bold text-lg text-navy-dark dark:text-white leading-tight group-hover:text-teal-glow transition-colors">
                          {med.name}
                        </h3>
                        {med.generic_name && (
                          <p className="text-xs text-slate-400 font-mono italic">
                            Bahan Aktif: {med.generic_name}
                          </p>
                        )}
                      </div>

                      {/* General Specs Grid */}
                      <div className="my-4 grid grid-cols-2 gap-3 p-3 bg-slate-50/70 dark:bg-navy-dark/50 rounded-xl text-xs text-slate-500 dark:text-slate-400 font-medium">
                        <div className="space-y-0.5">
                          <span className="text-[9px] text-slate-400 flex items-center gap-1 uppercase font-semibold tracking-wider">
                            <Building className="w-3 h-3" /> Produsen
                          </span>
                          <span
                            className="text-navy-dark dark:text-slate-200 font-semibold truncate block"
                            title={med.manufacturer || "-"}
                          >
                            {med.manufacturer || "Generik"}
                          </span>
                        </div>
                        <div className="space-y-0.5">
                          <span className="text-[9px] text-slate-400 flex items-center gap-1 uppercase font-semibold tracking-wider">
                            <Box className="w-3 h-3" /> Sediaan
                          </span>
                          <span className="text-navy-dark dark:text-slate-200 font-semibold block capitalize truncate">
                            1 {med.unit}
                          </span>
                        </div>
                        <div className="space-y-0.5 col-span-2 border-t border-slate-200/60 dark:border-white/5 pt-2 grid grid-cols-2 gap-2 mt-1">
                          <div className="space-y-0.5">
                            <span className="text-[9px] text-slate-400 block font-semibold tracking-wider uppercase">
                              SISA STOK
                            </span>
                            <span
                              className={`font-bold block ${med.stock === 0 ? "text-red-500 dark:text-red-400" : "text-navy-dark dark:text-white"}`}
                            >
                              {med.stock} {med.unit}
                            </span>
                          </div>
                          {med.expiry_date && (
                            <div className="space-y-0.5">
                              <span className="text-[9px] text-slate-400 flex items-center gap-1 font-semibold tracking-wider uppercase">
                                <CalendarRange className="w-3 h-3 text-slate-400" />{" "}
                                EXP. DATE
                              </span>
                              <span className="text-navy-dark dark:text-slate-200 font-semibold block font-mono text-[11px]">
                                {med.expiry_date}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Description / Aturan pakai */}
                      {med.description && (
                        <p
                          className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-light mt-2 line-clamp-2"
                          title={med.description}
                        >
                          {med.description}
                        </p>
                      )}
                    </div>

                    {/* Pricing / Call to Action Row */}
                    {/* Pricing Row (tanpa tombol) */}
                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/10">
                      {med.requires_prescription ? (
                        <span className="text-[11px] text-red-500 dark:text-red-400 font-bold uppercase tracking-wide flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          Perlu Resep Dokter
                        </span>
                      ) : (
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 font-light block">
                            HARGA ESTIMASI
                          </span>
                          <span className="text-base font-display font-extrabold text-navy-dark dark:text-white tracking-tight">
                            {formatRupiah(med.price)}
                            <span className="text-xs font-normal text-slate-400">
                              {" "}
                              / {med.unit}
                            </span>
                          </span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        ) : null}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-charcoal text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-elevated disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              ← Sebelumnya
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const isNearCurrent =
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 1;
              if (!isNearCurrent) {
                if (page === 2 && currentPage > 3)
                  return (
                    <span key={page} className="text-slate-400 text-xs px-1">
                      …
                    </span>
                  );
                if (page === totalPages - 1 && currentPage < totalPages - 2)
                  return (
                    <span key={page} className="text-slate-400 text-xs px-1">
                      …
                    </span>
                  );
                return null;
              }
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                    currentPage === page
                      ? "bg-navy-dark dark:bg-mint-green/20 text-white dark:text-mint-green border-navy-dark dark:border-mint-green/30 shadow-md"
                      : "bg-white dark:bg-navy-charcoal text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-navy-elevated"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-white/10 bg-white dark:bg-navy-charcoal text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-navy-elevated disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              Berikutnya →
            </button>
          </div>
        )}

        {/* Pagination Info */}
        {filteredMedicines.length > 0 && totalPages > 1 && (
          <p className="text-center text-xs text-slate-400 mt-3">
            Halaman {currentPage} dari {totalPages} &mdash;{" "}
            {filteredMedicines.length} obat ditemukan
          </p>
        )}

        {/* Empty Search Fallback State */}
        {filteredMedicines.length === 0 && (
          <div className="text-center py-16 px-4 rounded-3xl bg-slate-50 dark:bg-navy-charcoal border border-slate-100 dark:border-white/10 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-400 mx-auto mb-4">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-lg text-navy-dark dark:text-white">
              Obat Tidak Ditemukan
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-light">
              Kami tidak dapat menemukan pencocokan kata untuk "{searchQuery}"
              pada saringan kategori tersebut. Silakan periksa penulisan atau
              coba hubungi kami langsung via WhatsApp untuk dicarikan stok
              khusus.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-navy-dark dark:bg-mint-green/15 dark:border dark:border-mint-green/30 text-white shadow-xs focus:outline-none cursor-pointer"
              >
                Atur Ulang Saringan
              </button>
              <a
                href="https://wa.me/6282278954406?text=Halo%20Apotek%20Digital"
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-navy-charcoal border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 flex items-center gap-1"
              >
                Tanya Apoteker di WA
              </a>
            </div>
          </div>
        )}

        {/* Informational Guidance bar */}
        <div className="mt-12 p-4 rounded-2xl bg-teal-50/45 dark:bg-teal-900/15 border border-teal-100 dark:border-teal-800/30 flex items-start gap-3 max-w-4xl mx-auto">
          <Info className="w-5 h-5 text-teal-glow shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400 font-light">
            <span className="font-semibold text-navy-dark dark:text-white block">
              Informasi Ketersediaan &amp; Obat Keras Wajib Resep:
            </span>
            <p className="leading-relaxed">
              Data stok dan harga di halaman ini bersifat informasi dan dapat
              berubah sewaktu-waktu. Untuk obat berlabel logo merah lingkaran{" "}
              <strong className="font-bold text-red-600 dark:text-red-400">
                K (Wajib Resep)
              </strong>{" "}
              penyerahannya hanya dapat dilakukan dengan resep resmi dokter dan
              diserahkan langsung oleh Apoteker kami di apotek, sesuai regulasi
              Dinkes BPOM RI. Silakan kunjungi apotek untuk pembelian dan
              konsultasi lebih lanjut.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
