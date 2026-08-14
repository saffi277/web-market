import { api } from "@/lib/api";
import type { Category, System } from "@/lib/types";
import Hero from "@/components/home/Hero";
import StatsBar from "@/components/home/StatsBar";
import SystemsSection from "@/components/home/SystemsSection";
import CtaBand from "@/components/home/CtaBand";

export default async function Home() {
  const [systems, categories] = await Promise.all([
    api<System[]>("/systems", { revalidate: 60 }).catch(() => [] as System[]),
    api<Category[]>("/categories", { revalidate: 300 }).catch(() => [] as Category[]),
  ]);

  return (
    <main>
      <Hero />
      <StatsBar />
      <SystemsSection
        systems={Array.isArray(systems) ? systems : []}
        categories={Array.isArray(categories) ? categories : []}
      />
      <CtaBand />
    </main>
  );
}
