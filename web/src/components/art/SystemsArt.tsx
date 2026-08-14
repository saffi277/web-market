/** Detailed analytics dashboard mockup for the systems page hero. */
export default function SystemsArt() {
  const bars = [28, 44, 36, 58, 48, 70, 62, 84, 76];

  return (
    <svg viewBox="0 0 660 400" className="h-auto w-full" role="img" aria-label="لوحة تحكم الأنظمة">
      <defs>
        <linearGradient id="sy-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#16102f" />
          <stop offset="100%" stopColor="#0c0722" />
        </linearGradient>
        <linearGradient id="sy-edge" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="55%" stopColor="#7c3cff" />
          <stop offset="100%" stopColor="#d844ff" />
        </linearGradient>
        <linearGradient id="sy-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </linearGradient>
        <filter id="sy-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx="330" cy="200" rx="290" ry="180" fill="#7c3cff" opacity="0.12" filter="url(#sy-glow)" />

      {/* orbit arcs */}
      <path d="M600 40 A220 220 0 0 1 600 360" fill="none" stroke="url(#sy-edge)" strokeWidth="1.2" opacity="0.35" />
      <path d="M624 70 A190 190 0 0 1 624 330" fill="none" stroke="#c084fc" strokeWidth="0.8" opacity="0.2" />

      <rect x="20" y="24" width="600" height="352" rx="16" fill="url(#sy-screen)" stroke="url(#sy-edge)" strokeWidth="1.6" />

      {/* sidebar */}
      <rect x="530" y="40" width="74" height="320" rx="10" fill="#ffffff" opacity="0.035" />
      <rect x="546" y="54" width="26" height="26" rx="8" fill="url(#sy-edge)" opacity="0.85" />
      <text x="559" y="72" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="800" fontFamily="system-ui">Z</text>
      {[104, 136, 168, 200, 232, 264, 296].map((y, i) => (
        <g key={y}>
          <rect x="540" y={y - 6} width="12" height="12" rx="3.5" fill="#a855f7" opacity={i === 1 ? 0.95 : 0.3} />
          <rect x="558" y={y - 3.5} width="34" height="7" rx="3.5" fill="#ffffff" opacity={i === 1 ? 0.6 : 0.2} />
          {i === 1 && <rect x="530" y={y - 13} width="3" height="26" rx="1.5" fill="#c13cff" />}
        </g>
      ))}

      {/* search bar */}
      <rect x="40" y="42" width="470" height="30" rx="9" fill="#ffffff" opacity="0.04" />
      <circle cx="487" cy="57" r="6" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.6" />
      <line x1="491" y1="61" x2="495" y2="65" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1.6" strokeLinecap="round" />

      {/* KPI tiles */}
      {[
        { x: 40, c: "#00d4ff", w: 112 },
        { x: 162, c: "#22c55e", w: 112 },
        { x: 284, c: "#e879f9", w: 112 },
        { x: 406, c: "#f59e0b", w: 104 },
      ].map((t) => (
        <g key={t.x}>
          <rect x={t.x} y="84" width={t.w} height="56" rx="10" fill="#ffffff" opacity="0.05" />
          <rect x={t.x + 12} y="96" width="38" height="6" rx="3" fill="#ffffff" opacity="0.32" />
          <rect x={t.x + 12} y="110" width="58" height="12" rx="4" fill="#ffffff" opacity="0.72" />
          <rect x={t.x + t.w - 42} y="110" width="30" height="11" rx="5.5" fill={t.c} opacity="0.25" />
          <circle cx={t.x + t.w - 27} cy="115.5" r="3" fill={t.c} />
        </g>
      ))}

      {/* area chart card */}
      <rect x="40" y="152" width="290" height="150" rx="12" fill="#ffffff" opacity="0.04" />
      <rect x="54" y="166" width="76" height="7" rx="3.5" fill="#ffffff" opacity="0.4" />
      <path d="M56 282 L86 262 L116 270 L146 240 L176 250 L206 216 L236 228 L266 196 L296 206 L316 210 L316 292 L56 292 Z" fill="url(#sy-area)" />
      <path d="M56 282 L86 262 L116 270 L146 240 L176 250 L206 216 L236 228 L266 196 L296 206 L316 210" fill="none" stroke="#c084fc" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      {[[146, 240], [206, 216], [266, 196]].map(([cx, cy]) => (
        <circle key={cx} cx={cx} cy={cy} r="4" fill="#0c0722" stroke="#c084fc" strokeWidth="2.2" />
      ))}

      {/* donut card */}
      <rect x="342" y="152" width="168" height="150" rx="12" fill="#ffffff" opacity="0.04" />
      <rect x="356" y="166" width="66" height="7" rx="3.5" fill="#ffffff" opacity="0.4" />
      <g transform="translate(398, 238)">
        <circle r="40" fill="none" stroke="#ffffff" strokeOpacity="0.07" strokeWidth="15" />
        {[
          { c: "#a855f7", dash: "113 138", off: 0 },
          { c: "#00d4ff", dash: "75 176", off: -113 },
          { c: "#e879f9", dash: "48 203", off: -188 },
          { c: "#22c55e", dash: "25 226", off: -236 },
        ].map((s) => (
          <circle
            key={s.c}
            r="40"
            fill="none"
            stroke={s.c}
            strokeWidth="15"
            strokeDasharray={s.dash}
            strokeDashoffset={s.off}
            transform="rotate(-90)"
          />
        ))}
      </g>
      {[
        { y: 196, c: "#a855f7" },
        { y: 218, c: "#00d4ff" },
        { y: 240, c: "#e879f9" },
        { y: 262, c: "#22c55e" },
      ].map((l) => (
        <g key={l.y}>
          <circle cx="456" cy={l.y} r="4" fill={l.c} />
          <rect x="466" y={l.y - 3} width="30" height="6" rx="3" fill="#ffffff" opacity="0.28" />
        </g>
      ))}

      {/* bars strip */}
      <rect x="40" y="314" width="470" height="46" rx="10" fill="#ffffff" opacity="0.04" />
      {bars.map((h, i) => (
        <rect key={i} x={58 + i * 26} y={350 - h * 0.32} width="12" height={h * 0.32} rx="3" fill="url(#sy-edge)" opacity="0.85" />
      ))}
      <rect x="316" y="326" width="180" height="10" rx="5" fill="#ffffff" opacity="0.06" />
      <rect x="316" y="344" width="120" height="8" rx="4" fill="#22c55e" opacity="0.45" />
    </svg>
  );
}
