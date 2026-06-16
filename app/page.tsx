const services = [
  ['</>', 'حلول برمجية متكاملة', 'أنظمة مخصصة تلبي احتياجات أعمالك بدقة'],
  ['▣', 'أنظمة قواعد البيانات', 'تصميم قواعد بيانات قوية ومنظمة لإدارة بياناتك'],
  ['☁', 'الحوسبة السحابية', 'بناء ونشر أنظمة سحابية آمنة وقابلة للتوسع'],
  ['✺', 'الذكاء الاصطناعي', 'حلول ذكية تعتمد على تحليل البيانات والأتمتة'],
  ['▯', 'تطبيقات الموبايل', 'تطبيقات Android و iOS بتجربة استخدام عصرية'],
  ['◎', 'تطوير المواقع', 'واجهات ومواقع ويب سريعة وحديثة للشركات'],
];

export default function Home() {
  return (
    <main className="page">
      <section className="container hero" id="home">
        <div className="hero-copy">
          <div className="badge"><i /> نحو مستقبل رقمي أفضل</div>
          <h1>نبني أنظمة رقمية<br />تدفع أعمالك إلى <span className="grad">الأمام</span></h1>
          <p className="lead">نقدم حلول برمجية متكاملة تساعد الشركات على النمو والتوسع من خلال التكنولوجيا والابتكار.</p>
          <div className="actions">
            <a className="btn-primary" href="/contact">ابدأ مشروعك الآن ↗</a>
            <a className="btn-secondary" href="/products">استعرض أعمالنا ←</a>
          </div>
        </div>
        <div className="visual" aria-hidden="true">
          <div className="watermark">ZAWAN</div>
          <div className="stats">
            <div className="stat"><strong>24/7</strong><span>دعم فني</span></div>
            <div className="stat"><strong>+5</strong><span>سنوات خبرة</span></div>
            <div className="stat"><strong>+120</strong><span>مشروع مكتمل</span></div>
            <div className="stat"><strong>+50</strong><span>عميل سعيد</span></div>
          </div>
        </div>
      </section>

      <section className="container services" id="work">
        {services.map(([icon,title,desc]) => <article className="card" key={title}><div className="icon">{icon}</div><h3>{title}</h3><p>{desc}</p><div className="arrow">→</div></article>)}
      </section>

      <section className="container tech">
        <p>نستخدم أحدث التقنيات لبناء أفضل الحلول</p>
        <div className="marquee"><span>Next.js</span><span>React</span><span>Node.js</span><span>TypeScript</span><span>AWS</span><span>Docker</span><span>PostgreSQL</span><span>MongoDB</span><span>Next.js</span><span>React</span><span>Node.js</span><span>TypeScript</span><span>AWS</span><span>Docker</span></div>
      </section>
    </main>
  );
}
