import Link from 'next/link';
import { ArrowLeft, Code2, Headphones, Rocket, Search, UserCheck } from 'lucide-react';
import CitySvg from '@/components/ui/CitySvg';

const steps = [
  { n: '01', title: 'تواصل معنا',       text: 'اخبرنا عن احتياجك',       icon: Search     },
  { n: '02', title: 'اختيار وتسليم',    text: 'تنفيذ وتسليم النظام',     icon: UserCheck  },
  { n: '03', title: 'تصميم وتطوير',     text: 'نطور نظامك المخصص',       icon: Code2      },
  { n: '04', title: 'تحليل المتطلبات', text: 'نفهم احتياجات عملك',      icon: Rocket     },
  { n: '05', title: 'دعم وتطوير',       text: 'نستمر بدعمك وتطويرك',    icon: Headphones },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden hero-grid bg-[#03040b] px-6 py-5 text-white lg:px-10">

      {/* ── Navbar ── */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl">
        <div className="flex items-center gap-3" dir="ltr">
          <div className="grid h-14 w-14 place-items-center rounded-xl border border-purple-500/80 text-2xl font-bold text-purple-300 glow">
            04
          </div>
          <div className="flex items-center gap-2 text-xl font-extrabold">
            <span className="text-4xl text-purple-500">Z</span>
            <span>ZAWAN</span>
          </div>
        </div>

        <div className="hidden items-center gap-9 text-sm font-semibold text-white/85 md:flex">
          {['الرئيسية','الأنظمة','المشاريع','الأسعار','من نحن','المدونة','تواصل معنا'].map(x => (
            <a key={x} href="#" className="hover:text-purple-300 transition-colors">{x}</a>
          ))}
        </div>

        <Link
          href="/products"
          className="rounded-lg bg-gradient-to-l from-purple-600 to-violet-500 px-6 py-3 text-sm font-bold shadow-[0_0_25px_rgba(139,54,255,.35)] hover:brightness-110 transition"
        >
          جرّب الأنظمة
        </Link>
      </nav>

      {/* ── Hero ── */}
      <section className="mx-auto grid max-w-7xl items-center gap-8 py-16 lg:grid-cols-2 lg:py-20">

        {/* City (left) */}
        <div className="order-2 h-[430px] lg:order-1">
          <CitySvg />
        </div>

        {/* Text (right) */}
        <div className="order-1 text-right lg:order-2">
          <span className="mb-7 inline-block rounded-xl border border-purple-500/35 bg-white/5 px-5 py-2 text-sm font-bold text-purple-300">
            حلول برمجية متكاملة
          </span>

          <h1 className="max-w-2xl text-4xl font-black leading-[1.35] md:text-6xl">
            من فكرة إلى نظام متكامل
            <br/>
            نحن نبرمج{' '}
            <span className="bg-gradient-to-l from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              النجاح
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-9 text-white/65">
            نقدم أنظمة برمجية متكاملة تلبي احتياجات عملك وتساعدك على النمو والتوسع بثقة.
          </p>

          <div className="mt-9 flex flex-wrap justify-end gap-5">
            <Link
              href="/products"
              className="rounded-xl bg-gradient-to-l from-purple-600 to-violet-500 px-9 py-4 font-extrabold shadow-[0_0_28px_rgba(139,54,255,.42)] hover:brightness-110 transition"
            >
              استعرض الأنظمة
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-3 rounded-xl border border-purple-500/70 bg-white/5 px-8 py-4 font-extrabold hover:bg-purple-500/10 transition"
            >
              تواصل معنا <ArrowLeft size={18}/>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Steps ── */}
      <section className="mx-auto max-w-7xl pb-8">
        <h2 className="mb-5 text-center text-2xl font-black">حياة أسهل مع أنظمة ZAWAN</h2>
        <div className="rounded-2xl border border-white/15 bg-white/[.045] px-5 py-7 shadow-[inset_0_0_55px_rgba(139,54,255,.10)] backdrop-blur">
          <div className="grid gap-6 md:grid-cols-5" dir="rtl">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.n} className="relative text-center">
                  {i < steps.length - 1 && (
                    <ArrowLeft className="absolute left-[-18px] top-9 hidden text-white/35 md:block" size={18}/>
                  )}
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/10 text-purple-200">
                    <Icon size={22}/>
                  </div>
                  <h3 className="mt-4 font-extrabold">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/55">{s.text}</p>
                  <div className="mx-auto mt-4 grid h-8 w-8 place-items-center rounded-full bg-purple-600 text-xs font-black shadow-[0_0_18px_rgba(139,54,255,.6)]">
                    {s.n}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
