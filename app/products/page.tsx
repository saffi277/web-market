'use client';

import { useState } from 'react';
import Link from 'next/link';

const categories = ['الكل', 'إدارة الأعمال', 'التجارة الإلكترونية', 'الموارد البشرية', 'المحاسبة'];

const products = [
  {
    id: '1',
    titleAr: 'نظام إدارة المبيعات',
    titleEn: 'Sales Management System',
    descAr: 'نظام متكامل لإدارة المبيعات والعملاء والفواتير مع تقارير تفصيلية وتحليلات فورية.',
    category: 'إدارة الأعمال',
    price: 'ابتداءً من $299',
    badge: 'الأكثر طلباً',
    badgeColor: '#8B5CF6',
    features: ['إدارة العملاء CRM', 'الفواتير الإلكترونية', 'تقارير المبيعات', 'تتبع المخزون'],
    icon: '📊',
  },
  {
    id: '2',
    titleAr: 'منصة التجارة الإلكترونية',
    titleEn: 'E-Commerce Platform',
    descAr: 'متجر إلكتروني احترافي بواجهة أنيقة ودعم للدفع الإلكتروني وإدارة المنتجات.',
    category: 'التجارة الإلكترونية',
    price: 'ابتداءً من $499',
    badge: 'جديد',
    badgeColor: '#06B6D4',
    features: ['بوابات دفع متعددة', 'إدارة المنتجات', 'تتبع الطلبات', 'تطبيق الجوال'],
    icon: '🛍️',
  },
  {
    id: '3',
    titleAr: 'نظام الموارد البشرية',
    titleEn: 'HR Management System',
    descAr: 'حل شامل لإدارة الموظفين والرواتب والحضور والإجازات بكل سهولة.',
    category: 'الموارد البشرية',
    price: 'ابتداءً من $199',
    badge: null,
    badgeColor: null,
    features: ['إدارة الموظفين', 'كشوف الرواتب', 'الحضور والانصراف', 'إدارة الإجازات'],
    icon: '👥',
  },
  {
    id: '4',
    titleAr: 'نظام المحاسبة والمالية',
    titleEn: 'Accounting & Finance',
    descAr: 'نظام محاسبي متكامل يدعم الميزانية العمومية وقوائم الدخل والتقارير المالية.',
    category: 'المحاسبة',
    price: 'ابتداءً من $349',
    badge: 'مميز',
    badgeColor: '#F59E0B',
    features: ['الميزانية العمومية', 'قوائم الدخل', 'ضريبة القيمة المضافة', 'تقارير مالية'],
    icon: '💰',
  },
  {
    id: '5',
    titleAr: 'نظام إدارة المشاريع',
    titleEn: 'Project Management',
    descAr: 'تتبع المشاريع والمهام وفِرق العمل مع لوحة كانبان وتقارير الأداء.',
    category: 'إدارة الأعمال',
    price: 'ابتداءً من $149',
    badge: null,
    badgeColor: null,
    features: ['لوحة كانبان', 'تتبع المهام', 'إدارة الفريق', 'تقارير الأداء'],
    icon: '📋',
  },
  {
    id: '6',
    titleAr: 'نظام نقاط البيع',
    titleEn: 'Point of Sale (POS)',
    descAr: 'نظام POS سريع وموثوق لإدارة المبيعات في المحلات التجارية والمطاعم.',
    category: 'التجارة الإلكترونية',
    price: 'ابتداءً من $249',
    badge: null,
    badgeColor: null,
    features: ['واجهة سريعة', 'دعم الباركود', 'إدارة الشيفتات', 'تقارير يومية'],
    icon: '🏪',
  },
];

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [search, setSearch] = useState('');
  const [orderModal, setOrderModal] = useState<{ title: string; price: string } | null>(null);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [orderStatus, setOrderStatus] = useState<'idle'|'sending'|'success'>('idle');

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderStatus('sending');
    await fetch(`${API}/api/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: `${form.phone}@order.zawan`,
        phone: form.phone,
        service: orderModal?.title,
        budget: orderModal?.price,
        message: form.message || `طلب شراء نظام: ${orderModal?.title}`,
        type: 'order',
      }),
    });
    setOrderStatus('success');
  };

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'الكل' || p.category === activeCategory;
    const matchSearch = p.titleAr.includes(search) || p.descAr.includes(search);
    return matchCat && matchSearch;
  });

  return (
    <main className="page" style={{ minHeight: '100vh', paddingTop: '5rem' }}>

      {/* Hero Section */}
      <section style={{ padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(139,92,246,.12)', border: '1px solid rgba(139,92,246,.25)',
            borderRadius: 99, padding: '6px 16px', marginBottom: 20,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#8B5CF6', animation: 'pulse 1.5s infinite' }} />
            <span style={{ fontSize: '.85rem', color: '#A78BFA', fontWeight: 600 }}>أنظمتنا البرمجية</span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, marginBottom: 16, lineHeight: 1.3 }}>
            حلول برمجية{' '}
            <span style={{ background: 'linear-gradient(135deg,#8B5CF6,#00D4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              تناسب كل عمل
            </span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem', maxWidth: 560, margin: '0 auto' }}>
            أنظمة جاهزة وقابلة للتخصيص لتلبية احتياجات عملك وتسريع نموك
          </p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem 2rem' }}>
        {/* Search */}
        <div style={{ position: 'relative', maxWidth: 420, margin: '0 auto 2rem' }}>
          <input
            type="text"
            placeholder="ابحث عن نظام..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '12px 20px 12px 44px',
              background: 'rgba(255,255,255,.04)', border: '1px solid rgba(139,92,246,.2)',
              borderRadius: 12, color: 'white', fontSize: '.95rem', outline: 'none',
              direction: 'rtl',
            }}
          />
          <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#64748B', fontSize: '1.1rem' }}>
            🔍
          </span>
        </div>

        {/* Category tabs */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: '2.5rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 20px', borderRadius: 99, fontSize: '.88rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all .2s',
                background: activeCategory === cat ? '#8B5CF6' : 'rgba(255,255,255,.04)',
                border: `1px solid ${activeCategory === cat ? '#8B5CF6' : 'rgba(139,92,246,.15)'}`,
                color: activeCategory === cat ? 'white' : '#94A3B8',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
        }}>
          {filtered.map(product => (
            <div
              key={product.id}
              style={{
                background: 'rgba(14,9,32,.8)', border: '1px solid rgba(139,92,246,.15)',
                borderRadius: 20, padding: '1.8rem',
                transition: 'all .3s',
                position: 'relative', overflow: 'hidden',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(139,92,246,.5)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 60px rgba(139,92,246,.15)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(139,92,246,.15)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              {/* Badge */}
              {product.badge && (
                <div style={{
                  position: 'absolute', top: 16, left: 16,
                  background: product.badgeColor + '22',
                  border: `1px solid ${product.badgeColor}44`,
                  color: product.badgeColor!, borderRadius: 99,
                  fontSize: '.75rem', fontWeight: 700, padding: '3px 10px',
                }}>
                  {product.badge}
                </div>
              )}

              {/* Icon */}
              <div style={{ fontSize: '2.5rem', marginBottom: 16 }}>{product.icon}</div>

              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 6 }}>{product.titleAr}</h3>
              <p style={{ color: '#8B5CF6', fontSize: '.78rem', fontWeight: 500, marginBottom: 12 }}>{product.titleEn}</p>
              <p style={{ color: '#94A3B8', fontSize: '.9rem', lineHeight: 1.7, marginBottom: 20 }}>{product.descAr}</p>

              {/* Features */}
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {product.features.map(f => (
                  <li key={f} style={{
                    background: 'rgba(139,92,246,.08)', border: '1px solid rgba(139,92,246,.15)',
                    borderRadius: 8, padding: '4px 10px', fontSize: '.78rem', color: '#A78BFA',
                  }}>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Footer */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                <span style={{ color: '#8B5CF6', fontWeight: 700, fontSize: '1rem' }}>{product.price}</span>
                <button
                  onClick={() => { setOrderModal({ title: product.titleAr, price: product.price }); setOrderStatus('idle'); setForm({ name:'', phone:'', message:'' }); }}
                  style={{
                    background: 'linear-gradient(135deg,#8B5CF6,#7C3AED)',
                    color: 'white', borderRadius: 10, padding: '8px 18px',
                    fontSize: '.85rem', fontWeight: 600, border: 'none', cursor: 'pointer',
                  }}
                >
                  اطلب الآن
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: '#64748B' }}>
            لا توجد أنظمة تطابق بحثك
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section style={{
        margin: '4rem auto', maxWidth: 800, padding: '3rem 2rem',
        background: 'linear-gradient(135deg,rgba(139,92,246,.1),rgba(0,212,255,.05))',
        border: '1px solid rgba(139,92,246,.2)', borderRadius: 24,
        textAlign: 'center',
      }}>
        <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, marginBottom: 12 }}>
          هل تحتاج نظاماً مخصصاً؟
        </h2>
        <p style={{ color: '#94A3B8', marginBottom: 28 }}>
          نبني أنظمة برمجية مصممة خصيصاً لاحتياجات عملك
        </p>
        <Link
          href="/contact"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg,#8B5CF6,#7C3AED)',
            color: 'white', padding: '14px 36px', borderRadius: 12,
            fontWeight: 700, textDecoration: 'none', fontSize: '1rem',
          }}
        >
          تواصل معنا الآن
        </Link>
      </section>

      {/* Order Modal */}
      {orderModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.75)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}
          onClick={e => { if (e.target === e.currentTarget) setOrderModal(null); }}>
          <div style={{ background: '#0d0b18', border: '1px solid rgba(139,92,246,.3)', borderRadius: 24, padding: '2rem', width: '100%', maxWidth: 440 }}>
            {orderStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: 12 }}>✅</div>
                <h3 style={{ fontWeight: 800, marginBottom: 8 }}>تم إرسال طلبك!</h3>
                <p style={{ color: '#94A3B8', marginBottom: 20 }}>سنتواصل معك قريباً على واتساب</p>
                <button onClick={() => setOrderModal(null)} style={{ background: 'linear-gradient(135deg,#8B5CF6,#7C3AED)', color: 'white', border: 'none', borderRadius: 10, padding: '10px 28px', cursor: 'pointer', fontWeight: 700 }}>إغلاق</button>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>طلب شراء نظام</h2>
                    <p style={{ margin: '4px 0 0', color: '#8B5CF6', fontSize: '.9rem' }}>{orderModal.title} — {orderModal.price}</p>
                  </div>
                  <button onClick={() => setOrderModal(null)} style={{ background: 'none', border: 'none', color: '#64748B', cursor: 'pointer', fontSize: '1.3rem' }}>✕</button>
                </div>
                <form onSubmit={submitOrder} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <input required placeholder="الاسم الكامل *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    style={{ padding: '11px 14px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(139,92,246,.2)', borderRadius: 10, color: 'white', fontSize: '.92rem', outline: 'none' }} />
                  <input required placeholder="رقم الواتساب *" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    style={{ padding: '11px 14px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(139,92,246,.2)', borderRadius: 10, color: 'white', fontSize: '.92rem', outline: 'none', direction: 'ltr' }} />
                  <textarea placeholder="ملاحظات إضافية (اختياري)" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={3}
                    style={{ padding: '11px 14px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(139,92,246,.2)', borderRadius: 10, color: 'white', fontSize: '.92rem', outline: 'none', resize: 'none' }} />
                  <button type="submit" disabled={orderStatus === 'sending'}
                    style={{ background: 'linear-gradient(135deg,#8B5CF6,#d844ff)', color: 'white', border: 'none', borderRadius: 10, padding: '13px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', opacity: orderStatus === 'sending' ? .7 : 1 }}>
                    {orderStatus === 'sending' ? 'جاري الإرسال...' : 'إرسال الطلب ←'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
