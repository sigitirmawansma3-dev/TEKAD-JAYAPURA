'use client';

import React from 'react';
import { useTekad } from '@/lib/context/TekadContext';
import { ShieldCheck, Heart, MapPin } from 'lucide-react';

export default function Footer() {
  const { setActiveView } = useTekad();

  return (
    <footer className="bg-[#07132B] text-slate-300 border-t border-[#D4AF37]/30 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Portal Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#0B1B3D] text-[#D4AF37] font-black flex items-center justify-center border border-[#D4AF37]/50">
                TKD
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">
                TEKAD Digital Hub Kabupaten Jayapura
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-md">
              Portal pengetahuan dan dokumentasi Program Transformasi Ekonomi Kampung Terpadu (TEKAD) Kementerian Desa, Pembangunan Daerah Tertinggal, dan Transmigrasi (Kemendesa PDTT) di Kabupaten Jayapura, Papua.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#D4AF37]">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Dikelola bersama Dinas Pemberdayaan Masyarakat dan Kampung (DPMK) Kab. Jayapura</span>
            </div>
          </div>

          {/* Col 2: Menu Utama */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-[#D4AF37]">
              Menu Portal
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveView('beranda')} className="hover:text-white transition-colors">
                  Beranda
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('kampung')} className="hover:text-white transition-colors">
                  Profil Kampung Dampingan
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('kegiatan')} className="hover:text-white transition-colors">
                  Dokumentasi Kegiatan
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('praktik-baik')} className="hover:text-white transition-colors">
                  Praktik Baik 8 Komponen
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('komoditas')} className="hover:text-white transition-colors">
                  Komoditas Unggulan
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Fitur Cerdas & Analitik */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-[#D4AF37]">
              Layanan Pengetahuan
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => setActiveView('ai-asisten')} className="hover:text-white transition-colors">
                  Asisten AI Dokumen Terverifikasi
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('peta')} className="hover:text-white transition-colors">
                  Peta Sebaran Kegiatan Spasial
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('dashboard')} className="hover:text-white transition-colors">
                  Dashboard Kinerja (Aktivitas/Output/Outcome/Dampak)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveView('tentang')} className="hover:text-white transition-colors">
                  Tentang Program TEKAD
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <span>
            © 2026 Program TEKAD Kementerian Desa PDTT • Kabupaten Jayapura, Provinsi Papua.
          </span>
          <span className="text-slate-400">
            Kombinasi Biru Tua, Putih, dan Aksen Emas • Bebas Fabrikasi Data
          </span>
        </div>
      </div>
    </footer>
  );
}
