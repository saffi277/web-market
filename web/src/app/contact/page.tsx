import type { Metadata } from "next";
import { MessageCircle, MapPin } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/SocialIcons";
import OrderForm from "@/components/OrderForm";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصل مع فريق ZAWAN — واتساب، انستغرام، فيسبوك. نرد خلال 24 ساعة.",
};

const channels = [
  {
    Icon: MessageCircle,
    label: "واتساب",
    value: "0777 865 0640",
    href: "https://wa.me/9647778650640",
    color: "#22c55e",
  },
  {
    Icon: InstagramIcon,
    label: "انستغرام",
    value: "@zawan.dev",
    href: "https://instagram.com/zawan.dev",
    color: "#e879f9",
  },
  {
    Icon: FacebookIcon,
    label: "فيسبوك",
    value: "zawan.dev",
    href: "https://facebook.com/zawan.dev",
    color: "#3b82f6",
  },
];

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="mx-auto max-w-xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/25 bg-[#8b5cf6]/10 px-4 py-1.5 text-sm font-semibold text-[#a78bfa]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" />
          تواصل معنا
        </div>
        <h1 className="text-[clamp(1.8rem,5vw,2.8rem)] font-black leading-tight">
          نحن هنا <span className="text-gradient">لمساعدتك</span>
        </h1>
        <p className="mt-4 text-[--color-muted]">
          أرسل لنا تفاصيل مشروعك وسنتواصل معك خلال 24 ساعة
        </p>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
        <div className="card-surface rounded-3xl p-6 sm:p-8">
          <h2 className="mb-6 text-xl font-bold">أرسل رسالة</h2>
          <OrderForm kind="contact" />
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-bold">معلومات التواصل</h2>
            <p className="mt-2 text-sm leading-7 text-[--color-muted]">
              نحن متاحون للرد على استفساراتك وتقديم أفضل الحلول لعملك
            </p>
          </div>

          {channels.map(({ Icon, label, value, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="card-surface flex items-center gap-4 rounded-2xl px-5 py-4 transition-colors hover:border-[#8b5cf6]/45"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{ background: `${color}1a`, border: `1px solid ${color}33` }}
              >
                <Icon size={20} style={{ color }} />
              </span>
              <span>
                <span className="block text-xs font-semibold text-[#8b5cf6]">{label}</span>
                <span className="mt-0.5 block text-sm text-[#e2e8f0]" dir="ltr">
                  {value}
                </span>
              </span>
            </a>
          ))}

          <div className="card-surface flex items-center gap-4 rounded-2xl px-5 py-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#8b5cf6]/25 bg-[#8b5cf6]/10">
              <MapPin size={20} className="text-[#a855f7]" />
            </span>
            <span>
              <span className="block text-xs font-semibold text-[#8b5cf6]">الموقع</span>
              <span className="mt-0.5 block text-sm text-[#e2e8f0]">العراق</span>
            </span>
          </div>

          <div className="rounded-2xl border border-[#8b5cf6]/20 bg-gradient-to-br from-[#8b5cf6]/10 to-transparent p-6">
            <div className="text-3xl">⚡</div>
            <h3 className="mt-3 font-bold">رد سريع</h3>
            <p className="mt-2 text-sm leading-7 text-[--color-muted]">
              نلتزم بالرد على جميع الاستفسارات خلال{" "}
              <strong className="text-[#a78bfa]">24 ساعة</strong> في أيام العمل
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
