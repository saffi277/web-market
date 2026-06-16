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
  const path = usePathname();
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: '96px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 min(64px, 4vw)',
      background: 'rgba(5,4,11,.92)', backdropFilter: 'blur(20px)',
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
          const active = path === href;
          return (
            <Link key={href} href={href} style={{
              color: 'white', textDecoration: 'none', position: 'relative',
              paddingBottom: '8px', opacity: active ? 1 : 0.88,
            }}>
              {label}
              {active && (
                <span style={{
                  position: 'absolute', bottom: '-4px', left: '50%',
                  transform: 'translateX(-50%)',
                  width: '90px', height: '2px',
                  background: 'linear-gradient(90deg, transparent, #d844ff, transparent)',
                  boxShadow: '0 0 18px #d844ff',
                  borderRadius: '2px',
                }} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* اللوغو */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'white', direction: 'ltr' }}>
        <span style={{ fontSize: '42px', fontWeight: 900, background: 'linear-gradient(135deg,#7c3cff,#d844ff)', WebkitBackgroundClip: 'text', color: 'transparent', lineHeight: 1 }}>Z</span>
        <span style={{ fontSize: '22px', fontWeight: 900 }}>ZAWAN</span>
      </Link>
    </header>
  );
}
