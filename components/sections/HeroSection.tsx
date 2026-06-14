import Link from 'next/link';
import CityScene from '@/components/ui/CityScene';

export default function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'var(--bg)', height: '100vh', minHeight: 640 }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 30% 55%, rgba(91,33,182,.25) 0%, transparent 65%)' }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(139,92,246,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,.03) 1px,transparent 1px)',
          backgroundSize: '55px 55px',
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%)',
        }}
      />

      {/* Two-column layout: city LEFT, text RIGHT */}
      <div
        className="relative z-10 h-full max-w-[1300px] mx-auto px-6"
        style={{ direction: 'ltr', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', paddingTop: 64 }}
      >
        {/* LEFT: City fills full column height */}
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <CityScene />
        </div>

        {/* RIGHT: Text */}
        <div
          className="flex flex-col gap-6"
          style={{ direction: 'rtl', paddingRight: '1rem' }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 text-sm w-fit rounded-full"
            style={{ border: '1px solid rgba(139,92,246,.38)', color: '#A78BFA', background: 'rgba(139,92,246,.07)' }}
          >
            حلول برمجية متكاملة
          </span>

          <h1 className="font-black leading-snug text-white" style={{ fontSize: 'clamp(2rem,3.5vw,3.2rem)' }}>
            من فكرة إلى نظام متكامل
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #C084FC, #A855F7)' }}
            >
              نحن نبرمج النجاح
            </span>
          </h1>

          <p className="text-slate-400 leading-loose" style={{ fontSize: '1rem', maxWidth: 400 }}>
            نقدم أنظمة برمجية متكاملة تلبي احتياجات عملك
            <br />
            وتساعدك على النمو والتوسع بثقة
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-lg text-[.93rem] font-medium transition-all duration-300 hover:-translate-y-0.5"
              style={{ border: '1px solid rgba(139,92,246,.32)', background: 'rgba(139,92,246,.07)' }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81A19.79 19.79 0 01.4 1.11 2 2 0 012 .94h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
              </svg>
              تواصل معنا
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-lg text-[.93rem] font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{ background: 'linear-gradient(135deg, #8B5CF6, #7C3AED)', boxShadow: '0 4px 22px rgba(139,92,246,.35)' }}
            >
              استعرض الأنظمة
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
