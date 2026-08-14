import Link from "next/link";
import { MessageSquare, CalendarCheck } from "lucide-react";
import CubesArt from "@/components/art/CubesArt";

export default function CtaBand({
  title = "لم تجد النظام الذي تحتاجه؟",
  desc = "نقوم بتطوير أنظمة برمجية متكاملة مصممة خصيصاً لاحتياجاتك وأهداف عملك.",
  primary = { href: "/contact", label: "تواصل معنا الآن" },
  secondary = { href: "/contact", label: "احجز استشارة مجانية" },
}: {
  title?: string;
  desc?: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="panel relative flex items-center justify-center overflow-hidden rounded-2xl px-6 py-10">
        {/* corner art — decorative only */}
        <CubesArt className="pointer-events-none absolute -right-4 bottom-0 hidden h-full w-40 opacity-70 lg:block" />
        <CubesArt className="pointer-events-none absolute -left-4 bottom-0 hidden h-full w-40 -scale-x-100 opacity-70 lg:block" />

        <div className="relative text-center">
          <h2 className="text-[clamp(1.3rem,2.8vw,1.9rem)] font-black">{title}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[--color-muted]">{desc}</p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={primary.href}
              className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-l from-[#7c3cff] to-[#c13cff] px-7 py-3 text-sm font-extrabold shadow-[0_14px_38px_rgba(124,60,255,0.4)] transition-transform hover:scale-[1.03]"
            >
              <MessageSquare size={16} />
              {primary.label}
            </Link>
            <Link
              href={secondary.href}
              className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-[#8b5cf6]/40 bg-white/[0.03] px-7 py-3 text-sm font-extrabold transition-colors hover:border-[#8b5cf6]/80"
            >
              <CalendarCheck size={16} className="text-[#c084fc]" />
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
