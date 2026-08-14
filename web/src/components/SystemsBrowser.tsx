"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Category, System } from "@/lib/types";
import SystemCard from "./SystemCard";

/** Categories beyond this count collapse behind a "المزيد" toggle. */
const VISIBLE_TABS = 4;

export default function SystemsBrowser({
  systems,
  categories,
}: {
  systems: System[];
  categories: Category[];
}) {
  const list = Array.isArray(systems) ? systems : [];
  const cats = Array.isArray(categories) ? categories : [];

  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return list.filter((s) => {
      const byCat = active === "all" || s.categorySlug === active;
      const byText =
        !q ||
        s.nameAr.toLowerCase().includes(q) ||
        s.nameEn.toLowerCase().includes(q) ||
        s.descAr.toLowerCase().includes(q);
      return byCat && byText;
    });
  }, [list, active, query]);

  const tabs = [{ slug: "all", nameAr: "الكل" }, ...cats];
  const shown = expanded ? tabs : tabs.slice(0, VISIBLE_TABS);
  const hidden = tabs.length - VISIBLE_TABS;

  return (
    <>
      <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 lg:flex-row">
        {/* search */}
        <div className="relative w-full max-w-xs">
          <Search
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6b6480]"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ابحث عن نظام..."
            aria-label="ابحث عن نظام"
            className="w-full rounded-xl border border-[#8b5cf6]/20 bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-[#8b5cf6]/60"
          />
        </div>

        {/* category chips */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {shown.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setActive(c.slug)}
              aria-pressed={active === c.slug}
              className={`rounded-lg px-4 py-2 text-[13px] font-semibold transition-colors ${
                active === c.slug
                  ? "bg-gradient-to-l from-[#7c3cff] to-[#c13cff] text-white shadow-[0_8px_24px_rgba(124,60,255,0.35)]"
                  : "border border-[#8b5cf6]/18 bg-white/[0.03] text-[--color-muted] hover:text-white"
              }`}
            >
              {c.nameAr}
            </button>
          ))}
          {hidden > 0 && (
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="rounded-lg border border-[#8b5cf6]/18 bg-white/[0.03] px-4 py-2 text-[13px] font-semibold text-[--color-muted] hover:text-white"
            >
              {expanded ? "أقل" : `المزيد (${hidden})`}
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-[#6b6480]">
          {list.length === 0
            ? "تعذّر تحميل الأنظمة — تأكّد أن الخادم يعمل."
            : "لا توجد أنظمة تطابق بحثك"}
        </p>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {filtered.map((s, i) => (
            <SystemCard key={s.id} system={s} index={i} />
          ))}
        </div>
      )}
    </>
  );
}
