'use client';

import React from 'react';
import { TekadProvider, useTekad } from '@/lib/context/TekadContext';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';

import HomeView from '@/components/views/HomeView';
import KampungView from '@/components/views/KampungView';
import KegiatanView from '@/components/views/KegiatanView';
import PraktikBaikView from '@/components/views/PraktikBaikView';
import KomoditasView from '@/components/views/KomoditasView';
import KelompokUsahaView from '@/components/views/KelompokUsahaView';
import PetaView from '@/components/views/PetaView';
import DashboardView from '@/components/views/DashboardView';
import AiAssistantView from '@/components/views/AiAssistantView';
import AboutView from '@/components/views/AboutView';
import AdminPanelView from '@/components/views/AdminPanelView';

function MainContent() {
  const { activeView } = useTekad();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-900">
      <Header />

      {/* Render Hero Section only on Beranda view to maintain focal presence */}
      {activeView === 'beranda' && <Hero />}

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 w-full">
        {activeView === 'beranda' && <HomeView />}
        {activeView === 'kampung' && <KampungView />}
        {activeView === 'kegiatan' && <KegiatanView />}
        {activeView === 'praktik-baik' && <PraktikBaikView />}
        {activeView === 'komoditas' && <KomoditasView />}
        {activeView === 'kelompok-usaha' && <KelompokUsahaView />}
        {activeView === 'peta' && <PetaView />}
        {activeView === 'dashboard' && <DashboardView />}
        {activeView === 'ai-asisten' && <AiAssistantView />}
        {activeView === 'tentang' && <AboutView />}
        {activeView === 'admin-panel' && <AdminPanelView />}
      </main>

      <Footer />
    </div>
  );
}

export default function Page() {
  return (
    <TekadProvider>
      <MainContent />
    </TekadProvider>
  );
}
