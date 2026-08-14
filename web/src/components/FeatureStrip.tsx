import type { LucideIcon } from "lucide-react";

export type Feature = {
  Icon: LucideIcon;
  title: string;
  desc: string;
  color?: string;
};

/** Horizontal band of icon + title + one-liner, divided by hairlines. */
export default function FeatureStrip({ items }: { items: Feature[] }) {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        className="panel grid divide-y divide-white/[0.06] rounded-2xl sm:grid-cols-2 sm:divide-y-0 lg:divide-x"
        style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, 220px), 1fr))` }}
      >
        {items.map(({ Icon, title, desc, color = "#a855f7" }) => (
          <div key={title} className="flex items-start gap-3.5 px-5 py-5">
            <span
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{ background: `${color}18`, border: `1px solid ${color}38` }}
            >
              <Icon size={19} style={{ color }} />
            </span>
            <span>
              <span className="block text-[14px] font-bold leading-tight">{title}</span>
              <span className="mt-1.5 block text-[12px] leading-6 text-[--color-muted]">{desc}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
