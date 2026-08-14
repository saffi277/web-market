"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import type { Category, System } from "@/lib/types";
import SystemCard from "./SystemCard";

export default function SystemsBrowser({
  systems,
  categories,
}: {
  systems: System[];
  categories: Category[];
}) {
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return systems.filter((s) => {
      const byCat = active === "all" || s.categorySlug === active;
      const byText =
        !q ||
        s.nameAr.toLowerCase().includes(q) ||
        s.nameEn.toLowerCase().includes(q) ||
        s.descAr.toLowerCase().includes(q);
      return byCat && byText;
    });
  }, [systems, active, query]);

  const tabs = [{ slug: "all", nameAr: "الكل" }, ...categories];

  return (
    <>
      <div className="relative mx-auto mt-10 max-w-md">
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#64748b]"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث عن نظام..."
          aria-label="ابحث عن نظام"
          className="w-full rounded-xl border border-[#8b5cf6]/20 bg-white/[0.04] py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-[#8b5cf6]/60"
        />
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-2.5">
        {tabs.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setActive(c.slug)}
            aria-pressed={active === c.slug}
            className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${
              active === c.slug
                ? "border-[#8b5cf6] bg-[#8b5cf6] text-white"
                : "border-[#8b5cf6]/15 bg-white/[0.04] text-[--color-muted] hover:text-white"
            }`}
          >
            {c.nameAr}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-[#64748b]">
          {systems.length === 0
            ? "تعذّر تحميل الأنظمة — تأكّد أن الخادم يعمل."
            : "لا توجد أنظمة تطابق بحثك"}
        </p>
      ) : (
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((s) => (
            <SystemCard key={s.id} system={s} />
          ))}
        </div>
      )}
    </>
  );
}
