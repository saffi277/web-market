import type { ReactNode } from "react";

/** Shared page header: pill badge, two-line title, lead paragraph, optional art. */
export default function PageHero({
  badge,
  titleTop,
  titleBottom,
  lead,
  art,
  children,
}: {
  badge: string;
  titleTop: string;
  titleBottom: string;
  lead: ReactNode;
  art?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section
      className={`mx-auto grid max-w-7xl items-center gap-10 px-4 pb-8 pt-8 sm:px-6 lg:gap-14 lg:px-8 lg:pb-12 lg:pt-14 ${
        art ? "lg:grid-cols-2" : ""
      }`}
    >
      <div className={`animate-rise ${art ? "order-2 lg:order-1" : "mx-auto max-w-3xl"} text-center ${art ? "lg:text-right" : ""}`}>
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 px-4 py-1.5 text-[13px] font-semibold text-[#c4a6ff]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c13cff] shadow-[0_0_10px_#c13cff]" />
          {badge}
        </span>

        <h1 className="text-[clamp(2rem,5.4vw,3.7rem)] font-black leading-[1.18] tracking-tight">
          {titleTop}
          <br />
          <span className="text-gradient">{titleBottom}</span>
        </h1>

        <p className={`mt-6 text-base leading-9 text-[#c9c3d8] ${art ? "lg:mx-0" : "mx-auto"} max-w-2xl`}>
          {lead}
        </p>

        {children}
      </div>

      {art && <div className="order-1 lg:order-2">{art}</div>}
    </section>
  );
}
