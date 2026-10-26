import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const activityData = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      // Deterministic fallback draft
      return NextResponse.json({
        reportMarkdown: `# LAPORAN PELAKSANAAN KEGIATAN
## PROGRAM TRANSFORMASI EKONOMI KAMPUNG TERPADU (TEKAD)
### KABUPATEN JAYAPURA, PROVINSI PAPUA

---

**1. Identitas Kegiatan**
- **Nama Kegiatan**: ${activityData.title || 'Pendampingan Ekonomi Kampung'}
- **Kampung / Distrik**: ${activityData.villageName || 'Kampung Dampingan'}, Distrik ${activityData.district || 'Jayapura'}
- **Tanggal Pelaksanaan**: ${activityData.date || new Date().toISOString().split('T')[0]}
- **Lokasi**: ${activityData.location || 'Balai Kampung'}
- **Pelaksana / Fasilitator**: ${activityData.implementer || 'Fasilitator TEKAD'}

**2. Tujuan Kegiatan**
${activityData.objectives || 'Mendorong penguatan kapasitas ekonomi kelompok masyarakat.'}

**3. Partisipasi & Inklusi Peserta**
- Total Peserta: ${activityData.participantsCount || 0} orang
- Rincian: Laki-laki ${activityData.participantsDetail?.male || 0} orang, Perempuan ${activityData.participantsDetail?.female || 0} orang, Pemuda ${activityData.participantsDetail?.youth || 0} orang.

**4. Hasil Langsung Kegiatan (Output)**
${activityData.directResults || 'Kegiatan berjalan sesuai rencana dan menghasilkan komitmen awal kelompok.'}

**5. Perkembangan Lanjutan (Outcome Awal)**
${activityData.followUpProgress || 'Pemantauan tindak lanjut dilakukan bersama pengurus kelompok.'}

**6. Kendala Lapangan & Mitigasi**
${activityData.obstacles || 'Tidak terdapat kendala berarti selama kegiatan.'}

**7. Rencana Tindak Lanjut (Next Steps)**
${activityData.nextActionSteps || 'Fasilitasi pertemuan kelompok rutin pada siklus berikutnya.'}

---
*Draf ini disusun secara otomatis oleh Asisten AI TEKAD berdasarkan input fasilitator lapangan. Harap diverifikasi oleh Admin DPMK Kabupaten Jayapura.*`,
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

    const prompt = `Anda adalah Asisten Penyusun Laporan Resmi Program Transformasi Ekonomi Kampung Terpadu (TEKAD) Kementerian Desa PDTT di Kabupaten Jayapura, Papua.

Tugas Anda: Susunlah sebuah DRAF LAPORAN RESMI PELAKSANAAN KEGIATAN TEKAD yang rapi, profesional, birokratis-formal, komprehensif, dan siap cetak berdasarkan data mentah kegiatan berikut:

DATA INPUT FASILITATOR:
- Nama Kegiatan: ${activityData.title}
- Kampung & Distrik: ${activityData.villageName}, Distrik ${activityData.district}
- Tanggal Pelaksanaan: ${activityData.date}
- Tempat/Lokasi: ${activityData.location}
- Pelaksana: ${activityData.implementer}
- Kategori Kegiatan: ${activityData.category}
- Tujuan: ${activityData.objectives}
- Jumlah Peserta: ${activityData.participantsCount} orang (Laki-laki: ${activityData.participantsDetail?.male || 0}, Perempuan: ${activityData.participantsDetail?.female || 0}, Pemuda: ${activityData.participantsDetail?.youth || 0})
- Hasil Langsung: ${activityData.directResults}
- Perkembangan Lanjutan: ${activityData.followUpProgress}
- Kendala Lapangan: ${activityData.obstacles}
- Tindak Lanjut: ${activityData.nextActionSteps}
- Dokumen Sumber: ${activityData.sourceDocument || 'Catatan Lapang Fasilitator'}

PETUNJUK PENYUSUNAN:
1. Gunakan bahasa Indonesia baku kedinasan Kemendesa PDTT.
2. Jangan mengarang data angka tambahan; kembangkan kalimat secara naratif profesional tanpa melebih-lebihkan atau menambah klaim yang tidak berdasar.
3. Susun dalam format Markdown dengan struktur:
   # KOP SURAT / JUDUL RESMI LAPORAN KEGIATAN TEKAD KABUPATEN JAYAPURA
   I. LATAR BELAKANG & DASAR HUKUM
   II. MAKSUD DAN TUJUAN
   III. WAKTU, TEMPAT DAN PELAKSANA
   IV. PROFIL PESERTA & INKLUSI GENDER/PEMUDA
   V. PROSES DAN DINAMIKA KEGIATAN
   VI. HASIL KEGIATAN (OUTPUT RIIL)
   VII. KENDALA DAN UPAYA PENYELESAIAN
   VIII. KESIMPULAN DAN REKOMENDASI TINDAK LANJUT
   IX. PENGESAHAN LAPORAN (Kolom tanda tangan Fasilitator dan Admin DPMK)
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        temperature: 0.3,
      },
    });

    return NextResponse.json({
      reportMarkdown: response.text || 'Gagal menghasilkan draf laporan.',
    });
  } catch (error: any) {
    console.error('Error in Report Draft API:', error);
    return NextResponse.json(
      { error: 'Gagal membuat draf laporan kegiatan: ' + (error?.message || '') },
      { status: 500 }
    );
  }
}
