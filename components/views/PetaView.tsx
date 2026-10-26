'use client';

import React, { useState } from 'react';
import { useTekad } from '@/lib/context/TekadContext';
import { MapPin, Navigation, Building2, Calendar, Layers, Info, ExternalLink, ChevronRight } from 'lucide-react';

export default function PetaView() {
  const { villages, activities, commodities, setActiveView } = useTekad();
  const [selectedVillageId, setSelectedVillageId] = useState<string>(villages[0]?.id || 'kmp_abar');

  const selectedVillage = villages.find((v) => v.id === selectedVillageId) || villages[0];
  const villageActivities = activities.filter((a) => a.villageId === selectedVillage.id);

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              SPASIAL & GEOGRAFIS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D]">
            Peta Sebaran Kegiatan & Potensi Kampung
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Visualisasi spasial 4 kampung dampingan TEKAD di Kabupaten Jayapura: Klaster Danau Sentani (Ebungfauw) & Klaster Lembah Grime (Nimbokrang).
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Map Visualizer */}
        <div className="lg:col-span-8 bg-[#0B1B3D] rounded-2xl border border-[#D4AF37]/40 p-6 shadow-xl text-white space-y-4 relative overflow-hidden">
          {/* Decorative Map Grid */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:20px_20px]"></div>

          <div className="flex items-center justify-between relative z-10 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-bold text-white tracking-wide">
                PETA INTERAKTIF KABUPATEN JAYAPURA (PAPUA)
              </span>
            </div>
            <span className="text-[11px] text-amber-200 bg-[#173777] px-2.5 py-0.5 rounded border border-[#D4AF37]/30">
              Koordinat Datum WGS-84
            </span>
          </div>

          {/* Graphical Map Representation with Styled SVG Landmass & Pins */}
          <div className="relative h-96 w-full rounded-xl bg-gradient-to-b from-[#07132B] to-[#0A1835] border border-white/10 p-4 flex flex-col justify-between overflow-hidden">
            {/* Topographic Water / Land Contours SVG */}
            <svg
              className="absolute inset-0 w-full h-full opacity-30 pointer-events-none"
              preserveAspectRatio="none"
              viewBox="0 0 600 400"
            >
              <path
                d="M 50 150 Q 150 100 300 130 T 550 110 L 600 400 L 0 400 Z"
                fill="#173777"
                fillOpacity="0.4"
              />
              {/* Sentani Lake stylized shape */}
              <ellipse cx="440" cy="240" rx="110" ry="45" fill="#0284c7" fillOpacity="0.3" />
              <text x="400" y="245" fill="#38bdf8" fontSize="12" fontWeight="bold">
                Danau Sentani
              </text>
              {/* Grime Valley Area */}
              <ellipse cx="160" cy="180" rx="110" ry="70" fill="#059669" fillOpacity="0.2" />
              <text x="110" y="180" fill="#34d399" fontSize="12" fontWeight="bold">
                Lembah Grime (Nimbokrang)
              </text>
            </svg>

            {/* Geographical Markers */}
            <div className="relative z-10 w-full h-full">
              {/* Kampung Abar Pin (Danau Sentani - Ebungfauw) */}
              <button
                onClick={() => setSelectedVillageId('kmp_abar')}
                className={`absolute top-[58%] right-[22%] -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl transition-all flex items-center gap-2 group ${
                  selectedVillageId === 'kmp_abar'
                    ? 'bg-[#D4AF37] text-slate-950 font-black scale-110 shadow-lg shadow-[#D4AF37]/40 ring-4 ring-[#D4AF37]/30'
                    : 'bg-[#0B1B3D]/90 text-white hover:bg-[#173777] border border-[#D4AF37]/40'
                }`}
              >
                <div className="w-3 h-3 rounded-full bg-rose-500 animate-ping absolute -top-1 -right-1"></div>
                <MapPin className="w-4 h-4 shrink-0 text-rose-500" />
                <div className="text-left leading-tight">
                  <span className="text-xs font-bold block">Kampung Abar</span>
                  <span className="text-[10px] opacity-80 block">Distrik Ebungfauw</span>
                </div>
              </button>

              {/* Kampung Berab Pin (Nimbokrang) */}
              <button
                onClick={() => setSelectedVillageId('kmp_berab')}
                className={`absolute top-[40%] left-[24%] -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl transition-all flex items-center gap-2 group ${
                  selectedVillageId === 'kmp_berab'
                    ? 'bg-[#D4AF37] text-slate-950 font-black scale-110 shadow-lg shadow-[#D4AF37]/40 ring-4 ring-[#D4AF37]/30'
                    : 'bg-[#0B1B3D]/90 text-white hover:bg-[#173777] border border-[#D4AF37]/40'
                }`}
              >
                <MapPin className="w-4 h-4 shrink-0 text-amber-400" />
                <div className="text-left leading-tight">
                  <span className="text-xs font-bold block">Kampung Berab</span>
                  <span className="text-[10px] opacity-80 block">Distrik Nimbokrang</span>
                </div>
              </button>

              {/* Kampung Nembukrang Sari Pin */}
              <button
                onClick={() => setSelectedVillageId('kmp_nembukrang_sari')}
                className={`absolute top-[28%] left-[28%] -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl transition-all flex items-center gap-2 group ${
                  selectedVillageId === 'kmp_nembukrang_sari'
                    ? 'bg-[#D4AF37] text-slate-950 font-black scale-110 shadow-lg shadow-[#D4AF37]/40 ring-4 ring-[#D4AF37]/30'
                    : 'bg-[#0B1B3D]/90 text-white hover:bg-[#173777] border border-[#D4AF37]/40'
                }`}
              >
                <MapPin className="w-4 h-4 shrink-0 text-emerald-400" />
                <div className="text-left leading-tight">
                  <span className="text-xs font-bold block">Nembukrang Sari</span>
                  <span className="text-[10px] opacity-80 block">Sentra Beras</span>
                </div>
              </button>

              {/* Kampung Benyom Jaya 1 Pin */}
              <button
                onClick={() => setSelectedVillageId('kmp_benyom_jaya_1')}
                className={`absolute top-[52%] left-[16%] -translate-x-1/2 -translate-y-1/2 p-2 rounded-xl transition-all flex items-center gap-2 group ${
                  selectedVillageId === 'kmp_benyom_jaya_1'
                    ? 'bg-[#D4AF37] text-slate-950 font-black scale-110 shadow-lg shadow-[#D4AF37]/40 ring-4 ring-[#D4AF37]/30'
                    : 'bg-[#0B1B3D]/90 text-white hover:bg-[#173777] border border-[#D4AF37]/40'
                }`}
              >
                <MapPin className="w-4 h-4 shrink-0 text-indigo-400" />
                <div className="text-left leading-tight">
                  <span className="text-xs font-bold block">Benyom Jaya 1</span>
                  <span className="text-[10px] opacity-80 block">Sawit & Atsiri</span>
                </div>
              </button>
            </div>

            {/* Map Legend Footer */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300 bg-[#07132B]/80 backdrop-blur-md p-2.5 rounded-lg border border-white/10">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                  <span>Klaster Danau Sentani (Gerabah/Sagu)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span>Klaster Lembah Grime (Pangan/Kakao)</span>
                </span>
              </div>
              <span className="text-slate-400">Klik pin kampung untuk melihat ringkasan</span>
            </div>
          </div>
        </div>

        {/* Selected Village Detail Panel */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0B1B3D] text-[#D4AF37] uppercase">
                Distrik {selectedVillage.district}
              </span>
              <h2 className="text-xl font-extrabold text-[#0B1B3D] mt-1.5">
                {selectedVillage.name}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Kepala Kampung: <strong>{selectedVillage.headOfVillage}</strong> • {selectedVillage.population} Jiwa
              </p>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border text-xs text-slate-700 space-y-1">
              <span className="font-bold text-slate-800 block">Koordinat GPS:</span>
              <p className="font-mono text-slate-600">
                Lat: {selectedVillage.coordinates.lat.toFixed(6)}, Lng: {selectedVillage.coordinates.lng.toFixed(6)}
              </p>
              <p className="text-slate-600 text-[11px] pt-1">{selectedVillage.locationDesc}</p>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1">
                Komoditas Utama:
              </span>
              <div className="flex flex-wrap gap-1">
                {selectedVillage.mainCommodities.map((c, i) => (
                  <span key={i} className="text-[11px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1">
                Kegiatan TEKAD Terdokumentasi ({villageActivities.length}):
              </span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {villageActivities.map((act) => (
                  <div key={act.id} className="p-2 rounded-lg bg-slate-50 border text-xs text-slate-700">
                    <strong className="block text-[#0B1B3D]">{act.title}</strong>
                    <span className="text-[10px] text-slate-500">{act.date} • {act.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveView('kampung')}
            className="w-full py-2.5 rounded-xl bg-[#0B1B3D] text-[#D4AF37] text-xs font-bold hover:bg-[#173777] transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Buka Profil Penuh Kampung Ini</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
