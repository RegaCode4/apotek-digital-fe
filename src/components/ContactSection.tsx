/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mail, Clock, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { pharmacyProfile } from '../data/mockData';
import SectionReveal from './ui/SectionReveal';

interface ContactFormInputs {
  name: string;
  phone: string;
  serviceType: string;
  message: string;
}

export default function ContactSection() {
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormInputs>();

  const onSubmitForm: SubmitHandler<ContactFormInputs> = async (data) => {
    const messageText = `Halo Apotek Digital, saya ingin menghubungi Anda.

Nama: ${data.name}
No. HP/WhatsApp: ${data.phone}
Jenis Kepentingan: ${data.serviceType}
Pesan: ${data.message}`;

    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/6282278954406?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");

    setIsSubmitSuccess(true);
    reset();
    
    // Clear toast alert after 6 seconds
    setTimeout(() => {
      setIsSubmitSuccess(false);
    }, 6000);
  };

  return (
    <section id="kontak" className="py-20 md:py-28 bg-slate-50/50 relative border-t border-slate-100">
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-mint-green/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct operating hours and contact cards */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold text-teal-glow tracking-widest uppercase bg-mint-green/10 px-3 py-1.5 rounded-full inline-block">
                Hubungi Kami
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-dark tracking-tight leading-none">
                Hubungi & Konsultasi Sekarang
              </h2>
              <p className="text-slate-500 font-light leading-relaxed">
                Butuh asupan khusus, tebus resep obat keras, atau memiliki pertanyaan seputar cara mengonsumsi obat bebas secara berkala? Jangan sungkan untuk menghubungi tim ahli kami.
              </p>
            </div>

            {/* Icons deck */}
            <div className="space-y-4">
              
              <div className="p-4 rounded-xl bg-white border border-slate-100 flex items-center gap-4 hover:border-mint-green/20 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-teal-glow flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block">WHATSAPP OFFICIAL</span>
                  <a
                    href="https://wa.me/6282278954406"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-teal-glow hover:underline"
                  >
                    {pharmacyProfile.whatsApp}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-100 flex items-center gap-4 hover:border-mint-green/20 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-teal-glow flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block">EMAIL KELUHAN / MEDIS</span>
                  <a
                    href="mailto:apotekdigital@gmail.com"
                    className="text-sm font-bold text-navy-dark hover:text-teal-glow hover:underline"
                  >
                    {pharmacyProfile.email}
                  </a>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-100 flex items-center gap-4 hover:border-mint-green/20 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-teal-glow flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase block">JAM SINKRONISASI SISTEM</span>
                  <p className="text-sm font-bold text-navy-dark">Mengikuti Jam Kerja Operasional Fisik</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive client contact form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-2 bg-gradient-to-l from-mint-green to-teal-glow" />

            <h3 className="font-display font-bold text-xl text-navy-dark mb-2">Formulir Pesan Cepat</h3>
            <p className="text-xs text-slate-400 block mb-6 font-light">
              Tulis keluhan atau kebutuhan Anda di bawah ini. Admin farmasi kami akan merespons dalam waktu ±10 menit.
            </p>

            <form id="contact-form" onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
              
              {/* Row 1: Name and Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Name */}
                <div className="space-y-1">
                  <label htmlFor="form-input-name" className="text-xs font-semibold text-slate-600 block">
                    Nama Lengkap Anda *
                  </label>
                  <input
                    id="form-input-name"
                    type="text"
                    placeholder="Contoh: Budi Santoso"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-800 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-mint-green/20 transition-all ${
                      errors.name ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-mint-green'
                    }`}
                    {...register("name", { 
                      required: "Nama lengkap wajib diisi",
                      minLength: { value: 3, message: "Nama terlalu pendek" } 
                    })}
                  />
                  {errors.name && (
                    <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.name.message}</span>
                    </span>
                  )}
                </div>

                {/* Phone number */}
                <div className="space-y-1">
                  <label htmlFor="form-input-phone" className="text-xs font-semibold text-slate-600 block">
                    No. Handphone / WhatsApp *
                  </label>
                  <input
                    id="form-input-phone"
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-800 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-mint-green/20 transition-all ${
                      errors.phone ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-mint-green'
                    }`}
                    {...register("phone", { 
                      required: "Nomor Handphone wajib diisi",
                      pattern: {
                        value: /^[0-9+() \-]{9,16}$/,
                        message: "Format nomor HP tidak valid"
                      }
                    })}
                  />
                  {errors.phone && (
                    <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1 mt-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone.message}</span>
                    </span>
                  )}
                </div>

              </div>

              {/* Row 2: Service / Inquiry Type */}
              <div className="space-y-1">
                <label htmlFor="form-input-service" className="text-xs font-semibold text-slate-600 block">
                  Jenis Kepentingan *
                </label>
                <select
                  id="form-input-service"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-mint-green/20 transition-all cursor-pointer"
                  {...register("serviceType")}
                >
                  <option value="Tanya Ketersediaan Obat">Tanya Ketersediaan Obat Khusus</option>
                  <option value="Tebus Resep Dokter">Tebus Resep Dokter Baru</option>
                  <option value="Konsultasi Dosis Medis">Konsultasi Dosis Bersama Apoteker</option>
                  <option value="Kerja Sama / Pengadaan">Kerja Sama Instansi / Rumah Sakit</option>
                  <option value="Lainnya">Lain-lain / Keluhan Umum</option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label htmlFor="form-input-message" className="text-xs font-semibold text-slate-600 block">
                  Isi Pesan Anda *
                </label>
                <textarea
                  id="form-input-message"
                  rows={4}
                  placeholder="Tuliskan daftar obat yang dicari, dosis resep dokter, atau konsultasi umum di sini..."
                  className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-slate-800 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-mint-green/20 transition-all ${
                    errors.message ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-mint-green'
                  }`}
                  {...register("message", { 
                    required: "Isi pesan wajib diisi",
                    minLength: { value: 10, message: "Isi pesan minimal 10 karakter" }
                  })}
                />
                {errors.message && (
                  <span className="text-[10px] text-red-500 font-semibold flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.message.message}</span>
                  </span>
                )}
              </div>

              {/* Success Notification Popup */}
              <AnimatePresence>
                {isSubmitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-start gap-2.5"
                    id="submit-success-toast"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-xs font-bold block">Menghubungkan ke WhatsApp...</strong>
                      <p className="text-[11px] leading-relaxed mt-0.5 text-emerald-700">
                        Anda sedang diarahkan ke WhatsApp kami. Silakan tekan kirim pada chat yang terbuka.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Trigger */}
              <div className="pt-4">
                <button
                  id="contact-form-submit-button"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-bold bg-navy-dark hover:bg-slate-850 text-white disabled:bg-slate-300 disabled:cursor-not-allowed cursor-pointer shadow-md shadow-navy-dark/10 hover:shadow-lg transition-all active:scale-98"
                >
                  <Send className={`w-4 h-4 text-mint-green ${isSubmitting ? 'animate-bounce' : ''}`} />
                  <span>{isSubmitting ? 'Mengirim Data...' : 'Kirim Pesan Layanan'}</span>
                </button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </section>
  );
}
