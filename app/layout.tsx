import type {Metadata} from 'next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'TEKAD Digital Hub Kabupaten Jayapura',
  description: 'Portal informasi dan pengetahuan Program Transformasi Ekonomi Kampung Terpadu (TEKAD) Kabupaten Jayapura, Papua berbasis AI.',
  openGraph: {
    title: 'TEKAD Digital Hub Kabupaten Jayapura',
    description: 'Portal informasi dan pengetahuan Program Transformasi Ekonomi Kampung Terpadu (TEKAD) Kabupaten Jayapura, Papua berbasis AI.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TEKAD Digital Hub Kabupaten Jayapura',
    description: 'Portal informasi dan pengetahuan Program Transformasi Ekonomi Kampung Terpadu (TEKAD) Kabupaten Jayapura, Papua berbasis AI.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
