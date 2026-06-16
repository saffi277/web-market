const services = [
  ['</>', 'تطوير البرمجيات'],
  ['☁', 'الحوسبة السحابية'],
  ['⌘', 'التطبيقات الذكية'],
  ['◈', 'قواعد البيانات']
];
const steps = [
  ['💬','تواصل معنا','أخبرنا عن احتياجاتك','01'],
  ['🧪','اختبار وتسليم','تنفيذ وتسليم النظام','02'],
  ['</>','تصميم وتطوير','نطور نظامك المخصص','03'],
  ['◔','تحليل المتطلبات','نفهم احتياجات عملك','04'],
  ['🚀','دعم وتطوير','نستمر بدعمك وتطويرك','05']
];

export default function Home(){
  return <main className="hero-bg">
    <header className="container nav">
      <button className="cta">جرّب الأنظمة</button>
      <nav className="links">
        {['الرئيسية','الأنظمة','المشاريع','الأسعار','من نحن','المدونة','تواصل معنا'].map(x=><a key={x} href="#">{x}</a>)}
      </nav>
      <div className="logo"><div className="logo-badge">04</div><div className="zmark">Z</div><strong>ZAWAN</strong></div>
    </header>

    <section className="container hero">
      <div className="visual" aria-hidden="true">
        <div className="dashboard">
          <div className="orbit"></div><div className="orbit two"></div>
          <div className="float-node n1">⌘</div><div className="float-node n2">☁</div><div className="float-node n3">🛡</div><div className="float-node n4">▣</div>
          <div className="dash-grid">
            <div className="card main">
              <div className="status"><span className="chip"><i className="dot"></i> ZAWAN Core</span><span className="muted">Live Systems</span></div>
              <div className="metric"><span>96%</span> Ready</div>
              <p className="muted">واجهة نظيفة تمثل شركة برمجيات تبني أنظمة أعمال متكاملة.</p>
              <div className="code-lines"><i className="line"></i><i className="line"></i><i className="line"></i><i className="line"></i></div>
            </div>
            <div className="side">
              {services.map(([icon,title])=><div className="card mini" key={title}><div className="icon">{icon}</div><h3>{title}</h3><p className="muted">حلول مرنة وقابلة للتوسع.</p></div>)}
            </div>
          </div>
        </div>
      </div>

      <div className="copy">
        <span className="pill">حلول برمجية متكاملة</span>
        <h1 className="headline">من فكرة إلى نظام متكامل<br/>نحن نبرمج <span>النجاح</span></h1>
        <p className="lead">نقدم أنظمة برمجية متكاملة تلبي احتياجات عملك وتساعدك على النمو والتوسع بثقة.</p>
        <div className="actions"><a className="btn primary" href="#">استعرض الأنظمة ↗</a><a className="btn secondary" href="#">تواصل معنا ☎</a></div>
      </div>
    </section>

    <section className="container process">
      <h2>حياة أسهل مع أنظمة ZAWAN</h2>
      <div className="steps">{steps.map(([icon,title,desc,num])=><div className="step" key={num}><div className="icon" style={{margin:'0 auto'}}>{icon}</div><h3>{title}</h3><p className="muted">{desc}</p><div className="num">{num}</div></div>)}</div>
    </section>
  </main>
}
