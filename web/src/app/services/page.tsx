import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "خدماتنا",
  description: "خدمات ZAWAN البرمجية — تطوير أنظمة مخصصة، متاجر إلكترونية، تطبيقات جوال، حلول سحابية وأمن سيبراني.",
};

const services = [
  {
    icon: "💻",
    title: "تطوير الأنظمة المخصصة",
    desc: "نبني أنظمة برمجية مصممة خصيصاً لاحتياجات عملك من الصفر، مع ضمان الجودة والأداء العالي.",
    features: ["تحليل المتطلبات", "تصميم المعمارية", "تطوير الواجهات", "اختبار الجودة"],
    color: "#8b5cf6",
  },
  {
    icon: "🛍️",
    title: "متاجر إلكترونية",
    desc: "منصات تجارة إلكترونية متكاملة مع بوابات الدفع وإدارة المخزون والتوصيل.",
    features: ["بوابات دفع آمنة", "إدارة المنتجات", "تقارير المبيعات", "واجهة احترافية"],
    color: "#06b6d4",
  },
  {
    icon: "📱",
    title: "تطبيقات الجوال",
    desc: "تطبيقات iOS و Android عالية الأداء بتجربة مستخدم سلسة وتصميم عصري.",
    features: ["React Native", "تكامل API", "إشعارات فورية", "وضع عدم الاتصال"],
    color: "#f59e0b",
  },
  {
    icon: "☁️",
    title: "الحلول السحابية",
    desc: "نشر وإدارة تطبيقاتك على البنية التحتية السحابية بأمان وأداء عالٍ.",
    features: ["Docker & Kubernetes", "AWS / Oracle Cloud", "CI/CD Pipeline", "مراقبة 24/7"],
    color: "#22c55e",
  },
  {
    icon: "🔒",
    title: "الأمن السيبراني",
    desc: "حماية أنظمتك وبياناتك من التهديدات الإلكترونية بأحدث تقنيات الأمن.",
    features: ["تقييم الأمن", "اختبار الاختراق", "تشفير البيانات", "جدران الحماية"],
    color: "#ef4444",
  },
  {
    icon: "🤖",
    title: "الذكاء الاصطناعي",
    desc: "دمج تقنيات الذكاء الاصطناعي في أنظمتك لأتمتة العمليات وتحسين الكفاءة.",
    features: ["تحليل البيانات", "نماذج التنبؤ", "معالجة اللغة", "الأتمتة الذكية"],
    color: "#a855f7",
  },
];

export default function ServicesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="mx-auto max-w-2xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/25 bg-[#8b5cf6]/10 px-4 py-1.5 text-sm font-semibold text-[#a78bfa]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" />
          خدماتنا
        </div>
        <h1 className="text-[clamp(1.8rem,5vw,3rem)] font-black leading-tight">
          خدمات برمجية <span className="text-gradient">شاملة ومتكاملة</span>
        </h1>
        <p className="mt-4 text-[--color-muted]">
          نقدم طيفاً واسعاً من الخدمات البرمجية لتلبية كل احتياجات عملك الرقمي
        </p>
      </header>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <article
            key={s.title}
            className="card-surface flex flex-col rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-[#8b5cf6]/40"
          >
            <div
              className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
              style={{ background: `${s.color}18`, border: `1px solid ${s.color}33` }}
            >
              {s.icon}
            </div>
            <h2 className="text-lg font-bold">{s.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-7 text-[--color-muted]">{s.desc}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {s.features.map((f) => (
                <li
                  key={f}
                  className="rounded-lg px-2.5 py-1 text-[11px]"
                  style={{ background: `${s.color}14`, border: `1px solid ${s.color}2b`, color: s.color }}
                >
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className="mt-6 text-sm font-bold transition-opacity hover:opacity-80"
              style={{ color: s.color }}
            >
              اطلب الخدمة ←
            </Link>
          </article>
        ))}
      </div>

      <section className="card-surface mx-auto mt-16 max-w-3xl rounded-3xl p-8 text-center lg:p-12">
        <h2 className="text-[clamp(1.4rem,3vw,2rem)] font-bold">هل تحتاج خدمة مخصصة؟</h2>
        <p className="mt-3 text-[--color-muted]">
          تواصل معنا وسنصمم لك الحل المناسب لاحتياجات عملك
        </p>
        <Link
          href="/contact"
          className="mt-7 inline-block rounded-xl bg-gradient-to-br from-[#8b5cf6] to-[#d844ff] px-8 py-3.5 font-extrabold transition-transform hover:scale-[1.03]"
        >
          تواصل معنا الآن ←
        </Link>
      </section>
    </main>
  );
}
