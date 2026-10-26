'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Kampung,
  Kegiatan,
  PraktikBaik,
  Komoditas,
  KelompokUsaha,
  UserRole,
  UserProfile,
  VerificationStatus,
} from '../types';
import {
  INITIAL_KAMPUNG,
  INITIAL_KEGIATAN,
  INITIAL_PRAKTIK_BAIK,
  INITIAL_KOMODITAS,
  INITIAL_KELOMPOK_USAHA,
  INITIAL_USERS,
} from '../data/tekadData';

interface TekadContextType {
  currentRole: UserRole;
  currentUser: UserProfile;
  setRole: (role: UserRole) => void;
  activeView: string;
  setActiveView: (view: string) => void;
  
  // Data entities
  villages: Kampung[];
  activities: Kegiatan[];
  bestPractices: PraktikBaik[];
  commodities: Komoditas[];
  businessGroups: KelompokUsaha[];

  // Mutations
  addActivity: (activity: Omit<Kegiatan, 'id' | 'recordingDate'>) => void;
  updateActivity: (id: string, updated: Partial<Kegiatan>) => void;
  updateActivityStatus: (id: string, status: VerificationStatus, reviewerName?: string) => void;
  deleteActivity: (id: string) => void;
  
  addBestPractice: (bp: Omit<PraktikBaik, 'id'>) => void;
  updateBestPractice: (id: string, updated: Partial<PraktikBaik>) => void;

  updateVillage: (id: string, updated: Partial<Kampung>) => void;

  resetToDefaultData: () => void;
  exportToCsv: (type: 'kegiatan' | 'kampung' | 'bumdes' | 'komoditas') => void;
}

const TekadContext = createContext<TekadContextType | undefined>(undefined);

