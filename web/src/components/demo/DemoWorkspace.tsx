"use client";

import { useMemo, useState } from "react";
import { api } from "@/lib/api";
import type { DemoRecord } from "@/lib/types";
import DemoStats from "./DemoStats";
import SalesChart from "./SalesChart";

const entityLabels: Record<string, string> = {
  product: "المنتجات",
  sale: "المبيعات",
  customer: "العملاء",
};

/** Field order per entity so the generated table reads sensibly. */
const columns: Record<string, { key: string; label: string }[]> = {
  product: [
    { key: "name", label: "المنتج" },
    { key: "sku", label: "الرمز" },
    { key: "price", label: "السعر" },
    { key: "stock", label: "المخزون" },
    { key: "category", label: "التصنيف" },
  ],
  sale: [
    { key: "invoiceNo", label: "رقم الفاتورة" },
    { key: "customer", label: "الزبون" },
    { key: "total", label: "الإجمالي" },
    { key: "items", label: "العناصر" },
    { key: "paymentMethod", label: "الدفع" },
    { key: "date", label: "التاريخ" },
  ],
  customer: [
    { key: "name", label: "الاسم" },
    { key: "phone", label: "الهاتف" },
    { key: "city", label: "المدينة" },
    { key: "orders", label: "الطلبات" },
    { key: "totalSpent", label: "إجمالي الشراء" },
  ],
};

export default function DemoWorkspace({
  slug,
  token,
  records,
  onChange,
}: {
  slug: string;
  token: string;
  records: DemoRecord[];
  onChange: () => void;
}) {
  const types = useMemo(() => {
    const seen = Array.from(new Set(records.map((r) => r.entityType)));
    return seen.length > 0 ? seen : ["product"];
  }, [records]);

  const [active, setActive] = useState(types[0]);
  const [adding, setAdding] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  const type = types.includes(active) ? active : types[0];
  const cols = columns[type] ?? [];
  const rows = records.filter((r) => r.entityType === type);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      const payload: Record<string, string | number> = {};
      for (const c of cols) {
        const raw = draft[c.key] ?? "";
        const n = Number(raw);
        payload[c.key] = raw !== "" && !Number.isNaN(n) ? n : raw;
      }
      await api(`/demo/${slug}/data`, {
        method: "POST",
        body: { entityType: type, payload },
        token,
      });
      setDraft({});
      setAdding(false);
      onChange();
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    await api(`/demo/${slug}/data/${id}`, { method: "DELETE", token });
    onChange();
  }

  return (
    <div className="mt-7">
      <DemoStats records={records} />

      <div className="mt-4">
        <SalesChart records={records} />
      </div>

      <div className="mt-7 flex flex-wrap gap-2">
        {types.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => {
              setActive(t);
              setAdding(false);
            }}
            aria-pressed={t === type}
            className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-colors ${
              t === type
                ? "bg-gradient-to-br from-[#7c3cff] to-[#d844ff]"
                : "border border-[#8b5cf6]/20 bg-white/[0.04] text-[--color-muted]"
            }`}
          >
            {entityLabels[t] ?? t}
            <span className="mr-1.5 opacity-60">
              ({records.filter((r) => r.entityType === t).length})
            </span>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setAdding((v) => !v)}
        className="mt-4 rounded-xl border border-[#8b5cf6]/30 px-5 py-2.5 text-sm font-bold text-[#c084fc]"
      >
        {adding ? "إلغاء" : `+ إضافة إلى ${entityLabels[type] ?? type}`}
      </button>

      {adding && (
        <form onSubmit={add} className="panel mt-4 rounded-2xl p-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cols.map((c) => (
              <label key={c.key} className="block">
                <span className="mb-2 block text-sm text-[#cbd5e1]">{c.label}</span>
                <input
                  value={draft[c.key] ?? ""}
                  onChange={(e) => setDraft((d) => ({ ...d, [c.key]: e.target.value }))}
                  className="w-full rounded-xl border border-[#8b5cf6]/20 bg-white/[0.04] px-4 py-3 text-sm outline-none focus:border-[#8b5cf6]/60"
                />
              </label>
            ))}
          </div>
          <button
            type="submit"
            disabled={busy}
            className="mt-5 rounded-xl bg-gradient-to-br from-[#7c3cff] to-[#d844ff] px-6 py-3 text-sm font-extrabold disabled:opacity-60"
          >
            {busy ? "جاري الحفظ..." : "حفظ"}
          </button>
        </form>
      )}

      {/* Table on wide screens, stacked cards on phones. */}
      <div className="panel mt-5 hidden overflow-x-auto rounded-2xl md:block">
        <table className="w-full text-right text-sm">
          <thead className="border-b border-white/10 text-xs text-[--color-muted]">
            <tr>
              {cols.map((c) => (
                <th key={c.key} className="whitespace-nowrap px-5 py-4 font-semibold">
                  {c.label}
                </th>
              ))}
              <th className="px-5 py-4" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.id}
                className="animate-row-in border-b border-white/5 last:border-0 hover:bg-white/[0.03]"
                style={{ animationDelay: `${Math.min(i, 12) * 30}ms` }}
              >
                {cols.map((c) => (
                  <td key={c.key} className="whitespace-nowrap px-5 py-4">
                    {formatCell(r.payload[c.key])}
                  </td>
                ))}
                <td className="px-5 py-4 text-left">
                  {r.isSeed ? (
                    <span className="text-[10px] text-[--color-muted]">بيانات جاهزة</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => remove(r.id)}
                      className="text-xs font-bold text-red-300"
                    >
                      حذف
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="mt-5 flex flex-col gap-3 md:hidden">
        {rows.map((r, i) => (
          <li
            key={r.id}
            className="animate-row-in panel rounded-2xl p-4"
            style={{ animationDelay: `${Math.min(i, 12) * 30}ms` }}
          >
            <dl className="space-y-1.5 text-sm">
              {cols.map((c) => (
                <div key={c.key} className="flex justify-between gap-3">
                  <dt className="text-[--color-muted]">{c.label}</dt>
                  <dd>{formatCell(r.payload[c.key])}</dd>
                </div>
              ))}
            </dl>
            {!r.isSeed && (
              <button
                type="button"
                onClick={() => remove(r.id)}
                className="mt-3 w-full rounded-lg border border-red-500/30 py-2 text-xs font-bold text-red-300"
              >
                حذف
              </button>
            )}
          </li>
        ))}
      </ul>

      {rows.length === 0 && (
        <p className="py-16 text-center text-[--color-muted]">لا توجد بيانات — أضف أول سجل</p>
      )}
    </div>
  );
}

function formatCell(v: unknown): string {
  if (v === null || v === undefined) return "—";
  if (typeof v === "number") return v.toLocaleString("ar-IQ");
  return String(v);
}
