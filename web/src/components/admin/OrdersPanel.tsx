"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import type { Order, OrderKind, OrderStatus } from "@/lib/types";

const kindLabel: Record<OrderKind, string> = {
  contact: "تواصل",
  purchase: "شراء",
  demo_request: "طلب تجربة",
};

const statusLabel: Record<OrderStatus, string> = {
  new: "جديد",
  contacted: "تم التواصل",
  negotiating: "قيد التفاوض",
  won: "صفقة ناجحة",
  lost: "ملغي",
};

const statusColor: Record<OrderStatus, string> = {
  new: "#a855f7",
  contacted: "#3b82f6",
  negotiating: "#f59e0b",
  won: "#22c55e",
  lost: "#ef4444",
};

type Props = {
  orders: Order[];
  token: string;
  onPatch: (id: string, status?: OrderStatus, notes?: string) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
};

export default function OrdersPanel({ orders, token, onPatch, onDelete, onRefresh }: Props) {
  const [kind, setKind] = useState<"all" | OrderKind>("all");
  const [status, setStatus] = useState<"all" | OrderStatus>("all");
  const [open, setOpen] = useState<Order | null>(null);
  const [notes, setNotes] = useState("");

  const filtered = orders.filter(
    (o) => (kind === "all" || o.kind === kind) && (status === "all" || o.status === status),
  );

  async function patch(id: string, body: { status?: OrderStatus; notes?: string }) {
    await api(`/admin/orders/${id}`, { method: "PATCH", body, token });
    onPatch(id, body.status, body.notes);
    setOpen((o) => (o && o.id === id ? { ...o, ...body } : o));
  }

  async function remove(id: string) {
    if (!confirm("حذف هذا الطلب نهائياً؟")) return;
    await api(`/admin/orders/${id}`, { method: "DELETE", token });
    onDelete(id);
    setOpen(null);
  }

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        {(["all", "contact", "purchase", "demo_request"] as const).map((k) => (
          <Chip key={k} active={kind === k} onClick={() => setKind(k)}>
            {k === "all" ? "الكل" : kindLabel[k]}
            <span className="mr-1.5 opacity-60">
              ({k === "all" ? orders.length : orders.filter((o) => o.kind === k).length})
            </span>
          </Chip>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {(["all", "new", "contacted", "negotiating", "won", "lost"] as const).map((s) => (
          <Chip key={s} active={status === s} onClick={() => setStatus(s)} small>
            {s === "all" ? "كل الحالات" : statusLabel[s]}
          </Chip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="py-20 text-center text-[--color-muted]">لا توجد طلبات مطابقة</p>
      ) : (
        <div className={`mt-6 grid gap-4 ${open ? "lg:grid-cols-2" : ""}`}>
          <ul className="flex flex-col gap-3">
            {filtered.map((o) => (
              <li key={o.id}>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(o);
                    setNotes(o.notes);
                  }}
                  className={`panel w-full rounded-2xl p-4 text-right transition-colors ${
                    open?.id === o.id ? "border-[#8b5cf6]/60 bg-[#8b5cf6]/10" : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-bold">{o.name}</p>
                      <p className="mt-0.5 truncate text-xs text-[--color-muted]" dir="ltr">
                        {o.email}
                        {o.phone ? ` • ${o.phone}` : ""}
                      </p>
                      {o.systemName && (
                        <p className="mt-1 text-xs text-[#c084fc]">{o.systemName}</p>
                      )}
                      <p className="mt-1.5 truncate text-sm text-[#cbd5e1]">{o.message}</p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1.5">
                      <Badge color={statusColor[o.status]}>{statusLabel[o.status]}</Badge>
                      <span className="text-[10px] text-[--color-muted]">{kindLabel[o.kind]}</span>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>

          {open && (
            <aside className="panel h-fit rounded-2xl p-5 lg:sticky lg:top-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold">{open.name}</h2>
                  <p className="text-xs text-[--color-muted]">
                    {new Date(open.createdAt).toLocaleString("ar-IQ")}
                  </p>
                </div>
                <button type="button" onClick={() => setOpen(null)} className="text-[--color-muted]">
                  ✕
                </button>
              </div>

              <dl className="mt-5 space-y-2 text-sm">
                <Row label="النوع" value={kindLabel[open.kind]} />
                <Row label="البريد" value={open.email} ltr />
                {open.phone && <Row label="الهاتف" value={open.phone} ltr />}
                {open.company && <Row label="الشركة" value={open.company} />}
                {open.systemName && <Row label="النظام" value={open.systemName} />}
                {open.budget && <Row label="الميزانية" value={open.budget} />}
              </dl>

              <div className="mt-4 rounded-xl border border-[#8b5cf6]/15 bg-[#8b5cf6]/[0.07] p-4">
                <p className="mb-1.5 text-xs text-[--color-muted]">الرسالة</p>
                <p className="whitespace-pre-wrap text-sm leading-7">{open.message || "—"}</p>
              </div>

              <div className="mt-4">
                <label className="mb-2 block text-xs text-[--color-muted]">ملاحظات داخلية</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  onBlur={() => notes !== open.notes && patch(open.id, { notes })}
                  rows={3}
                  className="w-full rounded-xl border border-[#8b5cf6]/20 bg-white/[0.04] px-3 py-2.5 text-sm outline-none focus:border-[#8b5cf6]/60"
                />
              </div>

              <div className="mt-4">
                <p className="mb-2 text-xs text-[--color-muted]">تغيير الحالة</p>
                <div className="flex flex-wrap gap-2">
                  {(["new", "contacted", "negotiating", "won", "lost"] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => patch(open.id, { status: s })}
                      className="rounded-lg border px-3 py-1.5 text-xs font-bold transition-opacity hover:opacity-80"
                      style={{
                        color: statusColor[s],
                        borderColor: `${statusColor[s]}44`,
                        background: open.status === s ? `${statusColor[s]}26` : "transparent",
                      }}
                    >
                      {statusLabel[s]}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                {open.phone && (
                  <a
                    href={`https://wa.me/${normalizePhone(open.phone)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 rounded-xl border border-emerald-500/40 bg-emerald-500/10 py-2.5 text-center text-sm font-bold text-emerald-300"
                  >
                    واتساب
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => remove(open.id)}
                  className="flex-1 rounded-xl border border-red-500/30 bg-red-500/10 py-2.5 text-sm font-bold text-red-300"
                >
                  حذف
                </button>
              </div>
            </aside>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={onRefresh}
        className="mt-8 w-full rounded-xl border border-[#8b5cf6]/20 py-3 text-sm text-[--color-muted] hover:text-white"
      >
        تحديث القائمة
      </button>
    </div>
  );
}

/** Iraqi numbers are stored locally (07XX…); wa.me needs the country code. */
function normalizePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  return digits.startsWith("0") ? `964${digits.slice(1)}` : digits;
}

function Chip({
  active,
  onClick,
  children,
  small,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-xl font-bold transition-colors ${small ? "px-3.5 py-1.5 text-xs" : "px-4 py-2 text-sm"} ${
        active
          ? "bg-gradient-to-l from-[#7c3cff] to-[#c13cff] text-white"
          : "border border-[#8b5cf6]/20 bg-white/[0.04] text-[--color-muted] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function Badge({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="rounded-lg px-2.5 py-1 text-[11px] font-bold"
      style={{ color, background: `${color}22` }}
    >
      {children}
    </span>
  );
}

function Row({ label, value, ltr }: { label: string; value: string; ltr?: boolean }) {
  return (
    <div className="flex gap-2">
      <dt className="min-w-20 text-[--color-muted]">{label}:</dt>
      <dd className="text-[#e2e8f0]" dir={ltr ? "ltr" : undefined}>
        {value}
      </dd>
    </div>
  );
}
