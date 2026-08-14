import Link from "next/link";
import { MessageSquare } from "lucide-react";

export default function CtaBand() {
  return (
    <section className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="panel relative flex flex-col items-center gap-6 overflow-hidden rounded-2xl px-6 py-9 text-center lg:flex-row-reverse lg:justify-between lg:text-right">
        {/* Z watermark */}
        <span
          aria-hidden
          dir="ltr"
          className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 select-none bg-gradient-to-br from-[#7c3cff]/35 to-[#00d4ff]/10 bg-clip-text text-[8rem] font-black italic leading-none text-transparent lg:text-[10rem]"
        >
          Z
        </span>

        <div className="relative">
          <h2 className="text-[clamp(1.25rem,2.6vw,1.75rem)] font-black">
            لم تجد النظام الذي تحتاجه؟
          </h2>
          <p className="mt-2.5 text-sm leading-7 text-[--color-muted]">
            نصمم لك نظاماً خاصاً يعبّر عن قوة عملك ويحقق رؤيتك بدقة واحترافية.
          </p>
        </div>

        <Link
          href="/contact"
          className="relative inline-flex shrink-0 items-center gap-2.5 rounded-xl bg-gradient-to-l from-[#7c3cff] to-[#c13cff] px-7 py-3.5 font-extrabold shadow-[0_16px_44px_rgba(124,60,255,0.4)] transition-transform hover:scale-[1.03]"
        >
          <MessageSquare size={18} />
          ناقش فكرتك معنا
        </Link>
      </div>
    </section>
  );
}
