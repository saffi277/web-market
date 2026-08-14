/** Laptop with floating contact-channel tiles, for the contact page hero. */
export default function ContactArt() {
  return (
    <svg viewBox="0 0 620 380" className="h-auto w-full" role="img" aria-label="تواصل مع ZAWAN">
      <defs>
        <linearGradient id="ct-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="55%" stopColor="#7c3cff" />
          <stop offset="100%" stopColor="#d844ff" />
        </linearGradient>
        <linearGradient id="ct-face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#191035" />
          <stop offset="100%" stopColor="#0b0620" />
        </linearGradient>
        <filter id="ct-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="7" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx="300" cy="200" rx="260" ry="150" fill="#7c3cff" opacity="0.13" filter="url(#ct-glow)" />

      {/* laptop */}
      <g>
        <rect x="130" y="72" width="300" height="192" rx="13" fill="url(#ct-face)" stroke="url(#ct-edge)" strokeWidth="1.7" />

        {/* left pane: code */}
        <rect x="146" y="88" width="150" height="160" rx="9" fill="#ffffff" opacity="0.04" />
        {[102, 118, 134, 150, 166, 182, 198, 214].map((y, i) => (
          <g key={y}>
            <rect x="156" y={y} width="7" height="6" rx="2" fill="#c084fc" opacity="0.5" />
            <rect x="170" y={y} width={[68, 46, 84, 56, 74, 40, 62, 50][i]} height="6" rx="3" fill="#ffffff" opacity={i % 2 ? 0.18 : 0.28} />
          </g>
        ))}

        {/* right pane: donut + rows */}
        <rect x="304" y="88" width="112" height="88" rx="9" fill="#ffffff" opacity="0.04" />
        <g transform="translate(360, 132)">
          <circle r="27" fill="none" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="10" />
          <circle r="27" fill="none" stroke="#00d4ff" strokeWidth="10" strokeDasharray="102 68" transform="rotate(-90)" strokeLinecap="round" />
          <circle r="27" fill="none" stroke="#e879f9" strokeWidth="10" strokeDasharray="42 128" strokeDashoffset="-102" transform="rotate(-90)" />
        </g>
        {[188, 208, 228].map((y, i) => (
          <g key={y}>
            <rect x="304" y={y} width="112" height="15" rx="5" fill="#ffffff" opacity="0.04" />
            <circle cx="314" cy={y + 7.5} r="4" fill={["#22c55e", "#a855f7", "#00d4ff"][i]} opacity="0.85" />
            <rect x="324" y={y + 4.5} width="52" height="6" rx="3" fill="#ffffff" opacity="0.25" />
          </g>
        ))}
      </g>

      {/* base */}
      <path d="M104 264 H456 L444 282 H116 Z" fill="#1a1236" stroke="rgba(140,100,255,0.28)" />
      <rect x="252" y="269" width="60" height="4" rx="2" fill="#ffffff" opacity="0.12" />

      {/* floating channel tiles */}
      {[
        { x: 468, y: 60, kind: "headset" },
        { x: 520, y: 168, kind: "mail" },
        { x: 452, y: 250, kind: "user" },
        { x: 32, y: 96, kind: "code" },
        { x: 46, y: 232, kind: "chat" },
      ].map((t) => (
        <g key={t.kind}>
          <rect x={t.x} y={t.y} width="66" height="66" rx="17" fill="url(#ct-face)" stroke="url(#ct-edge)" strokeWidth="1.4" />

          {t.kind === "headset" && (
            <g stroke="#c084fc" strokeWidth="2.3" fill="none" strokeLinecap="round">
              <path d={`M${t.x + 18} ${t.y + 40} V${t.y + 33} A15 15 0 0 1 ${t.x + 48} ${t.y + 33} V${t.y + 40}`} />
              <rect x={t.x + 14} y={t.y + 38} width="9" height="14" rx="4" />
              <rect x={t.x + 43} y={t.y + 38} width="9" height="14" rx="4" />
            </g>
          )}

          {t.kind === "mail" && (
            <g stroke="#00d4ff" strokeWidth="2.3" fill="none" strokeLinejoin="round">
              <rect x={t.x + 15} y={t.y + 22} width="36" height="24" rx="5" />
              <path d={`M${t.x + 15} ${t.y + 26} L${t.x + 33} ${t.y + 37} L${t.x + 51} ${t.y + 26}`} />
            </g>
          )}

          {t.kind === "user" && (
            <g stroke="#e879f9" strokeWidth="2.3" fill="none" strokeLinecap="round">
              <circle cx={t.x + 33} cy={t.y + 27} r="9" />
              <path d={`M${t.x + 17} ${t.y + 50} A16 14 0 0 1 ${t.x + 49} ${t.y + 50}`} />
            </g>
          )}

          {t.kind === "code" && (
            <g stroke="#a855f7" strokeWidth="2.3" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d={`M${t.x + 24} ${t.y + 24} L${t.x + 15} ${t.y + 33} L${t.x + 24} ${t.y + 42}`} />
              <path d={`M${t.x + 42} ${t.y + 24} L${t.x + 51} ${t.y + 33} L${t.x + 42} ${t.y + 42}`} />
            </g>
          )}

          {t.kind === "chat" && (
            <g stroke="#22c55e" strokeWidth="2.3" fill="none" strokeLinejoin="round">
              <path d={`M${t.x + 15} ${t.y + 24} h36 v22 h-20 l-10 8 v-8 h-6 Z`} />
            </g>
          )}
        </g>
      ))}

      {/* dotted connectors */}
      <g stroke="#a855f7" strokeWidth="1" opacity="0.25" strokeDasharray="4 5">
        <line x1="466" y1="96" x2="432" y2="120" />
        <line x1="518" y1="200" x2="434" y2="190" />
        <line x1="452" y1="278" x2="430" y2="252" />
        <line x1="100" y1="130" x2="128" y2="148" />
        <line x1="112" y1="262" x2="132" y2="240" />
      </g>

      {[[92, 44, 2.4], [572, 108, 2.2], [560, 300, 2.6], [26, 320, 2], [300, 30, 2.2]].map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="#c084fc" opacity="0.7" />
      ))}
    </svg>
  );
}