export function TekadProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tekad_role');
      if (saved && ['publik', 'fasilitator', 'admin', 'pimpinan'].includes(saved)) {
        return saved as UserRole;
      }
    }
    return 'publik';
  });

  const [activeView, setActiveView] = useState<string>('beranda');

  const [villages, setVillages] = useState<Kampung[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tekad_villages');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.warn(e);
        }
      }
    }
    return INITIAL_KAMPUNG;
  });

  const [activities, setActivities] = useState<Kegiatan[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tekad_activities');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.warn(e);
        }
      }
    }
    return INITIAL_KEGIATAN;
  });

  const [bestPractices, setBestPractices] = useState<PraktikBaik[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tekad_bp');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.warn(e);
        }
      }
    }
    return INITIAL_PRAKTIK_BAIK;
  });

  const [commodities, setCommodities] = useState<Komoditas[]>(INITIAL_KOMODITAS);
  const [businessGroups, setBusinessGroups] = useState<KelompokUsaha[]>(INITIAL_KELOMPOK_USAHA);

  // Save to localStorage on change
  const saveActivities = (data: Kegiatan[]) => {
    setActivities(data);
    try {
      localStorage.setItem('tekad_activities', JSON.stringify(data));
    } catch (e) {
      console.warn(e);
    }
  };

  const saveVillages = (data: Kampung[]) => {
    setVillages(data);
    try {
      localStorage.setItem('tekad_villages', JSON.stringify(data));
    } catch (e) {
      console.warn(e);
    }
  };

  const saveBestPractices = (data: PraktikBaik[]) => {
    setBestPractices(data);
    try {
      localStorage.setItem('tekad_bp', JSON.stringify(data));
    } catch (e) {
      console.warn(e);
    }
  };

  const setRole = (role: UserRole) => {
    setCurrentRole(role);
    try {
      localStorage.setItem('tekad_role', role);
    } catch (e) {
      console.warn(e);
    }
  };

  const currentUser = INITIAL_USERS.find((u) => u.role === currentRole) || INITIAL_USERS[0];

  const addActivity = (activity: Omit<Kegiatan, 'id' | 'recordingDate'>) => {
    const newAct: Kegiatan = {
      ...activity,
      id: `keg_${Date.now()}`,
      recordingDate: new Date().toISOString().split('T')[0],
      verificationStatus: currentRole === 'admin' ? 'diterbitkan' : 'menunggu_verifikasi',
      sourceDocument: `Dokumen Lapang Fasilitator Reg. ${Math.floor(100 + Math.random() * 900)}/2026`,
    };
    saveActivities([newAct, ...activities]);
  };

  const updateActivity = (id: string, updated: Partial<Kegiatan>) => {
    const next = activities.map((act) => (act.id === id ? { ...act, ...updated } : act));
    saveActivities(next);
  };

  const updateActivityStatus = (id: string, status: VerificationStatus, reviewerName?: string) => {
    const next = activities.map((act) => {
      if (act.id === id) {
        return {
          ...act,
          verificationStatus: status,
          verifiedBy: reviewerName || currentUser.name,
          verifiedAt: `${new Date().toISOString().split('T')[0]} ${new Date().toLocaleTimeString('id-ID')} WIT`,
        };
      }
      return act;
    });
    saveActivities(next);
  };

  const deleteActivity = (id: string) => {
    saveActivities(activities.filter((act) => act.id !== id));
  };

  const addBestPractice = (bp: Omit<PraktikBaik, 'id'>) => {
    const newBP: PraktikBaik = {
      ...bp,
      id: `pb_${Date.now()}`,
    };
    saveBestPractices([newBP, ...bestPractices]);
  };

  const updateBestPractice = (id: string, updated: Partial<PraktikBaik>) => {
    const next = bestPractices.map((bp) => (bp.id === id ? { ...bp, ...updated } : bp));
    saveBestPractices(next);
  };

  const updateVillage = (id: string, updated: Partial<Kampung>) => {
    const next = villages.map((v) => (v.id === id ? { ...v, ...updated } : v));
    saveVillages(next);
  };

  const resetToDefaultData = () => {
    setVillages(INITIAL_KAMPUNG);
    setActivities(INITIAL_KEGIATAN);
    setBestPractices(INITIAL_PRAKTIK_BAIK);
    setCommodities(INITIAL_KOMODITAS);
    setBusinessGroups(INITIAL_KELOMPOK_USAHA);
    try {
      localStorage.removeItem('tekad_activities');
      localStorage.removeItem('tekad_villages');
      localStorage.removeItem('tekad_bp');
    } catch (e) {
      console.warn(e);
    }
  };

  const exportToCsv = (type: 'kegiatan' | 'kampung' | 'bumdes' | 'komoditas') => {
    let filename = `TEKAD_Jayapura_${type}_${new Date().toISOString().split('T')[0]}.csv`;
    let csvContent = '\uFEFF'; // UTF-8 BOM for Microsoft Excel

    if (type === 'kegiatan') {
      const headers = ['ID', 'Nama Kegiatan', 'Kampung', 'Distrik', 'Tanggal', 'Kategori', 'Pelaksana', 'Peserta L', 'Peserta P', 'Peserta Pemuda', 'Total Peserta', 'Status Verifikasi', 'Dokumen Sumber'];
      const rows = activities.map((k) => [
        `"${k.id}"`,
        `"${k.title.replace(/"/g, '""')}"`,
        `"${k.villageName}"`,
        `"${k.district}"`,
        `"${k.date}"`,
        `"${k.category}"`,
        `"${k.implementer.replace(/"/g, '""')}"`,
        k.participantsDetail?.male || 0,
        k.participantsDetail?.female || 0,
        k.participantsDetail?.youth || 0,
        k.participantsCount,
        `"${k.verificationStatus}"`,
        `"${k.sourceDocument}"`,
      ]);
      csvContent += [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    } else if (type === 'kampung') {
      const headers = ['ID', 'Nama Kampung', 'Distrik', 'Kepala Kampung', 'Jumlah Penduduk', 'Jumlah KK', 'BUMDes', 'Status BUMDes', 'Komoditas Utama', 'Status Verifikasi'];
      const rows = villages.map((v) => [
        `"${v.id}"`,
        `"${v.name}"`,
        `"${v.district}"`,
        `"${v.headOfVillage}"`,
        v.population,
        v.households,
        `"${v.bumdesName}"`,
        `"${v.bumdesStatus}"`,
        `"${v.mainCommodities.join('; ')}"`,
        `"${v.verificationStatus}"`,
      ]);
      csvContent += [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    } else if (type === 'bumdes') {
      const headers = ['ID', 'Nama Organisasi', 'Tipe', 'Kampung', 'Distrik', 'Tahun Berdiri', 'Anggota Total', 'Anggota Perempuan', 'Status Hukum', 'Omset Tahunan', 'Status Rekening Bank'];
      const rows = businessGroups.map((b) => [
        `"${b.id}"`,
        `"${b.name}"`,
        `"${b.type}"`,
        `"${b.villageName}"`,
        `"${b.district}"`,
        b.yearEstablished,
        b.membersCount,
        b.femaleMembersCount,
        `"${b.legalStatus}"`,
        `"${b.currentTurnover.replace(/"/g, '""')}"`,
        `"${b.bankAccountStatus}"`,
      ]);
      csvContent += [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    } else if (type === 'komoditas') {
      const headers = ['ID', 'Nama Komoditas', 'Kategori', 'Kampung Penghasil', 'Kapasitas Produksi', 'Kisaran Harga', 'Siklus Musim', 'Status Verifikasi'];
      const rows = commodities.map((c) => [
        `"${c.id}"`,
        `"${c.name}"`,
        `"${c.category}"`,
        `"${c.primaryVillages.join('; ')}"`,
        `"${c.productionCapacity.replace(/"/g, '""')}"`,
        `"${c.priceRange.replace(/"/g, '""')}"`,
        `"${c.seasonalCycle.replace(/"/g, '""')}"`,
        `"${c.verificationStatus}"`,
      ]);
      csvContent += [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    }

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <TekadContext.Provider
      value={{
        currentRole,
        currentUser,
        setRole,
        activeView,
        setActiveView,
        villages,
        activities,
        bestPractices,
        commodities,
        businessGroups,
        addActivity,
        updateActivity,
        updateActivityStatus,
        deleteActivity,
        addBestPractice,
        updateBestPractice,
        updateVillage,
        resetToDefaultData,
        exportToCsv,
      }}
    >
      {children}
    </TekadContext.Provider>
  );
}

export function useTekad() {
  const context = useContext(TekadContext);
  if (!context) {
    throw new Error('useTekad must be used within a TekadProvider');
  }
  return context;
}
