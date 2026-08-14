import type { Metadata } from "next";
import {
  Code2, ShoppingBag, Smartphone, BrainCircuit, ShieldCheck, Cloud, Palette, Workflow,
  Boxes, Headset, Smile, Trophy, Rocket, RefreshCw, PackageCheck,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import FeatureStrip, { type Feature } from "@/components/FeatureStrip";
import ServiceCard, { type Service } from "@/components/ServiceCard";
import CtaBand from "@/components/home/CtaBand";
import ServicesArt from "@/components/art/ServicesArt";

export const metadata: Metadata = {
  title: "خدماتنا",
  description:
    "خدمات ZAWAN البرمجية — تطوير أنظمة مخصصة، متاجر إلكترونية، تطبيقات جوال، ذكاء اصطناعي، أمن سيبراني، حلول سحابية وتصميم واجهات.",
};

const promises: Feature[] = [
  { Icon: PackageCheck, title: "حلول مخصصة", desc: "مصممة خصيصاً لتناسب احتياجاتك وأهداف عملك.", color: "#a855f7" },
  { Icon: Headset, title: "دعم فني احترافي", desc: "فريق محترف جاهز لمساعدتك على مدار الساعة.", color: "#00d4ff" },
  { Icon: RefreshCw, title: "تحديثات مستمرة", desc: "نضمن لك أحدث التقنيات وأعلى مستويات الأمان.", color: "#e879f9" },
  { Icon: Rocket, title: "تنفيذ سريع", desc: "من الفكرة إلى الإطلاق بأعلى كفاءة وجودة.", color: "#f59e0b" },
];

const services: Service[] = [
  {
    Icon: Code2,
    titleAr: "تطوير الأنظمة المخصصة",
    titleEn: "Custom Software Development",
    desc: "نبني أنظمة قوية ومرنة مصممة خصيصاً لتلبية متطلبات عملك الفريدة.",
    tags: ["ويب", "أنظمة داخلية", "قواعد بيانات"],
    color: "#a855f7",
    badge: "الأكثر طلباً",
  },
  {
    Icon: ShoppingBag,
    titleAr: "متاجر إلكترونية",
    titleEn: "E-Commerce Solutions",
    desc: "نصمم متاجر احترافية لتزيد المبيعات وتوفر تجربة تسوق استثنائية.",
    tags: ["متاجر متكاملة", "بوابات دفع", "SEO"],
    color: "#00d4ff",
  },
  {
    Icon: Smartphone,
    titleAr: "تطبيقات الجوال",
    titleEn: "Mobile Applications",
    desc: "تطبيقات iOS و Android عالية الأداء وتجربة مستخدم سلسة.",
    tags: ["iOS", "Android", "React Native"],
    color: "#e879f9",
  },
  {
    Icon: BrainCircuit,
    titleAr: "الذكاء الاصطناعي",
    titleEn: "AI & Machine Learning",
    desc: "حلول ذكية تعتمد على الذكاء الاصطناعي لتحليل البيانات واتخاذ قرارات أفضل.",
    tags: ["تعلم آلي", "تحليل بيانات", "نماذج تنبؤية"],
    color: "#22c55e",
    badge: "مميز",
  },
  {
    Icon: ShieldCheck,
    titleAr: "الأمن السيبراني",
    titleEn: "Cybersecurity",
    desc: "حماية بياناتك وأنظمتك من التهديدات السيبرانية بأحدث التقنيات.",
    tags: ["اختبار اختراق", "أمن الشبكات", "استجابة للحوادث"],
    color: "#ef4444",
  },
  {
    Icon: Cloud,
    titleAr: "الحلول السحابية",
    titleEn: "Cloud Solutions",
    desc: "نشر وإدارة حلولك على السحابة بأمان وموثوقية عالية.",
    tags: ["AWS", "Azure", "Google Cloud"],
    color: "#38bdf8",
  },
  {
    Icon: Palette,
    titleAr: "تصميم واجهات وتجربة المستخدم",
    titleEn: "UI/UX Design",
    desc: "تصميم واجهات عصرية وتجارب مستخدم تفاعلية تركز على العميل.",
    tags: ["UI Design", "UX Research", "Prototyping"],
    color: "#f59e0b",
  },
  {
    Icon: Workflow,
    titleAr: "تكامل الأنظمة والأتمتة",
    titleEn: "System Integration & Automation",
    desc: "ربط الأنظمة وأتمتة العمليات لزيادة الكفاءة وتقليل التكاليف التشغيلية.",
    tags: ["API Integration", "Automation", "Workflows"],
    color: "#c084fc",
  },
];

const stats: Feature[] = [
  { Icon: Boxes, title: "حلول قابلة للتوسع", desc: "تنمو مع نمو أعمالك.", color: "#a855f7" },
  { Icon: Headset, title: "دعم 24/7", desc: "متواصل على مدار الساعة.", color: "#00d4ff" },
  { Icon: Smile, title: "+98% رضا العملاء", desc: "شهادات من شركاء نجاحنا.", color: "#e879f9" },
  { Icon: Trophy, title: "+120 مشروع", desc: "مكتمل بنجاح وتسليم في الموعد.", color: "#22c55e" },
];

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        badge="خدماتنا"
        titleTop="خدمات برمجية"
        titleBottom="شاملة ومتكاملة"
        lead="نقدم حلولاً رقمية متقدمة ومخصصة تدعم أعمالك وتدفع نموك إلى المستوى التالي — من الفكرة إلى التنفيذ. نحن نبني مستقبل أعمالك."
        art={<ServicesArt />}
      />

      <FeatureStrip items={promises} />

      <section className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.titleAr} service={s} />
          ))}
        </div>
      </section>

      <div className="mt-14">
        <FeatureStrip items={stats} />
      </div>

      <CtaBand
        title="هل تحتاج خدمة مخصصة؟"
        desc="ناقش مشروعك واحتياجاتك لنبني الحل الأنسب لتحقيق أهدافك وتحويل فكرتك إلى واقع."
      />
    </main>
  );
}
