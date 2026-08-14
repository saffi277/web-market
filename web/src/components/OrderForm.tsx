"use client";

import { useState } from "react";
import { User, Mail, Phone, Building2, DollarSign, FileText, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { api, ApiError } from "@/lib/api";
import type { OrderKind } from "@/lib/types";

const budgets = ["أقل من $500", "$500 - $1000", "$1000 - $3000", "أكثر من $3000", "غير محدد"];

type Props = {
  kind: OrderKind;
  systemSlug?: string;
  /** Trims the form down to the essentials for sidebar placement. */
  compact?: boolean;
};

const empty = { name: "", email: "", phone: "", company: "", budget: "", message: "" };

const inputClass =
  "w-full rounded-xl border border-[#8b5cf6]/20 bg-white/[0.04] py-3 pl-11 pr-4 text-sm outline-none transition-colors placeholder:text-[#615a75] focus:border-[#8b5cf6]/60";

/** Label on the right, icon pinned inside the field on the left. */
function Row({
  Icon,
  label,
  children,
}: {
  Icon: LucideIcon;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid items-center gap-2 sm:grid-cols-[132px_1fr] sm:gap-4">
      <span className="text-[13px] font-semibold text-[#cbd5e1]">{label}</span>
      <span className="relative block">
        {children}
        <Icon size={16} className="pointer-events-none absolute left-3.5 top-3.5 text-[#7b7391]" />
      </span>
    </label>
  );
}

export default function OrderForm({ kind, systemSlug, compact = false }: Props) {
  const [form, setForm] = useState(empty);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    setError("");
    try {
      await api("/orders", {
        method: "POST",
        body: {
          kind,
          systemSlug: systemSlug ?? "",
          name: form.name,
          email: form.email,
          phone: form.phone || undefined,
          company: form.company || undefined,
          budget: form.budget || undefined,
          message: form.message,
        },
      });
      setState("sent");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "تعذّر الإرسال، حاول مجدداً");
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
        <div className="text-4xl">✅</div>
        <h3 className="mt-3 text-lg font-bold">وصلنا طلبك!</h3>
        <p className="mt-2 text-sm text-[--color-muted]">سنتواصل معك خلال 24 ساعة</p>
        <button
          type="button"
          onClick={() => {
            setForm(empty);
            setState("idle");
          }}
          className="mt-5 rounded-xl bg-[#8b5cf6] px-6 py-2.5 text-sm font-bold"
        >
          إرسال طلب آخر
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <Row Icon={User} label="الاسم الكامل">
        <input
          value={form.name}
          onChange={(e) => set("name")(e.target.value)}
          placeholder="محمد أحمد"
          required
          className={inputClass}
        />
      </Row>

      <Row Icon={Mail} label="البريد الإلكتروني">
        <input
          type="email"
          value={form.email}
          onChange={(e) => set("email")(e.target.value)}
          placeholder="name@example.com"
          required
          dir="ltr"
          className={inputClass}
        />
      </Row>

      <Row Icon={Phone} label="رقم الواتساب">
        <input
          type="tel"
          value={form.phone}
          onChange={(e) => set("phone")(e.target.value)}
          placeholder="07XX XXX XXXX"
          dir="ltr"
          className={inputClass}
        />
      </Row>

      {!compact && (
        <>
          <Row Icon={Building2} label="اسم الشركة">
            <input
              value={form.company}
              onChange={(e) => set("company")(e.target.value)}
              placeholder="اختياري"
              className={inputClass}
            />
          </Row>

          <Row Icon={DollarSign} label="الميزانية التقريبية">
            <select
              value={form.budget}
              onChange={(e) => set("budget")(e.target.value)}
              className={`${inputClass} ${form.budget ? "text-white" : "text-[#615a75]"}`}
            >
              <option value="">حدد الميزانية...</option>
              {budgets.map((b) => (
                <option key={b} value={b} className="bg-[#120c26]">
                  {b}
                </option>
              ))}
            </select>
          </Row>
        </>
      )}

      <Row Icon={FileText} label={compact ? "ملاحظات" : "تفاصيل المشروع"}>
        <textarea
          value={form.message}
          onChange={(e) => set("message")(e.target.value)}
          placeholder={compact ? "أي متطلبات خاصة؟" : "أخبرنا عن مشروعك ومتطلباتك..."}
          rows={compact ? 3 : 4}
          className={`${inputClass} resize-y leading-7`}
        />
      </Row>

      {error && <p className="text-center text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-2 inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-l from-[#7c3cff] to-[#c13cff] py-3.5 font-extrabold shadow-[0_14px_38px_rgba(124,60,255,0.35)] transition-transform hover:scale-[1.01] disabled:scale-100 disabled:opacity-60"
      >
        <Send size={17} />
        {state === "sending" ? "جاري الإرسال..." : "إرسال الطلب ←"}
      </button>
    </form>
  );
}
