import Link from "next/link";
import type { System } from "@/lib/types";

export default function SystemCard({ system }: { system: System }) {
  return (
    <article className="card-surface group relative flex flex-col rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-[#8b5cf6]/50 hover:shadow-[0_20px_60px_rgba(139,92,246,0.15)]">
      {system.badge && (
        <span
          className="absolute left-5 top-5 rounded-full border px-2.5 py-1 text-[11px] font-bold"
          style={{
            color: system.badgeColor ?? "#a855f7",
            borderColor: `${system.badgeColor ?? "#a855f7"}55`,
            background: `${system.badgeColor ?? "#a855f7"}1f`,
          }}
        >
          {system.badge}
        </span>
      )}

      <div className="mb-4 text-4xl">{system.icon}</div>

      <h3 className="text-lg font-bold">{system.nameAr}</h3>
      <p className="mt-1 text-xs font-medium text-[#8b5cf6]" dir="ltr">
        {system.nameEn}
      </p>
      <p className="mt-3 line-clamp-3 text-sm leading-7 text-[--color-muted]">{system.descAr}</p>

      {system.features.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {system.features.slice(0, 4).map((f) => (
            <li
              key={f}
              className="rounded-lg border border-[#8b5cf6]/20 bg-[#8b5cf6]/10 px-2.5 py-1 text-[11px] text-[#c4b5fd]"
            >
              {f}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex items-center justify-between gap-3 pt-2">
        <span className="font-bold text-[#c084fc]">
          {system.priceUsd ? `ابتداءً من $${system.priceUsd}` : "حسب الطلب"}
        </span>
        <div className="flex gap-2">
          {system.demoEnabled && (
            <Link
              href={`/demo/${system.slug}`}
              className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-300 transition-colors hover:bg-emerald-500/20"
            >
              جرّبه
            </Link>
          )}
          <Link
            href={`/systems/${system.slug}`}
            className="rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] px-4 py-2 text-xs font-bold transition-transform hover:scale-105"
          >
            التفاصيل
          </Link>
        </div>
      </div>
    </article>
  );
}
