"use client";

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import type { Category, Order, OrderStatus, Session, Stats, System } from "@/lib/types";
import { clearSession, readSession } from "@/lib/session";
import LoginCard from "@/components/LoginCard";
import OrdersPanel from "@/components/admin/OrdersPanel";
import SystemsPanel from "@/components/admin/SystemsPanel";
import Logo from "@/components/Logo";

type Tab = "orders" | "systems";

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("orders");

  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [systems, setSystems] = useState<System[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const s = readSession();
    if (s?.user.role === "admin") setSession(s);
    setReady(true);
  }, []);

  const load = useCallback(async (token: string) => {
    setLoading(true);
    try {
      const [s, o, sys, cats] = await Promise.all([
        api<Stats>("/admin/stats", { token }),
        api<Order[]>("/admin/orders", { token }),
        api<System[]>("/admin/systems", { token }),
        api<Category[]>("/categories").catch(() => [] as Category[]),
      ]);
      setStats(s);
      setOrders(o);
      setSystems(sys);
      setCategories(Array.isArray(cats) ? cats : []);
    } catch {
      // An expired or revoked token lands here — drop back to the login card.
      clearSession();
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (session) void load(session.token);
  }, [session, load]);

  if (!ready) return null;

  if (!session) {
    return (
      <LoginCard
        title="لوحة الإدارة"
        subtitle="ZAWAN Dashboard"
        onSuccess={(s) => {
          if (s.user.role !== "admin") {
            clearSession();
            alert("هذا الحساب ليس حساب إدارة");
            return;
          }
          setSession(s);
        }}
      />
    );
  }

  const token = session.token;

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Logo className="h-10 w-auto" />
          <div>
            <h1 className="text-lg font-black sm:text-xl">لوحة الإدارة</h1>
            <p className="text-xs text-[--color-muted]">{session.user.name}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            clearSession();
            setSession(null);
          }}
          className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-bold text-red-300"
        >
          خروج
        </button>
      </header>

      {stats && (
        <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {[
            ["إجمالي الطلبات", stats.totalOrders, "#a855f7"],
            ["طلبات جديدة", stats.newOrders, "#f59e0b"],
            ["صفقات ناجحة", stats.wonOrders, "#22c55e"],
            ["أنظمة منشورة", stats.totalSystems, "#06b6d4"],
            ["تجارب نشطة", stats.activeDemos, "#e879f9"],
          ].map(([label, value, color]) => (
            <div
              key={label as string}
              className="panel rounded-2xl p-4 text-center"
              style={{ borderColor: `${color}33` }}
            >
              <div className="text-2xl font-black lg:text-3xl" style={{ color: color as string }}>
                {value as number}
              </div>
              <div className="mt-1 text-[11px] text-[--color-muted] sm:text-xs">{label as string}</div>
            </div>
          ))}
        </div>
      )}

      <nav className="mt-8 flex gap-2">
        {(
          [
            ["orders", "الطلبات"],
            ["systems", "إدارة الأنظمة"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            aria-pressed={tab === key}
            className={`rounded-xl px-5 py-2.5 text-sm font-bold transition-colors ${
              tab === key
                ? "bg-gradient-to-l from-[#7c3cff] to-[#c13cff]"
                : "border border-[#8b5cf6]/20 bg-white/[0.04] text-[--color-muted]"
            }`}
          >
            {label}
          </button>
        ))}
      </nav>

      {loading ? (
        <p className="py-20 text-center text-[--color-muted]">جاري التحميل...</p>
      ) : tab === "orders" ? (
        <OrdersPanel
          orders={orders}
          token={token}
          onPatch={(id, status, notes) =>
            setOrders((list) =>
              list.map((o) =>
                o.id === id ? { ...o, status: status ?? o.status, notes: notes ?? o.notes } : o,
              ),
            )
          }
          onDelete={(id) => setOrders((list) => list.filter((o) => o.id !== id))}
          onRefresh={() => load(token)}
        />
      ) : (
        <SystemsPanel systems={systems} categories={categories} token={token} onRefresh={() => load(token)} />
      )}
    </main>
  );
}

export type { OrderStatus };
