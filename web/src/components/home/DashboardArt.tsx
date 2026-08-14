/**
 * Dashboard mockup on a strict grid.
 * Screen 190,20 → 710,370 with 14px padding. Sidebar 606→696 (RTL, right).
 * Content column 204→594 splits into 4 KPI cards (90 wide, 9 gap), a chart row,
 * and an orders row. The 190px left gutter is reserved for the floating badges.
 */

const KPI = [
  { x: 204, label: "إجمالي المبيعات", value: "$24,780", delta: "12.3%", up: true },
  { x: 303, label: "الطلبات", value: "1,245", delta: "8.2%", up: true },
  { x: 402, label: "متوسط الطلب", value: "$8,460", delta: "6.7%", up: true },
  { x: 501, label: "العملاء", value: "320", delta: "3.1%", up: false },
];

const MONTHS = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو"];

const SERIES = [46, 62, 54, 78, 68, 92, 86];
const PLOT = { x0: 218, x1: 406, y0: 186, y1: 266 };
const step = (PLOT.x1 - PLOT.x0) / (SERIES.length - 1);
const pts = SERIES.map((v, i) => [PLOT.x0 + i * step, PLOT.y1 - (v / 100) * (PLOT.y1 - PLOT.y0)] as const);
const linePath = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
const areaPath = `${linePath} L${PLOT.x1} ${PLOT.y1} L${PLOT.x0} ${PLOT.y1} Z`;

const DONUT = [
  { c: "#a855f7", pct: 45, label: "المتجر" },
  { c: "#00d4ff", pct: 30, label: "نقاط البيع" },
  { c: "#e879f9", pct: 15, label: "مباشرة" },
  { c: "#22c55e", pct: 10, label: "أخرى" },
];
const R = 26;
const CIRC = 2 * Math.PI * R;

const ORDERS = [
  { id: "#12584", name: "أحمد محمد", amount: "$320", state: "مكتملة", c: "#22c55e" },
  { id: "#12583", name: "مطعم الشام", amount: "$1,120", state: "قيد التنفيذ", c: "#f59e0b" },
  { id: "#12582", name: "سارة علي", amount: "$245", state: "مكتملة", c: "#22c55e" },
];

const NAV = ["الرئيسية", "لوحة التحكم", "المبيعات", "الطلبات", "المنتجات", "العملاء", "التقارير"];

const FONT = "system-ui, sans-serif";

