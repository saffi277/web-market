import Link from 'next/link';
import { ArrowLeft, Boxes, ClipboardCheck, Code2, Headphones, Search, UserRoundCheck } from 'lucide-react';
import CitySvg from '@/components/ui/CitySvg';

const nav = ['الرئيسية','الأنظمة','المشاريع','الأسعار','من نحن','المدونة','تواصل معنا'];

const steps = [
  { n: '01', title: 'تواصل معنا',       text: 'اخبرنا عن احتياجك',      icon: Search         },
  { n: '02', title: 'اختبار وتسليم',    text: 'تنفيذ وتسليم النظام',    icon: UserRoundCheck  },
  { n: '03', title: 'تصميم وتطوير',     text: 'نطور نظامك المخصص',      icon: Code2           },
  { n: '04', title: 'تحليل المتطلبات', text: 'نفهم احتياجات عملك',     icon: Boxes           },
  { n: '05', title: 'دعم وتطوير',       text: 'نستمر بدعمك وتطويرك',   icon: Headphones      },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03040b] text-white hero-grid">
      {/* Glow blobs */}
      <div className="pointer-events-none absolute left-[17%] top-[20%] h-[520px] w-[520px] rounded-full bg-purple-700/10 blur-[110px]" />
      <div className="pointer-events-none absolute right-[10%] top-[10%] h-[420px] w-[420px] rounded-full bg-fuchsia-500/5 blur-[130px]" />

      {/* ── Navbar ── */}
      <header className="relative z-20 mx-auto flex h-[90px] max-w-[1420px] items-center justify-between px-10" dir="ltr">
        <div className="flex items-center gap-4">
          <div className="grid h-[54px] w-[54px] place-items-center rounded-xl border border-purple-400/90 bg-[#090616]/70 text-[24px] font-black text-purple-200 glow-box">
            04
          </div>
          <div className="flex items-center gap-2 font-black tracking-tight">
            <span className="text-[34px] leading-none text-purple-500">Z</span>
            <span className="text-[20px]">ZAWAN</span>
          </div>
        </div>

        <nav className="hidden items-center gap-10 text-[13px] font-bold text-white/90 lg:flex" dir="rtl">
          {nav.map(item => (
            <a key={item} href="#" className="transition hover:text-purple-300">{item}</a>
          ))}
        </nav>

        <Link
          href="/products"
          className="rounded-lg bg-gradient-to-l from-[#a626ff] to-[#7032ff] px-7 py-3 text-[13px] font-black shadow-[0_0_28px_rgba(158,47,255,.55)] hover:brightness-110 transition"
        >
          جرّب الأنظمة
        </Link>
      </header>

      {/* ── Hero ── */}
      <section className="relative z-10 mx-auto grid max-w-[1420px] grid-cols-1 items-center gap-8 px-10 pt-8 lg:grid-cols-[1.05fr_.95fr] lg:pt-10" dir="ltr">
        <div className="relative h-[430px] lg:h-[455px]">
          <CitySvg />
        </div>

        <div className="text-right" dir="rtl">
          <span className="mb-8 inline-flex rounded-xl border border-purple-400/40 bg-white/[.035] px-5 py-2 text-[13px] font-bold text-purple-300">
            حلول برمجية متكاملة
          </span>
          <h1 className="text-[46px] font-black leading-[1.32] tracking-[-1px] md:text-[62px] lg:text-[66px]">
            من فكرة إلى نظام متكامل<br/>
            نحن نبرمج{' '}
            <span className="bg-gradient-to-l from-[#bc35ff] to-[#f06dff] bg-clip-text text-transparent">النجاح</span>
          </h1>
          <p className="mr-auto mt-6 max-w-[560px] text-[17px] font-medium leading-9 text-white/60">
            نقدم أنظمة برمجية متكاملة تلبي احتياجات عملك<br className="hidden md:block"/>
            وتساعدك على النمو والتوسع بثقة.
          </p>

          <div className="mt-9 flex flex-wrap justify-end gap-5">
            <Link
              href="/products"
              className="rounded-xl bg-gradient-to-l from-[#a626ff] to-[#7337ff] px-10 py-4 text-[15px] font-black shadow-[0_0_32px_rgba(158,47,255,.48)] hover:brightness-110 transition"
            >
              استعرض الأنظمة
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-xl border border-purple-400/75 bg-[#090616]/60 px-9 py-4 text-[15px] font-black transition hover:bg-purple-500/10"
            >
              تواصل معنا <ArrowLeft size={18}/>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Steps ── */}
      <section className="relative z-20 mx-auto max-w-[1420px] px-10 pb-10 pt-2">
        <h2 className="mb-4 text-center text-[24px] font-black">حياة أسهل مع أنظمة ZAWAN</h2>
        <div className="rounded-2xl border border-white/15 bg-[#11111c]/85 px-7 py-7 shadow-[0_0_45px_rgba(102,45,255,.14),inset_0_0_55px_rgba(255,255,255,.025)] backdrop-blur-xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5" dir="rtl">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.n} className="relative text-center">
                  {index < steps.length - 1 && (
                    <ArrowLeft className="absolute left-[-24px] top-[42px] hidden text-white/35 md:block" size={18}/>
                  )}
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/10 text-purple-100 shadow-[inset_0_0_18px_rgba(255,255,255,.06)]">
                    <Icon size={22} strokeWidth={1.8}/>
                  </div>
                  <h3 className="mt-4 text-[15px] font-black">{step.title}</h3>
                  <p className="mt-2 text-[13px] font-medium text-white/45">{step.text}</p>
                  <div className="mx-auto mt-4 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-b from-[#c234ff] to-[#7b22ff] text-[11px] font-black shadow-[0_0_20px_rgba(168,85,247,.8)]">
                    {step.n}
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
