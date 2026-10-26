'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useTekad } from '@/lib/context/TekadContext';
import {
  Bot,
  Send,
  Sparkles,
  ShieldCheck,
  FileText,
  User,
  RefreshCw,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export default function AiAssistantView() {
  const { currentRole, currentUser } = useTekad();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `### 📌 Fakta Terdokumentasi
Halo! Saya adalah **Asisten AI TEKAD Kabupaten Jayapura**, sistem tanya jawab cerdas resmi Program Transformasi Ekonomi Kampung Terpadu (TEKAD) Kementerian Desa, PDTT.

Saya dirancang untuk memberikan informasi yang **100% berakar pada dokumen resmi** yang tersimpan dalam basis data TEKAD Kabupaten Jayapura (Distrik Ebungfauw & Distrik Nimbokrang).

Peran akses Anda saat ini: **${currentRole.toUpperCase()}** (${currentUser.agency}).

*Sitasi: Basis Data Terverifikasi TEKAD Kabupaten Jayapura TA 2025/2026.*

### 💡 Interpretasi Konteks
Anda dapat bertanya mengenai potensi ekonomi kampung (Abar, Berab, Nembukrang Sari, Benyom Jaya 1), komoditas unggulan, kelompok usaha/BUMDes, kegiatan pendampingan, hingga studi praktik baik.

### 🎯 Rekomendasi TEKAD
Silakan pilih pertanyaan contoh di bawah ini atau ketikkan pertanyaan spesifik Anda di kolom percakapan.`,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdCounter = useRef(1);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sampleQuestions = [
    'Apa potensi ekonomi utama dan tantangan di Kampung Abar?',
    'Bagaimana bukti hasil praktik baik fermentasi kakao di Kampung Berab?',
    'Berapa jumlah kegiatan TEKAD yang sudah diterbitkan di Distrik Nimbokrang?',
    'Bagaimana peran BUMDes Sari Makmur Bersama dalam rantai pasok beras?',
    'Apa kendala kelompok wanita tani di Kampung Benyom Jaya 1?',
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || isLoading) return;

    const currentCount = ++messageIdCounter.current;
    const timeStr = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    const userMsg: ChatMessage = {
      id: `user_${currentCount}`,
      sender: 'user',
      text: query,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      // Map history for API
      const conversationHistory = messages.map((m) => ({
        role: m.sender,
        content: m.text,
      }));

      const res = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          userRole: currentRole,
          conversationHistory,
        }),
      });

      const data = await res.json();

      const replyText =
        data.reply ||
        'Maaf, terjadi kendala saat memproses jawaban dari basis data dokumen TEKAD.';

      const botMsg: ChatMessage = {
        id: `bot_${++messageIdCounter.current}`,
        sender: 'assistant',
        text: replyText,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (e: any) {
      const errorMsg: ChatMessage = {
        id: `bot_err_${++messageIdCounter.current}`,
        sender: 'assistant',
        text: `### 📌 Fakta Terdokumentasi
Informasi terkait kendala teknis: Sistem gagal menghubungi server AI (${e?.message || 'Koneksi terputus'}).

### 💡 Interpretasi Konteks
Permintaan Anda tidak dapat diselesaikan saat ini karena gangguan komunikasi data.

### 🎯 Rekomendasi TEKAD
Harap muat ulang halaman atau coba beberapa saat lagi.`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              ASISTEN INTELIGENSI DOKUMEN RESMI
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1B3D] flex items-center gap-2.5">
            <Bot className="w-8 h-8 text-[#D4AF37]" />
            <span>Asisten AI TEKAD Jayapura</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Menjawab berdasarkan dokumen dan data resmi terverifikasi. Tidak membuat angka palsu atau klaim keberhasilan tanpa sumber.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700">
            <span>Hak Akses Pengetahuan: <strong className="text-[#0B1B3D]">{currentRole.toUpperCase()}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden flex flex-col h-[700px]">
        {/* Integrity Rule Banner */}
        <div className="bg-[#0B1B3D] px-6 py-2.5 text-xs text-slate-200 flex items-center justify-between border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            <span>
              <strong>Prinsip Jawaban Faktual:</strong> Menyertakan sitasi nama dokumen, tanggal/periode, dan memisahkan Fakta, Interpretasi, serta Rekomendasi.
            </span>
          </div>
          <button
            onClick={() =>
              setMessages([
                {
                  id: 'welcome_reset',
                  sender: 'assistant',
                  text: 'Percakapan telah direset. Silakan ajukan pertanyaan baru mengenai data TEKAD Kabupaten Jayapura.',
                  timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
                },
              ])
            }
            className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white"
            title="Reset Percakapan"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Chat</span>
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-50/50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-4xl ${
                  isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                    isUser
                      ? 'bg-[#173777] text-white'
                      : 'bg-[#0B1B3D] text-[#D4AF37] border border-[#D4AF37]/40 shadow-sm'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div className={`space-y-1 ${isUser ? 'items-end text-right' : 'text-left'}`}>
                  <div className="text-[10px] text-slate-400 font-semibold px-1">
                    {isUser ? currentUser.name : 'Asisten AI TEKAD'} • {msg.timestamp}
                  </div>

                  <div
                    className={`rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-[#0B1B3D] text-white rounded-tr-none'
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none whitespace-pre-wrap'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-3 max-w-2xl mr-auto">
              <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center bg-[#0B1B3D] text-[#D4AF37] border border-[#D4AF37]/40">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white rounded-2xl rounded-tl-none p-4 border border-slate-200 text-xs text-slate-600 flex items-center gap-2 shadow-sm">
                <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-[#0B1B3D] animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-2 h-2 rounded-full bg-[#173777] animate-bounce [animation-delay:0.4s]"></div>
                <span>Mencocokkan pertanyaan dengan dokumen terverifikasi TEKAD...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompt Chips */}
        <div className="p-3 bg-white border-t border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Contoh Pertanyaan Faktual:
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                disabled={isLoading}
                className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 text-left transition-colors whitespace-nowrap"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Box */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="flex items-end gap-2">
            <textarea
              rows={2}
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tanyakan mengenai data kampung, kegiatan, komoditas, atau praktik baik (Tekan Enter untuk kirim)..."
              disabled={isLoading}
              className="flex-1 p-3 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#0B1B3D] focus:border-transparent outline-none resize-none"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputPrompt.trim() || isLoading}
              className={`p-3 rounded-xl font-bold transition-all shrink-0 ${
                !inputPrompt.trim() || isLoading
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-[#0B1B3D] text-[#D4AF37] hover:bg-[#173777] shadow-md shadow-[#0B1B3D]/20'
              }`}
              title="Kirim Pertanyaan"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 text-[10px] text-slate-400 text-center">
            Asisten AI TEKAD terikat pada aturan kebenaran data: hanya menjawab fakta yang tercatat dalam berkas dokumen Kabupaten Jayapura.
          </div>
        </div>
      </div>
    </div>
  );
}
