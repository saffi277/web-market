/** Pure-SVG product mockup: a laptop dashboard with a phone in front. */
export default function DashboardArt() {
  return (
    <svg
      viewBox="0 0 620 460"
      className="h-auto w-full"
      role="img"
      aria-label="لوحة تحكم نظام ZAWAN"
    >
      <defs>
        <linearGradient id="da-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#150e30" />
          <stop offset="100%" stopColor="#0b0720" />
        </linearGradient>
        <linearGradient id="da-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="55%" stopColor="#7c3cff" />
          <stop offset="100%" stopColor="#d844ff" />
        </linearGradient>
        <linearGradient id="da-bar" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#7c3cff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#00d4ff" />
        </linearGradient>
        <linearGradient id="da-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </linearGradient>
        <filter id="da-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ambient glow behind the device */}
      <ellipse cx="330" cy="240" rx="250" ry="170" fill="#7c3cff" opacity="0.14" filter="url(#da-glow)" />

      {/* laptop screen */}
      <g>
        <rect x="120" y="40" width="470" height="300" rx="14" fill="url(#da-screen)" stroke="url(#da-edge)" strokeWidth="1.6" />

        {/* sidebar */}
        <rect x="500" y="56" width="74" height="268" rx="9" fill="#ffffff" opacity="0.04" />
        <circle cx="516" cy="76" r="5" fill="#a855f7" />
        <rect x="526" y="72" width="34" height="7" rx="3.5" fill="#ffffff" opacity="0.5" />
        {[110, 140, 170, 200, 230, 260, 290].map((y, i) => (
          <g key={y}>
            <rect x="510" y={y - 5} width="10" height="10" rx="3" fill="#a855f7" opacity={i === 0 ? 0.9 : 0.32} />
            <rect x="526" y={y - 3.5} width="36" height="7" rx="3.5" fill="#ffffff" opacity={i === 0 ? 0.55 : 0.22} />
          </g>
        ))}

        {/* top bar */}
        <rect x="136" y="56" width="352" height="24" rx="7" fill="#ffffff" opacity="0.03" />
        <circle cx="470" cy="68" r="6" fill="#ffffff" opacity="0.25" />
        <circle cx="450" cy="68" r="6" fill="#ffffff" opacity="0.18" />

        {/* KPI tiles */}
        {[
          { x: 136, label: "#00d4ff", w: 84 },
          { x: 228, label: "#a855f7", w: 84 },
          { x: 320, label: "#e879f9", w: 84 },
          { x: 412, label: "#22c55e", w: 76 },
        ].map((t) => (
          <g key={t.x}>
            <rect x={t.x} y="90" width={t.w} height="46" rx="9" fill="#ffffff" opacity="0.05" />
            <rect x={t.x + 10} y="100" width="30" height="6" rx="3" fill="#ffffff" opacity="0.3" />
            <rect x={t.x + 10} y="112" width="46" height="10" rx="4" fill={t.label} opacity="0.85" />
          </g>
        ))}

        {/* area chart */}
        <rect x="136" y="148" width="230" height="176" rx="10" fill="#ffffff" opacity="0.04" />
        <path
          d="M150 288 L184 262 L218 274 L252 232 L286 246 L320 200 L352 214 L352 310 L150 310 Z"
          fill="url(#da-area)"
        />
        <path
          d="M150 288 L184 262 L218 274 L252 232 L286 246 L320 200 L352 214"
          fill="none"
          stroke="#c084fc"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {[[184, 262], [252, 232], [320, 200]].map(([cx, cy]) => (
          <circle key={cx} cx={cx} cy={cy} r="3.5" fill="#fff" stroke="#a855f7" strokeWidth="2" />
        ))}

        {/* bar chart */}
        <rect x="378" y="148" width="110" height="176" rx="10" fill="#ffffff" opacity="0.04" />
        {[
          [392, 40], [408, 66], [424, 30], [440, 78], [456, 52], [472, 88],
        ].map(([x, h]) => (
          <rect key={x} x={x} y={300 - h} width="9" height={h} rx="3.5" fill="url(#da-bar)" />
        ))}
      </g>

      {/* laptop base */}
      <path d="M96 340 H614 L600 358 H110 Z" fill="#1a1236" stroke="rgba(140,100,255,0.3)" strokeWidth="1" />
      <rect x="300" y="345" width="110" height="4" rx="2" fill="#ffffff" opacity="0.12" />

      {/* phone */}
      <g>
        <rect x="24" y="120" width="132" height="248" rx="20" fill="url(#da-screen)" stroke="url(#da-edge)" strokeWidth="1.6" />
        <rect x="66" y="130" width="46" height="6" rx="3" fill="#ffffff" opacity="0.18" />

        <rect x="36" y="150" width="108" height="20" rx="7" fill="#ffffff" opacity="0.04" />
        <rect x="44" y="157" width="40" height="6" rx="3" fill="#ffffff" opacity="0.35" />

        {/* donut */}
        <circle cx="90" cy="222" r="34" fill="none" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="10" />
        <circle
          cx="90" cy="222" r="34" fill="none" stroke="#00d4ff" strokeWidth="10"
          strokeLinecap="round" strokeDasharray="214" strokeDashoffset="82"
          transform="rotate(-90 90 222)"
        />
        <text x="90" y="228" textAnchor="middle" fill="#fff" fontSize="19" fontWeight="700" fontFamily="system-ui">62%</text>

        {/* list rows */}
        {[276, 306, 336].map((y, i) => (
          <g key={y}>
            <rect x="36" y={y} width="108" height="24" rx="8" fill="#ffffff" opacity="0.04" />
            <circle cx="50" cy={y + 12} r="7" fill={["#e879f9", "#00d4ff", "#22c55e"][i]} opacity="0.85" />
            <rect x="64" y={y + 6} width="42" height="5" rx="2.5" fill="#ffffff" opacity="0.4" />
            <rect x="64" y={y + 15} width="26" height="4" rx="2" fill="#ffffff" opacity="0.22" />
          </g>
        ))}
      </g>
    </svg>
  );
}
