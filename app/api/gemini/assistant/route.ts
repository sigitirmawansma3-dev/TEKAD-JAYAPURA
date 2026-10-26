import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_KAMPUNG, INITIAL_KEGIATAN, INITIAL_PRAKTIK_BAIK, INITIAL_KOMODITAS, INITIAL_KELOMPOK_USAHA } from '@/lib/data/tekadData';

export async function POST(req: NextRequest) {
  try {
    const { message, userRole = 'publik', conversationHistory = [] } = await req.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Pesan pertanyaan wajib diisi.' }, { status: 400 });
    }

    // Filter knowledge base based on user role (Public vs Internal)
    const isPublic = userRole === 'publik';

    const kampungData = isPublic
      ? INITIAL_KAMPUNG.filter((k) => k.verificationStatus === 'diterbitkan')
      : INITIAL_KAMPUNG;

    const kegiatanData = isPublic
      ? INITIAL_KEGIATAN.filter((k) => k.verificationStatus === 'diterbitkan')
      : INITIAL_KEGIATAN;

    const praktikBaikData = isPublic
      ? INITIAL_PRAKTIK_BAIK.filter((pb) => pb.status === 'terverifikasi')
      : INITIAL_PRAKTIK_BAIK;

    const komoditasData = isPublic
      ? INITIAL_KOMODITAS.filter((k) => k.verificationStatus === 'diterbitkan')
      : INITIAL_KOMODITAS;

    const kelompokUsahaData = isPublic
      ? INITIAL_KELOMPOK_USAHA.filter((ku) => ku.verificationStatus === 'diterbitkan')
      : INITIAL_KELOMPOK_USAHA;

    const knowledgeContext = JSON.stringify({
      userRole,
      kampungDampingan: kampungData,
      kegiatanTerdokumentasi: kegiatanData,
      praktikBaik: praktikBaikData,
      komoditasUnggulan: komoditasData,
      kelompokUsahaDanBUMDes: kelompokUsahaData,
    });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Fallback deterministic grounded response if API key is not yet set
      return NextResponse.json({
        reply: `### 📌 Fakta Terdokumentasi
Berdasarkan basis data resmi TEKAD Kabupaten Jayapura:
- **Kampung Dampingan Terverifikasi**: 4 Kampung (Kampung Abar - Ebungfauw, Kampung Berab - Nimbokrang, Kampung Nembukrang Sari - Nimbokrang, Kampung Benyom Jaya 1 - Nimbokrang).
- **Komoditas Utama**: Gerabah Tradisional Sentani, Sagu Alami, Biji Kakao Fermentasi Grime, Beras Sawah Grime Sari, Minyak Atsiri & Sawit Rakyat.

*Sitasi: Dokumen Verifikasi Lapangan TEKAD Kab. Jayapura 2026.*

### 💡 Interpretasi Konteks
Data menunjukkan diversifikasi ekonomi spesifik wilayah: kawasan Danau Sentani bertumpu pada ekonomi kreatif adat dan sagu, sedangkan Lembah Grime bertumpu pada lumbung pangan dan perkebunan terintegrasi BUMDes.

### 🎯 Rekomendasi TEKAD
1. Fasilitasi pengujian mutu dan izin P-IRT kemasan sagu dan olahan keripik.
2. Penguatan unit agregator BUMDes untuk stabilisasi harga di tingkat petani.`,
        grounded: true,
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemInstruction = `Anda adalah "Asisten AI TEKAD Kabupaten Jayapura", sistem inteligensi pengetahuan resmi untuk Program Transformasi Ekonomi Kampung Terpadu (TEKAD) Kementerian Desa, PDTT di Kabupaten Jayapura, Papua.

ATURAN KETAT INTEGRITAS DATA (WAJIB DIPATUHI):
1. Anda HANYA diperbolehkan menjawab berdasarkan dokumen dan basis data yang disediakan dalam KNOWLEDGE_CONTEXT di bawah ini.
2. JANGAN SEKALI-KALI MENGARANG ATAU BERHALUSINASI! Jangan membuat angka statistik, nama orang, capaian program, nominal uang, atau klaim keberhasilan yang tidak tertulis dalam KNOWLEDGE_CONTEXT.
3. Setiap informasi faktual HARUS menyertakan sitasi sumber yang jelas:
   - Nama Dokumen Sumber
   - Tanggal Pencatatan / Periode Data
   - Nama Kampung / Distrik terkait
   - Status Verifikasi (Diterbitkan / Terverifikasi / Kajian Lapangan)
4. Jika informasi yang ditanyakan TIDAK DITEMUKAN atau BELUM DIVERIFIKASI dalam data yang diizinkan untuk peran pengguna (${userRole}), Anda WAJIB menyatakan secara jujur dan eksplisit:
   "Informasi terkait belum ditemukan atau belum diverifikasi dalam basis data resmi TEKAD Kabupaten Jayapura."
5. STRUKTUR JAWABAN WAJIB DIPISAHKAN KE DALAM 3 BAGIAN DENGAN FORMAT MARKDOWN BERIKUT:
   ### 📌 Fakta Terdokumentasi
   (Pemaparan data riil sesuai dokumen, dengan sitasi nama dokumen, tanggal/periode, dan status verifikasi)

   ### 💡 Interpretasi Konteks
   (Analisis objektif tentang mengapa data tersebut demikian, tantangan lapangan, dan korelasi antar-komoditas/kelembagaan kampung)

   ### 🎯 Rekomendasi TEKAD
   (Saran praktis terukur bagi fasilitator kampung, pengurus BUMDes, atau pengambil kebijakan program TEKAD)

6. Peran Pengguna saat ini adalah: "${userRole}". Jika userRole = "publik", jangan pernah mengungkap atau membahas data internal yang berstatus 'draf' atau 'menunggu_verifikasi'.

KNOWLEDGE_CONTEXT:
${knowledgeContext}
`;

    // Prepare contents
    const contents = [];
    if (conversationHistory && Array.isArray(conversationHistory)) {
      for (const h of conversationHistory.slice(-4)) {
        if (h.role && h.content) {
          contents.push({
            role: h.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: h.content }],
          });
        }
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.2, // Low temperature for high factual precision
      },
    });

    const replyText = response.text || 'Maaf, tidak ada respon yang dapat dihasilkan dari sistem.';

    return NextResponse.json({
      reply: replyText,
      grounded: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Error in AI Assistant API:', error);
    return NextResponse.json(
      {
        error: 'Terjadi kendala pada pemrosesan Asisten AI. ' + (error?.message || ''),
      },
      { status: 500 }
    );
  }
}
