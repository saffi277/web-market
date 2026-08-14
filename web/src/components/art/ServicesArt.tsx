/** Isometric stack of service surfaces: code, charts, gear, shield, database. */
export default function ServicesArt() {
  return (
    <svg viewBox="0 0 620 420" className="h-auto w-full" role="img" aria-label="خدمات ZAWAN البرمجية">
      <defs>
        <linearGradient id="sv-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="55%" stopColor="#7c3cff" />
          <stop offset="100%" stopColor="#d844ff" />
        </linearGradient>
        <linearGradient id="sv-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1a1138" />
          <stop offset="100%" stopColor="#0c0722" />
        </linearGradient>
        <filter id="sv-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx="310" cy="220" rx="270" ry="165" fill="#7c3cff" opacity="0.13" filter="url(#sv-glow)" />

      {/* main monitor */}
      <g>
        <rect x="150" y="70" width="330" height="212" rx="14" fill="url(#sv-face)" stroke="url(#sv-edge)" strokeWidth="1.7" />
        <rect x="166" y="86" width="298" height="20" rx="6" fill="#ffffff" opacity="0.05" />
        {[176, 190, 204].map((cx, i) => (
          <circle key={cx} cx={cx} cy="96" r="4" fill={["#e879f9", "#f59e0b", "#22c55e"][i]} opacity="0.8" />
        ))}

        {/* code lines */}
        {[
          [124, 74], [140, 118], [156, 96], [172, 140], [188, 82], [204, 128], [220, 104],
        ].map(([y, w], i) => (
          <g key={y}>
            <rect x="176" y={y} width="9" height="7" rx="2" fill="#c084fc" opacity="0.55" />
            <rect x="192" y={y} width={w} height="7" rx="3.5" fill="#ffffff" opacity={i % 2 ? 0.2 : 0.3} />
          </g>
        ))}

        {/* mini chart inside */}
        <rect x="330" y="118" width="118" height="110" rx="9" fill="#ffffff" opacity="0.05" />
        <path d="M342 206 L364 186 L386 194 L408 166 L430 176" fill="none" stroke="#00d4ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {[26, 40, 32, 52].map((h, i) => (
          <rect key={i} x={344 + i * 24} y={222 - h * 0.42} width="11" height={h * 0.42} rx="3" fill="#a855f7" opacity="0.65" />
        ))}
      </g>

      {/* monitor stand */}
      <path d="M292 282 H338 L346 306 H284 Z" fill="#1a1236" stroke="rgba(140,100,255,0.28)" />
      <rect x="266" y="306" width="98" height="7" rx="3.5" fill="#ffffff" opacity="0.1" />

      {/* floating tiles */}
      {[
        { x: 58, y: 138, label: "code" },
        { x: 78, y: 244, label: "db" },
        { x: 494, y: 128, label: "gear" },
        { x: 470, y: 246, label: "shield" },
      ].map((t) => (
        <g key={t.label}>
          <rect x={t.x} y={t.y} width="74" height="74" rx="18" fill="url(#sv-face)" stroke="url(#sv-edge)" strokeWidth="1.4" />

          {t.label === "code" && (
            <g stroke="#00d4ff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d={`M${t.x + 26} ${t.y + 28} L${t.x + 16} ${t.y + 37} L${t.x + 26} ${t.y + 46}`} />
              <path d={`M${t.x + 48} ${t.y + 28} L${t.x + 58} ${t.y + 37} L${t.x + 48} ${t.y + 46}`} />
              <path d={`M${t.x + 40} ${t.y + 25} L${t.x + 34} ${t.y + 49}`} opacity="0.6" />
            </g>
          )}

          {t.label === "db" && (
            <g stroke="#e879f9" strokeWidth="2.2" fill="none">
              <ellipse cx={t.x + 37} cy={t.y + 25} rx="17" ry="7" />
              <path d={`M${t.x + 20} ${t.y + 25} V${t.y + 49} A17 7 0 0 0 ${t.x + 54} ${t.y + 49} V${t.y + 25}`} />
              <ellipse cx={t.x + 37} cy={t.y + 37} rx="17" ry="7" opacity="0.5" />
            </g>
          )}

          {t.label === "gear" && (
            <g stroke="#a855f7" strokeWidth="2.4" fill="none">
              <circle cx={t.x + 37} cy={t.y + 37} r="10" />
              {[0, 60, 120, 180, 240, 300].map((a) => (
                <line
                  key={a}
                  x1={t.x + 37 + Math.cos((a * Math.PI) / 180) * 14}
                  y1={t.y + 37 + Math.sin((a * Math.PI) / 180) * 14}
                  x2={t.x + 37 + Math.cos((a * Math.PI) / 180) * 20}
                  y2={t.y + 37 + Math.sin((a * Math.PI) / 180) * 20}
                  strokeLinecap="round"
                />
              ))}
            </g>
          )}

          {t.label === "shield" && (
            <g stroke="#22c55e" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d={`M${t.x + 37} ${t.y + 18} L${t.x + 56} ${t.y + 26} V${t.y + 40} C${t.x + 56} ${t.y + 50} ${t.x + 47} ${t.y + 56} ${t.x + 37} ${t.y + 58} C${t.x + 27} ${t.y + 56} ${t.x + 18} ${t.y + 50} ${t.x + 18} ${t.y + 40} V${t.y + 26} Z`} />
              <path d={`M${t.x + 29} ${t.y + 37} L${t.x + 35} ${t.y + 43} L${t.x + 46} ${t.y + 31}`} />
            </g>
          )}
        </g>
      ))}

      {/* connector lines */}
      <g stroke="#a855f7" strokeWidth="1" opacity="0.28" strokeDasharray="4 5">
        <line x1="132" y1="175" x2="150" y2="160" />
        <line x1="152" y1="272" x2="176" y2="252" />
        <line x1="494" y1="165" x2="480" y2="150" />
        <line x1="470" y1="278" x2="452" y2="258" />
      </g>

      {/* sparkles */}
      {[[96, 96, 2.6], [548, 92, 2.2], [560, 330, 2.4], [66, 348, 2], [318, 46, 2.2]].map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#c084fc" opacity="0.75" />
      ))}
    </svg>
  );
}
