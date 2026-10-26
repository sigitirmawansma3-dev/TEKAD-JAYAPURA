export type VerificationStatus = 'draf' | 'menunggu_verifikasi' | 'disetujui' | 'diterbitkan';

export type UserRole = 'publik' | 'fasilitator' | 'admin' | 'pimpinan';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  roleLabel: string;
  assignedVillageId?: string;
  agency: string;
}

export interface Kampung {
  id: string;
  name: string;
  district: string; // e.g. Ebungfauw, Nimbokrang
  headOfVillage: string;
  population: number;
  households: number;
  coordinates: { lat: number; lng: number };
  locationDesc: string;
  economicSummary: string;
  mainCommodities: string[];
  establishedGroupsCount: number;
  bumdesName: string;
  bumdesStatus: 'Aktif' | 'Perintisan' | 'Revitalisasi';
  challenges: string[];
  mentoringNeeds: string[];
  imageUrl: string;
  dataPeriod: string;
  recordingDate: string;
  sourceDocument: string;
  verificationStatus: VerificationStatus;
}

export interface Kegiatan {
  id: string;
  title: string;
  villageId: string;
  villageName: string;
  district: string;
  date: string;
  location: string;
  implementer: string;
  category: 'Pelatihan' | 'Pendampingan Teknis' | 'Fasilitasi Akses Pasar' | 'Penguatan BUMDes' | 'Rembuk Ekonomi Kampung';
  objectives: string;
  participantsCount: number;
  participantsDetail: {
    male: number;
    female: number;
    youth: number;
  };
  directResults: string;
  followUpProgress: string;
  obstacles: string;
  nextActionSteps: string;
  photos: string[];
  documents: { name: string; url: string; size: string }[];
  verificationStatus: VerificationStatus;
  dataPeriod: string;
  recordingDate: string;
  sourceDocument: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface PraktikBaik {
  id: string;
  title: string;
  villageId: string;
  villageName: string;
  district: string;
  commodityTags: string[];
  author: string;
  date: string;
  category: 'Peningkatan Nilai Tambah' | 'Manajemen Usaha' | 'Inklusi Perempuan' | 'Rantai Pasok Lokal';
  status: 'terverifikasi' | 'kajian_lapangan';
  
  // 8 required components
  initialProblem: string; // 1. Masalah awal
  intervention: string;   // 2. Intervensi TEKAD
  executionProcess: string; // 3. Proses pelaksanaan
  evidenceResults: string; // 4. Hasil yang didukung bukti
  supportingFactors: string; // 5. Faktor pendukung
  obstacles: string;       // 6. Kendala & mitigasi
  lessonsLearned: string;  // 7. Pelajaran yang diperoleh
  replicationPotential: string; // 8. Peluang penerapan di kampung lain
  
  sourceDocs: string;
  imageUrl: string;
}

export interface Komoditas {
  id: string;
  name: string;
  category: 'Kerajinan' | 'Perkebunan' | 'Pertanian Pangan' | 'Peternakan' | 'Perikanan' | 'Pengolahan Pangan';
  primaryVillages: string[];
  productionCapacity: string;
  seasonalCycle: string;
  marketDestinations: string[];
  priceRange: string;
  description: string;
  imageUrl: string;
  sourceDocument: string;
  dataPeriod: string;
  verificationStatus: VerificationStatus;
}

export interface KelompokUsaha {
  id: string;
  name: string;
  type: 'BUMDes' | 'Kelompok Tani' | 'Kelompok Pengrajin' | 'KWT (Wanita Tani)' | 'Kelompok Ternak' | 'Koperasi';
  villageId: string;
  villageName: string;
  district: string;
  yearEstablished: number;
  membersCount: number;
  femaleMembersCount: number;
  legalStatus: string;
  currentTurnover: string;
  mainProducts: string[];
  leaderName: string;
  bankAccountStatus: 'Sudah Rekening Bank' | 'Dalam Proses' | 'Belum Ada';
  mentoringNeeds: string;
  verificationStatus: VerificationStatus;
  sourceDocument: string;
  dataPeriod: string;
}

export interface AIQueryResponse {
  factualDocumentation: {
    summary: string;
    citations: {
      documentName: string;
      dateOrPeriod: string;
      villageOrDistrict: string;
      status: string;
    }[];
  };
  contextInterpretation: string;
  recommendations: string[];
  confidence: 'Tinggi (Terdokumentasi Penuh)' | 'Menengah (Sebagian Tervalidasi)' | 'Tidak Ditemukan';
}
