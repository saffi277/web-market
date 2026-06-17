'use client';
import { useState, useEffect } from 'react';

const API = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';

type Message = {
  id: string; name: string; email: string; phone?: string;
  service?: string; budget?: string; message: string;
  status: string; type: string; createdAt: string;
};

export default function AdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<Message | null>(null);
  const [tab, setTab] = useState<'contact'|'order'>('contact');

  useEffect(() => {
    const t = localStorage.getItem('zawan_token');
    if (t) { setToken(t); fetchMessages(t); }
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginErr('');
    const res = await fetch(`${API}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) return setLoginErr(data.error ?? 'خطأ بالتسجيل');
    localStorage.setItem('zawan_token', data.token);
    setToken(data.token);
    fetchMessages(data.token);
  };

  const fetchMessages = async (t: string) => {
    setLoading(true);
    const res = await fetch(`${API}/api/messages`, {
      headers: { Authorization: `Bearer ${t}` },
    });
    if (res.ok) setMessages(await res.json());
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`${API}/api/messages/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    setMessages(ms => ms.map(m => m.id === id ? { ...m, status } : m));
    if (selected?.id === id) setSelected(s => s ? { ...s, status } : s);
  };

  const deleteMsg = async (id: string) => {
    if (!confirm('حذف الرسالة؟')) return;
    await fetch(`${API}/api/messages/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    setMessages(ms => ms.filter(m => m.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const logout = () => { localStorage.removeItem('zawan_token'); setToken(null); setMessages([]); };

  const statusColor = (s: string) => s === 'read' ? '#22c55e' : s === 'replied' ? '#3b82f6' : '#a855f7';
  const statusLabel = (s: string) => s === 'read' ? 'مقروء' : s === 'replied' ? 'تم الرد' : 'جديد';

  if (!token) return (
    <main className="page" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form onSubmit={login} style={{ background: 'rgba(14,9,32,.9)', border: '1px solid rgba(139,92,246,.2)', borderRadius: 24, padding: '2.5rem', width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔐</div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>لوحة الإدارة</h1>
          <p style={{ color: '#94A3B8', margin: '4px 0 0', fontSize: '.9rem' }}>ZAWAN Dashboard</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={e => setEmail(e.target.value)} required
            style={{ padding: '12px 16px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(139,92,246,.25)', borderRadius: 12, color: 'white', fontSize: '1rem', outline: 'none', direction: 'ltr' }} />
          <input type="password" placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} required
            style={{ padding: '12px 16px', background: 'rgba(255,255,255,.05)', border: '1px solid rgba(139,92,246,.25)', borderRadius: 12, color: 'white', fontSize: '1rem', outline: 'none', direction: 'ltr' }} />
          {loginErr && <p style={{ color: '#f87171', textAlign: 'center', fontSize: '.9rem' }}>{loginErr}</p>}
          <button type="submit" style={{ background: 'linear-gradient(135deg,#7c3cff,#d844ff)', color: 'white', border: 'none', borderRadius: 12, padding: '14px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer' }}>
            دخول
          </button>
        </div>
      </form>
    </main>
  );

  return (
    <main className="page" style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '3rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 1.5rem' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>لوحة الإدارة</h1>
            <p style={{ color: '#94A3B8', margin: '4px 0 0', fontSize: '.9rem' }}>{messages.length} رسالة إجمالاً</p>
          </div>
          <button onClick={logout} style={{ background: 'rgba(239,68,68,.15)', border: '1px solid rgba(239,68,68,.3)', color: '#f87171', borderRadius: 10, padding: '8px 20px', cursor: 'pointer', fontWeight: 600 }}>
            خروج
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
          {([['contact','طلبات التواصل','💬'],['order','طلبات الشراء','🛒']] as const).map(([key,label,icon]) => (
            <button key={key} onClick={() => { setTab(key); setSelected(null); }}
              style={{ padding: '10px 24px', borderRadius: 12, fontWeight: 700, fontSize: '.95rem', cursor: 'pointer', border: '1px solid', transition: 'all .2s',
                background: tab === key ? 'linear-gradient(135deg,#7c3cff,#d844ff)' : 'rgba(255,255,255,.04)',
                borderColor: tab === key ? 'transparent' : 'rgba(139,92,246,.2)',
                color: 'white' }}>
              {icon} {label}
              <span style={{ marginRight: 8, background: 'rgba(255,255,255,.2)', borderRadius: 99, padding: '2px 8px', fontSize: '.78rem' }}>
                {messages.filter(m => m.type === key).length}
              </span>
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
          {[
            { label: 'جديدة', count: messages.filter(m => m.type === tab && m.status === 'unread').length, color: '#a855f7' },
            { label: 'مقروءة', count: messages.filter(m => m.type === tab && m.status === 'read').length, color: '#22c55e' },
            { label: 'تم الرد', count: messages.filter(m => m.type === tab && m.status === 'replied').length, color: '#3b82f6' },
          ].map(s => (
            <div key={s.label} style={{ background: 'rgba(14,9,32,.7)', border: `1px solid ${s.color}30`, borderRadius: 16, padding: '1.2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.count}</div>
              <div style={{ color: '#94A3B8', fontSize: '.85rem', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1fr' : '1fr', gap: 20 }}>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {loading ? (
              <p style={{ textAlign: 'center', color: '#94A3B8', padding: '3rem' }}>جاري التحميل...</p>
            ) : messages.filter(m => m.type === tab).length === 0 ? (
              <p style={{ textAlign: 'center', color: '#94A3B8', padding: '3rem' }}>لا توجد {tab === 'contact' ? 'طلبات تواصل' : 'طلبات شراء'} بعد</p>
            ) : messages.filter(m => m.type === tab).map(m => (
              <div key={m.id} onClick={() => { setSelected(m); if (m.status === 'unread') updateStatus(m.id, 'read'); }}
                style={{ background: selected?.id === m.id ? 'rgba(139,92,246,.15)' : 'rgba(14,9,32,.7)', border: `1px solid ${selected?.id === m.id ? 'rgba(139,92,246,.5)' : 'rgba(139,92,246,.1)'}`, borderRadius: 14, padding: '1rem 1.2rem', cursor: 'pointer', transition: 'all .2s' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: '1rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                      {m.status === 'unread' && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#a855f7', flexShrink: 0, display: 'inline-block' }} />}
                      {m.name}
                    </div>
                    <div style={{ color: '#94A3B8', fontSize: '.82rem', marginTop: 2 }}>{m.email}{m.phone ? ` • ${m.phone}` : ''}</div>
                    <div style={{ color: '#cbd5e1', fontSize: '.88rem', marginTop: 6, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{m.message}</div>
                  </div>
                  <span style={{ background: statusColor(m.status) + '22', color: statusColor(m.status), borderRadius: 8, padding: '3px 10px', fontSize: '.75rem', fontWeight: 600, flexShrink: 0 }}>
                    {statusLabel(m.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {selected && (
            <div style={{ background: 'rgba(14,9,32,.9)', border: '1px solid rgba(139,92,246,.2)', borderRadius: 18, padding: '1.5rem', height: 'fit-content', position: 'sticky', top: '7rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                <h2 style={{ margin: 0, fontSize: '1.2rem' }}>{selected.name}</h2>
                <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: '1.2rem' }}>✕</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: '.9rem' }}>
                <Row label="البريد" value={selected.email} />
                {selected.phone && <Row label="الهاتف" value={selected.phone} />}
                {selected.service && <Row label="الخدمة" value={selected.service} />}
                {selected.budget && <Row label="الميزانية" value={selected.budget} />}
                <Row label="التاريخ" value={new Date(selected.createdAt).toLocaleDateString('ar-IQ')} />
                <div style={{ background: 'rgba(139,92,246,.08)', border: '1px solid rgba(139,92,246,.15)', borderRadius: 12, padding: '1rem', marginTop: 4 }}>
                  <div style={{ color: '#94A3B8', fontSize: '.78rem', marginBottom: 6 }}>الرسالة</div>
                  <p style={{ margin: 0, lineHeight: 1.8, color: '#e2e8f0' }}>{selected.message}</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
                {selected.phone && (
                  <a href={`https://wa.me/${selected.phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                    style={{ flex: 1, textAlign: 'center', background: '#22c55e22', border: '1px solid #22c55e44', color: '#22c55e', borderRadius: 10, padding: '10px', textDecoration: 'none', fontWeight: 600, fontSize: '.85rem' }}>
                    واتساب
                  </a>
                )}
                <button onClick={() => updateStatus(selected.id, 'replied')}
                  style={{ flex: 1, background: '#3b82f622', border: '1px solid #3b82f644', color: '#3b82f6', borderRadius: 10, padding: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '.85rem' }}>
                  تم الرد ✓
                </button>
                <button onClick={() => deleteMsg(selected.id)}
                  style={{ flex: 1, background: '#ef444422', border: '1px solid #ef444444', color: '#f87171', borderRadius: 10, padding: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '.85rem' }}>
                  حذف 🗑
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: 8 }}>
      <span style={{ color: '#94A3B8', minWidth: 70 }}>{label}:</span>
      <span style={{ color: '#e2e8f0' }}>{value}</span>
    </div>
  );
}
