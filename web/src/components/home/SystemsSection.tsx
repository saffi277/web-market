import type { Category, System } from "@/lib/types";
import SystemsBrowser from "@/components/SystemsBrowser";

export default function SystemsSection({
  systems,
  categories,
}: {
  systems: System[];
  categories: Category[];
}) {
  return (
    <section id="systems" className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#a855f7]" />
        <h2 className="text-center text-[clamp(1.4rem,3.2vw,2.1rem)] font-black">
          اختر النظام المناسب لعملك
        </h2>
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#a855f7]" />
      </div>

      <SystemsBrowser systems={systems} categories={categories} />
    </section>
  );
}
