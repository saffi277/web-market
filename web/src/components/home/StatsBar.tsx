"use client";

import { useEffect, useRef, useState } from "react";
import { SlidersHorizontal, Headset, TrendingUp, Smile, CheckCircle2, Users, Smartphone, RefreshCw } from "lucide-react";

type Stat = {
  Icon: typeof Users;
  /** Numeric stats animate; text-only stats just render `label`. */
  to?: number;
  prefix?: string;
  suffix?: string;
  title: string;
  label: string;
};

const stats: Stat[] = [
  { Icon: SlidersHorizontal, title: "أنظمة قابلة للتخصيص", label: "نظم تتكيف مع طبيعة عملك" },
  { Icon: Headset, title: "دعم فني احترافي", label: "فريق متخصص لخدمتكم" },
  { Icon: TrendingUp, to: 48, prefix: "+", suffix: "%", title: "", label: "نمو الأعمال" },
  { Icon: Smile, to: 98, prefix: "+", suffix: "%", title: "", label: "رضا العملاء" },
  { Icon: CheckCircle2, to: 120, prefix: "+", suffix: "", title: "", label: "مشروع مكتمل" },
  { Icon: Users, to: 350, prefix: "+", suffix: "", title: "", label: "عميل نشط" },
  { Icon: Smartphone, title: "تعمل على الويب والموبايل", label: "تجربة سلسة في كل الأجهزة" },
  { Icon: RefreshCw, title: "تحديثات مستمرة", label: "نطوّر باستمرار لتواكب احتياجاتك" },
];

/** Counts from 0 to `to` once the element scrolls into view. */
function useCountUp(to: number | undefined, start: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (to === undefined || !start) return;
    const duration = 1200;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      // ease-out cubic
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, start]);
  return n;
}

function StatItem({ stat, start }: { stat: Stat; start: boolean }) {
  const n = useCountUp(stat.to, start);
  const numeric = stat.to !== undefined;

  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#8b5cf6]/25 bg-[#8b5cf6]/10">
        <stat.Icon size={18} className="text-[#c084fc]" />
      </span>
      <span className="text-right">
        {numeric ? (
          <>
            <span className="block text-lg font-black leading-tight text-[#00d4ff]">
              {stat.prefix}
              {n}
              {stat.suffix}
            </span>
            <span className="block text-[11px] leading-tight text-[--color-muted]">{stat.label}</span>
          </>
        ) : (
          <>
            <span className="block text-[13px] font-bold leading-tight">{stat.title}</span>
            <span className="block text-[11px] leading-tight text-[--color-muted]">{stat.label}</span>
          </>
        )}
      </span>
    </div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [seen]);

  return (
    <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="panel grid grid-cols-2 gap-x-2 divide-y divide-white/5 rounded-2xl sm:grid-cols-3 sm:divide-y-0 lg:grid-cols-4 xl:grid-cols-8 xl:divide-x xl:divide-white/5">
        {stats.map((s) => (
          <StatItem key={s.label + s.title} stat={s} start={seen} />
        ))}
      </div>
    </div>
  );
}
