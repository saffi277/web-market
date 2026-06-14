export default function CityScene() {
  return (
    <svg
      viewBox="0 0 900 620"
      className="city-float h-full w-full drop-shadow-[0_0_45px_rgba(168,85,247,0.45)]"
      role="img"
      aria-label="Futuristic 3D city"
    >
      <defs>
        <linearGradient id="tower" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="45%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>
        <linearGradient id="glass" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#f5d0fe" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#8b5cf6" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#020617" stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#7c3aed" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#020617" stopOpacity="0" />
        </radialGradient>
        <filter id="purpleGlow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx="455" cy="520" rx="330" ry="90" fill="url(#glow)" />
      <path d="M135 475 L455 315 L770 475 L455 610 Z" fill="#090014" stroke="#7c3aed" strokeOpacity="0.7" />
      <path d="M455 315 L455 610" stroke="#a855f7" strokeOpacity="0.35" />
      <path d="M135 475 L770 475" stroke="#a855f7" strokeOpacity="0.25" />

      {Array.from({ length: 11 }).map((_, i) => {
        const y = 350 + i * 20;
        return <path key={i} d={`M${190 + i * 22} ${y} L${455} ${315 + i * 26} L${710 - i * 22} ${y}`} stroke="#8b5cf6" strokeOpacity="0.18" />;
      })}

      <g filter="url(#purpleGlow)">
        {/* Central main tower */}
        <polygon points="390,115 455,72 520,115 455,158" fill="#2e1065" stroke="#d8b4fe" />
        <polygon points="390,115 455,158 455,330 390,286" fill="url(#tower)" />
        <polygon points="520,115 455,158 455,330 520,286" fill="#170028" stroke="#a855f7" />
        <polygon points="390,286 455,330 520,286 455,245" fill="#3b0764" />

        {/* Left tower */}
        <polygon points="260,230 340,185 420,230 340,275" fill="#2e1065" stroke="#c084fc" />
        <polygon points="260,230 340,275 340,420 260,374" fill="url(#glass)" />
        <polygon points="420,230 340,275 340,420 420,374" fill="#12021f" stroke="#8b5cf6" />

        {/* Right tower */}
        <polygon points="535,210 620,165 705,210 620,258" fill="#2e1065" stroke="#c084fc" />
        <polygon points="535,210 620,258 620,430 535,382" fill="url(#glass)" />
        <polygon points="705,210 620,258 620,430 705,382" fill="#12021f" stroke="#8b5cf6" />

        {/* Far left small */}
        <polygon points="175,325 245,285 315,325 245,365" fill="#2e1065" stroke="#a855f7" />
        <polygon points="175,325 245,365 245,455 175,414" fill="url(#tower)" />
        <polygon points="315,325 245,365 245,455 315,414" fill="#10001d" stroke="#7c3aed" />

        {/* Far right small */}
        <polygon points="605,330 680,288 755,330 680,374" fill="#2e1065" stroke="#a855f7" />
        <polygon points="605,330 680,374 680,463 605,420" fill="url(#tower)" />
        <polygon points="755,330 680,374 680,463 755,420" fill="#10001d" stroke="#7c3aed" />
      </g>

      {/* Windows */}
      <g opacity="0.85">
        {[
          [410, 160], [455, 138], [500, 160],
          [305, 255], [340, 235], [375, 255],
          [585, 240], [620, 220], [660, 242],
          [215, 350], [245, 334], [280, 350],
          [645, 355], [680, 338], [716, 358],
        ].map(([x, y], index) => (
          <rect key={index} x={x} y={y} width="14" height="22" rx="3" fill="#f0abfc" opacity="0.8" />
        ))}
      </g>

      {/* Orbit rings */}
      <circle cx="455" cy="160" r="105" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="12 16" opacity="0.55" />
      <circle cx="455" cy="160" r="145" fill="none" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="3 18" opacity="0.35" />
      <path d="M290 112 C385 20 530 20 625 112" fill="none" stroke="#a855f7" strokeWidth="2" opacity="0.35" />
      <path d="M235 500 C330 455 580 455 675 500" fill="none" stroke="#c084fc" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}
