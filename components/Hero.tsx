'use client';

import React from 'react';
import { useTekad } from '@/lib/context/TekadContext';
import {
  Sparkles,
  MapPin,
  Calendar,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Bot,
  Search,
  CheckCircle2,
  Layers,
} from 'lucide-react';

export default function Hero() {
  const { villages, activities, bestPractices, commodities, businessGroups, setActiveView } = useTekad();

  // Strictly calculate live metrics from verified/published data
  const publishedVillagesCount = villages.filter((v) => v.verificationStatus === 'diterbitkan').length;
  const verifiedActivitiesCount = activities.filter((a) => a.verificationStatus === 'diterbitkan').length;
  const verifiedBestPracticesCount = bestPractices.filter((b) => b.status === 'terverifikasi').length;
  const activeBumdesCount = businessGroups.filter((b) => b.type === 'BUMDes').length;
  const verifiedCommoditiesCount = commodities.filter((c) => c.verificationStatus === 'diterbitkan').length;

  return (
    <div className="relative bg-gradient-to-b from-[#0B1B3D] via-[#0F2654] to-[#0B1B3D] text-white overflow-hidden border-b border-[#D4AF37]/20">
      {/* Decorative Golden Papua Geometric Motif Accents in Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#173777]/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 relative z-10">
        {/* Verification & Agency Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#173777]/80 border border-[#D4AF37]/40 text-xs text-amber-200 shadow-inner mb-6">
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span className="font-semibold text-white">Portal Resmi Terverifikasi:</span>
          <span className="text-[#D4AF37]">Program TEKAD Kemendesa PDTT Kabupaten Jayapura</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Headline & Intro */}
          <div className="lg:col-span-7 space-y-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Transformasi Ekonomi Kampung{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-amber-200 to-[#D4AF37]">
                Kabupaten Jayapura
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal max-w-2xl">
              Pusat dokumentasi terintegrasi, profil kampung penerima manfaat, praktik baik pengembangan ekonomi, serta asisten AI berintegritas tinggi yang dirancang khusus untuk memandu fasilitator dan masyarakat.
            </p>

            {/* Strict Data Integrity Disclaimer */}
            <div className="flex items-center gap-2 text-xs text-slate-300 bg-white/5 border border-white/10 rounded-lg p-2.5 max-w-xl">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Prinsip Akurasi Data:</strong> Seluruh capaian, dokumentasi, dan indikator bersumber dari dokumen resmi yang terverifikasi tanpa manipulasi statistik.
              </span>
            </div>

            {/* Direct CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveView('ai-asisten')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#B38F24] text-slate-950 font-extrabold text-sm shadow-lg shadow-[#D4AF37]/30 hover:scale-105 active:scale-95 transition-all"
              >
                <Bot className="w-4 h-4 text-slate-950" />
                <span>Tanya Asisten AI TEKAD</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActiveView('kampung')}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-sm transition-all"
              >
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>Lihat Profil 4 Kampung Dampingan</span>
              </button>

              <button
                onClick={() => setActiveView('kegiatan')}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-transparent hover:bg-white/5 text-slate-200 text-sm font-medium transition-all"
              >
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Dokumentasi Kegiatan</span>
              </button>
            </div>
          </div>

          {/* Live Data Ticker Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#07132B]/90 backdrop-blur-md rounded-2xl border border-[#D4AF37]/30 p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
                  <span className="text-xs font-bold text-[#D4AF37] tracking-wider uppercase">
                    DATA REAL-TIME KABUPATEN
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 bg-white/5 px-2 py-0.5 rounded">
                  TA 2025/2026
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div
                  onClick={() => setActiveView('kampung')}
                  className="bg-white/5 hover:bg-white/10 p-3.5 rounded-xl border border-white/10 transition-colors cursor-pointer group"
                >
                  <div className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#D4AF37] transition-colors">
                    {publishedVillagesCount}
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-1">Kampung Dampingan</div>
                  <div className="text-[10px] text-slate-400">Ebungfauw & Nimbokrang</div>
                </div>

                <div
                  onClick={() => setActiveView('kegiatan')}
                  className="bg-white/5 hover:bg-white/10 p-3.5 rounded-xl border border-white/10 transition-colors cursor-pointer group"
                >
                  <div className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#D4AF37] transition-colors">
                    {verifiedActivitiesCount}
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-1">Kegiatan Terverifikasi</div>
                  <div className="text-[10px] text-slate-400">Pelatihan, Demplot & Rembuk</div>
                </div>

                <div
                  onClick={() => setActiveView('praktik-baik')}
                  className="bg-white/5 hover:bg-white/10 p-3.5 rounded-xl border border-white/10 transition-colors cursor-pointer group"
                >
                  <div className="text-2xl sm:text-3xl font-black text-[#D4AF37]">
                    {verifiedBestPracticesCount}
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-1">Praktik Baik Teruji</div>
                  <div className="text-[10px] text-slate-400">Dengan 8 Komponen Bukti</div>
                </div>

                <div
                  onClick={() => setActiveView('kelompok-usaha')}
                  className="bg-white/5 hover:bg-white/10 p-3.5 rounded-xl border border-white/10 transition-colors cursor-pointer group"
                >
                  <div className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#D4AF37] transition-colors">
                    {activeBumdesCount}
                  </div>
                  <div className="text-xs font-semibold text-slate-200 mt-1">BUMDes Berbadan Hukum</div>
                  <div className="text-[10px] text-slate-400">Penggerak Ekonomi Desa</div>
                </div>
              </div>

              <div
                onClick={() => setActiveView('komoditas')}
                className="bg-gradient-to-r from-[#173777]/80 to-[#0F2654] p-3 rounded-xl border border-[#D4AF37]/30 flex items-center justify-between text-xs cursor-pointer hover:border-[#D4AF37] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Layers className="w-4 h-4 text-[#D4AF37]" />
                  <div>
                    <span className="font-bold text-white">{verifiedCommoditiesCount} Komoditas Unggulan Terdata</span>
                    <p className="text-[11px] text-slate-300">Gerabah Abar, Kakao Grime, Beras Sawah, Sagu, Atsiri</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
