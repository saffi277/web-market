import { Code2, Cloud, Smartphone, Database, BrainCircuit, ShieldCheck, Rocket, PieChart, Users, MessageCircle, Headphones, ArrowUpLeft } from 'lucide-react';

const nodes = [
  { c: 'n1', icon: Code2, label: 'تطوير البرمجيات' },
  { c: 'n2', icon: Cloud, label: 'الحوسبة السحابية' },
  { c: 'n3', icon: Smartphone, label: 'التطبيقات الذكية' },
  { c: 'n4', icon: Database, label: 'قواعد البيانات' },
  { c: 'n5', icon: BrainCircuit, label: 'الذكاء الاصطناعي' },
  { c: 'n6', icon: ShieldCheck, label: 'الأمن السيبراني' },
];

const steps = [
  ['تواصل معنا', 'أخبرنا عن احتياجاتك', MessageCircle, '01'],
  ['اختبار وتسليم', 'تنفيذ وتسليم النظام', Users, '02'],
  ['تصميم وتطوير', 'نطور نظامك المخصص', Code2, '03'],
  ['تحليل المتطلبات', 'نفهم احتياجات عملك', PieChart, '04'],
  ['دعم وتطوير', 'نستمر بدعمك وتطويرك', Rocket, '05'],
];

export default function Home() {
  return (
    <main className="page font-arabic">
      <div className="grid-bg" />
      <div className="noise" />
      <div className="scan" />
      <div className="wrap">
        <header className="nav">
          <button className="cta-top">جرّب الأنظمة</button>
          <nav className="links">
            <a>الرئيسية</a><a>الأنظمة</a><a>المشاريع</a><a>الأسعار</a><a>من نحن</a><a>المدونة</a><a>تواصل معنا</a>
          </nav>
          <div className="brand">
            <div className="badge">04</div>
            <div className="logo-z">Z</div>
            <div className="brand-name">ZAWAN</div>
          </div>
        </header>

        <section className="hero">
          <div className="copy">
            <div className="pill">حلول برمجية متكاملة</div>
            <h1 className="title">من فكرة إلى نظام متكامل<br />نحن نبرمج <span className="grad">النجاح</span></h1>
            <p className="sub">نقدم أنظمة برمجية متكاملة تلبي احتياجات عملك وتساعدك على النمو والتوسع بثقة.</p>
            <div className="actions">
              <button className="btn primary">استعرض الأنظمة <ArrowUpLeft size={18} /></button>
              <button className="btn secondary">تواصل معنا <Headphones size={19} /></button>
            </div>
          </div>

          <div className="visual" aria-label="ZAWAN software ecosystem animation">
            <div className="code-rain"><span>0101</span><span>&lt;/&gt;</span><span>API</span><span>AI</span><span>DATA</span></div>
            <div className="ring r1" style={{'--r':'0deg'} as React.CSSProperties} />
            <div className="ring r2" />
            <div className="ring r3" />
            <div className="beam b1" /><div className="beam b2" /><div className="beam b3" />
            <div className="beam b4" /><div className="beam b5" /><div className="beam b6" />
            <div className="core" />
            {nodes.map(({ c, icon: Icon, label }) => (
              <div className={`node ${c}`} key={label}>
                <Icon />
                <div className="label">{label}</div>
              </div>
            ))}
          </div>
        </section>

        <h2 className="steps-title">حياة أسهل مع أنظمة ZAWAN</h2>
        <section className="steps">
          {steps.map(([title, desc, Icon, num]) => (
            <div className="step" key={num as string}>
              <div className="step-icon"><Icon size={25}/></div>
              <h3>{title as string}</h3>
              <p>{desc as string}</p>
              <div className="num">{num as string}</div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
