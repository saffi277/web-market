/**
 * Realistic dashboard mockup drawn on a strict grid:
 * screen 150,20 → 710,370 with 14px padding, a 86px sidebar on the right (RTL),
 * and a 436px content column split into evenly gapped cards.
 */

const KPI = [
  { x: 164, label: "إجمالي المبيعات", value: "$24,780", delta: "+12.3%", up: true, c: "#00d4ff" },
  { x: 275, label: "الطلبات", value: "1,245", delta: "+8.2%", up: true, c: "#a855f7" },
  { x: 386, label: "متوسط الطلب", value: "$8,460", delta: "+6.7%", up: true, c: "#e879f9" },
  { x: 497, label: "العملاء", value: "320", delta: "-3.1%", up: false, c: "#22c55e" },
];

const MONTHS = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو"];

// Area chart plot box: x 178→430, y 178→270
const SERIES = [46, 62, 54, 78, 68, 92, 86];
const PLOT = { x0: 178, x1: 430, y0: 178, y1: 270 };
const step = (PLOT.x1 - PLOT.x0) / (SERIES.length - 1);
const maxV = 100;
const pts = SERIES.map((v, i) => [
  PLOT.x0 + i * step,
  PLOT.y1 - (v / maxV) * (PLOT.y1 - PLOT.y0),
] as const);
const linePath = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
const areaPath = `${linePath} L${PLOT.x1} ${PLOT.y1} L${PLOT.x0} ${PLOT.y1} Z`;

const DONUT = [
  { c: "#a855f7", pct: 45, label: "المتجر الإلكتروني" },
  { c: "#00d4ff", pct: 30, label: "نقاط البيع" },
  { c: "#e879f9", pct: 15, label: "المبيعات المباشرة" },
  { c: "#22c55e", pct: 10, label: "أخرى" },
];
const R = 34;
const CIRC = 2 * Math.PI * R;

const ORDERS = [
  { id: "#12584", name: "أحمد محمد", amount: "$320", state: "مكتملة", c: "#22c55e" },
  { id: "#12583", name: "مطعم الشام", amount: "$1,120", state: "قيد التنفيذ", c: "#f59e0b" },
  { id: "#12582", name: "سارة علي", amount: "$245", state: "مكتملة", c: "#22c55e" },
];

const NAV = ["الرئيسية", "لوحة التحكم", "المبيعات", "الطلبات", "المنتجات", "العملاء", "التقارير"];

