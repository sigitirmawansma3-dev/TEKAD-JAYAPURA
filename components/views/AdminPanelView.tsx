'use client';

import React, { useState } from 'react';
import { useTekad } from '@/lib/context/TekadContext';
import { UserRole, VerificationStatus, Kegiatan } from '@/lib/types';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  UserCheck,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  Bot,
  RotateCcw,
  Search,
  Upload,
  Download,
  Trash2,
} from 'lucide-react';

export default function AdminPanelView() {
  const {
    currentRole,
    currentUser,
    setRole,
    activities,
    villages,
    bestPractices,
    commodities,
    businessGroups,
    updateActivityStatus,
    deleteActivity,
    resetToDefaultData,
    exportToCsv,
    setActiveView,
  } = useTekad();

  const [activeTab, setActiveTab] = useState<'verifikasi' | 'pengguna' | 'dokumen' | 'reset'>('verifikasi');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchDoc, setSearchDoc] = useState('');

  // Pending verification activities
  const pendingActivities = activities.filter((a) => {
    if (filterStatus === 'all') return true;
    return a.verificationStatus === filterStatus;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              PANEL KENDALI FASILITATOR & ADMIN
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D]">
            Pusat Pengelolaan & Verifikasi Data TEKAD
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Kabupaten Jayapura • Manajemen alur verifikasi (Draf → Menunggu Verifikasi → Disetujui → Diterbitkan).
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="bg-[#0B1B3D] text-[#D4AF37] px-3.5 py-2 rounded-xl font-bold border border-[#D4AF37]/40 shadow-sm">
            Peran Aktif: {currentUser.roleLabel}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 p-2 flex flex-wrap gap-2 text-xs font-bold shadow-sm">
        <button
          onClick={() => setActiveTab('verifikasi')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'verifikasi'
              ? 'bg-[#0B1B3D] text-[#D4AF37]'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Antrean Verifikasi Kegiatan ({activities.filter((a) => a.verificationStatus === 'menunggu_verifikasi').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('pengguna')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'pengguna'
              ? 'bg-[#0B1B3D] text-[#D4AF37]'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Kelola Hak Akses Pengguna</span>
        </button>

        <button
          onClick={() => setActiveTab('dokumen')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ${
            activeTab === 'dokumen'
              ? 'bg-[#0B1B3D] text-[#D4AF37]'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Arsip Dokumen Sumber</span>
        </button>

        <button
          onClick={() => setActiveTab('reset')}
          className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-1.5 ml-auto ${
            activeTab === 'reset'
              ? 'bg-rose-800 text-white'
              : 'text-rose-700 hover:bg-rose-50'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Data Default</span>
        </button>
      </div>

      {/* TAB 1: Antrean Verifikasi Kegiatan */}
      {activeTab === 'verifikasi' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-extrabold text-base text-[#0B1B3D]">
                Daftar Kegiatan Berdasarkan Status Verifikasi
              </h3>
              <p className="text-xs text-slate-500">
                Fasilitator mengajukan kegiatan; Admin Program DPMK melakukan penelaahan dan penerbitan publik.
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-semibold">Filter:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 border rounded-lg bg-white"
              >
                <option value="all">Semua Status ({activities.length})</option>
                <option value="menunggu_verifikasi">
                  Menunggu Verifikasi ({activities.filter((a) => a.verificationStatus === 'menunggu_verifikasi').length})
                </option>
                <option value="disetujui">
                  Disetujui ({activities.filter((a) => a.verificationStatus === 'disetujui').length})
                </option>
                <option value="draf">
                  Draf ({activities.filter((a) => a.verificationStatus === 'draf').length})
                </option>
                <option value="diterbitkan">
                  Diterbitkan ({activities.filter((a) => a.verificationStatus === 'diterbitkan').length})
                </option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-[#0B1B3D] text-white font-bold">
                <tr>
                  <th className="p-3">Nama Kegiatan</th>
                  <th className="p-3">Kampung & Distrik</th>
                  <th className="p-3">Tanggal</th>
                  <th className="p-3">Pelaksana</th>
                  <th className="p-3">Peserta</th>
                  <th className="p-3">Status Saat Ini</th>
                  <th className="p-3 text-right">Aksi Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {pendingActivities.map((act) => (
                  <tr key={act.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-[#0B1B3D] max-w-xs">
                      {act.title}
                    </td>
                    <td className="p-3 text-slate-600">
                      {act.villageName} ({act.district})
                    </td>
                    <td className="p-3 text-slate-600 whitespace-nowrap">{act.date}</td>
                    <td className="p-3 text-slate-600">{act.implementer}</td>
                    <td className="p-3 text-slate-600 font-bold">
                      {act.participantsCount} org ({act.participantsDetail.female} P)
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          act.verificationStatus === 'diterbitkan'
                            ? 'bg-emerald-100 text-emerald-800'
                            : act.verificationStatus === 'disetujui'
                            ? 'bg-blue-100 text-blue-800'
                            : act.verificationStatus === 'menunggu_verifikasi'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {act.verificationStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-1 whitespace-nowrap">
                      {act.verificationStatus !== 'diterbitkan' && (
                        <button
                          onClick={() => updateActivityStatus(act.id, 'diterbitkan', currentUser.name)}
                          className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white rounded font-bold text-[11px]"
                          title="Terbitkan ke publik dan asisten AI"
                        >
                          Terbitkan
                        </button>
                      )}
                      {act.verificationStatus === 'menunggu_verifikasi' && (
                        <button
                          onClick={() => updateActivityStatus(act.id, 'disetujui', currentUser.name)}
                          className="px-2.5 py-1 bg-blue-700 hover:bg-blue-800 text-white rounded font-bold text-[11px]"
                        >
                          Setujui
                        </button>
                      )}
                      <button
                        onClick={() => updateActivityStatus(act.id, 'draf', currentUser.name)}
                        className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-[11px]"
                        title="Kembalikan ke status draf"
                      >
                        Draf
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: Kelola Hak Akses Pengguna */}
      {activeTab === 'pengguna' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div>
            <h3 className="font-extrabold text-base text-[#0B1B3D]">
              Matriks Hak Akses & Peran Pengguna (RBAC)
            </h3>
            <p className="text-xs text-slate-500">
              Konfigurasi pembatasan informasi antara publik, fasilitator lapangan, admin program kabupaten, dan evaluator pimpinan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl border transition-all ${currentRole === 'publik' ? 'border-[#0B1B3D] bg-blue-50/60' : 'bg-slate-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-[#0B1B3D]">1. Pengunjung Publik</span>
                {currentRole === 'publik' && (
                  <span className="text-[10px] bg-blue-900 text-white px-2 py-0.5 rounded font-bold">AKTIF</span>
                )}
              </div>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li>Hanya dapat melihat data berstatus <strong>Diterbitkan</strong>.</li>
                <li>Asisten AI publik tidak dapat mengakses berkas draf internal.</li>
                <li>Tidak memiliki tombol aksi mutasi data.</li>
              </ul>
              <button
                onClick={() => setRole('publik')}
                className="mt-3 text-xs font-bold text-[#0B1B3D] underline"
              >
                Ganti ke Peran Ini
              </button>
            </div>

            <div className={`p-4 rounded-xl border transition-all ${currentRole === 'fasilitator' ? 'border-emerald-600 bg-emerald-50/60' : 'bg-slate-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-emerald-950">2. Fasilitator Kampung</span>
                {currentRole === 'fasilitator' && (
                  <span className="text-[10px] bg-emerald-800 text-white px-2 py-0.5 rounded font-bold">AKTIF</span>
                )}
              </div>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li>Dapat memasukkan dokumentasi kegiatan baru.</li>
                <li>Dapat mengedit catatan tantangan & potensi kampung binaan.</li>
                <li>Memiliki akses ke Asisten AI untuk menyusun draf laporan dinas.</li>
                <li>Mengajukan verifikasi ke Admin DPMK.</li>
              </ul>
              <button
                onClick={() => setRole('fasilitator')}
                className="mt-3 text-xs font-bold text-emerald-800 underline"
              >
                Ganti ke Peran Ini
              </button>
            </div>

            <div className={`p-4 rounded-xl border transition-all ${currentRole === 'admin' ? 'border-amber-600 bg-amber-50/60' : 'bg-slate-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-amber-950">3. Admin Program Kabupaten</span>
                {currentRole === 'admin' && (
                  <span className="text-[10px] bg-amber-800 text-white px-2 py-0.5 rounded font-bold">AKTIF</span>
                )}
              </div>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li>Kewenangan penuh menyetujui dan menerbitkan kegiatan publik.</li>
                <li>Mengelola master data kampung, BUMDes, dan komoditas se-kabupaten.</li>
                <li>Menghapus atau mengembalikan data ke status draf.</li>
              </ul>
              <button
                onClick={() => setRole('admin')}
                className="mt-3 text-xs font-bold text-amber-800 underline"
              >
                Ganti ke Peran Ini
              </button>
            </div>

            <div className={`p-4 rounded-xl border transition-all ${currentRole === 'pimpinan' ? 'border-purple-600 bg-purple-50/60' : 'bg-slate-50'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-purple-950">4. Pimpinan & Evaluator (Bappeda)</span>
                {currentRole === 'pimpinan' && (
                  <span className="text-[10px] bg-purple-800 text-white px-2 py-0.5 rounded font-bold">AKTIF</span>
                )}
              </div>
              <ul className="text-xs text-slate-600 space-y-1 list-disc list-inside">
                <li>Melihat seluruh dashboard indikator aktivitas, output, outcome, dan dampak.</li>
                <li>Mengekspor laporan analitik ke format PDF atau Excel.</li>
                <li>Audit trail berkas dan pengesahan laporan triwulanan.</li>
              </ul>
              <button
                onClick={() => setRole('pimpinan')}
                className="mt-3 text-xs font-bold text-purple-800 underline"
              >
                Ganti ke Peran Ini
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Arsip Dokumen Sumber */}
      {activeTab === 'dokumen' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-base text-[#0B1B3D]">
                Arsip Dokumen Sumber Resmi Terverifikasi
              </h3>
              <p className="text-xs text-slate-500">
                Seluruh klaim dan angka dalam website bersumber dari dokumen yang tercatat di bawah ini.
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            {activities.map((a) => (
              <div
                key={a.id}
                className="p-3 bg-slate-50 rounded-xl border flex items-center justify-between hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[#0B1B3D]" />
                  <div>
                    <strong className="text-slate-800 block">{a.sourceDocument}</strong>
                    <span className="text-[11px] text-slate-500">
                      Terkait: {a.title} • {a.villageName} ({a.date})
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                  Status: {a.verificationStatus}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Reset Data */}
      {activeTab === 'reset' && (
        <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-6 text-xs text-slate-700 space-y-3">
          <h3 className="font-extrabold text-base text-rose-950">
            Reset Basis Data ke Data Standar DPMK
          </h3>
          <p className="leading-relaxed">
            Tindakan ini akan mengembalikan data seluruh kampung (Abar, Berab, Nembukrang Sari, Benyom Jaya 1), kegiatan, praktik baik, komoditas, dan BUMDes ke kondisi data awal terverifikasi. Seluruh input draf baru lokal akan dihapus.
          </p>
          <button
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin mengatur ulang data ke kondisi bawaan awal?')) {
                resetToDefaultData();
                alert('Data berhasil diatur ulang ke kondisi bawaan.');
              }
            }}
            className="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-lg"
          >
            Konfirmasi Reset Data Bawaan
          </button>
        </div>
      )}
    </div>
  );
}
