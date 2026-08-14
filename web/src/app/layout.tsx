import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "ZAWAN | أنظمة برمجية متكاملة",
    template: "%s | ZAWAN",
  },
  description:
    "شركة ZAWAN لتطوير الأنظمة البرمجية — أنظمة نقاط بيع ومحاسبة وموارد بشرية وتجارة إلكترونية، جرّبها قبل الشراء.",
  keywords: ["أنظمة برمجية", "نقاط البيع", "برمجة", "العراق", "ZAWAN"],
  openGraph: {
    title: "ZAWAN | أنظمة برمجية متكاملة",
    description: "أنظمة برمجية جاهزة وقابلة للتخصيص — جرّبها قبل الشراء.",
    locale: "ar_IQ",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#05040b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <Navbar />
        <div className="pt-16 lg:pt-20">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
