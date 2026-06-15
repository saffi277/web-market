import Link from 'next/link';
import ZawanVisual from '@/components/ui/ZawanVisual';

const nav = ['الرئيسية','الأنظمة','المشاريع','الأسعار','من نحن','المدونة','تواصل معنا'];

const steps = [
  ['01', 'تواصل معنا',       'اخبرنا عن احتياجك',      '⌕'],
  ['02', 'اختبار وتسليم',    'تنفيذ وتسليم النظام',    '♙'],
  ['03', 'تصميم وتطوير',     'نطور نظامك المخصص',      '⌘'],
  ['04', 'تحليل المتطلبات', 'نفهم احتياجات عملك',     '✦'],
  ['05', 'دعم وتطوير',       'نستمر بدعمك وتطويرك',   '☏'],
];

export default function Home() {
  return (
    <main className="bg-grid min-h-screen px-5 py-6 text-white">
      <section className="mx-auto max-w-[1180px]">

        {/* ── Navbar ── */}
        <header className="flex items-center justify-between gap-6" dir="ltr">
          <div className="flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-xl border border-purple-400 text-2xl font-black text-white shadow-[0_0_24px_rgba(168,85,247,.45)]">
              04
            </div>
            <div className="flex items-center gap-2 text-2xl font-black">
              <span className="text-4xl text-fuchsia-500">Z</span>
              <span>ZAWAN</span>
            </div>
          </div>

          <nav className="hidden items-center gap-9 text-sm font-bold text-white/90 md:flex" dir="rtl">
            {nav.map(item => <a key={item} href="#" className="hover:text-purple-300 transition-colors cursor-pointer">{item}</a>)}
          </nav>

          <Link href="/products" className="rounded-lg bg-gradient-to-l from-fuchsia-600 to-violet-600 px-6 py-3 text-sm font-bold glow hover:brightness-110 transition">
            جرّب الأنظمة
          </Link>
        </header>

        {/* ── Hero ── */}
        <div className="grid min-h-[620px] items-center gap-8 pt-10 lg:grid-cols-[1fr_1fr]" dir="rtl">
          <div className="max-w-[560px] justify-self-end text-right">
            <div className="mb-7 inline-flex rounded-xl border border-purple-400/60 bg-purple-500/10 px-5 py-2 text-sm font-bold text-purple-200">
              حلول برمجية متكاملة
            </div>
            <h1 className="text-5xl font-black leading-[1.32] md:text-6xl">
              من فكرة إلى نظام متكامل
              <br/>
              نحن نبرمج{' '}
              <span className="bg-gradient-to-l from-fuchsia-400 to-purple-500 bg-clip-text text-transparent neon-text">
                النجاح
              </span>
            </h1>
            <p className="mt-6 max-w-[500px] text-lg leading-9 text-white/70">
              نقدم أنظمة برمجية متكاملة تلبي احتياجات عملك وتساعدك على النمو والتوسع بثقة.
            </p>
            <div className="mt-10 flex justify-start gap-5">
              <Link href="/products" className="rounded-xl bg-gradient-to-l from-fuchsia-600 to-violet-600 px-9 py-4 font-black glow hover:brightness-110 transition">
                استعرض الأنظمة
              </Link>
              <Link href="/contact" className="rounded-xl border border-purple-400/80 px-9 py-4 font-black text-white hover:bg-purple-500/10 transition">
                تواصل معنا ←
              </Link>
            </div>
          </div>

          <div className="-mr-6 lg:-mr-16">
            <ZawanVisual />
          </div>
        </div>

        {/* ── Steps ── */}
        <h2 className="mb-5 text-center text-2xl font-black">حياة أسهل مع أنظمة ZAWAN</h2>
        <div className="soft-card rounded-2xl border border-purple-300/20 px-8 py-7 shadow-[0_0_45px_rgba(120,70,255,.12)]">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5" dir="rtl">
            {steps.map(([num, title, desc, icon]) => (
              <div key={num} className="relative text-center">
                <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl border border-white/15 bg-white/10 text-2xl">
                  {icon}
                </div>
                <h3 className="font-black">{title}</h3>
                <p className="mt-2 text-sm text-white/55">{desc}</p>
                <div className="mx-auto mt-5 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-b from-fuchsia-500 to-violet-700 text-xs font-black shadow-[0_0_22px_rgba(168,85,247,.75)]">
                  {num}
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </main>
  );
}
