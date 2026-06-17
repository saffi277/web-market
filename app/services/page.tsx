'use client';

import Link from 'next/link';

const services = [
  {
    icon: '💻',
    title: 'تطوير الأنظمة المخصصة',
    desc: 'نبني أنظمة برمجية مصممة خصيصاً لاحتياجات عملك من الصفر، مع ضمان الجودة والأداء العالي.',
    features: ['تحليل المتطلبات', 'تصميم المعمارية', 'تطوير الواجهات', 'اختبار الجودة'],
    color: '#8B5CF6',
  },
  {
    icon: '🛍️',
    title: 'متاجر إلكترونية',
    desc: 'منصات تجارة إلكترونية متكاملة مع بوابات الدفع وإدارة المخزون والتوصيل.',
    features: ['واجهة مستخدم احترافية', 'بوابات دفع آمنة', 'إدارة المنتجات', 'تقارير المبيعات'],
    color: '#06B6D4',
  },
  {
    icon: '📱',
    title: 'تطبيقات الجوال',
    desc: 'تطبيقات iOS وAndroid عالية الأداء بتجربة مستخدم سلسة وتصميم عصري.',
    features: ['React Native', 'تكامل API', 'إشعارات فورية', 'وضع عدم الاتصال'],
    color: '#F59E0B',
  },
  {
    icon: '☁️',
    title: 'الحلول السحابية',
    desc: 'نشر وإدارة تطبيقاتك على البنية التحتية السحابية بأمان وأداء عالي.',
    features: ['AWS / Oracle Cloud', 'Docker & Kubernetes', 'CI/CD Pipeline', 'مراقبة 24/7'],
    color: '#22C55E',
  },
  {
    icon: '🔒',
    title: 'الأمن السيبراني',
    desc: 'حماية أنظمتك وبياناتك من التهديدات الإلكترونية بأحدث تقنيات الأمن.',
    features: ['تقييم الأمن', 'اختبار الاختراق', 'تشفير البيانات', 'جدران الحماية'],
    color: '#EF4444',
  },
  {
    icon: '🤖',
    title: 'الذكاء الاصطناعي',
    desc: 'دمج تقنيات الذكاء الاصطناعي في أنظمتك لأتمتة العمليات وتحسين الكفاءة.',
    features: ['تحليل البيانات', 'نماذج التنبؤ', 'معالجة اللغة', 'الأتمتة الذكية'],
    color: '#A855F7',
  },
];

export default function ServicesPage() {
  return (
    <main className="page" style={{ minHeight: '100vh', paddingTop: '5rem' }}>

      {/* Hero */}
      <section style={{ padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(139,92,246,.12)', border: '1px solid rgba(139,92,246,.25)',
            borderRadius: 99, padding: '6px 16px', marginBottom: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#8B5CF6' }} />
            <span style={{ fontSize: '.85rem', color: '#A78BFA', fontWeight: 600 }}>خدماتنا</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, marginBottom: 16, lineHeight: 1.3 }}>
            خدمات برمجية{' '}
            <span style={{ background: 'linear-gradient(135deg,#8B5CF6,#00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              شاملة ومتكاملة
            </span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem' }}>
            نقدم طيفاً واسعاً من الخدمات البرمجية لتلبية كل احتياجات عملك الرقمي
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: '1.5rem' }}>
          {services.map(svc => (
            <div key={svc.title} style={{
              background: 'rgba(14,9,32,.8)', border: '1px solid rgba(139,92,246,.12)',
              borderRadius: 20, padding: '2rem', transition: 'all .3s',
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = svc.color + '60';
                el.style.transform = 'translateY(-4px)';
                el.style.boxShadow = `0 20px 50px ${svc.color}18`;
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.borderColor = 'rgba(139,92,246,.12)';
                el.style.transform = 'translateY(0)';
                el.style.boxShadow = 'none';
              }}
            >
              <div style={{ width: 54, height: 54, borderRadius: 16, background: svc.color + '18', border: `1px solid ${svc.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.6rem', marginBottom: 18 }}>
                {svc.icon}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 10 }}>{svc.title}</h3>
              <p style={{ color: '#94A3B8', fontSize: '.9rem', lineHeight: 1.7, marginBottom: 18 }}>{svc.desc}</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {svc.features.map(f => (
                  <li key={f} style={{ background: svc.color + '12', border: `1px solid ${svc.color}25`, borderRadius: 8, padding: '4px 10px', fontSize: '.78rem', color: svc.color }}>
                    {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" style={{ color: svc.color, fontSize: '.88rem', fontWeight: 700, textDecoration: 'none' }}>
                اطلب الخدمة ←
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 800, margin: '0 2rem 5rem', padding: '3rem 2rem', background: 'linear-gradient(135deg,rgba(139,92,246,.1),rgba(0,212,255,.05))', border: '1px solid rgba(139,92,246,.2)', borderRadius: 24, textAlign: 'center', marginInline: 'auto' }}>
        <h2 style={{ fontSize: 'clamp(1.4rem,3vw,2rem)', fontWeight: 700, marginBottom: 12 }}>
          لديك مشروع في ذهنك؟
        </h2>
        <p style={{ color: '#94A3B8', marginBottom: 28 }}>
          تواصل معنا الآن ونساعدك في تحويل فكرتك إلى واقع
        </p>
        <Link href="/contact" style={{ display: 'inline-block', background: 'linear-gradient(135deg,#8B5CF6,#7C3AED)', color: 'white', padding: '14px 36px', borderRadius: 12, fontWeight: 700, textDecoration: 'none', fontSize: '1rem' }}>
          تحدث مع فريقنا
        </Link>
      </section>
    </main>
  );
}
