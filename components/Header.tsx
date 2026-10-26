'use client';

import React, { useState } from 'react';
import { useTekad } from '@/lib/context/TekadContext';
import { UserRole } from '@/lib/types';
import {
  Building2,
  MapPin,
  Calendar,
  Sparkles,
  BookOpen,
  PieChart,
  Layers,
  Bot,
  Info,
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  UserCheck,
  Database,
  ExternalLink,
} from 'lucide-react';

export default function Header() {
  const { currentRole, currentUser, setRole, activeView, setActiveView } = useTekad();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Building2 },
    { id: 'kampung', label: 'Profil Kampung', icon: MapPin },
    { id: 'kegiatan', label: 'Kegiatan TEKAD', icon: Calendar },
    { id: 'praktik-baik', label: 'Praktik Baik', icon: BookOpen },
    { id: 'komoditas', label: 'Komoditas', icon: Layers },
    { id: 'kelompok-usaha', label: 'Kelompok & BUMDes', icon: Building2 },
    { id: 'peta', label: 'Peta Sebaran', icon: MapPin },
    { id: 'dashboard', label: 'Dashboard', icon: PieChart },
    { id: 'ai-asisten', label: 'Asisten AI', icon: Bot, isAi: true },
    { id: 'tentang', label: 'Tentang Kami', icon: Info },
  ];

  const roleConfigs: Record<
    UserRole,
    { label: string; badgeBg: string; badgeText: string; desc: string }
  > = {
    publik: {
      label: 'Pengunjung Publik',
      badgeBg: 'bg-blue-900/40 text-blue-200 border-blue-400/30',
      badgeText: 'Akses Data Publik Terverifikasi',
      desc: 'Hanya melihat dokumen dan kegiatan yang sudah berstatus "Diterbitkan".',
    },
    fasilitator: {
      label: 'Fasilitator Kampung',
      badgeBg: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40',
      badgeText: 'Fasilitator Lapangan TEKAD',
      desc: 'Dapat menginput & mengedit kegiatan, menyusun draf laporan dengan AI, dan mengajukan verifikasi.',
    },
    admin: {
      label: 'Admin Program Jayapura',
      badgeBg: 'bg-amber-950/60 text-amber-300 border-amber-500/40',
      badgeText: 'Admin DPMK Jayapura',
      desc: 'Akses penuh mengaudit, memverifikasi, menyetujui, dan menerbitkan data se-kabupaten.',
    },
    pimpinan: {
      label: 'Pimpinan & Evaluator',
      badgeBg: 'bg-purple-950/60 text-purple-300 border-purple-500/40',
      badgeText: 'Bappeda / Monev TEKAD',
      desc: 'Akses dashboard analitik eksekutif, indikator outcome/dampak, serta ekspor laporan.',
    },
  };

  const handleSelectRole = (r: UserRole) => {
    setRole(r);
    setRoleDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0B1B3D] border-b border-[#D4AF37]/30 shadow-xl transition-all">
      {/* Top Banner / Gov Identity Bar */}
      <div className="bg-[#07132B] px-4 py-1.5 border-b border-white/10 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
          <span className="font-semibold text-white tracking-wide">
            KEMENTERIAN DESA, PDTT
          </span>
          <span className="text-slate-400 hidden sm:inline">•</span>
          <span className="text-slate-300 hidden sm:inline">
            Pemerintah Kabupaten Jayapura, Provinsi Papua
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-slate-400 text-[11px] hidden md:inline">
            Program Transformasi Ekonomi Kampung Terpadu (TEKAD)
          </span>
          {/* Quick Role Switcher Trigger in Top Bar */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-medium transition-all ${roleConfigs[currentRole].badgeBg}`}
              title="Klik untuk simulasi peran pengguna"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Peran: <strong className="font-bold underline decoration-[#D4AF37]">{roleConfigs[currentRole].label}</strong></span>
              <ChevronDown className="w-3 h-3 opacity-80" />
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-[#0F2654] border border-[#D4AF37]/40 shadow-2xl p-2 z-50 text-white">
                <div className="px-3 py-2 border-b border-white/10 text-xs font-semibold text-[#D4AF37] flex items-center justify-between">
                  <span>PILIH HAK AKSES PENGGUNA</span>
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div className="py-1 space-y-1">
                  {(Object.keys(roleConfigs) as UserRole[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => handleSelectRole(r)}
                      className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors flex flex-col gap-0.5 ${
                        currentRole === r
                          ? 'bg-[#173777] border border-[#D4AF37]/50'
                          : 'hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between font-semibold">
                        <span className={currentRole === r ? 'text-[#D4AF37]' : 'text-slate-100'}>
                          {roleConfigs[r].label}
                        </span>
                        {currentRole === r && (
                          <span className="text-[10px] bg-[#D4AF37] text-slate-950 font-bold px-1.5 py-0.2 rounded">
                            AKTIF
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-300">{roleConfigs[r].desc}</span>
                    </button>
                  ))}
                </div>
                <div className="px-3 py-1.5 border-t border-white/10 text-[10px] text-slate-400">
                  Login saat ini: <strong>{currentUser.name}</strong> ({currentUser.agency})
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Portal Identity */}
          <button
            onClick={() => setActiveView('beranda')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#173777] via-[#0B1B3D] to-[#D4AF37]/60 p-0.5 shadow-md flex items-center justify-center border border-[#D4AF37]/50 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#0B1B3D] rounded-[10px] flex items-center justify-center font-black text-[#D4AF37] text-lg tracking-wider">
                TKD
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-white font-extrabold text-base sm:text-lg tracking-tight group-hover:text-[#D4AF37] transition-colors">
                  TEKAD DIGITAL HUB
                </span>
                <span className="bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide uppercase">
                  Kab. Jayapura
                </span>
              </div>
              <p className="text-xs text-slate-300 hidden sm:block">
                Pusat Informasi & Pengetahuan Ekonomi Kampung Berbasis AI
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-slate-950 font-bold shadow-md shadow-[#D4AF37]/20 scale-105'
                      : item.isAi
                      ? 'text-[#D4AF37] bg-white/5 hover:bg-white/10 border border-[#D4AF37]/40 font-semibold'
                      : 'text-slate-200 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.isAi && !isActive ? 'text-[#D4AF37] animate-pulse' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            {/* Direct Admin Console button if not in public role */}
            {currentRole !== 'publik' && (
              <button
                onClick={() => setActiveView('admin-panel')}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                  activeView === 'admin-panel'
                    ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]'
                    : 'bg-[#173777]/80 hover:bg-[#173777] text-amber-200 border-amber-400/40'
                }`}
              >
                <Database className="w-3.5 h-3.5" />
                <span>Panel Kelola Data</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0B1B3D] border-b border-[#D4AF37]/30 px-4 pt-2 pb-6 space-y-2 animate-in fade-in slide-in-from-top-4">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium text-left transition-colors ${
                    isActive
                      ? 'bg-[#D4AF37] text-slate-950 font-bold'
                      : item.isAi
                      ? 'bg-white/10 text-[#D4AF37] font-semibold border border-[#D4AF37]/30'
                      : 'text-slate-200 hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          {currentRole !== 'publik' && (
            <button
              onClick={() => {
                setActiveView('admin-panel');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#173777] text-amber-200 border border-amber-400/30 text-xs font-bold"
            >
              <Database className="w-4 h-4" />
              <span>Buka Panel Kelola & Verifikasi Data</span>
            </button>
          )}

          <div className="pt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Peran Aktif: <strong className="text-white">{roleConfigs[currentRole].label}</strong></span>
            <button
              onClick={() => setRoleDropdownOpen(true)}
              className="text-[#D4AF37] underline text-[11px]"
            >
              Ubah Peran
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
