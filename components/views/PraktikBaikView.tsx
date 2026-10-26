'use client';

import React, { useState } from 'react';
import { useTekad } from '@/lib/context/TekadContext';
import { PraktikBaik } from '@/lib/types';
import {
  BookOpen,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Calendar,
  Share2,
  Printer,
  ChevronRight,
  Filter,
  Layers,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Compass,
  FileCheck,
} from 'lucide-react';
import Image from 'next/image';

export default function PraktikBaikView() {
  const { bestPractices, currentRole, villages } = useTekad();

  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<PraktikBaik | null>(null);

  const filteredPractices = bestPractices.filter((item) => {
    if (selectedStatus !== 'all' && item.status !== selectedStatus) {
      return false;
    }
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              KNOWLEDGE MANAGEMENT TEKAD
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D]">
            Praktik Baik & Pembelajaran Lapang
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Studi kasus berbasis 8 komponen terstruktur: Masalah awal, intervensi, proses, bukti hasil, faktor pendukung, kendala, pembelajaran, dan peluang replikasi.
          </p>
        </div>

        {/* Verification Status Legend */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Terverifikasi Resmi</span>
          </span>
          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 font-bold flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-amber-700" />
            <span>Kajian Lapangan (Dalam Telaah)</span>
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-slate-700 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Filter Status:</span>
          </span>
          <button
            onClick={() => setSelectedStatus('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              selectedStatus === 'all'
                ? 'bg-[#0B1B3D] text-[#D4AF37]'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua ({bestPractices.length})
          </button>
          <button
            onClick={() => setSelectedStatus('terverifikasi')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              selectedStatus === 'terverifikasi'
                ? 'bg-emerald-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Terverifikasi Resmi ({bestPractices.filter((b) => b.status === 'terverifikasi').length})
          </button>
          <button
            onClick={() => setSelectedStatus('kajian_lapangan')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              selectedStatus === 'kajian_lapangan'
                ? 'bg-amber-700 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Kajian Lapangan ({bestPractices.filter((b) => b.status === 'kajian_lapangan').length})
          </button>
        </div>

        <div className="text-slate-500">
          Menampilkan <strong>{filteredPractices.length}</strong> artikel terstruktur
        </div>
      </div>

      {/* Detail Reader Modal / Inline View */}
      {selectedItem ? (
        <div className="bg-white rounded-2xl border border-[#D4AF37]/50 shadow-md p-6 sm:p-8 space-y-6 animate-in fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200">
            <button
              onClick={() => setSelectedItem(null)}
              className="text-xs font-bold text-[#0B1B3D] hover:underline flex items-center gap-1"
            >
              ← Kembali ke Daftar Praktik Baik
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Cetak / Simpan PDF</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  selectedItem.status === 'terverifikasi'
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}
              >
                {selectedItem.status === 'terverifikasi' ? 'TERVERIFIKASI RESMI' : 'KAJIAN LAPANGAN TAHAP LANJUT'}
              </span>
              <span className="bg-slate-100 text-slate-700 text-xs font-semibold px-2.5 py-1 rounded">
                Kategori: {selectedItem.category}
              </span>
              <span className="text-xs text-slate-500">
                {selectedItem.villageName}, Distrik {selectedItem.district} • Tanggal: {selectedItem.date}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#0B1B3D] leading-tight">
              {selectedItem.title}
            </h2>

            <div className="text-xs text-slate-600 flex items-center gap-3">
              <span>Penyusun: <strong>{selectedItem.author}</strong></span>
              <span>•</span>
              <span>Dokumen Sumber: <em className="text-slate-800">{selectedItem.sourceDocs}</em></span>
            </div>

            {/* Tagged commodities */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {selectedItem.commodityTags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-[#0B1B3D]/5 text-[#0B1B3D] text-[11px] font-bold px-2.5 py-0.5 rounded border border-[#0B1B3D]/10"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* 8 REQUIRED COMPONENTS BREAKDOWN */}
          <div className="space-y-4 pt-4 border-t border-slate-200">
            <h3 className="font-extrabold text-lg text-[#0B1B3D] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#D4AF37]" />
              <span>Sistematika 8 Komponen Praktik Baik TEKAD</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Komponen 1: Masalah Awal */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-white font-black text-xs flex items-center justify-center">
                    1
                  </span>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-slate-800">
                    Masalah Awal di Lapangan
                  </h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{selectedItem.initialProblem}</p>
              </div>

              {/* Komponen 2: Intervensi TEKAD */}
              <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-800 text-white font-black text-xs flex items-center justify-center">
                    2
                  </span>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-blue-900">
                    Intervensi Program TEKAD
                  </h4>
                </div>
                <p className="text-xs text-blue-950 leading-relaxed">{selectedItem.intervention}</p>
              </div>

              {/* Komponen 3: Proses Pelaksanaan */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-white font-black text-xs flex items-center justify-center">
                    3
                  </span>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-slate-800">
                    Proses Pelaksanaan & Partisipasi
                  </h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{selectedItem.executionProcess}</p>
              </div>

              {/* Komponen 4: Hasil Didukung Bukti */}
              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-300 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-black text-xs flex items-center justify-center">
                    4
                  </span>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-emerald-950 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Hasil Didukung Bukti Riil</span>
                  </h4>
                </div>
                <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                  {selectedItem.evidenceResults}
                </p>
              </div>

              {/* Komponen 5: Faktor Pendukung */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-white font-black text-xs flex items-center justify-center">
                    5
                  </span>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-slate-800">
                    Faktor Pendukung Keberhasilan
                  </h4>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{selectedItem.supportingFactors}</p>
              </div>

              {/* Komponen 6: Kendala & Mitigasi */}
              <div className="p-4 rounded-xl bg-rose-50/70 border border-rose-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-800 text-white font-black text-xs flex items-center justify-center">
                    6
                  </span>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-rose-900">
                    Kendala & Upaya Mitigasi
                  </h4>
                </div>
                <p className="text-xs text-rose-950 leading-relaxed">{selectedItem.obstacles}</p>
              </div>

              {/* Komponen 7: Pembelajaran */}
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-800 text-white font-black text-xs flex items-center justify-center">
                    7
                  </span>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-amber-950">
                    Pelajaran yang Diperoleh (Lessons Learned)
                  </h4>
                </div>
                <p className="text-xs text-amber-950 leading-relaxed">{selectedItem.lessonsLearned}</p>
              </div>

              {/* Komponen 8: Peluang Replikasi */}
              <div className="p-4 rounded-xl bg-[#0B1B3D] text-white border border-[#D4AF37]/50 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#D4AF37] text-slate-950 font-black text-xs flex items-center justify-center">
                    8
                  </span>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-[#D4AF37]">
                    Peluang Replikasi di Kampung Lain
                  </h4>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">{selectedItem.replicationPotential}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* List of Best Practices Cards */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPractices.map((bp) => (
            <div
              key={bp.id}
              onClick={() => setSelectedItem(bp)}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-900">
                  <Image
                    src={bp.imageUrl}
                    alt={bp.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <div className="absolute top-3 left-3 bg-[#0B1B3D]/90 backdrop-blur-sm text-white px-2.5 py-0.5 rounded text-[11px] font-bold border border-[#D4AF37]/40">
                    {bp.villageName}
                  </div>

                  <div
                    className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${
                      bp.status === 'terverifikasi'
                        ? 'bg-emerald-700 text-white border-emerald-500'
                        : 'bg-amber-700 text-white border-amber-500'
                    }`}
                  >
                    {bp.status === 'terverifikasi' ? (
                      <>
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Terverifikasi Resmi</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-3 h-3" />
                        <span>Kajian Lapangan</span>
                      </>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="text-[10px] uppercase font-bold text-[#D4AF37] tracking-wider block mb-0.5">
                      {bp.category}
                    </span>
                    <h3 className="font-extrabold text-base sm:text-lg leading-snug line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                      {bp.title}
                    </h3>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  {/* Evidence Highlight */}
                  <div className="bg-emerald-50 border-l-4 border-emerald-600 p-3 rounded-r-lg text-xs space-y-1">
                    <span className="font-bold text-emerald-950 flex items-center gap-1">
                      <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Bukti Keberhasilan:
                    </span>
                    <p className="text-slate-700 line-clamp-3 leading-relaxed">{bp.evidenceResults}</p>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {bp.commodityTags.map((tag, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Penyusun: <strong>{bp.author}</strong></span>
                <span className="font-bold text-[#0B1B3D] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Pelajari 8 Komponen</span>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
