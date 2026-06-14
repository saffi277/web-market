import Link from 'next/link';
import CityScene from '@/components/ui/CityScene';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden text-white" style={{ background: '#050008' }}>

      {/* Radial glows */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(circle at 70% 25%, rgba(168,85,247,.28), transparent 34%), radial-gradient(circle at 18% 78%, rgba(124,58,237,.22), transparent 32%)',
      }}/>

      {/* Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[.08]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)',
        backgroundSize: '72px 72px',
      }}/>

      {/* Main grid: text LEFT (RTL), city RIGHT */}
      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-88px)] max-w-7xl items-center gap-10 px-6 pb-16 pt-24 lg:grid-cols-[1.05fr_.95fr]">

        {/* LEFT: Text + products */}
        <div style={{ direction: 'rtl' }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-white/5 px-4 py-2 text-sm text-purple-100 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-purple-300" style={{ boxShadow: '0 0 15px rgba(216,180,254,.9)' }}/>
            حلول برمجية متكاملة
          </div>

          <h1 className="max-w-2xl font-black leading-tight tracking-tight" style={{ fontSize: 'clamp(2.4rem,5vw,4.2rem)' }}>
            من فكرة إلى
            <span className="block bg-gradient-to-r from-purple-200 via-fuchsia-300 to-purple-500 bg-clip-text text-transparent">
              نظام متكامل
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-9" style={{ color: 'rgba(255,255,255,.72)' }}>
            نحن في <b className="text-purple-200">ZAWAN</b> نبني أنظمة ومواقع وتطبيقات تساعد الشركات على البيع، الإدارة، والنمو بثقة.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row" style={{ direction: 'rtl' }}>
            <Link
              href="/products"
              className="rounded-2xl px-7 py-4 text-center font-bold transition hover:brightness-110"
              style={{ background: '#a855f7', boxShadow: '0 0 35px rgba(168,85,247,.55)' }}
            >
              استعرض الأنظمة
            </Link>
            <Link
              href="/contact"
              className="rounded-2xl border border-purple-300/30 bg-white/5 px-7 py-4 text-center font-bold text-purple-100 backdrop-blur transition hover:bg-white/10"
            >
              تواصل معنا
            </Link>
          </div>
        </div>

        {/* RIGHT: City */}
        <div className="relative mx-auto h-[520px] w-full max-w-[640px]">
          <div className="absolute inset-0 rounded-[3rem] border border-purple-300/15 bg-purple-500/5" />
          <CityScene />
        </div>
      </main>
    </section>
  );
}
