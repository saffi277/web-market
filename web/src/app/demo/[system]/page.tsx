"use client";

import { use, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { api, ApiError } from "@/lib/api";
import type { DemoRecord, Session, System } from "@/lib/types";
import { clearSession, demoDaysLeft, readSession, saveSession } from "@/lib/session";
import { Field } from "@/components/Field";
import Logo from "@/components/Logo";
import DemoWorkspace from "@/components/demo/DemoWorkspace";

export default function DemoPage({ params }: { params: Promise<{ system: string }> }) {
  const { system: slug } = use(params);

  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [system, setSystem] = useState<System | null>(null);
  const [records, setRecords] = useState<DemoRecord[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const s = readSession();
    if (s && (s.user.role === "demo_user" || s.user.role === "admin")) setSession(s);
    setReady(true);
    api<System>(`/systems/${slug}`).then(setSystem).catch(() => setSystem(null));
  }, [slug]);

  const loadData = useCallback(
    async (token: string) => {
      setLoading(true);
      try {
        setRecords(await api<DemoRecord[]>(`/demo/${slug}/data`, { token }));
      } catch (err) {
        if (err instanceof ApiError && (err.status === 401 || err.status === 403)) {
          clearSession();
          setSession(null);
        }
      } finally {
        setLoading(false);
      }
    },
    [slug],
  );

  useEffect(() => {
    if (session) void loadData(session.token);
  }, [session, loadData]);

  if (!ready) return null;

  if (!session) {
    return <DemoGate slug={slug} system={system} onSession={setSession} />;
  }

  const daysLeft = demoDaysLeft(session.user);

  if (session.user.role === "demo_user" && daysLeft <= 0) {
    return (
      <Shell>
        <div className="panel mx-auto max-w-md rounded-3xl p-8 text-center">
          <div className="text-4xl">⏳</div>
          <h1 className="mt-4 text-xl font-black">انتهت فترة التجربة</h1>
          <p className="mt-3 text-sm leading-7 text-[--color-muted]">
            نتمنى أن النظام عجبك — تواصل معنا للحصول على النسخة الكاملة.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-xl bg-gradient-to-l from-[#7c3cff] to-[#c13cff] px-7 py-3 text-sm font-extrabold"
          >
            اطلب النظام الآن ←
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-[--color-line] bg-[#0a0618]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link href="/" aria-label="ZAWAN">
            <Logo />
          </Link>
          <p className="order-3 w-full text-center text-xs text-amber-300 sm:order-none sm:w-auto">
            نسخة تجريبية — متبقٍ {daysLeft} {daysLeft === 1 ? "يوم" : "أيام"}
          </p>
          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="rounded-lg bg-gradient-to-l from-[#7c3cff] to-[#c13cff] px-4 py-2 text-xs font-bold"
            >
              اطلب النظام
            </Link>
            <button
              type="button"
              onClick={() => {
                clearSession();
                setSession(null);
              }}
              className="rounded-lg border border-white/15 px-4 py-2 text-xs font-bold text-[--color-muted]"
            >
              خروج
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <h1 className="text-xl font-black sm:text-2xl">
          {system?.nameAr ?? "النظام التجريبي"}
        </h1>
        <p className="mt-1 text-sm text-[--color-muted]">
          أهلاً {session.user.name} — جرّب النظام بحرية، بياناتك خاصة بك وتُمسح عند انتهاء التجربة.
        </p>

        {loading ? (
          <div className="mt-7 space-y-4">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="skeleton h-28 rounded-2xl" />
              ))}
            </div>
            <div className="skeleton h-52 rounded-2xl" />
            <div className="skeleton h-64 rounded-2xl" />
          </div>
        ) : (
          <DemoWorkspace
            slug={slug}
            token={session.token}
            records={records}
            onChange={() => loadData(session.token)}
          />
        )}
      </main>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">{children}</div>;
}

function DemoGate({
  slug,
  system,
  onSession,
}: {
  slug: string;
  system: System | null;
  onSession: (s: Session) => void;
}) {
  const [mode, setMode] = useState<"register" | "login">("register");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const session =
        mode === "register"
          ? await api<Session>("/demo/register", { method: "POST", body: form })
          : await api<Session>("/auth/login", {
              method: "POST",
              body: { email: form.email, password: form.password },
            });
      saveSession(session);
      onSession(session);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "تعذّر إنشاء الجلسة");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Shell>
      <form onSubmit={submit} className="panel w-full max-w-md rounded-3xl p-7 sm:p-9">
        <div className="mb-7 text-center">
          <div className="text-4xl">🚀</div>
          <h1 className="mt-3 text-xl font-black">
            {mode === "register" ? "ابدأ تجربتك المجانية" : "دخول حساب التجربة"}
          </h1>
          <p className="mt-2 text-sm text-[--color-muted]">
            {system ? system.nameAr : slug} — مجاناً لمدة 7 أيام، بدون بطاقة دفع
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {mode === "register" && (
            <>
              <Field label="الاسم الكامل" value={form.name} onChange={set("name")} required />
              <Field label="رقم الواتساب" type="tel" value={form.phone} onChange={set("phone")} required />
            </>
          )}
          <Field label="البريد الإلكتروني" type="email" value={form.email} onChange={set("email")} required />
          <Field
            label="كلمة المرور"
            type="password"
            value={form.password}
            onChange={set("password")}
            placeholder="8 أحرف على الأقل"
            required
          />

          {error && <p className="text-center text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="rounded-xl bg-gradient-to-l from-[#7c3cff] to-[#c13cff] py-3.5 font-extrabold transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {busy ? "لحظة..." : mode === "register" ? "ابدأ التجربة ←" : "دخول"}
          </button>

          <button
            type="button"
            onClick={() => {
              setMode((m) => (m === "register" ? "login" : "register"));
              setError("");
            }}
            className="text-sm text-[--color-muted] hover:text-white"
          >
            {mode === "register" ? "عندك حساب تجريبي؟ سجّل الدخول" : "ما عندك حساب؟ ابدأ تجربة جديدة"}
          </button>
        </div>
      </form>
    </Shell>
  );
}
