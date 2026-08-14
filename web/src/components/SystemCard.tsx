import Link from "next/link";
import { Check } from "lucide-react";
import type { System } from "@/lib/types";

/** Fallback accents so a catalogue with no badge colours still reads as varied. */
const accents = ["#e879f9", "#00d4ff", "#38bdf8", "#22c55e", "#f59e0b", "#a855f7"];

export default function SystemCard({ system, index = 0 }: { system: System; index?: number }) {
  const accent = system.badgeColor ?? accents[index % accents.length];

  return (
    <article
      className="panel group relative flex h-full flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1.5"
      style={{ borderColor: `${accent}2b` }}
    >
      {/* accent wash on hover */}
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(120% 80% at 50% 0%, ${accent}1a, transparent 70%)` }}
      />

      {system.badge && (
        <span
          className="absolute left-5 top-5 rounded-full border px-2.5 py-1 text-[11px] font-bold"
          style={{ color: accent, borderColor: `${accent}55`, background: `${accent}1f` }}
        >
          {system.badge}
        </span>
      )}

      <div className="relative">
        <span
          className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
          style={{ background: `${accent}1a`, border: `1px solid ${accent}3d`, boxShadow: `0 0 26px ${accent}26` }}
        >
          {system.icon}
        </span>

        <h3 className="mt-5 text-lg font-bold">{system.nameAr}</h3>
        <p className="mt-2.5 text-sm leading-7 text-[--color-muted]">{system.descAr}</p>

        {system.features.length > 0 && (
          <ul className="mt-5 grid gap-2">
            {system.features.slice(0, 4).map((f) => (
              <li key={f} className="flex items-center gap-2 text-[12.5px] leading-6 text-[#cfc9dd]">
                <Check size={13} className="shrink-0" style={{ color: accent }} />
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="relative mt-auto pt-6">
        <p className="text-sm font-bold" style={{ color: accent }}>
          {system.priceUsd ? (
            <>
              ابتداءً من ${system.priceUsd}
              <span className="font-medium text-[--color-muted]"> / سنوياً</span>
            </>
          ) : (
            "التسعير حسب الطلب"
          )}
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <Link
            href={`/systems/${system.slug}`}
            className="rounded-xl px-4 py-2.5 text-center text-[13px] font-bold text-white transition-transform hover:scale-[1.03]"
            style={{ background: `linear-gradient(135deg, ${accent}, ${accent}b3)` }}
          >
            عرض التفاصيل
          </Link>
          <Link
            href={system.demoEnabled ? `/demo/${system.slug}` : `/contact?system=${system.slug}`}
            className="rounded-xl border px-4 py-2.5 text-center text-[13px] font-bold transition-colors"
            style={{ borderColor: `${accent}4d`, color: accent }}
          >
            طلب تجربة
          </Link>
        </div>
      </div>
    </article>
  );
}
