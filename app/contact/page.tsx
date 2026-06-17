'use client';

import { useState } from 'react';

const services = ['نظام إدارة مبيعات', 'منصة تجارة إلكترونية', 'نظام موارد بشرية', 'نظام محاسبة', 'تطوير مخصص', 'أخرى'];
const budgets  = ['أقل من $500', '$500 - $1000', '$1000 - $3000', 'أكثر من $3000', 'غير محدد'];

const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', budget: '', message: '' });
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${BACKEND}/api/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="page" style={{ minHeight: '100vh', paddingTop: '5rem' }}>

      {/* Hero */}
      <section style={{ padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(139,92,246,.12)', border: '1px solid rgba(139,92,246,.25)',
            borderRadius: 99, padding: '6px 16px', marginBottom: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#8B5CF6', animation: 'pulse 1.5s infinite' }} />
            <span style={{ fontSize: '.85rem', color: '#A78BFA', fontWeight: 600 }}>تواصل معنا</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 800, marginBottom: 16, lineHeight: 1.3 }}>
            نحن هنا{' '}
            <span style={{ background: 'linear-gradient(135deg,#8B5CF6,#00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              لمساعدتك
            </span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1rem' }}>
            أرسل لنا تفاصيل مشروعك وسنتواصل معك خلال 24 ساعة
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1.5rem 5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '3rem' }}>

        {/* Contact Form */}
        <div style={{ background: 'rgba(14,9,32,.8)', border: '1px solid rgba(139,92,246,.15)', borderRadius: 24, padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 24 }}>أرسل رسالة</h2>

          {status === 'success' ? (
            <div style={{
              background: 'rgba(34,197,94,.1)', border: '1px solid rgba(34,197,94,.3)',
              borderRadius: 16, padding: '2rem', textAlign: 'center',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: 12 }}>✅</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 8 }}>تم إرسال رسالتك!</h3>
              <p style={{ color: '#94A3B8' }}>سنتواصل معك قريباً</p>
              <button
                onClick={() => { setStatus('idle'); setForm({ name:'',email:'',phone:'',service:'',budget:'',message:'' }); }}
                style={{ marginTop: 16, background: '#8B5CF6', color: 'white', border: 'none', borderRadius: 10, padding: '10px 24px', cursor: 'pointer', fontWeight: 600 }}
              >
                إرسال رسالة أخرى
              </button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Field label="الاسم الكامل *" value={form.name} onChange={v => set('name', v)} placeholder="محمد أحمد" required />
                <Field label="البريد الإلكتروني *" value={form.email} onChange={v => set('email', v)} placeholder="email@example.com" type="email" required />
              </div>
              <Field label="رقم الهاتف" value={form.phone} onChange={v => set('phone', v)} placeholder="+966 5x xxx xxxx" />

              <div>
                <label style={{ display: 'block', fontSize: '.88rem', color: '#CBD5E1', marginBottom: 8 }}>الخدمة المطلوبة</label>
                <select
                  value={form.service}
                  onChange={e => set('service', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(139,92,246,.2)', borderRadius: 12, color: form.service ? 'white' : '#64748B', fontSize: '.92rem', outline: 'none', direction: 'rtl' }}
                >
                  <option value="">اختر الخدمة...</option>
                  {services.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '.88rem', color: '#CBD5E1', marginBottom: 8 }}>الميزانية التقريبية</label>
                <select
                  value={form.budget}
                  onChange={e => set('budget', e.target.value)}
                  style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(139,92,246,.2)', borderRadius: 12, color: form.budget ? 'white' : '#64748B', fontSize: '.92rem', outline: 'none', direction: 'rtl' }}
                >
                  <option value="">حدد الميزانية...</option>
                  {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '.88rem', color: '#CBD5E1', marginBottom: 8 }}>تفاصيل المشروع *</label>
                <textarea
                  value={form.message}
                  onChange={e => set('message', e.target.value)}
                  placeholder="أخبرنا عن مشروعك ومتطلباتك..."
                  rows={5}
                  required
                  minLength={10}
                  style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(139,92,246,.2)', borderRadius: 12, color: 'white', fontSize: '.92rem', outline: 'none', resize: 'vertical', direction: 'rtl', lineHeight: 1.7 }}
                />
              </div>

              {status === 'error' && (
                <p style={{ color: '#F87171', fontSize: '.85rem', textAlign: 'center' }}>حدث خطأ. يرجى المحاولة مجدداً.</p>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                style={{
                  background: 'linear-gradient(135deg,#8B5CF6,#7C3AED)',
                  color: 'white', border: 'none', borderRadius: 12,
                  padding: '14px 24px', fontSize: '1rem', fontWeight: 700,
                  cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                  opacity: status === 'sending' ? .7 : 1,
                  transition: 'all .2s',
                }}
              >
                {status === 'sending' ? 'جاري الإرسال...' : 'إرسال الرسالة ←'}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 8 }}>معلومات التواصل</h2>
            <p style={{ color: '#94A3B8', fontSize: '.95rem', lineHeight: 1.7 }}>
              نحن متاحون للرد على استفساراتك وتقديم أفضل الحلول لعملك
            </p>
          </div>

          {[
            { icon: '📧', label: 'البريد الإلكتروني', value: 'info@zawan.com' },
            { icon: '📱', label: 'واتساب', value: '+966 5x xxx xxxx' },
            { icon: '📍', label: 'الموقع', value: 'المملكة العربية السعودية' },
            { icon: '⏰', label: 'ساعات العمل', value: 'الأحد - الخميس: 9ص - 6م' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', background: 'rgba(14,9,32,.6)', border: '1px solid rgba(139,92,246,.1)', borderRadius: 16, padding: '1.2rem 1.5rem' }}>
              <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: '.8rem', color: '#8B5CF6', fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: '.95rem', color: '#E2E8F0' }}>{item.value}</div>
              </div>
            </div>
          ))}

          {/* Response time */}
          <div style={{ background: 'linear-gradient(135deg,rgba(139,92,246,.1),rgba(0,212,255,.05))', border: '1px solid rgba(139,92,246,.2)', borderRadius: 16, padding: '1.5rem' }}>
            <div style={{ fontSize: '2rem', marginBottom: 8 }}>⚡</div>
            <h3 style={{ fontWeight: 700, marginBottom: 6 }}>رد سريع</h3>
            <p style={{ color: '#94A3B8', fontSize: '.9rem', lineHeight: 1.6 }}>
              نلتزم بالرد على جميع الاستفسارات خلال <strong style={{ color: '#A78BFA' }}>24 ساعة</strong> في أيام العمل
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({ label, value, onChange, placeholder, type = 'text', required = false }: {
  label: string; value: string; onChange: (v:string)=>void;
  placeholder?: string; type?: string; required?: boolean;
}) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '.88rem', color: '#CBD5E1', marginBottom: 8 }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%', padding: '12px 16px',
          background: 'rgba(255,255,255,.04)', border: '1px solid rgba(139,92,246,.2)',
          borderRadius: 12, color: 'white', fontSize: '.92rem', outline: 'none',
          direction: type === 'email' ? 'ltr' : 'rtl',
        }}
      />
    </div>
  );
}
