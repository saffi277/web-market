'use client';

import { useState, useEffect, useCallback } from 'react';

const BACKEND = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

type Message = { id: string; name: string; email: string; phone?: string; service?: string; budget?: string; message: string; status: string; createdAt: string; };
type Announcement = { id: string; titleAr: string; titleEn: string; bodyAr?: string; type?: string; createdAt: string; };
type Tab = 'messages' | 'announcements';

export default function AdminPage() {
  const [token, setToken]   = useState<string|null>(null);
  const [tab, setTab]       = useState<Tab>('messages');
  const [messages, setMessages] = useState<Message[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginErr, setLoginErr] = useState('');
  const [loading, setLoading] = useState(false);

  const headers = useCallback(() => ({
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }), [token]);

  useEffect(() => {
    const saved = sessionStorage.getItem('zawan_token');
    if (saved) setToken(saved);
  }, []);

  const fetchMessages = useCallback(async () => {
    if (!token) return;
    const res = await fetch(`${BACKEND}/api/messages`, { headers: headers() });
    if (res.ok) setMessages(await res.json());
  }, [token, headers]);

  const fetchAnnouncements = useCallback(async () => {
    const res = await fetch(`${BACKEND}/api/announcements`);
    if (res.ok) setAnnouncements(await res.json());
  }, []);

  useEffect(() => {
    if (!token) return;
    fetchMessages();
    fetchAnnouncements();
  }, [token, fetchMessages, fetchAnnouncements]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setLoginErr('');
    try {
      const res = await fetch(`${BACKEND}/api/auth/login`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });
      if (res.ok) {
        const { token: t } = await res.json();
        sessionStorage.setItem('zawan_token', t);
        setToken(t);
      } else {
        setLoginErr('بيانات الدخول غير صحيحة');
      }
    } catch {
      setLoginErr('تعذر الاتصال بالخادم');
    }
    setLoading(false);
  };

  const logout = () => { sessionStorage.removeItem('zawan_token'); setToken(null); setMessages([]); };

  const updateMessageStatus = async (id: string, status: string) => {
    await fetch(`${BACKEND}/api/messages/${id}`, {
      method: 'PATCH', headers: headers(), body: JSON.stringify({ status }),
    });
    fetchMessages();
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('حذف هذه الرسالة؟')) return;
    await fetch(`${BACKEND}/api/messages/${id}`, { method: 'DELETE', headers: headers() });
    fetchMessages();
  };

  const deleteAnn = async (id: string) => {
    if (!confirm('حذف هذا الإعلان؟')) return;
    await fetch(`${BACKEND}/api/announcements/${id}`, { method: 'DELETE', headers: headers() });
    fetchAnnouncements();
  };

  const [annForm, setAnnForm] = useState({ titleAr: '', titleEn: '', bodyAr: '', type: 'info' });
  const [showAnnForm, setShowAnnForm] = useState(false);

  const submitAnn = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${BACKEND}/api/announcements`, {
      method: 'POST', headers: headers(), body: JSON.stringify(annForm),
    });
    setAnnForm({ titleAr: '', titleEn: '', bodyAr: '', type: 'info' });
    setShowAnnForm(false);
    fetchAnnouncements();
  };

  if (!token) {
    return (
      <main style={{ background: 'var(--bg)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: 'rgba(14,9,32,.9)', border: '1px solid rgba(139,92,246,.2)', borderRadius: 24, padding: '3rem', width: '100%', maxWidth: 400 }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg,#8B5CF6,#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', fontSize: '1.4rem', fontWeight: 900, fontFamily: 'var(--font-space)' }}>Z</div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 700 }}>لوحة التحكم</h1>
            <p style={{ color: '#64748B', fontSize: '.9rem', marginTop: 4 }}>تسجيل دخول المشرف</p>
          </div>
          <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <input type="email" required placeholder="البريد الإلكتروني" value={loginForm.email}
              onChange={e => setLoginForm(f => ({...f, email: e.target.value}))}
              style={{ padding: '12px 16px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(139,92,246,.2)', borderRadius: 12, color: 'white', fontSize: '.95rem', outline: 'none', direction: 'ltr' }}
            />
            <input type="password" required placeholder="كلمة المرور" value={loginForm.password}
              onChange={e => setLoginForm(f => ({...f, password: e.target.value}))}
              style={{ padding: '12px 16px', background: 'rgba(255,255,255,.04)', border: '1px solid rgba(139,92,246,.2)', borderRadius: 12, color: 'white', fontSize: '.95rem', outline: 'none', direction: 'ltr' }}
            />
            {loginErr && <p style={{ color: '#F87171', fontSize: '.85rem', textAlign: 'center' }}>{loginErr}</p>}
            <button type="submit" disabled={loading} style={{ background: 'linear-gradient(135deg,#8B5CF6,#7C3AED)', color: 'white', border: 'none', borderRadius: 12, padding: '13px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', opacity: loading ? .7 : 1 }}>
              {loading ? 'جاري الدخول...' : 'دخول'}
            </button>
          </form>
        </div>
      </main>
    );
  }

  const unreadCount = messages.filter(m => m.status === 'new').length;

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', paddingTop: '5rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>لوحة التحكم</h1>
            <p style={{ color: '#64748B', fontSize: '.9rem' }}>إدارة الرسائل والإعلانات</p>
          </div>
          <button onClick={logout} style={{ background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)', color: '#F87171', borderRadius: 10, padding: '8px 18px', cursor: 'pointer', fontSize: '.88rem', fontWeight: 600 }}>
            تسجيل خروج
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'إجمالي الرسائل', value: messages.length, icon: '📩' },
            { label: 'رسائل جديدة', value: unreadCount, icon: '🔴' },
            { label: 'تمت المعالجة', value: messages.filter(m=>m.status==='resolved').length, icon: '✅' },
            { label: 'الإعلانات', value: announcements.length, icon: '📢' },
          ].map(stat => (
            <div key={stat.label} style={{ background: 'rgba(14,9,32,.8)', border: '1px solid rgba(139,92,246,.15)', borderRadius: 16, padding: '1.2rem 1.5rem' }}>
              <div style={{ fontSize: '1.6rem', marginBottom: 6 }}>{stat.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#8B5CF6' }}>{stat.value}</div>
              <div style={{ fontSize: '.85rem', color: '#64748B' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: '1.5rem' }}>
          {[
            { key: 'messages' as Tab, label: `الرسائل ${unreadCount > 0 ? `(${unreadCount} جديد)` : ''}` },
            { key: 'announcements' as Tab, label: 'الإعلانات' },
          ].map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding: '9px 20px', borderRadius: 10, fontSize: '.9rem', fontWeight: 600, cursor: 'pointer',
              background: tab === t.key ? '#8B5CF6' : 'rgba(255,255,255,.04)',
              border: `1px solid ${tab === t.key ? '#8B5CF6' : 'rgba(139,92,246,.15)'}`,
              color: tab === t.key ? 'white' : '#94A3B8',
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Messages Tab */}
        {tab === 'messages' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.length === 0 && <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>لا توجد رسائل بعد</div>}
            {messages.map(msg => (
              <div key={msg.id} style={{
                background: 'rgba(14,9,32,.8)',
                border: `1px solid ${msg.status === 'new' ? 'rgba(139,92,246,.4)' : 'rgba(139,92,246,.1)'}`,
                borderRadius: 16, padding: '1.5rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 2 }}>{msg.name}</div>
                    <div style={{ fontSize: '.85rem', color: '#94A3B8', direction: 'ltr' }}>{msg.email} {msg.phone && `· ${msg.phone}`}</div>
                    {msg.service && <div style={{ fontSize: '.8rem', color: '#8B5CF6', marginTop: 2 }}>{msg.service} {msg.budget && `· ${msg.budget}`}</div>}
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <StatusBadge status={msg.status} />
                    <span style={{ fontSize: '.8rem', color: '#64748B' }}>{new Date(msg.createdAt).toLocaleDateString('ar')}</span>
                  </div>
                </div>
                <p style={{ color: '#CBD5E1', fontSize: '.93rem', lineHeight: 1.7, marginBottom: 16 }}>{msg.message}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {msg.status === 'new' && (
                    <button onClick={() => updateMessageStatus(msg.id, 'in-progress')} style={btnStyle('#8B5CF6')}>قيد المعالجة</button>
                  )}
                  {msg.status !== 'resolved' && (
                    <button onClick={() => updateMessageStatus(msg.id, 'resolved')} style={btnStyle('#22C55E')}>تم الحل</button>
                  )}
                  <button onClick={() => deleteMessage(msg.id)} style={btnStyle('#EF4444')}>حذف</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Announcements Tab */}
        {tab === 'announcements' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem' }}>
              <button onClick={() => setShowAnnForm(v => !v)} style={{ background: '#8B5CF6', color: 'white', border: 'none', borderRadius: 10, padding: '9px 20px', cursor: 'pointer', fontWeight: 600 }}>
                {showAnnForm ? 'إلغاء' : '+ إضافة إعلان'}
              </button>
            </div>

            {showAnnForm && (
              <form onSubmit={submitAnn} style={{ background: 'rgba(14,9,32,.9)', border: '1px solid rgba(139,92,246,.3)', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <h3 style={{ fontWeight: 700, marginBottom: 4 }}>إعلان جديد</h3>
                <input required placeholder="العنوان بالعربي *" value={annForm.titleAr} onChange={e => setAnnForm(f=>({...f,titleAr:e.target.value}))} style={inputStyle} />
                <input placeholder="Title in English" value={annForm.titleEn} onChange={e => setAnnForm(f=>({...f,titleEn:e.target.value}))} style={{...inputStyle, direction:'ltr'}} />
                <textarea placeholder="تفاصيل الإعلان..." value={annForm.bodyAr} onChange={e => setAnnForm(f=>({...f,bodyAr:e.target.value}))} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                <select value={annForm.type} onChange={e => setAnnForm(f=>({...f,type:e.target.value}))} style={{...inputStyle, direction:'rtl'}}>
                  <option value="info">معلومة</option>
                  <option value="promo">عرض</option>
                  <option value="alert">تنبيه</option>
                </select>
                <button type="submit" style={{ background: '#8B5CF6', color: 'white', border: 'none', borderRadius: 10, padding: '11px', fontWeight: 700, cursor: 'pointer' }}>نشر الإعلان</button>
              </form>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {announcements.length === 0 && <div style={{ textAlign: 'center', padding: '3rem', color: '#64748B' }}>لا توجد إعلانات بعد</div>}
              {announcements.map(ann => (
                <div key={ann.id} style={{ background: 'rgba(14,9,32,.8)', border: '1px solid rgba(139,92,246,.15)', borderRadius: 16, padding: '1.2rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontWeight: 700 }}>{ann.titleAr}</div>
                    {ann.titleEn && <div style={{ fontSize: '.85rem', color: '#64748B', direction: 'ltr' }}>{ann.titleEn}</div>}
                    {ann.bodyAr && <div style={{ fontSize: '.88rem', color: '#94A3B8', marginTop: 4 }}>{ann.bodyAr}</div>}
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ fontSize: '.8rem', color: '#64748B' }}>{new Date(ann.createdAt).toLocaleDateString('ar')}</span>
                    <button onClick={() => deleteAnn(ann.id)} style={btnStyle('#EF4444')}>حذف</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, [string,string]> = {
    'new':         ['#8B5CF6','جديد'],
    'in-progress': ['#F59E0B','قيد المعالجة'],
    'resolved':    ['#22C55E','تم الحل'],
  };
  const [color, label] = map[status] ?? ['#64748B', status];
  return (
    <span style={{ background: color+'22', border: `1px solid ${color}44`, color, borderRadius: 99, fontSize: '.75rem', fontWeight: 700, padding: '3px 10px' }}>
      {label}
    </span>
  );
}

const btnStyle = (color: string): React.CSSProperties => ({
  background: color + '15', border: `1px solid ${color}30`, color,
  borderRadius: 8, padding: '6px 14px', fontSize: '.82rem', fontWeight: 600, cursor: 'pointer',
});

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 14px',
  background: 'rgba(255,255,255,.04)', border: '1px solid rgba(139,92,246,.2)',
  borderRadius: 10, color: 'white', fontSize: '.92rem', outline: 'none',
};
