import type { Metadata } from "next";
import Link from "next/link";
import { Target, Eye, Rocket, ShieldCheck, Users, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "ZAWAN للأنظمة والبرمجيات — فريق عراقي يبني أنظمة برمجية متقدمة تساعد الشركات على النمو والتحول الرقمي.",
};

const values = [
  { Icon: ShieldCheck, title: "الجودة أولاً", desc: "كل نظام يمر باختبارات دقيقة قبل التسليم، ونضمن استقراره بعد الإطلاق.", color: "#22c55e" },
  { Icon: Zap, title: "السرعة في التنفيذ", desc: "منهجية عمل واضحة تختصر الوقت من الفكرة إلى نظام يعمل فعلياً.", color: "#f59e0b" },
  { Icon: Users, title: "شراكة لا صفقة", desc: "نبقى معك بعد التسليم — تدريب ودعم فني وتطوير مستمر.", color: "#00d4ff" },
];

const team = [
  { role: "تطوير الواجهات", count: "Frontend", desc: "واجهات سريعة ومتجاوبة بتجربة استخدام عصرية" },
  { role: "هندسة الخوادم", count: "Backend", desc: "أنظمة خلفية قوية وآمنة تتحمل النمو" },
  { role: "تصميم المنتج", count: "Design", desc: "تصميم يعبّر عن هوية عملك ويسهّل الاستخدام" },
  { role: "الدعم والتشغيل", count: "DevOps", desc: "نشر ومراقبة وصيانة على مدار الساعة" },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="mx-auto max-w-2xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/25 bg-[#8b5cf6]/10 px-4 py-1.5 text-sm font-semibold text-[#a78bfa]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#8b5cf6]" />
          من نحن
        </div>
        <h1 className="text-[clamp(1.8rem,5vw,3rem)] font-black leading-tight">
          نبني البرمجيات <span className="text-gradient">التي تبني الأعمال</span>
        </h1>
        <p className="mt-4 leading-8 text-[--color-muted]">
          ZAWAN شركة عراقية متخصصة في تطوير الأنظمة البرمجية. نساعد الشركات على أتمتة
          عملياتها والانتقال رقمياً بأنظمة مصممة خصيصاً لطبيعة عملها.
        </p>
      </header>

      {/* vision & mission */}
      <section id="vision" className="mt-14 grid gap-5 lg:grid-cols-2">
        {[
          { Icon: Eye, title: "رؤيتنا", desc: "أن نكون الخيار الأول للشركات في العراق والمنطقة عندما يتعلق الأمر بأنظمة برمجية يُعتمد عليها، وأن يصبح التحول الرقمي في متناول كل عمل مهما كان حجمه.", color: "#a855f7" },
          { Icon: Target, title: "رسالتنا", desc: "نحوّل احتياجات عملك إلى أنظمة عملية تختصر الوقت وتقلل الأخطاء وترفع الإنتاجية — بجودة عالية وسعر عادل ودعم لا ينقطع.", color: "#00d4ff" },
        ].map(({ Icon, title, desc, color }) => (
          <article key={title} className="panel rounded-2xl p-7">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-2xl"
              style={{ background: `${color}1a`, border: `1px solid ${color}3d` }}
            >
              <Icon size={22} style={{ color }} />
            </span>
            <h2 className="mt-5 text-xl font-bold">{title}</h2>
            <p className="mt-3 leading-8 text-[--color-muted]">{desc}</p>
          </article>
        ))}
      </section>

      {/* values */}
      <section className="mt-16">
        <h2 className="text-center text-[clamp(1.3rem,3vw,2rem)] font-black">
          ما الذي <span className="text-gradient">يميّزنا</span>
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {values.map(({ Icon, title, desc, color }) => (
            <article key={title} className="panel rounded-2xl p-6 transition-transform hover:-translate-y-1">
              <span
                className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: `${color}1a`, border: `1px solid ${color}3d` }}
              >
                <Icon size={19} style={{ color }} />
              </span>
              <h3 className="mt-4 font-bold">{title}</h3>
              <p className="mt-2.5 text-sm leading-7 text-[--color-muted]">{desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* team */}
      <section id="team" className="mt-16">
        <h2 className="text-center text-[clamp(1.3rem,3vw,2rem)] font-black">فريق العمل</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-7 text-[--color-muted]">
          فريق متكامل يغطي دورة حياة النظام من التصميم حتى التشغيل
        </p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((t) => (
            <article key={t.role} className="panel rounded-2xl p-6 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-[#c084fc]" dir="ltr">
                {t.count}
              </p>
              <h3 className="mt-3 font-bold">{t.role}</h3>
              <p className="mt-2.5 text-sm leading-7 text-[--color-muted]">{t.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* cta */}
      <section className="panel mt-16 rounded-2xl p-8 text-center lg:p-12">
        <h2 className="text-[clamp(1.3rem,3vw,2rem)] font-black">جاهز تبدأ مشروعك؟</h2>
        <p className="mt-3 text-[--color-muted]">خلّينا نسمع فكرتك ونحوّلها لنظام يشتغل</p>
        <Link
          href="/contact"
          className="mt-7 inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-l from-[#7c3cff] to-[#c13cff] px-8 py-3.5 font-extrabold transition-transform hover:scale-[1.03]"
        >
          <Rocket size={18} />
          تواصل معنا الآن
        </Link>
      </section>
    </main>
  );
}
