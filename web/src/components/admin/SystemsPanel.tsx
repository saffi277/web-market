"use client";

import { useState } from "react";
import { api, ApiError } from "@/lib/api";
import type { Category, System } from "@/lib/types";
import { Field, TextArea } from "@/components/Field";

const emptyDraft = {
  slug: "",
  nameAr: "",
  nameEn: "",
  descAr: "",
  descEn: "",
  categorySlug: "",
  priceUsd: "",
  icon: "📦",
  badge: "",
  badgeColor: "#a855f7",
  features: "",
  demoEnabled: false,
  displayOrder: "0",
  published: true,
};

type Draft = typeof emptyDraft;

function toDraft(s: System): Draft {
  return {
    slug: s.slug,
    nameAr: s.nameAr,
    nameEn: s.nameEn,
    descAr: s.descAr,
    descEn: s.descEn,
    categorySlug: s.categorySlug ?? "",
    priceUsd: s.priceUsd?.toString() ?? "",
    icon: s.icon,
    badge: s.badge ?? "",
    badgeColor: s.badgeColor ?? "#a855f7",
    features: s.features.join("\n"),
    demoEnabled: s.demoEnabled,
    displayOrder: s.displayOrder.toString(),
    published: s.published,
  };
}

export default function SystemsPanel({
  systems,
  categories,
  token,
  onRefresh,
}: {
  systems: System[];
  categories: Category[];
  token: string;
  onRefresh: () => void;
}) {
  const [draft, setDraft] = useState<Draft | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k: keyof Draft) => (v: string) => setDraft((d) => (d ? { ...d, [k]: v } : d));

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!draft) return;
    setBusy(true);
    setError("");

    const body = {
      slug: draft.slug.trim(),
      nameAr: draft.nameAr.trim(),
      nameEn: draft.nameEn.trim(),
      descAr: draft.descAr.trim(),
      descEn: draft.descEn.trim(),
      categorySlug: draft.categorySlug.trim(),
      priceUsd: draft.priceUsd ? Number(draft.priceUsd) : null,
      icon: draft.icon,
      badge: draft.badge.trim() || null,
      badgeColor: draft.badge.trim() ? draft.badgeColor : null,
      features: draft.features
        .split("\n")
        .map((f) => f.trim())
        .filter(Boolean),
      screenshots: [],
      demoEnabled: draft.demoEnabled,
      displayOrder: Number(draft.displayOrder) || 0,
      published: draft.published,
    };

    try {
      if (editingId) {
        await api(`/admin/systems/${editingId}`, { method: "PUT", body, token });
      } else {
        await api("/admin/systems", { method: "POST", body, token });
      }
      setDraft(null);
      setEditingId(null);
      onRefresh();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "تعذّر الحفظ");
    } finally {
      setBusy(false);
    }
  }

  async function remove(s: System) {
    if (!confirm(`حذف "${s.nameAr}" نهائياً؟`)) return;
    await api(`/admin/systems/${s.id}`, { method: "DELETE", token });
    onRefresh();
  }

  return (
    <div className="mt-6">
      {!draft && (
        <button
          type="button"
          onClick={() => {
            setDraft(emptyDraft);
            setEditingId(null);
          }}
          className="rounded-xl bg-gradient-to-l from-[#7c3cff] to-[#c13cff] px-6 py-3 text-sm font-extrabold"
        >
          + إضافة نظام جديد
        </button>
      )}

      {draft && (
        <form onSubmit={save} className="panel rounded-2xl p-5 sm:p-6">
          <h2 className="mb-5 text-lg font-bold">
            {editingId ? "تعديل النظام" : "نظام جديد"}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="الاسم بالعربي" value={draft.nameAr} onChange={set("nameAr")} required />
            <Field label="الاسم بالإنجليزي" value={draft.nameEn} onChange={set("nameEn")} dir="ltr" required />
            <Field
              label="المعرّف (slug)"
              value={draft.slug}
              onChange={set("slug")}
              placeholder="pos-system"
              dir="ltr"
              required
            />
            <label className="block">
              <span className="mb-2 block text-sm text-[#cbd5e1]">التصنيف</span>
              <select
                value={draft.categorySlug}
                onChange={(e) => set("categorySlug")(e.target.value)}
                className="w-full rounded-xl border border-[#8b5cf6]/20 bg-white/[0.04] px-4 py-3 text-sm outline-none focus:border-[#8b5cf6]/60"
              >
                <option value="">بدون تصنيف</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug} className="bg-[#120c26]">
                    {c.nameAr}
                  </option>
                ))}
              </select>
            </label>
            <Field label="السعر بالدولار" type="number" value={draft.priceUsd} onChange={set("priceUsd")} dir="ltr" />
            <Field label="الأيقونة (إيموجي)" value={draft.icon} onChange={set("icon")} />
            <Field label="الشارة" value={draft.badge} onChange={set("badge")} placeholder="جديد / الأكثر طلباً" />
            <Field label="لون الشارة" value={draft.badgeColor} onChange={set("badgeColor")} dir="ltr" />
            <Field label="ترتيب العرض" type="number" value={draft.displayOrder} onChange={set("displayOrder")} dir="ltr" />
          </div>

          <div className="mt-4 grid gap-4">
            <TextArea label="الوصف بالعربي" value={draft.descAr} onChange={set("descAr")} rows={3} />
            <TextArea label="الوصف بالإنجليزي" value={draft.descEn} onChange={set("descEn")} rows={2} />
            <TextArea
              label="المميزات (ميزة في كل سطر)"
              value={draft.features}
              onChange={set("features")}
              placeholder={"إدارة العملاء\nالفواتير الإلكترونية\nتقارير المبيعات"}
              rows={4}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-5">
            <Toggle
              label="تفعيل الديمو"
              checked={draft.demoEnabled}
              onChange={(v) => setDraft((d) => (d ? { ...d, demoEnabled: v } : d))}
            />
            <Toggle
              label="منشور"
              checked={draft.published}
              onChange={(v) => setDraft((d) => (d ? { ...d, published: v } : d))}
            />
          </div>

          <p className="mt-3 text-[12px] leading-6 text-[--color-muted]">
            تفعيل الديمو يجعل زر «طلب تجربة» يفتح نسخة تجريبية من النظام على{" "}
            <span dir="ltr" className="text-[#c084fc]">/demo/{draft.slug || "slug"}</span> بدل صفحة التواصل.
          </p>

          {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

          <div className="mt-6 flex gap-3">
            <button
              type="submit"
              disabled={busy}
              className="rounded-xl bg-gradient-to-l from-[#7c3cff] to-[#c13cff] px-6 py-3 text-sm font-extrabold disabled:opacity-60"
            >
              {busy ? "جاري الحفظ..." : "حفظ"}
            </button>
            <button
              type="button"
              onClick={() => {
                setDraft(null);
                setEditingId(null);
                setError("");
              }}
              className="rounded-xl border border-white/15 px-6 py-3 text-sm font-bold text-[--color-muted]"
            >
              إلغاء
            </button>
          </div>
        </form>
      )}

      <ul className="mt-6 flex flex-col gap-3">
        {systems.map((s) => (
          <li key={s.id} className="panel flex flex-wrap items-center gap-4 rounded-2xl p-4">
            <span className="text-3xl">{s.icon}</span>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-2 font-bold">
                {s.nameAr}
                {!s.published && (
                  <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-[--color-muted]">
                    مخفي
                  </span>
                )}
                {s.demoEnabled && (
                  <span className="rounded bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-300">
                    ديمو
                  </span>
                )}
              </p>
              <p className="mt-0.5 text-xs text-[--color-muted]" dir="ltr">
                {s.slug} {s.priceUsd ? `• $${s.priceUsd}` : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setDraft(toDraft(s));
                  setEditingId(s.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="rounded-lg border border-[#8b5cf6]/30 px-4 py-2 text-xs font-bold text-[#c084fc]"
              >
                تعديل
              </button>
              <button
                type="button"
                onClick={() => remove(s)}
                className="rounded-lg border border-red-500/30 px-4 py-2 text-xs font-bold text-red-300"
              >
                حذف
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-[#8b5cf6]"
      />
      {label}
    </label>
  );
}
