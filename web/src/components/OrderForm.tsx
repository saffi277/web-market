"use client";

import { useState } from "react";
import { api, ApiError } from "@/lib/api";
import type { OrderKind } from "@/lib/types";
import { Field, TextArea, Select } from "./Field";

const budgets = ["أقل من $500", "$500 - $1000", "$1000 - $3000", "أكثر من $3000", "غير محدد"];

type Props = {
  kind: OrderKind;
  systemSlug?: string;
  /** Trims the form down to the essentials for sidebar placement. */
  compact?: boolean;
};

const empty = { name: "", email: "", phone: "", company: "", budget: "", message: "" };

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
      <Field label="الاسم الكامل" value={form.name} onChange={set("name")} placeholder="محمد أحمد" required />
      <Field
        label="البريد الإلكتروني"
        type="email"
        value={form.email}
        onChange={set("email")}
        placeholder="name@example.com"
        required
      />
      <Field
        label="رقم الواتساب"
        type="tel"
        value={form.phone}
        onChange={set("phone")}
        placeholder="07XX XXX XXXX"
      />

      {!compact && (
        <>
          <Field
            label="اسم الشركة"
            value={form.company}
            onChange={set("company")}
            placeholder="اختياري"
          />
          <Select
            label="الميزانية التقريبية"
            value={form.budget}
            onChange={set("budget")}
            options={budgets}
            placeholder="حدد الميزانية..."
          />
        </>
      )}

      <TextArea
        label={compact ? "ملاحظات" : "تفاصيل المشروع"}
        value={form.message}
        onChange={set("message")}
        placeholder={compact ? "أي متطلبات خاص؟" : "أخبرنا عن مشروعك ومتطلباتك..."}
        rows={compact ? 3 : 5}
      />

      {error && <p className="text-center text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={state === "sending"}
        className="rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#d844ff] py-3.5 font-extrabold transition-transform hover:scale-[1.02] disabled:scale-100 disabled:opacity-60"
      >
        {state === "sending" ? "جاري الإرسال..." : "إرسال الطلب ←"}
      </button>
    </form>
  );
}