export default function DashboardArt() {
  let offset = 0;

  return (
    <svg viewBox="0 0 720 440" className="h-auto w-full" role="img" aria-label="لوحة تحكم نظام ZAWAN">
      <defs>
        <linearGradient id="da-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#171030" />
          <stop offset="100%" stopColor="#0b0720" />
        </linearGradient>
        <linearGradient id="da-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="55%" stopColor="#7c3cff" />
          <stop offset="100%" stopColor="#d844ff" />
        </linearGradient>
        <linearGradient id="da-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="da-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#7c3cff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00d4ff" />
        </linearGradient>
        <filter id="da-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx="430" cy="205" rx="290" ry="180" fill="#7c3cff" opacity="0.13" filter="url(#da-glow)" />

      {/* ── screen ── */}
      <rect x="150" y="20" width="560" height="350" rx="12" fill="url(#da-screen)" stroke="url(#da-edge)" strokeWidth="1.6" />

      {/* ── sidebar (right, RTL) ── */}
      <rect x="610" y="34" width="86" height="322" rx="9" fill="#ffffff" opacity="0.035" />
      <rect x="668" y="46" width="22" height="22" rx="7" fill="url(#da-edge)" opacity="0.9" />
      <text x="679" y="61.5" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800" fontFamily="system-ui">Z</text>
      {NAV.map((item, i) => {
        const y = 92 + i * 32;
        const on = i === 1;
        return (
          <g key={item}>
            {on && <rect x="618" y={y - 11} width="70" height="24" rx="7" fill="#a855f7" opacity="0.16" />}
            {on && <rect x="690" y={y - 9} width="3" height="20" rx="1.5" fill="#c13cff" />}
            <circle cx="681" cy={y + 1} r="3" fill={on ? "#c13cff" : "#ffffff"} opacity={on ? 1 : 0.3} />
            <text x="672" y={y + 5} textAnchor="end" fill="#fff" fillOpacity={on ? 0.9 : 0.4} fontSize="9.5" fontFamily="system-ui">
              {item}
            </text>
          </g>
        );
      })}

      {/* ── top bar ── */}
      <rect x="164" y="34" width="436" height="28" rx="8" fill="#ffffff" opacity="0.04" />
      <circle cx="588" cy="48" r="5.5" fill="#ffffff" opacity="0.22" />
      <circle cx="571" cy="48" r="5.5" fill="#ffffff" opacity="0.16" />
      <circle cx="182" cy="48" r="5" fill="none" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" />
      <line x1="185.5" y1="51.5" x2="189" y2="55" stroke="#ffffff" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
      <text x="198" y="51.5" fill="#fff" fillOpacity="0.28" fontSize="9.5" fontFamily="system-ui">بحث...</text>

      {/* ── KPI row: 4 × 103 with 8 gaps ── */}
      {KPI.map((k) => (
        <g key={k.label}>
          <rect x={k.x} y="72" width="103" height="54" rx="9" fill="#ffffff" opacity="0.05" />
          <text x={k.x + 91} y="90" textAnchor="end" fill="#fff" fillOpacity="0.42" fontSize="8.5" fontFamily="system-ui">
            {k.label}
          </text>
          <text x={k.x + 91} y="109" textAnchor="end" fill="#fff" fontSize="15" fontWeight="800" fontFamily="system-ui">
            {k.value}
          </text>
          <rect x={k.x + 12} y="98" width="44" height="14" rx="7" fill={k.up ? "#22c55e" : "#ef4444"} opacity="0.16" />
          <path
            d={
              k.up
                ? `M${k.x + 19} 108 l3.5 -4 l3.5 4`
                : `M${k.x + 19} 104 l3.5 4 l3.5 -4`
            }
            fill="none"
            stroke={k.up ? "#22c55e" : "#ef4444"}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x={k.x + 30} y="109" fill={k.up ? "#22c55e" : "#ef4444"} fontSize="8" fontWeight="700" fontFamily="system-ui">
            {k.delta}
          </text>
        </g>
      ))}

      {/* ── area chart: 280 wide ── */}
      <rect x="164" y="136" width="280" height="150" rx="10" fill="#ffffff" opacity="0.04" />
      <text x="430" y="157" textAnchor="end" fill="#fff" fillOpacity="0.55" fontSize="10" fontWeight="700" fontFamily="system-ui">
        نظرة عامة على المبيعات
      </text>
      {[0, 0.5, 1].map((f) => (
        <line
          key={f}
          x1={PLOT.x0}
          x2={PLOT.x1}
          y1={PLOT.y0 + f * (PLOT.y1 - PLOT.y0)}
          y2={PLOT.y0 + f * (PLOT.y1 - PLOT.y0)}
          stroke="#ffffff"
          strokeOpacity="0.07"
        />
      ))}
      <path d={areaPath} fill="url(#da-area)" />
      <path d={linePath} fill="none" stroke="#c084fc" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x, y], i) =>
        i % 2 === 1 ? <circle key={i} cx={x} cy={y} r="3.4" fill="#0b0720" stroke="#c084fc" strokeWidth="2" /> : null,
      )}
      {MONTHS.map((m, i) => (
        <text
          key={m}
          x={PLOT.x0 + i * step}
          y="282"
          textAnchor="middle"
          fill="#fff"
          fillOpacity="0.3"
          fontSize="7.5"
          fontFamily="system-ui"
        >
          {m}
        </text>
      ))}

      {/* ── donut: 148 wide ── */}
      <rect x="452" y="136" width="148" height="150" rx="10" fill="#ffffff" opacity="0.04" />
      <text x="588" y="157" textAnchor="end" fill="#fff" fillOpacity="0.55" fontSize="10" fontWeight="700" fontFamily="system-ui">
        توزيع القنوات
      </text>
      <g transform="translate(496, 205)">
        <circle r={R} fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="13" />
        {DONUT.map((d) => {
          const len = (d.pct / 100) * CIRC;
          const el = (
            <circle
              key={d.c}
              r={R}
              fill="none"
              stroke={d.c}
              strokeWidth="13"
              strokeDasharray={`${len.toFixed(1)} ${(CIRC - len).toFixed(1)}`}
              strokeDashoffset={(-offset).toFixed(1)}
              transform="rotate(-90)"
            />
          );
          offset += len;
          return el;
        })}
      </g>
      {DONUT.map((d, i) => (
        <g key={d.label}>
          <circle cx="588" cy={182 + i * 20} r="3.5" fill={d.c} />
          <text x="578" y={185 + i * 20} textAnchor="end" fill="#fff" fillOpacity="0.42" fontSize="8" fontFamily="system-ui">
            {d.label}
          </text>
          <text x="540" y={185 + i * 20} textAnchor="end" fill="#fff" fillOpacity="0.7" fontSize="8" fontWeight="700" fontFamily="system-ui">
            {d.pct}%
          </text>
        </g>
      ))}

      {/* ── recent orders ── */}
      <rect x="164" y="294" width="436" height="62" rx="10" fill="#ffffff" opacity="0.04" />
      <text x="588" y="311" textAnchor="end" fill="#fff" fillOpacity="0.55" fontSize="9.5" fontWeight="700" fontFamily="system-ui">
        أحدث الطلبات
      </text>
      {ORDERS.map((o, i) => {
        const y = 326 + i * 13;
        return (
          <g key={o.id}>
            <text x="588" y={y} textAnchor="end" fill="#fff" fillOpacity="0.5" fontSize="8" fontFamily="system-ui">
              {o.id}
            </text>
            <text x="530" y={y} textAnchor="end" fill="#fff" fillOpacity="0.62" fontSize="8" fontFamily="system-ui">
              {o.name}
            </text>
            <text x="300" y={y} textAnchor="end" fill="#fff" fillOpacity="0.75" fontSize="8" fontWeight="700" fontFamily="system-ui">
              {o.amount}
            </text>
            <rect x="176" y={y - 8} width="56" height="11" rx="5.5" fill={o.c} opacity="0.16" />
            <text x="204" y={y - 0.5} textAnchor="middle" fill={o.c} fontSize="7" fontWeight="700" fontFamily="system-ui">
              {o.state}
            </text>
          </g>
        );
      })}

      {/* ── laptop base ── */}
      <path d="M126 370 H734 L718 392 H142 Z" fill="#1a1236" stroke="rgba(140,100,255,0.28)" strokeWidth="1" />
      <rect x="392" y="376" width="76" height="4" rx="2" fill="#ffffff" opacity="0.14" />
    </svg>
  );
}
