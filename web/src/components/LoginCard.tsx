"use client";

import { useState } from "react";
import { api, ApiError } from "@/lib/api";
import type { Session } from "@/lib/types";
import { saveSession } from "@/lib/session";
import { Field } from "./Field";

export default function LoginCard({
  title,
  subtitle,
  onSuccess,
}: {
  title: string;
  subtitle?: string;
  onSuccess: (s: Session) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const session = await api<Session>("/auth/login", {
        method: "POST",
        body: { email, password },
      });
      saveSession(session);
      onSuccess(session);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "تعذّر تسجيل الدخول");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-12">
      <form onSubmit={submit} className="card-surface w-full max-w-sm rounded-3xl p-7 sm:p-9">
        <div className="mb-8 text-center">
          <div className="text-4xl">🔐</div>
          <h1 className="mt-3 text-xl font-black">{title}</h1>
          {subtitle && <p className="mt-1.5 text-sm text-[--color-muted]">{subtitle}</p>}
        </div>

        <div className="flex flex-col gap-4">
          <Field label="البريد الإلكتروني" type="email" value={email} onChange={setEmail} required />
          <Field label="كلمة المرور" type="password" value={password} onChange={setPassword} required />

          {error && <p className="text-center text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={busy}
            className="rounded-xl bg-gradient-to-br from-[#7c3cff] to-[#d844ff] py-3.5 font-extrabold transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {busy ? "جاري الدخول..." : "دخول"}
          </button>
        </div>
      </form>
    </div>
  );
}
