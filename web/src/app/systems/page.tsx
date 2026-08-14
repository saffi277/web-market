import type { Metadata } from "next";
import { api } from "@/lib/api";
import type { Category, System } from "@/lib/types";
import SystemsBrowser from "@/components/SystemsBrowser";

export const metadata: Metadata = {
  title: "الأنظمة",
  description: "أنظمة برمجية جاهزة وقابلة للتخصيص من ZAWAN — نقاط بيع، محاسبة، موارد بشرية والمزيد.",
};

export default async function SystemsPage() {
  const [systems, categories] = await Promise.all([
    api<System[]>("/systems", { revalidate: 60 }).catch(() => [] as System[]),
    api<Category[]>("/categories", { revalidate: 300 }).catch(() => [] as Category[]),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="mx-auto max-w-2xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/25 bg-[#8b5cf6]/10 px-4 py-1.5 text-sm font-semibold text-[#a78bfa]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" />
          أنظمتنا البرمجية
        </div>
        <h1 className="text-[clamp(1.8rem,5vw,3rem)] font-black leading-tight">
          حلول برمجية <span className="text-gradient">تناسب كل عمل</span>
        </h1>
        <p className="mt-4 text-[--color-muted]">
          أنظمة جاهزة وقابلة للتخصيص — وبعضها تقدر تجرّبه مجاناً قبل الشراء
        </p>
      </header>

      <SystemsBrowser systems={systems} categories={categories} />
    </main>
  );
}
