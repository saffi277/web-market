import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "ZAWAN | أنظمة برمجية متكاملة",
  description: "من فكرة إلى نظام متكامل - ZAWAN",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Navbar />
        <div style={{ paddingTop: '72px' }}>{children}</div>
      </body>
    </html>
  );
}
