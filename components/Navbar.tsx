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
      <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', direction: 'ltr', gap: '1px' }}>
        <span style={{
          fontSize: '32px', fontWeight: 900, lineHeight: 1,
          background: 'linear-gradient(135deg,#7c3cff,#d844ff)',
          WebkitBackgroundClip: 'text', color: 'transparent',
          filter: 'drop-shadow(0 0 12px rgba(168,85,247,.6))',
        }}>Z</span>
        <span style={{ fontSize: '20px', fontWeight: 800, color: '#fff', letterSpacing: '2px', paddingTop: '6px' }}>AWAN</span>
      </Link>
    </header>
  );
}
