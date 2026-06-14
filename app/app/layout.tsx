import type { Metadata } from 'next';
import { Tajawal, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

const tajawal = Tajawal({
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '700', '800', '900'],
  variable: '--font-tajawal',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ZAWAN | أنظمة برمجية متكاملة',
  description: 'نقدم أنظمة برمجية متكاملة تلبي احتياجات عملك وتساعدك على النمو والتوسع بثقة',
  keywords: 'أنظمة برمجية, تطوير برمجيات, ZAWAN, برمجة',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${tajawal.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-screen" style={{ fontFamily: 'var(--font-tajawal), sans-serif' }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
