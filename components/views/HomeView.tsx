'use client';

import React from 'react';
import { useTekad } from '@/lib/context/TekadContext';
import {
  MapPin,
  Calendar,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Bot,
  Users,
  Award,
  TrendingUp,
  FileText,
  Compass,
  CheckCircle,
} from 'lucide-react';
import Image from 'next/image';

export default function HomeView() {
  const { villages, activities, bestPractices, commodities, setActiveView } = useTekad();

  // 4 Main target villages
  const targetVillages = villages.slice(0, 4);

  // Top verified best practices
  const topPractices = bestPractices.filter((b) => b.status === 'terverifikasi').slice(0, 2);

  // Recent approved activities
  const recentActivities = activities.filter((a) => a.verificationStatus === 'diterbitkan').slice(0, 3);

  return (
    <div className="space-y-12 pb-16">
      {/* 5 Strategic Pillars of TEKAD Jayapura */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        <div className="max-w-3xl mb-6">
          <span className="text-xs font-bold text-[#0B1B3D] tracking-wider uppercase bg-[#D4AF37]/20 px-2.5 py-1 rounded border border-[#D4AF37]/40">
            STRATEGI IMPLEMENTASI PROGRAM
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D] mt-2">
            5 Pilar Transformasi Ekonomi Kampung Terpadu di Kabupaten Jayapura
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Mewujudkan kemandirian ekonomi kampung berbasis potensi lokal dan adat di kawasan Danau Sentani dan Lembah Grime.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#D4AF37] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#0B1B3D] text-[#D4AF37] font-bold flex items-center justify-center text-sm mb-3">
              01
            </div>
            <h3 className="font-bold text-sm text-[#0B1B3D]">Kelembagaan Kampung & BUMDes</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Penguatan tata kelola BUMDes dan kelompok usaha berbadan hukum dengan pembukuan transparan.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#D4AF37] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#0B1B3D] text-[#D4AF37] font-bold flex items-center justify-center text-sm mb-3">
              02
            </div>
            <h3 className="font-bold text-sm text-[#0B1B3D]">Peningkatan Nilai Tambah</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Teknologi tepat guna seperti tungku gerabah suhu stabil, pascapanen kakao, dan kemasan beras bermutu.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#D4AF37] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#0B1B3D] text-[#D4AF37] font-bold flex items-center justify-center text-sm mb-3">
              03
            </div>
            <h3 className="font-bold text-sm text-[#0B1B3D]">Akses Pasar & Rantai Pasok</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Menghubungkan komoditas kampung dengan offtaker premium, galeri cinderamata, dan koperasi ASN Jayapura.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#D4AF37] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#0B1B3D] text-[#D4AF37] font-bold flex items-center justify-center text-sm mb-3">
              04
            </div>
            <h3 className="font-bold text-sm text-[#0B1B3D]">Inklusi Perempuan & Pemuda</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Pemberdayaan mama-mama perajin gerabah, kelompok wanita tani (KWT), dan wirausaha pemuda kampung.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#D4AF37] transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[#0B1B3D] text-[#D4AF37] font-bold flex items-center justify-center text-sm mb-3">
              05
            </div>
            <h3 className="font-bold text-sm text-[#0B1B3D]">Kelestarian Sumber Daya Adat</h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Tata kelola hutan sagu adat dan pengelolaan air irigasi lestari berdasar kearifan lokal Sentani & Grime.
            </p>
          </div>
        </div>
      </section>

      {/* 4 Featured Target Villages Grid */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                WILAYAH KERJA TERPILIH
              </span>
            </div>
            <h2 className="text-2xl font-black text-[#0B1B3D] mt-1">
              Profil 4 Kampung Penerima Manfaat TEKAD
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Dokumentasi data faktual potensi komoditas, kelembagaan BUMDes, tantangan, dan kebutuhan pendampingan.
            </p>
          </div>

          <button
            onClick={() => setActiveView('kampung')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B1B3D] hover:text-[#D4AF37] transition-colors"
          >
            <span>Buka Seluruh Halaman Kampung</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {targetVillages.map((k) => (
            <div
              key={k.id}
              onClick={() => setActiveView('kampung')}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all flex flex-col cursor-pointer group"
            >
              <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                <Image
                  src={k.imageUrl}
                  alt={k.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute top-3 left-3 bg-[#0B1B3D]/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[11px] font-semibold border border-[#D4AF37]/40">
                  Distrik {k.district}
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-lg leading-tight group-hover:text-[#D4AF37] transition-colors">
                    {k.name}
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                    Kepala Kampung: {k.headOfVillage}
                  </p>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {k.economicSummary}
                  </div>

                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Komoditas Utama:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {k.mainCommodities.map((c, i) => (
                        <span
                          key={i}
                          className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded border border-slate-200"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">
                    BUMDes: <strong className="text-slate-800">{k.bumdesName.replace('BUMDes ', '')}</strong>
                  </span>
                  <span className="text-[#0B1B3D] font-bold group-hover:translate-x-0.5 transition-transform">
                    Detail →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two-Column Showcase: Verified Best Practices & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Verified Best Practices (Praktik Baik) */}
        <section className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded">
                TERVERIFIKASI & TERUJI
              </span>
              <h2 className="text-xl font-bold text-[#0B1B3D] mt-1.5">
                Praktik Baik Pengembangan Ekonomi
              </h2>
            </div>
            <button
              onClick={() => setActiveView('praktik-baik')}
              className="text-xs font-bold text-[#0B1B3D] hover:text-[#D4AF37] transition-colors"
            >
              Lihat Semua →
            </button>
          </div>

          <div className="space-y-4">
            {topPractices.map((bp) => (
              <div
                key={bp.id}
                onClick={() => setActiveView('praktik-baik')}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-[#D4AF37] transition-all cursor-pointer group space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-[#0B1B3D]/10 text-[#0B1B3D] text-[10px] font-bold px-2 py-0.5 rounded">
                        {bp.villageName} • Distrik {bp.district}
                      </span>
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-semibold px-2 py-0.5 rounded">
                        {bp.category}
                      </span>
                    </div>
                    <h3 className="font-extrabold text-sm sm:text-base text-[#0B1B3D] group-hover:text-[#D4AF37] transition-colors leading-snug">
                      {bp.title}
                    </h3>
                  </div>
                </div>

                {/* Evidence snippet */}
                <div className="bg-emerald-50/70 border-l-4 border-emerald-600 p-3 rounded-r-lg text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    Bukti Hasil Riil:
                  </span>
                  <p className="line-clamp-2 leading-relaxed">{bp.evidenceResults}</p>
                </div>

                <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                  <span>Penyusun: {bp.author}</span>
                  <span className="text-[#0B1B3D] font-bold group-hover:translate-x-1 transition-transform">
                    Baca 8 Komponen Lengkap →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right: Latest Verified Activities Feed */}
        <section className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-blue-900 bg-blue-100 border border-blue-300 px-2 py-0.5 rounded">
                DOKUMENTASI RESMI
              </span>
              <h2 className="text-xl font-bold text-[#0B1B3D] mt-1.5">
                Kegiatan TEKAD Terbaru
              </h2>
            </div>
            <button
              onClick={() => setActiveView('kegiatan')}
              className="text-xs font-bold text-[#0B1B3D] hover:text-[#D4AF37] transition-colors"
            >
              Semua Kegiatan →
            </button>
          </div>

          <div className="space-y-3">
            {recentActivities.map((act) => (
              <div
                key={act.id}
                onClick={() => setActiveView('kegiatan')}
                className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:border-[#D4AF37] transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                  <span className="font-semibold text-[#0B1B3D]">{act.villageName}</span>
                  <span>{act.date}</span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-[#0B1B3D] group-hover:text-[#D4AF37] transition-colors leading-snug">
                  {act.title}
                </h4>
                <div className="mt-2 text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                  {act.directResults}
                </div>
                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Peserta: <strong>{act.participantsCount} org</strong> ({act.participantsDetail.female} Perempuan)</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                    Disetujui DPMK
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* AI Assistant Teaser Callout */}
          <div className="bg-gradient-to-br from-[#0B1B3D] via-[#0F2654] to-[#173777] rounded-xl p-5 text-white border border-[#D4AF37]/40 shadow-md space-y-3">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-extrabold text-sm text-white">Butuh Informasi Akurat dari Dokumen TEKAD?</h3>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              Asisten AI kami menjawab berdasarkan dokumen resmi yang diverifikasi dan menyertakan sitasi nama dokumen dan periode data.
            </p>
            <button
              onClick={() => setActiveView('ai-asisten')}
              className="w-full py-2 px-3 rounded-lg bg-[#D4AF37] hover:bg-[#B38F24] text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Buka Percakapan Asisten AI</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
