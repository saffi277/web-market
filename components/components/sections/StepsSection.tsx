'use client';

const steps = [
  { n: '01', title: 'تواصل معنا',       desc: 'أخبرنا عن احتياجاتك',  icon: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81A19.79 19.79 0 01.4 1.11 2 2 0 012 .94h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z' },
  { n: '02', title: 'اختيار وتسليم',    desc: 'نختار ونسلم النظام',    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { n: '03', title: 'تصميم وتطوير',     desc: 'نطور بطلب المخصص',       icon: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' },
  { n: '04', title: 'تحليل المتطلبات', desc: 'نحلل احتياجات عملك',    icon: 'M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8zM14 2v6h6M16 13H8M16 17H8' },
  { n: '05', title: 'دعم وتطوير',       desc: 'نستمر بدعمك وتطوير',    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
];

export default function StepsSection() {
  return (
    <section className="py-14 px-6" style={{ background: 'var(--bg2)', borderTop: '1px solid rgba(139,92,246,.07)' }}>
      <div className="max-w-[1300px] mx-auto">
        <h2 className="text-center text-xl font-bold text-white mb-8">
          حياة أسهل مع أنظمة ZAWAN
        </h2>
        <div className="flex gap-2">
          {steps.map((step, i) => (
            <div
              key={step.n}
              className="group flex-1 relative rounded-xl p-5 pb-10 flex flex-col gap-2.5 transition-all duration-300
                         hover:-translate-y-1.5 cursor-default"
              style={{ background: 'var(--card)', border: '1px solid rgba(139,92,246,.07)' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(139,92,246,.3)')}
              onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(139,92,246,.07)')}
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center"
                style={{ background: 'rgba(139,92,246,.1)', border: '1px solid rgba(139,92,246,.18)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth={1.8}>
                  <path d={step.icon}/>
                </svg>
              </div>

              <h3 className="text-white font-bold text-[.93rem]">{step.title}</h3>
              <p className="text-slate-500 text-[.8rem]">{step.desc}</p>

              {/* Arrow (not on last card) */}
              {i < steps.length - 1 && (
                <div className="mt-auto opacity-50">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth={2}>
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </div>
              )}

              {/* Number */}
              <span
                className="absolute bottom-3 left-3 text-[1.4rem] font-black leading-none"
                style={{ fontFamily: 'var(--font-space)', color: 'rgba(139,92,246,.2)' }}
              >
                {step.n}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
