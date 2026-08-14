"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { DemoRecord } from "@/lib/types";

const W = 560;
const H = 170;
const PAD = 14;

function num(v: unknown): number {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
}

/** Redraws with a stroke-draw animation whenever the series changes. */
export default function SalesChart({ records }: { records: DemoRecord[] }) {
  const series = useMemo(() => {
    const sales = records
      .filter((r) => r.entityType === "sale")
      .map((r) => num(r.payload.total))
      .reverse();
    return sales.length >= 2 ? sales : [...sales, ...Array(2 - sales.length).fill(0)];
  }, [records]);

  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);

  const { line, area, points, max } = useMemo(() => {
    const max = Math.max(...series, 1);
    const step = (W - PAD * 2) / Math.max(1, series.length - 1);
    const pts = series.map((v, i) => {
      const x = PAD + i * step;
      const y = H - PAD - (v / max) * (H - PAD * 2);
      return [x, y] as const;
    });
    const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
    const area = `${line} L${pts[pts.length - 1][0].toFixed(1)} ${H - PAD} L${pts[0][0].toFixed(1)} ${H - PAD} Z`;
    return { line, area, points: pts, max };
  }, [series]);

  // Re-run the draw animation on every data change.
  useEffect(() => {
    const p = pathRef.current;
    if (!p) return;
    const l = p.getTotalLength();
    setLen(l);
    p.style.transition = "none";
    p.style.strokeDasharray = `${l}`;
    p.style.strokeDashoffset = `${l}`;
    // force reflow so the transition restarts
    void p.getBoundingClientRect();
    p.style.transition = "stroke-dashoffset 900ms ease";
    p.style.strokeDashoffset = "0";
  }, [line]);

  return (
    <div className="panel rounded-2xl p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold">حركة المبيعات</h3>
        <span className="text-[11px] text-[--color-muted]">
          الأعلى: {max.toLocaleString("ar-IQ")} د.ع
        </span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="رسم بياني للمبيعات">
        <defs>
          <linearGradient id="sc-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={PAD}
            x2={W - PAD}
            y1={PAD + f * (H - PAD * 2)}
            y2={PAD + f * (H - PAD * 2)}
            stroke="#ffffff"
            strokeOpacity="0.06"
          />
        ))}

        <path d={area} fill="url(#sc-area)" style={{ transition: "d 500ms ease" }} />
        <path
          ref={pathRef}
          d={line}
          fill="none"
          stroke="#c084fc"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={len || undefined}
        />
        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3.5" fill="#0a0618" stroke="#c084fc" strokeWidth="2">
            <animate attributeName="r" from="0" to="3.5" dur="0.5s" begin={`${i * 0.06}s`} fill="freeze" />
          </circle>
        ))}
      </svg>
    </div>
  );
}
