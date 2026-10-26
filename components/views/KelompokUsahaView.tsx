'use client';

import React, { useState } from 'react';
import { useTekad } from '@/lib/context/TekadContext';
import { Building2, Users, Download, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

export default function KelompokUsahaView() {
  const { businessGroups, exportToCsv } = useTekad();
  const [filterType, setFilterType] = useState<string>('all');

  const types = ['all', 'BUMDes', 'Kelompok Tani', 'Kelompok Pengrajin', 'KWT (Wanita Tani)'];

  const filtered = businessGroups.filter((b) => {
    if (filterType !== 'all' && b.type !== filterType) return false;
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
              KELEMBAGAAN EKONOMI KAMPUNG
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D]">
            Kelompok Usaha & BUMDes Dampingan
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Pusat data BUMDes berbadan hukum, Kelompok Tani, Kelompok Pengrajin Gerabah, dan Kelompok Wanita Tani (KWT) Kabupaten Jayapura.
          </p>
        </div>

        <button
          onClick={() => exportToCsv('bumdes')}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Ekspor Data Kelembagaan (CSV)</span>
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterType === t
                ? 'bg-[#0B1B3D] text-[#D4AF37] shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {t === 'all' ? 'Semua Lembaga' : t}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((b) => (
          <div
            key={b.id}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all space-y-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200 uppercase">
                  {b.type}
                </span>
                <h3 className="font-extrabold text-base sm:text-lg text-[#0B1B3D] mt-1.5">
                  {b.name}
                </h3>
                <span className="text-xs text-slate-500">
                  {b.villageName}, Distrik {b.district} • Didirikan Tahun {b.yearEstablished}
                </span>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-1 rounded-full shrink-0">
                {b.bankAccountStatus}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200/80">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Ketua / Pengurus</span>
                <strong className="text-slate-800">{b.leaderName}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Anggota</span>
                <strong className="text-slate-800">{b.membersCount} orang ({b.femaleMembersCount} Perempuan)</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Estimasi Omset Tahunan</span>
                <strong className="text-emerald-700">{b.currentTurnover}</strong>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Status Legalitas</span>
                <span className="text-slate-700 italic truncate block" title={b.legalStatus}>
                  {b.legalStatus}
                </span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Produk & Layanan Utama:
              </span>
              <div className="flex flex-wrap gap-1">
                {b.mainProducts.map((prod, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-800 text-[10px] px-2 py-0.5 rounded border border-slate-200">
                    {prod}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-xs text-amber-900 bg-amber-50 p-3 rounded-xl border border-amber-200/70">
              <span className="font-bold block mb-0.5">Kebutuhan Fasilitasi TEKAD:</span>
              <p className="leading-relaxed">{b.mentoringNeeds}</p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span>Dokumen: {b.sourceDocument}</span>
              <span className="font-semibold text-emerald-700">Status: {b.verificationStatus}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
