import Link from 'next/link';

export default function Navbar() {
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 min(64px, 4vw)',
      background: 'rgba(5,4,11,.88)', backdropFilter: 'blur(18px)',
      borderBottom: '1px solid rgba(170,88,255,.14)',
    }}>
      <Link href="/contact" style={{
        border: '1px solid rgba(199,109,255,.55)',
        background: 'linear-gradient(135deg,#7c3cff,#d844ff)',
        color: 'white', borderRadius: '12px', padding: '12px 22px',
        fontWeight: 900, textDecoration: 'none', fontSize: '14px',
      }}>ابدأ مشروعك ↗</Link>

      <nav style={{ display: 'flex', gap: '36px', fontSize: '15px', fontWeight: 700 }}>
        <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>الرئيسية</Link>
        <Link href="/products" style={{ color: 'white', textDecoration: 'none' }}>الأنظمة</Link>
        <Link href="/services" style={{ color: 'white', textDecoration: 'none' }}>خدماتنا</Link>
        <Link href="/contact" style={{ color: 'white', textDecoration: 'none' }}>تواصل معنا</Link>
      </nav>

      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'white', direction: 'ltr' }}>
        <span style={{ fontSize: '36px', fontWeight: 900, background: 'linear-gradient(135deg,#7c3cff,#d844ff)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Z</span>
        <span style={{ fontSize: '20px', fontWeight: 900 }}>ZAWAN</span>
      </Link>
    </header>
  );
}
