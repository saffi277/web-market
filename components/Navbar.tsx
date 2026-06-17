'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'الرئيسية' },
  { href: '/products', label: 'الأنظمة' },
  { href: '/services', label: 'خدماتنا' },
  { href: '/contact', label: 'تواصل معنا' },
];

export default function Navbar() {
  const rawPath = usePathname();
  const path = rawPath.replace(/\/$/, '') || '/';
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: '96px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 min(64px, 4vw)',
      background: 'rgba(5,4,11,.97)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(170,88,255,.14)',
      overflow: 'visible',
    }}>
      {/* زر ابدأ مشروعك */}
      <Link href="/contact" style={{
        border: '1px solid rgba(199,109,255,.55)',
        background: 'linear-gradient(135deg,#7c3cff,#d844ff)',
        color: 'white', borderRadius: '14px', padding: '14px 26px',
        fontWeight: 900, textDecoration: 'none', fontSize: '15px',
        boxShadow: '0 0 28px rgba(168,85,247,.35)',
      }}>ابدأ مشروعك ↗</Link>

      {/* روابط */}
      <nav style={{ display: 'flex', gap: '44px', fontSize: '16px', fontWeight: 700 }}>
        {links.map(({ href, label }) => {
          const active = href === '/' ? path === '/' : path === href || path.startsWith(href + '/');
          return (
            <Link key={href} href={href} style={{
              color: 'white', textDecoration: 'none',
              opacity: active ? 1 : 0.75,
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
            }}>
              {label}
              <span style={{
                display: 'block', height: '2px', width: '70px',
                background: active ? 'linear-gradient(90deg, transparent, #d844ff, transparent)' : 'transparent',
                boxShadow: active ? '0 0 14px #d844ff' : 'none',
                borderRadius: '2px',
                transition: 'all 0.2s ease',
              }} />
            </Link>
          );
        })}
      </nav>

      {/* اللوغو */}
      <Link href="/" style={{ textDecoration: 'none', direction: 'ltr' }}>
        <svg width="130" height="52" viewBox="0 0 130 52" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="gold1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c084fc"/>
              <stop offset="35%" stopColor="#a855f7"/>
              <stop offset="60%" stopColor="#d844ff"/>
              <stop offset="100%" stopColor="#e879f9"/>
            </linearGradient>
            <linearGradient id="swoosh" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7c3cff" stopOpacity="0"/>
              <stop offset="40%" stopColor="#a855f7"/>
              <stop offset="70%" stopColor="#d844ff"/>
              <stop offset="100%" stopColor="#7c3cff" stopOpacity="0"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          {/* Swoosh line */}
          <path d="M 8 38 Q 65 44 122 34" stroke="url(#swoosh)" strokeWidth="1.5" fill="none" opacity="0.8"/>
          <path d="M 12 41 Q 65 48 118 38" stroke="url(#swoosh)" strokeWidth="0.7" fill="none" opacity="0.5"/>
          {/* Star sparkle */}
          <g filter="url(#glow)" transform="translate(108,7)">
            <path d="M0,-6 L1.2,-1.2 L6,0 L1.2,1.2 L0,6 L-1.2,1.2 L-6,0 L-1.2,-1.2 Z" fill="#e879f9"/>
          </g>
          {/* Zawan text */}
          <text
            x="8" y="34"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="34"
            fontStyle="italic"
            fontWeight="bold"
            fill="url(#gold1)"
            filter="url(#glow)"
            letterSpacing="-0.5"
          >Zawan</text>
        </svg>
      </Link>
    </header>
  );
}
