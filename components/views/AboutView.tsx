'use client';

import React from 'react';
import { Building2, ShieldCheck, Users, Mail, Phone, MapPin, Award, CheckCircle2 } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="space-y-8 pb-16">
      {/* Title */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37]"></span>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            TENTANG PROGRAM TEKAD
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D]">
          Transformasi Ekonomi Kampung Terpadu (TEKAD)
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
          Program kemitraan strategis Kementerian Desa, Pembangunan Daerah Tertinggal, dan Transmigrasi (Kemendesa PDTT) Republik Indonesia bersama Pemerintah Kabupaten Jayapura yang didukung oleh International Fund for Agricultural Development (IFAD).
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm">
          <h2 className="text-lg font-bold text-[#0B1B3D] flex items-center gap-2">
            <Award className="w-5 h-5 text-[#D4AF37]" />
            <span>Tujuan Utama Program di Kabupaten Jayapura</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Mendorong pemberdayaan masyarakat kampung berbasis komoditas lokal unggulan, memperkuat kapasitas BUMDes sebagai agregator usaha, meningkatkan peran aktif perempuan dan pemuda dalam rantai nilai ekonomi, serta melestarikan kearifan sumber daya alam adat Danau Sentani dan Lembah Grime.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-3 shadow-sm">
          <h2 className="text-lg font-bold text-[#0B1B3D] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Prinsip Integritas Portal Pengetahuan</span>
          </h2>
          <ul className="text-xs sm:text-sm text-slate-700 space-y-2 list-disc list-inside">
            <li>Seluruh data kegiatan dan profil kampung diverifikasi oleh admin DPMK.</li>
            <li>Tidak menggunakan angka statistik manipulatif tanpa dokumen pendukung.</li>
            <li>Asisten AI menjawab berdasar dokumen legal dan menolak halusinasi data.</li>
          </ul>
        </div>
      </div>

      {/* Secretariat Contact */}
      <div className="bg-[#0B1B3D] text-white rounded-2xl p-6 sm:p-8 border border-[#D4AF37]/30 shadow-lg space-y-4">
        <h3 className="font-extrabold text-lg text-[#D4AF37]">
          Sekretariat Program TEKAD Kabupaten Jayapura
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-200">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white">Alamat Kantor:</strong>
              <span>Kompleks Kantor Bupati Jayapura, Gunung Merah, Sentani, Papua</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Phone className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white">Layanan Informasi:</strong>
              <span>DPMK Kabupaten Jayapura / Tim Teknis TEKAD</span>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Mail className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-white">Koordinasi Digital:</strong>
              <span>tekad.jayapura@kemendesa.go.id</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
