import type { Metadata } from "next";
import { SlidersHorizontal, Headset, RefreshCw, MonitorSmartphone, TrendingUp } from "lucide-react";
import { api } from "@/lib/api";
import type { Category, System } from "@/lib/types";
import PageHero from "@/components/PageHero";
import SystemsBrowser from "@/components/SystemsBrowser";
import FeatureStrip, { type Feature } from "@/components/FeatureStrip";
import CtaBand from "@/components/home/CtaBand";
import SystemsArt from "@/components/art/SystemsArt";

export const metadata: Metadata = {
  title: "الأنظمة والتطبيقات",
  description:
    "أنظمة برمجية جاهزة وقابلة للتخصيص من ZAWAN — نقاط بيع، محاسبة، موارد بشرية، تجارة إلكترونية. جرّبها مجاناً قبل الشراء.",
};

const features: Feature[] = [
  { Icon: SlidersHorizontal, title: "قابل للتخصيص", desc: "نخصص الأنظمة بما يناسب احتياج عملك بدقة.", color: "#a855f7" },
  { Icon: Headset, title: "دعم فني متميز", desc: "فريق دعم جاهز لمساعدتك في كل خطوة.", color: "#00d4ff" },
  { Icon: RefreshCw, title: "تحديثات مستمرة", desc: "تحسينات دورية لإبقاء أنظمتك بأفضل أداء.", color: "#e879f9" },
  { Icon: MonitorSmartphone, title: "متوافق مع كل الأجهزة", desc: "تجربة سلسة على الويب والجوال.", color: "#22c55e" },
  { Icon: TrendingUp, title: "نمو لأعمالك", desc: "أنظمة تساعدك على التوسع والعمل بثقة.", color: "#f59e0b" },
];

export default async function SystemsPage() {
  const [systems, categories] = await Promise.all([
    api<System[]>("/systems", { revalidate: 60 }).catch(() => [] as System[]),
    api<Category[]>("/categories", { revalidate: 300 }).catch(() => [] as Category[]),
  ]);

  return (
    <main>
      <PageHero
        badge="أنظمة برمجية ذكية"
        titleTop="حلول برمجية"
        titleBottom="تناسب كل عمل"
        lead={
          <>
            أنظمة جاهزة وقابلة للتخصيص — وبفضلها تقدر تجرّبها{" "}
            <span className="font-bold text-[#c084fc]">مجاناً</span> قبل الشراء.
          </>
        }
        art={<SystemsArt />}
      />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SystemsBrowser
          systems={Array.isArray(systems) ? systems : []}
          categories={Array.isArray(categories) ? categories : []}
        />
      </section>

      <div className="mt-14">
        <FeatureStrip items={features} />
      </div>

      <CtaBand />
    </main>
  );
}
