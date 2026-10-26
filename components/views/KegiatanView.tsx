'use client';

import React, { useState } from 'react';
import { useTekad } from '@/lib/context/TekadContext';
import { Kegiatan, VerificationStatus } from '@/lib/types';
import {
  Calendar,
  MapPin,
  Users,
  PlusCircle,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Sparkles,
  Bot,
  Eye,
  Edit,
  Trash2,
  X,
  Send,
  Download,
  Share2,
} from 'lucide-react';
import Image from 'next/image';

export default function KegiatanView() {
  const {
    activities,
    villages,
    currentRole,
    currentUser,
    addActivity,
    updateActivityStatus,
    deleteActivity,
    exportToCsv,
  } = useTekad();

  // Filters
  const [selectedVillage, setSelectedVillage] = useState<string>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedActivityDetail, setSelectedActivityDetail] = useState<Kegiatan | null>(null);
  const [isAiReportModalOpen, setIsAiReportModalOpen] = useState(false);
  const [aiReportDraft, setAiReportDraft] = useState<string>('');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  // Form State for new activity
  const [formData, setFormData] = useState({
    title: '',
    villageId: villages[0]?.id || 'kmp_abar',
    date: new Date().toISOString().split('T')[0],
    location: '',
    implementer: currentUser.name || 'Fasilitator TEKAD',
    category: 'Pelatihan' as const,
    objectives: '',
    maleParticipants: 10,
    femaleParticipants: 15,
    youthParticipants: 8,
    directResults: '',
    followUpProgress: '',
    obstacles: '',
    nextActionSteps: '',
    photoUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
  });

  // Filter activities
  const filteredActivities = activities.filter((act) => {
    // Role based visibility
    if (currentRole === 'publik' && act.verificationStatus !== 'diterbitkan') {
      return false;
    }
    if (selectedVillage !== 'all' && act.villageId !== selectedVillage) {
      return false;
    }
    if (selectedDistrict !== 'all' && act.district !== selectedDistrict) {
      return false;
    }
    if (selectedStatus !== 'all' && act.verificationStatus !== selectedStatus) {
      return false;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = act.title.toLowerCase().includes(q);
      const matchVillage = act.villageName.toLowerCase().includes(q);
      const matchResults = act.directResults.toLowerCase().includes(q);
      if (!matchTitle && !matchVillage && !matchResults) return false;
    }
    return true;
  });

  const handleCreateActivity = (e: React.FormEvent) => {
    e.preventDefault();
    const targetVillage = villages.find((v) => v.id === formData.villageId) || villages[0];

    addActivity({
      title: formData.title,
      villageId: targetVillage.id,
      villageName: targetVillage.name,
      district: targetVillage.district,
      date: formData.date,
      location: formData.location || `Balai Kampung ${targetVillage.name}`,
      implementer: formData.implementer,
      category: formData.category,
      objectives: formData.objectives,
      participantsCount:
        Number(formData.maleParticipants) +
        Number(formData.femaleParticipants),
      participantsDetail: {
        male: Number(formData.maleParticipants),
        female: Number(formData.femaleParticipants),
        youth: Number(formData.youthParticipants),
      },
      directResults: formData.directResults,
      followUpProgress: formData.followUpProgress || 'Dalam proses pendampingan lanjutan fasilitator.',
      obstacles: formData.obstacles || 'Tidak ada kendala berarti yang dilaporkan.',
      nextActionSteps: formData.nextActionSteps,
      photos: [formData.photoUrl],
      documents: [
        {
          name: `Notulensi_${formData.title.slice(0, 20).replace(/\s+/g, '_')}.pdf`,
          url: '#',
          size: '1.4 MB',
        },
      ],
      dataPeriod: '2026',
      sourceDocument: `Laporan Mandiri Fasilitator No. ${Math.floor(10 + Math.random() * 90)}/TEKAD/2026`,
      verificationStatus: currentRole === 'admin' ? 'diterbitkan' : 'menunggu_verifikasi',
    });

    setIsAddModalOpen(false);
  };

  const handleGenerateAiReport = async (act: Kegiatan) => {
    setIsGeneratingReport(true);
    setIsAiReportModalOpen(true);
    setSelectedActivityDetail(act);
    setAiReportDraft('Sedang menyusun draf laporan resmi dengan model AI...');

    try {
      const res = await fetch('/api/gemini/report-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(act),
      });
      const data = await res.json();
      if (data.reportMarkdown) {
        setAiReportDraft(data.reportMarkdown);
      } else {
        setAiReportDraft('Gagal menghasilkan draf laporan: ' + (data.error || 'Respon kosong'));
      }
    } catch (e: any) {
      setAiReportDraft('Terjadi kendala jaringan: ' + e.message);
    } finally {
      setIsGeneratingReport(false);
    }
  };

  const statusBadges: Record<
    VerificationStatus,
    { label: string; bg: string; text: string; icon: any }
  > = {
    draf: {
      label: 'Draf',
      bg: 'bg-slate-100 border-slate-300',
      text: 'text-slate-700',
      icon: Clock,
    },
    menunggu_verifikasi: {
      label: 'Menunggu Verifikasi',
      bg: 'bg-amber-50 border-amber-300',
      text: 'text-amber-800',
      icon: AlertCircle,
    },
    disetujui: {
      label: 'Disetujui',
      bg: 'bg-blue-50 border-blue-300',
      text: 'text-blue-800',
      icon: CheckCircle2,
    },
    diterbitkan: {
      label: 'Diterbitkan (Publik)',
      bg: 'bg-emerald-50 border-emerald-300',
      text: 'text-emerald-800',
      icon: CheckCircle2,
    },
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Title & Actions Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              MODUL DOKUMENTASI TERVERIFIKASI
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D]">
            Dokumentasi Kegiatan TEKAD
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Mencatat dan mengarsipkan pelaksanaan kegiatan, hasil langsung, kendala, tindak lanjut, dan dokumentasi foto.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {currentRole !== 'publik' && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B1B3D] text-[#D4AF37] font-bold text-xs hover:bg-[#173777] border border-[#D4AF37]/40 shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Input Kegiatan Baru</span>
            </button>
          )}

          <button
            onClick={() => exportToCsv('kegiatan')}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor CSV/Excel</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Search Query */}
          <div>
            <label className="font-semibold text-slate-600 block mb-1">Cari Kegiatan / Kata Kunci</label>
            <input
              type="text"
              placeholder="Contoh: pelatihan gerabah, kakao, beras..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0B1B3D] outline-none"
            />
          </div>

          {/* District Filter */}
          <div>
            <label className="font-semibold text-slate-600 block mb-1">Distrik</label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-[#0B1B3D] outline-none"
            >
              <option value="all">Semua Distrik (Ebungfauw & Nimbokrang)</option>
              <option value="Ebungfauw">Distrik Ebungfauw</option>
              <option value="Nimbokrang">Distrik Nimbokrang</option>
            </select>
          </div>

          {/* Village Filter */}
          <div>
            <label className="font-semibold text-slate-600 block mb-1">Kampung</label>
            <select
              value={selectedVillage}
              onChange={(e) => setSelectedVillage(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-[#0B1B3D] outline-none"
            >
              <option value="all">Semua Kampung Dampingan</option>
              {villages.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name} ({v.district})
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="font-semibold text-slate-600 block mb-1">Status Verifikasi</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-[#0B1B3D] outline-none"
            >
              <option value="all">Semua Status</option>
              <option value="diterbitkan">Diterbitkan (Publik)</option>
              {currentRole !== 'publik' && (
                <>
                  <option value="disetujui">Disetujui</option>
                  <option value="menunggu_verifikasi">Menunggu Verifikasi</option>
                  <option value="draf">Draf</option>
                </>
              )}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>
            Menampilkan <strong>{filteredActivities.length}</strong> kegiatan terdokumentasi
          </span>
          {currentRole === 'publik' && (
            <span className="text-[11px] text-slate-400">
              *Hanya kegiatan dengan status &quot;Diterbitkan&quot; yang ditampilkan untuk publik.
            </span>
          )}
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredActivities.map((act) => {
          const badge = statusBadges[act.verificationStatus];
          const Icon = badge.icon;
          return (
            <div
              key={act.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo Header */}
                <div className="relative h-44 w-full bg-slate-900">
                  <Image
                    src={act.photos[0] || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'}
                    alt={act.title}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  <div className="absolute top-3 left-3 bg-[#0B1B3D]/90 backdrop-blur-sm text-white px-2.5 py-0.5 rounded text-[11px] font-bold border border-[#D4AF37]/40">
                    {act.category}
                  </div>

                  <div className={`absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1 ${badge.bg} ${badge.text}`}>
                    <Icon className="w-3 h-3" />
                    <span>{badge.label}</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-[11px] text-slate-300 flex items-center gap-1.5 mb-0.5">
                      <MapPin className="w-3 h-3 text-[#D4AF37]" />
                      <span>{act.villageName}, Distrik {act.district}</span>
                      <span>•</span>
                      <span>{act.date}</span>
                    </div>
                    <h3 className="font-extrabold text-sm sm:text-base leading-snug line-clamp-2">
                      {act.title}
                    </h3>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-4 space-y-3">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 text-xs space-y-1">
                    <span className="font-bold text-slate-700 block">Hasil Langsung (Output):</span>
                    <p className="text-slate-600 line-clamp-3 leading-relaxed">
                      {act.directResults}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-blue-50/70 border border-blue-100">
                      <span className="text-[10px] text-blue-900 block font-semibold">Total Peserta</span>
                      <strong className="text-blue-950 font-bold">{act.participantsCount} org</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-pink-50/70 border border-pink-100">
                      <span className="text-[10px] text-pink-900 block font-semibold">Perempuan</span>
                      <strong className="text-pink-950 font-bold">{act.participantsDetail.female} org</strong>
                    </div>
                    <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-100">
                      <span className="text-[10px] text-emerald-900 block font-semibold">Pemuda</span>
                      <strong className="text-emerald-950 font-bold">{act.participantsDetail.youth} org</strong>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-500 space-y-0.5 pt-1">
                    <div>Pelaksana: <span className="font-medium text-slate-700">{act.implementer}</span></div>
                    <div>Dokumen: <span className="italic text-slate-600">{act.sourceDocument}</span></div>
                    {act.verifiedBy && (
                      <div className="text-emerald-700 font-medium">Diverifikasi oleh: {act.verifiedBy}</div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="p-4 pt-0 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedActivityDetail(act)}
                  className="flex items-center gap-1 text-xs font-bold text-[#0B1B3D] hover:text-[#D4AF37] transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Lihat Rincian Lengkap</span>
                </button>

                <div className="flex items-center gap-1.5">
                  {/* AI Report Drafting Tool Button */}
                  <button
                    onClick={() => handleGenerateAiReport(act)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#173777]/10 hover:bg-[#173777]/20 text-[#0B1B3D] text-[11px] font-bold border border-[#0B1B3D]/20 transition-colors"
                    title="Buat draf laporan resmi TEKAD dengan bantuan AI"
                  >
                    <Bot className="w-3 h-3 text-[#D4AF37]" />
                    <span>Draf Laporan (AI)</span>
                  </button>

                  {/* Admin Verification Actions */}
                  {currentRole === 'admin' && (
                    <div className="flex items-center gap-1">
                      {act.verificationStatus !== 'diterbitkan' && (
                        <button
                          onClick={() => updateActivityStatus(act.id, 'diterbitkan', currentUser.name)}
                          className="px-2 py-1 bg-emerald-700 text-white rounded text-[11px] font-bold hover:bg-emerald-800"
                        >
                          Terbitkan
                        </button>
                      )}
                      {act.verificationStatus === 'menunggu_verifikasi' && (
                        <button
                          onClick={() => updateActivityStatus(act.id, 'disetujui', currentUser.name)}
                          className="px-2 py-1 bg-blue-700 text-white rounded text-[11px] font-bold hover:bg-blue-800"
                        >
                          Setujui
                        </button>
                      )}
                      <button
                        onClick={() => deleteActivity(act.id)}
                        className="p-1 text-rose-600 hover:bg-rose-50 rounded"
                        title="Hapus data"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: Input Kegiatan Baru */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-extrabold text-lg text-[#0B1B3D]">
                  Input Dokumentasi Kegiatan TEKAD Baru
                </h3>
                <p className="text-xs text-slate-500">
                  Formulir terstandarisasi untuk fasilitator dan kader kampung Kabupaten Jayapura.
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateActivity} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <label className="font-bold text-slate-700 block mb-1">Nama Kegiatan *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pelatihan Uji Coba Pengolahan Sagu Higienis"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0B1B3D] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pilih Kampung *</label>
                  <select
                    value={formData.villageId}
                    onChange={(e) => setFormData({ ...formData, villageId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-[#0B1B3D] outline-none"
                  >
                    {villages.map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.name} (Distrik {v.district})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kategori Kegiatan *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-[#0B1B3D] outline-none"
                  >
                    <option value="Pelatihan">Pelatihan</option>
                    <option value="Pendampingan Teknis">Pendampingan Teknis</option>
                    <option value="Fasilitasi Akses Pasar">Fasilitasi Akses Pasar</option>
                    <option value="Penguatan BUMDes">Penguatan BUMDes</option>
                    <option value="Rembuk Ekonomi Kampung">Rembuk Ekonomi Kampung</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tanggal Pelaksanaan *</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0B1B3D] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tempat / Lokasi</label>
                  <input
                    type="text"
                    placeholder="Contoh: Balai Kampung / Sanggar Adat"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0B1B3D] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pelaksana / Fasilitator *</label>
                  <input
                    type="text"
                    required
                    value={formData.implementer}
                    onChange={(e) => setFormData({ ...formData, implementer: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0B1B3D] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Foto Dokumentasi (URL Foto)</label>
                  <input
                    type="text"
                    value={formData.photoUrl}
                    onChange={(e) => setFormData({ ...formData, photoUrl: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0B1B3D] outline-none"
                  />
                </div>
              </div>

              {/* Participants */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-700 block mb-2">Jumlah Peserta & Inklusi:</span>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-slate-600 block mb-1">Laki-laki</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.maleParticipants}
                      onChange={(e) => setFormData({ ...formData, maleParticipants: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1">Perempuan</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.femaleParticipants}
                      onChange={(e) => setFormData({ ...formData, femaleParticipants: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg bg-white"
                    />
                  </div>
                  <div>
                    <label className="text-slate-600 block mb-1">Unsur Pemuda</label>
                    <input
                      type="number"
                      min="0"
                      value={formData.youthParticipants}
                      onChange={(e) => setFormData({ ...formData, youthParticipants: Number(e.target.value) })}
                      className="w-full px-3 py-2 border rounded-lg bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Tujuan Kegiatan *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Jelaskan tujuan spesifik pelaksanaan kegiatan..."
                  value={formData.objectives}
                  onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0B1B3D] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Hasil Langsung (Output Riil) *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="Apa hasil konkrit yang dicapai peserta pada hari itu..."
                    value={formData.directResults}
                    onChange={(e) => setFormData({ ...formData, directResults: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0B1B3D] outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kendala Lapangan</label>
                  <textarea
                    rows={2}
                    placeholder="Kendala cuaca, bahan, atau partisipasi..."
                    value={formData.obstacles}
                    onChange={(e) => setFormData({ ...formData, obstacles: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0B1B3D] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Rencana Tindak Lanjut</label>
                <input
                  type="text"
                  placeholder="Langkah berikutnya yang akan dilakukan fasilitator..."
                  value={formData.nextActionSteps}
                  onChange={(e) => setFormData({ ...formData, nextActionSteps: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[#0B1B3D] outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 font-bold hover:bg-slate-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#0B1B3D] text-[#D4AF37] font-bold hover:bg-[#173777]"
                >
                  <Send className="w-4 h-4" />
                  <span>Simpan & Ajukan Verifikasi</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Detail Kegiatan Lengkap */}
      {selectedActivityDetail && !isAiReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#0B1B3D] text-[#D4AF37] uppercase">
                  {selectedActivityDetail.category}
                </span>
                <h3 className="font-extrabold text-lg text-[#0B1B3D] mt-1">
                  {selectedActivityDetail.title}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedActivityDetail.villageName}, Distrik {selectedActivityDetail.district} • {selectedActivityDetail.date}
                </p>
              </div>
              <button
                onClick={() => setSelectedActivityDetail(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-900">
                <Image
                  src={selectedActivityDetail.photos[0] || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80'}
                  alt={selectedActivityDetail.title}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div>
                <strong className="text-slate-900 block mb-0.5">Tujuan:</strong>
                <p className="bg-slate-50 p-2.5 rounded-lg border">{selectedActivityDetail.objectives}</p>
              </div>

              <div>
                <strong className="text-slate-900 block mb-0.5">Hasil Langsung (Output):</strong>
                <p className="bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200 text-emerald-950">
                  {selectedActivityDetail.directResults}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <strong className="text-slate-900 block mb-0.5">Kendala Lapangan:</strong>
                  <p className="bg-rose-50/60 p-2.5 rounded-lg border border-rose-200 text-rose-950">
                    {selectedActivityDetail.obstacles || 'Tidak ada kendala berarti.'}
                  </p>
                </div>
                <div>
                  <strong className="text-slate-900 block mb-0.5">Rencana Tindak Lanjut:</strong>
                  <p className="bg-blue-50/60 p-2.5 rounded-lg border border-blue-200 text-blue-950">
                    {selectedActivityDetail.nextActionSteps || 'Fasilitasi monitoring berkala.'}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <span>Dokumen Sumber: <strong>{selectedActivityDetail.sourceDocument}</strong></span>
                <span className="font-semibold text-emerald-700">Status: {selectedActivityDetail.verificationStatus}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <button
                onClick={() => handleGenerateAiReport(selectedActivityDetail)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0B1B3D] text-[#D4AF37] text-xs font-bold hover:bg-[#173777]"
              >
                <Bot className="w-4 h-4" />
                <span>Susun Draf Laporan dengan AI</span>
              </button>
              <button
                onClick={() => setSelectedActivityDetail(null)}
                className="px-4 py-2 rounded-lg border text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: AI Report Generator Preview */}
      {isAiReportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-[#D4AF37]" />
                <div>
                  <h3 className="font-extrabold text-lg text-[#0B1B3D]">
                    Draf Laporan Resmi Kegiatan TEKAD
                  </h3>
                  <p className="text-xs text-slate-500">
                    Dihasilkan secara otomatis oleh model AI berdasar data kegiatan terverifikasi.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAiReportModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isGeneratingReport ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-10 h-10 border-4 border-[#0B1B3D] border-t-[#D4AF37] rounded-full animate-spin mx-auto"></div>
                <p className="text-xs font-bold text-slate-600">
                  Model AI sedang menyusun sistematika laporan dinas Kemendesa...
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 max-h-[60vh] overflow-y-auto font-mono text-xs whitespace-pre-wrap leading-relaxed text-slate-800">
                  {aiReportDraft}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs text-slate-500">
                    Format siap salin atau dicetak untuk lampiran evaluasi dinas.
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(aiReportDraft);
                        alert('Teks draf laporan telah disalin ke clipboard!');
                      }}
                      className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-300"
                    >
                      Salin Teks Laporan
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 rounded-lg bg-[#0B1B3D] hover:bg-[#173777] text-[#D4AF37] text-xs font-bold"
                    >
                      Cetak Laporan (PDF)
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
