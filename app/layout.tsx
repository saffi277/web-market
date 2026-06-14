import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ZAWAN | أنظمة برمجية متكاملة',
  description: 'نقدم أنظمة برمجية متكاملة تلبي احتياجات عملك وتساعدك على النمو والتوسع بثقة',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
