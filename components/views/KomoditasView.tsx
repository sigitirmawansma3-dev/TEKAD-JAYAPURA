'use client';

import React, { useState } from 'react';
import { useTekad } from '@/lib/context/TekadContext';
import {
  Layers,
  MapPin,
  TrendingUp,
  Calendar,
  DollarSign,
  FileText,
  ShieldCheck,
  Tag,
  Download,
} from 'lucide-react';
import Image from 'next/image';

export default function KomoditasView() {
  const { commodities, exportToCsv, setActiveView } = useTekad();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'Kerajinan',
    'Pengolahan Pangan',
    'Perkebunan',
    'Pertanian Pangan',
  ];

  const filtered = commodities.filter((c) => {
    if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Title */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              KOMODITAS UNGGULAN KAMPUNG
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D]">
            Peta Komoditas Unggulan TEKAD Jayapura
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Data kapasitas produksi, rantai pasar, harga standar, serta kampung sentra penghasil di Danau Sentani dan Lembah Grime.
          </p>
        </div>

        <button
          onClick={() => exportToCsv('komoditas')}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Ekspor Data Komoditas</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-[#0B1B3D] text-[#D4AF37] shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'all' ? 'Semua Komoditas' : cat}
          </button>
        ))}
      </div>

      {/* Grid of Commodities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-48 w-full bg-slate-900">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute top-3 left-3 bg-[#0B1B3D]/90 backdrop-blur-sm text-white px-2.5 py-0.5 rounded text-[11px] font-bold border border-[#D4AF37]/40">
                  {item.category}
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <h3 className="font-extrabold text-base sm:text-lg leading-tight">
                    {item.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 space-y-4 text-xs">
                <p className="text-slate-600 leading-relaxed line-clamp-3">
                  {item.description}
                </p>

                <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                      Kampung Sentra:
                    </span>
                    <strong className="text-slate-800">{item.primaryVillages.join(', ')}</strong>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                      Kapasitas Produksi:
                    </span>
                    <strong className="text-[#0B1B3D]">{item.productionCapacity}</strong>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                      Kisaran Harga Jual:
                    </span>
                    <strong className="text-emerald-700">{item.priceRange}</strong>
                  </div>

                  <div>
                    <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                      Siklus Musim / Panen:
                    </span>
                    <span className="text-slate-700">{item.seasonalCycle}</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Saluran Pasar:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {item.marketDestinations.map((m, i) => (
                      <span key={i} className="bg-slate-100 text-slate-800 text-[10px] px-2 py-0.5 rounded border border-slate-200">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="italic truncate max-w-[200px]" title={item.sourceDocument}>
                {item.sourceDocument}
              </span>
              <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Terverifikasi
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
