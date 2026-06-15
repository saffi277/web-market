import { ArrowUpLeft, Headphones, MessageCircle, Rocket, PieChart, Code2, Users } from 'lucide-react';
import TechCore from '@/components/ui/TechCore';
import Link from 'next/link';

const steps = [
  { n:'01', t:'تواصل معنا',       d:'أخبرنا عن احتياجاتك',   I: MessageCircle },
  { n:'02', t:'اختبار وتسليم',    d:'تنفيذ وتسليم النظام',   I: Users         },
  { n:'03', t:'تصميم وتطوير',     d:'تطوير نظامك المخصص',    I: Code2         },
  { n:'04', t:'تحليل المتطلبات', d:'فهم احتياجات عملك',     I: PieChart      },
  { n:'05', t:'دعم وتطوير',       d:'نستمر بدعمك وتطويرك',  I: Rocket        },
];

const nav = ['الرئيسية','الأنظمة','المشاريع','الأسعار','من نحن','المدونة','تواصل معنا'];

export default function Home() {
  return (
    <main className="hero-shell">

      {/* Navbar */}
      <header className="nav">
        <Link href="/products" className="cta">جرّب الأنظمة</Link>
        <nav className="links">
          {nav.map(item => <a key={item} href="#" className="hover:text-purple-300 transition-colors">{item}</a>)}
        </nav>
        <div className="brand">
          <div className="badge04">04</div>
          <div className="logo-z">Z</div>
          <div className="brand-text">ZAWAN</div>
        </div>
      </header>

      {/* Hero */}
      <section className="hero-grid">
        <div className="visual"><TechCore /></div>
        <div className="copy">
          <div className="pill">حلول برمجية متكاملة</div>
          <h1 className="title">
            من فكرة إلى نظام متكامل
            <br/>
            نحن نبرمج <span>النجاح</span>
          </h1>
          <p className="desc">نقدم أنظمة برمجية متكاملة تلبي احتياجات عملك وتساعدك على النمو والتوسع بثقة.</p>
          <div className="actions">
            <Link href="/products" className="btn primary">استعرض الأنظمة <ArrowUpLeft size={20}/></Link>
            <Link href="/contact" className="btn">تواصل معنا <Headphones size={22}/></Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <h2 className="process-title">حياة أسهل مع أنظمة ZAWAN</h2>
      <section className="process">
        {steps.map(({ n, t, d, I }) => (
          <div className="step" key={n}>
            <div className="iconbox"><I size={24}/></div>
            <h3>{t}</h3>
            <p>{d}</p>
            <div className="num">{n}</div>
          </div>
        ))}
      </section>

    </main>
  );
}
