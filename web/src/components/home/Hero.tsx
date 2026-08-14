import Link from "next/link";
import { LayoutGrid, Code2, TrendingUp, Smile, ShieldCheck } from "lucide-react";
import DashboardArt from "./DashboardArt";

const badges = [
  { Icon: TrendingUp, value: "+48%", label: "نمو المبيعات", color: "#00d4ff", pos: "top-[10%] left-0", delay: "0s" },
  { Icon: Smile, value: "98%", label: "رضا العملاء", color: "#a855f7", pos: "top-[42%] -left-1", delay: "1.2s" },
  { Icon: ShieldCheck, value: "أمان", label: "وموثوقية", color: "#22c55e", pos: "top-[74%] left-2", delay: "2.4s" },
];

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-10 pt-8 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8 lg:pb-16 lg:pt-14">
      {/* Copy */}
      <div className="animate-rise order-2 text-center lg:order-1 lg:text-right">
        <h1 className="text-[clamp(2rem,5.6vw,3.9rem)] font-black leading-[1.18] tracking-tight">
          أنظمة تبهر السوق.
          <br />
          <span className="text-gradient">حلول تُظهر قوة عملك.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-9 text-[#c9c3d8] lg:mx-0 lg:text-[1.06rem]">
          نصمم ونطوّر أنظمة برمجية متقدمة تساعد الشركات على النمو، أتمتة العمليات، ورفع
          الكفاءة لتحقيق نجاح مستدام.
        </p>

        <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:justify-center lg:justify-start">
          <Link
            href="/systems"
            className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-l from-[#7c3cff] to-[#c13cff] px-7 py-3.5 font-extrabold shadow-[0_16px_44px_rgba(124,60,255,0.4)] transition-transform hover:scale-[1.03]"
          >
            <LayoutGrid size={18} />
            استكشف الأنظمة
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 rounded-xl border border-[#8b5cf6]/40 bg-white/[0.03] px-7 py-3.5 font-extrabold transition-colors hover:border-[#8b5cf6]/80 hover:bg-white/[0.06]"
          >
            <Code2 size={18} className="text-[#c084fc]" />
            اطلب نظاماً مخصصاً
          </Link>
        </div>
      </div>

      {/* Art + floating badges */}
      <div className="relative order-1 lg:order-2">
        <DashboardArt />

        {badges.map(({ Icon, value, label, color, pos, delay }) => (
          <div
            key={label}
            className={`animate-float absolute ${pos} panel hidden items-center gap-2.5 rounded-2xl px-3.5 py-2.5 xl:flex`}
            style={{ animationDelay: delay }}
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
              style={{ background: `${color}1f`, border: `1px solid ${color}44` }}
            >
              <Icon size={17} style={{ color }} />
            </span>
            <span className="text-right">
              <span className="block text-sm font-black leading-tight" style={{ color }}>
                {value}
              </span>
              <span className="block text-[11px] leading-tight text-[--color-muted]">{label}</span>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