export default function DashboardArt() {
  let sweep = 0;

  return (
    <svg
      viewBox="0 0 720 400"
      className="h-auto w-full"
      role="img"
      aria-label="لوحة تحكم نظام ZAWAN"
      /* The page is dir="rtl"; SVG would inherit it and flip every text-anchor,
         so anchors are resolved in LTR terms and each string still shapes RTL. */
      style={{ direction: "ltr" }}
    >
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
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.42" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </linearGradient>
        <filter id="da-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="9" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx="450" cy="200" rx="270" ry="175" fill="#7c3cff" opacity="0.13" filter="url(#da-glow)" />

      {/* screen */}
      <rect x="190" y="20" width="520" height="350" rx="12" fill="url(#da-screen)" stroke="url(#da-edge)" strokeWidth="1.6" />

      {/* sidebar */}
      <rect x="606" y="34" width="90" height="322" rx="9" fill="#ffffff" opacity="0.035" />
      <rect x="666" y="44" width="24" height="24" rx="7" fill="url(#da-edge)" opacity="0.9" />
      <text x="678" y="60.5" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="800" fontFamily={FONT}>Z</text>
      {NAV.map((item, i) => {
        const y = 96 + i * 32;
        const on = i === 1;
        return (
          <g key={item}>
            {on && <rect x="612" y={y - 11} width="78" height="23" rx="7" fill="#a855f7" opacity="0.18" />}
            {on && <rect x="691" y={y - 9} width="3" height="19" rx="1.5" fill="#c13cff" />}
            <circle cx="682" cy={y + 0.5} r="2.8" fill={on ? "#c13cff" : "#ffffff"} opacity={on ? 1 : 0.3} />
            <text x="673" y={y + 4} textAnchor="end" fill="#fff" fillOpacity={on ? 0.92 : 0.4} fontSize="9" fontFamily={FONT}>
              {item}
            </text>
          </g>
        );
      })}

      {/* top bar — search icon sits on the right, matching RTL */}
      <rect x="204" y="34" width="390" height="28" rx="8" fill="#ffffff" opacity="0.04" />
      <circle cx="578" cy="46" r="4.6" fill="none" stroke="#ffffff" strokeOpacity="0.32" strokeWidth="1.5" />
      <line x1="581.4" y1="49.4" x2="584.5" y2="52.5" stroke="#ffffff" strokeOpacity="0.32" strokeWidth="1.5" strokeLinecap="round" />
      <text x="564" y="51.5" textAnchor="end" fill="#fff" fillOpacity="0.28" fontSize="9" fontFamily={FONT}>بحث في النظام</text>
      <circle cx="222" cy="48" r="5" fill="#ffffff" opacity="0.2" />
      <circle cx="238" cy="48" r="5" fill="#ffffff" opacity="0.13" />

      {/* KPI cards — label, value, then the delta pill on its own line */}
      {KPI.map((k) => (
        <g key={k.label}>
          <rect x={k.x} y="72" width="90" height="62" rx="9" fill="#ffffff" opacity="0.05" />
          <text x={k.x + 81} y="90" textAnchor="end" fill="#fff" fillOpacity="0.44" fontSize="8" fontFamily={FONT}>
            {k.label}
          </text>
          <text x={k.x + 81} y="110" textAnchor="end" fill="#fff" fontSize="13.5" fontWeight="800" fontFamily={FONT}>
            {k.value}
          </text>
          <rect x={k.x + 37} y="116" width="44" height="13" rx="6.5" fill={k.up ? "#22c55e" : "#ef4444"} opacity="0.16" />
          <path
            d={k.up ? `M${k.x + 44} 125 l3 -3.4 l3 3.4` : `M${k.x + 44} 120 l3 3.4 l3 -3.4`}
            fill="none"
            stroke={k.up ? "#22c55e" : "#ef4444"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x={k.x + 76} y="125.5" textAnchor="end" fill={k.up ? "#22c55e" : "#ef4444"} fontSize="7.5" fontWeight="700" fontFamily={FONT}>
            {k.delta}
          </text>
        </g>
      ))}

      {/* area chart */}
      <rect x="204" y="144" width="216" height="148" rx="10" fill="#ffffff" opacity="0.04" />
      <text x="406" y="166" textAnchor="end" fill="#fff" fillOpacity="0.58" fontSize="9.5" fontWeight="700" fontFamily={FONT}>
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
      <path d={linePath} fill="none" stroke="#c084fc" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x, y], i) =>
        i % 2 === 1 ? <circle key={i} cx={x} cy={y} r="3.2" fill="#0b0720" stroke="#c084fc" strokeWidth="1.9" /> : null,
      )}
      {MONTHS.map((m, i) => (
        <text key={m} x={PLOT.x0 + i * step} y="282" textAnchor="middle" fill="#fff" fillOpacity="0.32" fontSize="7" fontFamily={FONT}>
          {m}
        </text>
      ))}

      {/* donut + legend */}
      <rect x="429" y="144" width="165" height="148" rx="10" fill="#ffffff" opacity="0.04" />
      <text x="580" y="166" textAnchor="end" fill="#fff" fillOpacity="0.58" fontSize="9.5" fontWeight="700" fontFamily={FONT}>
        توزيع القنوات
      </text>
      <g transform="translate(470, 228)">
        <circle r={R} fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="10" />
        {DONUT.map((d) => {
          const len = (d.pct / 100) * CIRC;
          const el = (
            <circle
              key={d.c}
              r={R}
              fill="none"
              stroke={d.c}
              strokeWidth="10"
              strokeDasharray={`${len.toFixed(1)} ${(CIRC - len).toFixed(1)}`}
              strokeDashoffset={(-sweep).toFixed(1)}
              transform="rotate(-90)"
            />
          );
          sweep += len;
          return el;
        })}
      </g>
      {DONUT.map((d, i) => {
        const y = 192 + i * 22;
        return (
          <g key={d.label}>
            <circle cx="580" cy={y - 3} r="3.4" fill={d.c} />
            <text x="570" y={y} textAnchor="end" fill="#fff" fillOpacity="0.46" fontSize="7.5" fontFamily={FONT}>
              {d.label}
            </text>
            <text x="524" y={y} textAnchor="end" fill="#fff" fillOpacity="0.78" fontSize="7.5" fontWeight="700" fontFamily={FONT}>
              {d.pct}%
            </text>
          </g>
        );
      })}

      {/* recent orders */}
      <rect x="204" y="300" width="390" height="56" rx="10" fill="#ffffff" opacity="0.04" />
      <text x="580" y="317" textAnchor="end" fill="#fff" fillOpacity="0.58" fontSize="9" fontWeight="700" fontFamily={FONT}>
        أحدث الطلبات
      </text>
      {ORDERS.map((o, i) => {
        const y = 331 + i * 11;
        return (
          <g key={o.id}>
            <text x="580" y={y} textAnchor="end" fill="#fff" fillOpacity="0.5" fontSize="7.5" fontFamily={FONT}>
              {o.id}
            </text>
            <text x="524" y={y} textAnchor="end" fill="#fff" fillOpacity="0.62" fontSize="7.5" fontFamily={FONT}>
              {o.name}
            </text>
            <text x="430" y={y} textAnchor="end" fill="#fff" fillOpacity="0.8" fontSize="7.5" fontWeight="700" fontFamily={FONT}>
              {o.amount}
            </text>
            <rect x="216" y={y - 8} width="54" height="11" rx="5.5" fill={o.c} opacity="0.16" />
            <text x="243" y={y - 0.5} textAnchor="middle" fill={o.c} fontSize="6.8" fontWeight="700" fontFamily={FONT}>
              {o.state}
            </text>
          </g>
        );
      })}

      {/* laptop base */}
      <path d="M178 370 H718 L704 390 H192 Z" fill="#1a1236" stroke="rgba(140,100,255,0.28)" strokeWidth="1" />
      <rect x="418" y="375" width="64" height="3.5" rx="1.75" fill="#ffffff" opacity="0.14" />
    </svg>
  );
}
