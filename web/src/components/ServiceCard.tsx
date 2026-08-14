import Link from "next/link";
import type { LucideIcon } from "lucide-react";

export type Service = {
  Icon: LucideIcon;
  titleAr: string;
  titleEn: string;
  desc: string;
  tags: string[];
  color: string;
  badge?: string;
};

export default function ServiceCard({ service }: { service: Service }) {
  const { Icon, titleAr, titleEn, desc, tags, color, badge } = service;

  return (
    <article
      className="panel group relative flex h-full flex-col rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1.5"
      style={{ borderColor: `${color}2b` }}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(120% 80% at 50% 0%, ${color}1a, transparent 70%)` }}
      />

      {badge && (
        <span
          className="absolute left-5 top-5 rounded-full border px-2.5 py-1 text-[11px] font-bold"
          style={{ color, borderColor: `${color}55`, background: `${color}1f` }}
        >
          {badge}
        </span>
      )}

      <div className="relative flex flex-1 flex-col items-center">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ background: `${color}18`, border: `1px solid ${color}3d`, boxShadow: `0 0 26px ${color}26` }}
        >
          <Icon size={24} style={{ color }} />
        </span>

        <h3 className="mt-5 text-[17px] font-bold">{titleAr}</h3>
        <p className="mt-1 text-[11.5px] font-medium tracking-wide" dir="ltr" style={{ color }}>
          {titleEn}
        </p>
        <p className="mt-3 flex-1 text-[13px] leading-7 text-[--color-muted]">{desc}</p>

        <ul className="mt-5 flex flex-wrap justify-center gap-2">
          {tags.map((t) => (
            <li
              key={t}
              className="rounded-lg px-2.5 py-1 text-[11px]"
              style={{ background: `${color}14`, border: `1px solid ${color}2e`, color }}
              dir="auto"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/contact"
        className="relative mt-6 text-[13px] font-bold transition-opacity hover:opacity-75"
        style={{ color }}
      >
        استكشف الخدمة ←
      </Link>
    </article>
  );
}
