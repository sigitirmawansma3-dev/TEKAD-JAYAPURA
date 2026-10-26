'use client';

import React, { useState } from 'react';
import { useTekad } from '@/lib/context/TekadContext';
import { Kampung, Kegiatan, KelompokUsaha } from '@/lib/types';
import {
  MapPin,
  Users,
  Building2,
  Calendar,
  AlertTriangle,
  HelpCircle,
  FileText,
  ShieldCheck,
  Edit3,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  X,
  Save,
  Layers,
} from 'lucide-react';
import Image from 'next/image';

export default function KampungView() {
  const { villages, activities, businessGroups, currentRole, updateVillage, setActiveView } = useTekad();
  const [selectedVillageId, setSelectedVillageId] = useState<string>(villages[0]?.id || 'kmp_abar');
  const [activeTab, setActiveTab] = useState<'profil' | 'ekonomi' | 'kelembagaan' | 'kegiatan' | 'tantangan' | 'dokumen'>('profil');
  const [isEditing, setIsEditing] = useState(false);

  const selectedVillage = villages.find((v) => v.id === selectedVillageId) || villages[0];

  // Activities related to this village
  const villageActivities = activities.filter((a) => {
    const isMatch = a.villageId === selectedVillage.id;
    if (currentRole === 'publik') {
      return isMatch && a.verificationStatus === 'diterbitkan';
    }
    return isMatch;
  });

  // Business groups & BUMDes for this village
  const villageGroups = businessGroups.filter((g) => g.villageId === selectedVillage.id);

  // Edit state
  const [editFormData, setEditFormData] = useState<Partial<Kampung>>({});

  const startEdit = () => {
    setEditFormData({
      headOfVillage: selectedVillage.headOfVillage,
      population: selectedVillage.population,
      households: selectedVillage.households,
      economicSummary: selectedVillage.economicSummary,
      challenges: [...selectedVillage.challenges],
      mentoringNeeds: [...selectedVillage.mentoringNeeds],
      bumdesName: selectedVillage.bumdesName,
      bumdesStatus: selectedVillage.bumdesStatus,
    });
    setIsEditing(true);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    updateVillage(selectedVillage.id, editFormData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header & Sub-selector */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              PORTAL KAMPUNG PENERIMA MANFAAT
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D]">
            Profil Kampung Dampingan TEKAD
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Kabupaten Jayapura • Wilayah Prioritas Ebungfauw (Danau Sentani) & Nimbokrang (Lembah Grime)
          </p>
        </div>

        {/* Edit button if privileged */}
        {currentRole !== 'publik' && (
          <button
            onClick={startEdit}
            className="self-start md:self-auto flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B1B3D] text-[#D4AF37] border border-[#D4AF37]/50 text-xs font-bold hover:bg-[#173777] transition-all shadow-sm"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Data Kampung ({selectedVillage.name})</span>
          </button>
        )}
      </div>

      {/* Village Quick Selector Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {villages.map((v) => {
          const isSelected = v.id === selectedVillageId;
          return (
            <button
              key={v.id}
              onClick={() => {
                setSelectedVillageId(v.id);
                setIsEditing(false);
              }}
              className={`p-3.5 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-[#0B1B3D] to-[#173777] text-white border-[#D4AF37] shadow-md scale-[1.02]'
                  : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide inline-block mb-1.5 ${
                    isSelected
                      ? 'bg-[#D4AF37] text-slate-950'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  Distrik {v.district}
                </span>
                <h3 className="font-extrabold text-sm sm:text-base leading-snug">
                  {v.name}
                </h3>
              </div>
              <div className="mt-3 text-[11px] opacity-80 flex items-center justify-between">
                <span>{v.population} Jiwa • {v.households} KK</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Village Profile Display Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Banner with Village Details */}
        <div className="relative h-64 sm:h-80 w-full bg-slate-900">
          <Image
            src={selectedVillage.imageUrl}
            alt={selectedVillage.name}
            fill
            className="object-cover opacity-75"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3D] via-[#0B1B3D]/50 to-transparent"></div>

          <div className="absolute top-4 right-4 flex items-center gap-2">
            <span className="bg-emerald-600/90 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full border border-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Status: {selectedVillage.verificationStatus.toUpperCase()}</span>
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <div className="inline-block bg-[#D4AF37] text-slate-950 font-black text-xs px-2.5 py-0.5 rounded tracking-wide uppercase">
              Distrik {selectedVillage.district}
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {selectedVillage.name}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#D4AF37]" />
                <span>Kepala Kampung: <strong>{selectedVillage.headOfVillage}</strong></span>
              </span>
              <span>•</span>
              <span>Penduduk: <strong>{selectedVillage.population} Jiwa</strong> ({selectedVillage.households} KK)</span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#D4AF37]" />
                <span>{selectedVillage.bumdesName} ({selectedVillage.bumdesStatus})</span>
              </span>
            </div>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="border-b border-slate-200 px-6 bg-slate-50 flex flex-wrap gap-2 pt-2">
          {[
            { id: 'profil', label: 'Profil & Geografi' },
            { id: 'ekonomi', label: 'Potensi & Komoditas' },
            { id: 'kelembagaan', label: `Kelompok Usaha & BUMDes (${villageGroups.length})` },
            { id: 'kegiatan', label: `Rekam Kegiatan (${villageActivities.length})` },
            { id: 'tantangan', label: 'Tantangan & Pendampingan' },
            { id: 'dokumen', label: 'Dokumen & Legalitas' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
                activeTab === t.id
                  ? 'border-[#0B1B3D] text-[#0B1B3D] bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab Content Panes */}
        <div className="p-6 sm:p-8">
          {/* TAB 1: Profil & Geografi */}
          {activeTab === 'profil' && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-8 space-y-5">
                <div>
                  <h3 className="font-extrabold text-lg text-[#0B1B3D] mb-2">
                    Karakteristik Wilayah & Aksesibilitas
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    {selectedVillage.locationDesc}
                  </p>
                </div>

                <div>
                  <h3 className="font-extrabold text-lg text-[#0B1B3D] mb-2">
                    Ikhtisar Ekonomi Kampung
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                    {selectedVillage.economicSummary}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200 text-center">
                    <span className="text-xs text-blue-900 font-semibold block">Koordinat Geografis</span>
                    <strong className="text-sm text-blue-950 font-bold block mt-1">
                      {selectedVillage.coordinates.lat.toFixed(4)}, {selectedVillage.coordinates.lng.toFixed(4)}
                    </strong>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200 text-center">
                    <span className="text-xs text-amber-900 font-semibold block">Periode Basis Data</span>
                    <strong className="text-sm text-amber-950 font-bold block mt-1">
                      {selectedVillage.dataPeriod}
                    </strong>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 text-center">
                    <span className="text-xs text-emerald-900 font-semibold block">Status Verifikasi</span>
                    <strong className="text-sm text-emerald-950 font-bold block mt-1">
                      Terverifikasi DPMK
                    </strong>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 space-y-4">
                <div className="bg-[#0B1B3D] text-white p-5 rounded-xl border border-[#D4AF37]/30 space-y-3">
                  <h4 className="font-bold text-sm text-[#D4AF37] uppercase tracking-wider">
                    LEMBAGA KAMPUNG RESMI
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 block">Pemerintah Kampung:</span>
                      <span className="font-semibold text-white">Kepala Kampung {selectedVillage.headOfVillage}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Badan Usaha Milik Desa (BUMDes):</span>
                      <span className="font-semibold text-white">{selectedVillage.bumdesName}</span>
                      <span className="inline-block ml-2 px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[10px] rounded border border-emerald-500/40">
                        {selectedVillage.bumdesStatus}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block">Kelompok Usaha Binaan:</span>
                      <span className="font-semibold text-white">{selectedVillage.establishedGroupsCount} Kelompok Terdata</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-100 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1.5">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#0B1B3D]" />
                    Sumber Dokumen Resmi:
                  </span>
                  <p className="italic text-slate-700">{selectedVillage.sourceDocument}</p>
                  <p className="text-[11px] text-slate-500">Tanggal Pencatatan: {selectedVillage.recordingDate}</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Potensi & Komoditas */}
          {activeTab === 'ekonomi' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-extrabold text-lg text-[#0B1B3D] mb-1">
                  Komoditas Unggulan {selectedVillage.name}
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Daftar komoditas andalan kampung yang didukung fasilitasi Program TEKAD.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedVillage.mainCommodities.map((comName, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-[#D4AF37] transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#0B1B3D] text-[#D4AF37] font-bold flex items-center justify-center text-xs mb-3">
                        0{idx + 1}
                      </div>
                      <h4 className="font-bold text-sm text-[#0B1B3D]">{comName}</h4>
                      <p className="text-xs text-slate-600 mt-1">
                        Komoditas prioritas peningkatan nilai tambah dan pemasaran terpadu.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-slate-700 space-y-2">
                <span className="font-bold text-amber-950 flex items-center gap-1.5 text-sm">
                  <TrendingUp className="w-4 h-4 text-amber-700" />
                  Rantai Nilai Ekonomi Kampung
                </span>
                <p className="leading-relaxed">
                  Intervensi TEKAD difokuskan pada transisi dari penjualan bahan mentah (raw materials) menjadi produk bernilai tambah tinggi dengan melibatkan BUMDes sebagai agregator serta kelompok pengrajin/petani sebagai produsen utama.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Kelembagaan (BUMDes & Kelompok Usaha) */}
          {activeTab === 'kelembagaan' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-lg text-[#0B1B3D]">
                    BUMDes & Kelompok Usaha di {selectedVillage.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Struktur kelembagaan berbadan hukum dan kelompok masyarakat dampingan.
                  </p>
                </div>
              </div>

              {villageGroups.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  Belum ada kelompok usaha yang terdaftar untuk kampung ini.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {villageGroups.map((group) => (
                    <div
                      key={group.id}
                      className="p-5 rounded-xl border border-slate-200 bg-white shadow-sm space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200 uppercase">
                            {group.type}
                          </span>
                          <h4 className="font-extrabold text-sm sm:text-base text-[#0B1B3D] mt-1.5">
                            {group.name}
                          </h4>
                        </div>
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                          {group.bankAccountStatus}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-200/70">
                        <div>Ketua / Pengurus: <strong>{group.leaderName}</strong></div>
                        <div>Jumlah Anggota: <strong>{group.membersCount} orang</strong> ({group.femaleMembersCount} Perempuan)</div>
                        <div>Omset / Perputaran: <strong>{group.currentTurnover}</strong></div>
                        <div>Status Legalitas: <span className="italic">{group.legalStatus}</span></div>
                      </div>

                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                          Produk Utama:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {group.mainProducts.map((p, i) => (
                            <span key={i} className="text-[10px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-[11px] text-amber-900 bg-amber-50 p-2 rounded border border-amber-200/60">
                        <strong>Kebutuhan Pendampingan:</strong> {group.mentoringNeeds}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: Rekam Kegiatan TEKAD */}
          {activeTab === 'kegiatan' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-extrabold text-lg text-[#0B1B3D]">
                    Rekam Kegiatan TEKAD di {selectedVillage.name}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Dokumentasi riil kegiatan fasilitasi, pelatihan, dan rembuk kampung.
                  </p>
                </div>
                <button
                  onClick={() => setActiveView('kegiatan')}
                  className="text-xs font-bold text-[#0B1B3D] hover:text-[#D4AF37] transition-colors"
                >
                  Buka Modul Dokumentasi →
                </button>
              </div>

              {villageActivities.length === 0 ? (
                <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                  Belum ada rekaman kegiatan yang dipublikasikan untuk kampung ini.
                </div>
              ) : (
                <div className="space-y-3">
                  {villageActivities.map((act) => (
                    <div
                      key={act.id}
                      className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#D4AF37] transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-bold text-[#0B1B3D] bg-slate-100 px-2 py-0.5 rounded">
                          {act.category}
                        </span>
                        <span>{act.date} • {act.location}</span>
                      </div>
                      <h4 className="font-bold text-sm text-[#0B1B3D]">{act.title}</h4>
                      <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded">
                        <strong>Hasil Langsung:</strong> {act.directResults}
                      </p>
                      <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1">
                        <span>Peserta: {act.participantsCount} org ({act.participantsDetail.female} Perempuan)</span>
                        <span className="text-slate-400">Dokumen: {act.sourceDocument}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: Tantangan & Kebutuhan Pendampingan */}
          {activeTab === 'tantangan' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 rounded-xl bg-rose-50/60 border border-rose-200 space-y-3">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Tantangan Lapangan Faktual ({selectedVillage.name})</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {selectedVillage.challenges.map((c, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-rose-100">
                      <span className="w-4 h-4 rounded-full bg-rose-200 text-rose-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200 space-y-3">
                <div className="flex items-center gap-2 text-amber-950 font-bold text-sm">
                  <HelpCircle className="w-4 h-4 text-amber-700" />
                  <span>Kebutuhan Pendampingan TEKAD</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {selectedVillage.mentoringNeeds.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-lg border border-amber-100">
                      <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 6: Dokumen & Legalitas */}
          {activeTab === 'dokumen' && (
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
              <h3 className="font-extrabold text-base text-[#0B1B3D]">
                Arsip Dokumen Sumber Verifikasi
              </h3>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-[#0B1B3D]" />
                    <div>
                      <strong className="text-slate-800 block">{selectedVillage.sourceDocument}</strong>
                      <span className="text-[11px] text-slate-500">Pencatatan: {selectedVillage.recordingDate} • Periode: {selectedVillage.dataPeriod}</span>
                    </div>
                  </div>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[11px]">
                    Status: {selectedVillage.verificationStatus}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Village Modal (Admin / Fasilitator) */}
      {isEditing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-extrabold text-lg text-[#0B1B3D]">
                  Edit Profil {selectedVillage.name}
                </h3>
                <p className="text-xs text-slate-500">
                  Perubahan akan disimpan langsung ke basis data aktif TEKAD Jayapura.
                </p>
              </div>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kepala Kampung</label>
                  <input
                    type="text"
                    value={editFormData.headOfVillage || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, headOfVillage: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0B1B3D] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Nama BUMDes</label>
                  <input
                    type="text"
                    value={editFormData.bumdesName || ''}
                    onChange={(e) => setEditFormData({ ...editFormData, bumdesName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0B1B3D] outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jumlah Penduduk (Jiwa)</label>
                  <input
                    type="number"
                    value={editFormData.population || 0}
                    onChange={(e) => setEditFormData({ ...editFormData, population: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0B1B3D] outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jumlah Kepala Keluarga (KK)</label>
                  <input
                    type="number"
                    value={editFormData.households || 0}
                    onChange={(e) => setEditFormData({ ...editFormData, households: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0B1B3D] outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Ringkasan Potensi Ekonomi</label>
                <textarea
                  rows={3}
                  value={editFormData.economicSummary || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, economicSummary: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0B1B3D] outline-none"
                  required
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-bold hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#0B1B3D] text-[#D4AF37] font-bold hover:bg-[#173777]"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Pembaruan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
