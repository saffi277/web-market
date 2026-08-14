"use client";

import { useEffect, useRef, useState } from "react";
import { Wallet, Receipt, Users, Package } from "lucide-react";
import type { DemoRecord } from "@/lib/types";

/** Animates from the previous value to the next whenever data changes. */
function useTween(target: number) {
  const [n, setN] = useState(target);
  const from = useRef(target);

  useEffect(() => {
    const start = from.current;
    if (start === target) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 700);
      setN(Math.round(start + (target - start) * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
      else from.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);

  return n;
}

function num(v: unknown): number {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
}

function Tile({
  Icon,
  label,
  value,
  suffix,
  color,
}: {
  Icon: typeof Wallet;
  label: string;
  value: number;
  suffix?: string;
  color: string;
}) {
  const shown = useTween(value);
  return (
    <div className="panel rounded-2xl p-4">
      <span
        className="flex h-9 w-9 items-center justify-center rounded-xl"
        style={{ background: `${color}1a`, border: `1px solid ${color}3d` }}
      >
        <Icon size={16} style={{ color }} />
      </span>
      <p className="mt-3 text-xl font-black tabular-nums lg:text-2xl" style={{ color }}>
        {shown.toLocaleString("ar-IQ")}
        {suffix ? <span className="text-sm font-bold"> {suffix}</span> : null}
      </p>
      <p className="mt-1 text-[11.5px] text-[--color-muted]">{label}</p>
    </div>
  );
}

export default function DemoStats({ records }: { records: DemoRecord[] }) {
  const sales = records.filter((r) => r.entityType === "sale");
  const products = records.filter((r) => r.entityType === "product");
  const customers = records.filter((r) => r.entityType === "customer");

  const revenue = sales.reduce((sum, r) => sum + num(r.payload.total), 0);
  const stock = products.reduce((sum, r) => sum + num(r.payload.stock), 0);

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Tile Icon={Wallet} label="إجمالي المبيعات" value={revenue} suffix="د.ع" color="#00d4ff" />
      <Tile Icon={Receipt} label="عدد الفواتير" value={sales.length} color="#a855f7" />
      <Tile Icon={Package} label="إجمالي المخزون" value={stock} color="#f59e0b" />
      <Tile Icon={Users} label="العملاء" value={customers.length} color="#22c55e" />
    </div>
  );
}
