import type { Metadata } from "next";
import { MessageCircle, MapPin, Zap, UserCheck, Code2, Headset, Send } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/SocialIcons";
import PageHero from "@/components/PageHero";
import FeatureStrip, { type Feature } from "@/components/FeatureStrip";
import OrderForm from "@/components/OrderForm";
import ContactArt from "@/components/art/ContactArt";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "تواصل مع فريق ZAWAN — واتساب، انستغرام، فيسبوك. نرد على كل استفسار خلال 24 ساعة.",
};

const channels = [
  { Icon: MessageCircle, label: "واتساب", value: "0777 865 0640", href: "https://wa.me/9647778650640", color: "#22c55e", ltr: true },
  { Icon: InstagramIcon, label: "انستغرام", value: "@zawan.dev", href: "https://instagram.com/zawan.dev", color: "#e879f9", ltr: true },
  { Icon: FacebookIcon, label: "فيسبوك", value: "zawan.dev", href: "https://facebook.com/zawan.dev", color: "#3b82f6", ltr: true },
  { Icon: MapPin, label: "الموقع", value: "كربلاء، العراق", color: "#a855f7" },
];

const promises: Feature[] = [
  { Icon: Zap, title: "استجابة سريعة", desc: "رد خلال 24 ساعة في أيام العمل.", color: "#f59e0b" },
  { Icon: UserCheck, title: "استشارة مخصصة", desc: "نستمع لاحتياجاتك ونقدم أفضل التوصيات.", color: "#00d4ff" },
  { Icon: Code2, title: "حلول احترافية", desc: "تقنيات حديثة وحلول مصممة بدقة.", color: "#a855f7" },
  { Icon: Headset, title: "دعم مستمر", desc: "نرافقك حتى ما بعد إطلاق المشروع.", color: "#22c55e" },
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        badge="تواصل معنا"
        titleTop="نحن هنا"
        titleBottom="لمساعدتك"
        lead="أرسل لنا تفاصيل مشروعك أو استفساراتك وسنقوم بالرد عليك بأسرع وقت ممكن. فريقنا مستعد لتحويل فكرتك إلى حل رقمي متكامل."
        art={<ContactArt />}
      />

      <section className="mx-auto mt-6 grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:px-8">
        {/* form */}
        <div className="panel rounded-2xl p-6 sm:p-8">
          <h2 className="mb-7 flex items-center gap-2.5 text-lg font-bold">
            <Send size={19} className="text-[#c084fc]" />
            أرسل رسالة
          </h2>
          <OrderForm kind="contact" />
        </div>

        {/* channels */}
        <div className="panel flex flex-col gap-3 rounded-2xl p-6 sm:p-8">
          <h2 className="mb-3 flex items-center gap-2.5 text-lg font-bold">
            <MessageCircle size={19} className="text-[#c084fc]" />
            معلومات التواصل
          </h2>

          {channels.map(({ Icon, label, value, href, color, ltr }) => {
            const inner = (
              <>
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                  style={{ background: `${color}1f`, border: `1px solid ${color}44` }}
                >
                  <Icon size={19} style={{ color }} />
                </span>
                <span className="flex-1 text-right">
                  <span className="block text-[13px] font-bold" style={{ color }}>
                    {label}
                  </span>
                  <span className="mt-0.5 block text-sm text-[#e2e8f0]" dir={ltr ? "ltr" : undefined}>
                    {value}
                  </span>
                </span>
              </>
            );

            const cls =
              "flex items-center gap-3.5 rounded-xl border border-[#8b5cf6]/15 bg-white/[0.03] px-4 py-3.5 transition-colors";

            return href ? (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cls} hover:border-[#8b5cf6]/50`}
              >
                {inner}
              </a>
            ) : (
              <div key={label} className={cls}>
                {inner}
              </div>
            );
          })}

          <div className="mt-2 flex items-start gap-3.5 rounded-xl border border-[#f59e0b]/25 bg-[#f59e0b]/[0.08] px-4 py-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#f59e0b]/40 bg-[#f59e0b]/15">
              <Zap size={19} className="text-[#f59e0b]" />
            </span>
            <span>
              <span className="block text-[13px] font-bold text-[#f59e0b]">رد سريع</span>
              <span className="mt-1 block text-[12.5px] leading-6 text-[--color-muted]">
                نلتزم بالرد على جميع الاستفسارات خلال 24 ساعة في أيام العمل.
              </span>
            </span>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <FeatureStrip items={promises} />
      </div>
    </main>
  );
}
