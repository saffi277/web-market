import Link from "next/link";
import { api } from "@/lib/api";
import type { System } from "@/lib/types";
import SystemCard from "@/components/SystemCard";

const services = [
  ["</>", "حلول برمجية متكاملة", "أنظمة مخصصة تلبي احتياجات أعمالك بدقة"],
  ["▣", "أنظمة قواعد البيانات", "تصميم قواعد بيانات قوية ومنظمة لإدارة بياناتك"],
  ["☁", "الحوسبة السحابية", "بناء ونشر أنظمة سحابية آمنة وقابلة للتوسع"],
  ["✺", "الذكاء الاصطناعي", "حلول ذكية تعتمد على تحليل البيانات والأتمتة"],
  ["▯", "تطبيقات الموبايل", "تطبيقات Android و iOS بتجربة استخدام عصرية"],
  ["◎", "تطوير المواقع", "واجهات ومواقع ويب سريعة وحديثة للشركات"],
];

const stats = [
  ["24/7", "دعم فني"],
  ["+5", "سنوات خبرة"],
  ["+120", "مشروع مكتمل"],
  ["+50", "عميل سعيد"],
];

const tech = ["Go", "Next.js", "React", "TypeScript", "PostgreSQL", "Docker", "AWS", "Flutter"];

async function getFeatured(): Promise<System[]> {
  try {
    const all = await api<System[]>("/systems", { revalidate: 60 });
    return all.slice(0, 3);
  } catch {
    return [];
  }
}

export default async function Home() {
  const featured = await getFeatured();

  return (
    <main>
      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-12 pt-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:pb-20 lg:pt-20">
        <div className="animate-rise text-center lg:text-right">
          <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-[#c55cff]/30 bg-[#8536ff]/10 px-4 py-2 text-sm font-bold text-[#dca8ff]">
            <span className="h-2 w-2 rounded-full bg-[#d844ff] shadow-[0_0_14px_#d844ff]" />
            نحو مستقبل رقمي أفضل
          </div>

          <h1 className="text-[clamp(2rem,6vw,4.2rem)] font-black leading-[1.2] tracking-tight">
            نبني أنظمة رقمية
            <br />
            تدفع أعمالك إلى <span className="text-gradient">الأمام</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-[#cbc6d3] lg:mx-0 lg:text-lg">
            نقدم حلول برمجية متكاملة تساعد الشركات على النمو والتوسع من خلال التكنولوجيا
            والابتكار — وتقدر تجرّب النظام قبل ما تشتريه.
          </p>

          <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/systems"
              className="rounded-xl bg-gradient-to-br from-[#7c3cff] to-[#d844ff] px-7 py-3.5 text-center font-extrabold shadow-[0_16px_40px_rgba(132,45,255,0.3)] transition-transform hover:scale-[1.02]"
            >
              استعرض الأنظمة ←
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-[#bc67ff]/40 bg-black/25 px-7 py-3.5 text-center font-extrabold transition-colors hover:border-[#bc67ff]/70"
            >
              ابدأ مشروعك ↗
            </Link>
          </div>
        </div>

        <div className="relative min-h-[260px] lg:min-h-[380px]" aria-hidden>
          <div
            dir="ltr"
            className="pointer-events-none select-none bg-gradient-to-l from-white/[0.02] to-[#9543ff]/25 bg-clip-text text-center text-[clamp(3.5rem,14vw,10.5rem)] font-black leading-none tracking-tighter text-transparent drop-shadow-[0_0_50px_rgba(117,51,255,0.25)] lg:text-right"
          >
            ZAWAN
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4 lg:mt-12">
            {stats.map(([value, label]) => (
              <div key={label} className="border-r border-white/10 pr-4 text-center lg:text-right">
                <dt className="text-2xl font-black text-[#b35bff] lg:text-3xl">{value}</dt>
                <dd className="mt-1.5 text-xs text-[--color-muted] lg:text-sm">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="card-surface grid overflow-hidden rounded-3xl shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {services.map(([icon, title, desc]) => (
            <article
              key={title}
              className="group border-b border-white/[0.07] p-7 text-center transition-colors last:border-b-0 hover:bg-[#8a3fff]/10 sm:border-l xl:border-b-0"
            >
              <div className="mb-5 text-4xl text-[#a85cff] drop-shadow-[0_0_14px_rgba(168,92,255,0.6)]">
                {icon}
              </div>
              <h3 className="mb-3 text-lg font-bold">{title}</h3>
              <p className="text-sm leading-7 text-[--color-muted]">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Featured systems */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black lg:text-3xl">
                أنظمة <span className="text-gradient">جاهزة للعمل</span>
              </h2>
              <p className="mt-2 text-sm text-[--color-muted]">
                اختر النظام المناسب لعملك — وجرّبه قبل الشراء
              </p>
            </div>
            <Link href="/systems" className="text-sm font-bold text-[#c084fc] hover:text-white">
              عرض الكل ←
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s) => (
              <SystemCard key={s.id} system={s} />
            ))}
          </div>
        </section>
      )}

      {/* Tech marquee */}
      <section className="overflow-hidden pt-20">
        <p className="mb-6 text-center text-sm text-[#777082]">
          نستخدم أحدث التقنيات لبناء أفضل الحلول
        </p>
        <div className="flex w-max gap-14 whitespace-nowrap text-xl font-extrabold text-[#8c8598] [animation:marquee_24s_linear_infinite]" dir="ltr">
          {[...tech, ...tech].map((t, i) => (
            <span key={`${t}-${i}`}>{t}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
