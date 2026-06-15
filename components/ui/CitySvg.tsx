export default function CitySvg() {
  const towers = [
    { x: 62, y: 116, w: 36, h: 155 },
    { x: 130, y: 150, w: 42, h: 128 },
    { x: 205, y: 98, w: 50, h: 180 },
    { x: 520, y: 108, w: 48, h: 172 },
    { x: 600, y: 165, w: 44, h: 117 },
    { x: 682, y: 205, w: 36, h: 78 },
  ];

  return (
    <svg viewBox="0 0 780 470" className="h-full w-full city-glow" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="zawanPurple" x1="0" x2="1" y1="0" y2="1">
          <stop stopColor="#5718ff" />
          <stop offset=".48" stopColor="#8f2cff" />
          <stop offset="1" stopColor="#e06cff" />
        </linearGradient>
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
          <stop stopColor="#e06cff" />
          <stop offset="1" stopColor="#7b22ff" stopOpacity="0" />
        </radialGradient>
        <filter id="neon"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>

      <g opacity=".85">
        <path d="M26 355 L120 312 L244 368 L390 300 L528 360 L738 263" stroke="url(#zawanPurple)" opacity=".55" />
        <path d="M28 405 H725 M82 374 H668 M164 438 H606" stroke="#321063" opacity=".75" />
        <path d="M91 384 L186 337 L289 386 L189 433 Z" stroke="url(#zawanPurple)" opacity=".78" />
        <path d="M505 345 L610 292 L714 342 L610 397 Z" stroke="url(#zawanPurple)" opacity=".78" />
        <path d="M330 355 L397 320 L463 355 L397 389 Z" stroke="#6627d4" opacity=".55" />
      </g>

      {towers.map((t, i) => (
        <g key={i} opacity=".88">
          <path d={`M${t.x} ${t.y} L${t.x + t.w / 2} ${t.y - 16} L${t.x + t.w} ${t.y} L${t.x + t.w} ${t.y + t.h} L${t.x + t.w / 2} ${t.y + t.h + 16} L${t.x} ${t.y + t.h} Z`} fill="#090918" stroke="url(#zawanPurple)" strokeWidth="1.2" />
          <path d={`M${t.x + t.w / 2} ${t.y - 16} V${t.y + t.h + 16} M${t.x} ${t.y} L${t.x + t.w / 2} ${t.y + 14} L${t.x + t.w} ${t.y}`} stroke="#8b36ff" opacity=".56" />
          {Array.from({ length: Math.floor(t.h / 23) }).map((_, j) => (
            <path key={j} d={`M${t.x + 10} ${t.y + 28 + j * 23} h10 M${t.x + t.w - 20} ${t.y + 21 + j * 23} h10`} stroke="#c96cff" opacity=".58" />
          ))}
          <path d={`M${t.x + t.w / 2} ${t.y - 16} V${t.y - 46}`} stroke="#a855f7" opacity=".9" />
          <circle cx={t.x + t.w / 2} cy={t.y - 49} r="2.3" fill="#e06cff" filter="url(#neon)" />
        </g>
      ))}

      <g transform="translate(290 88)">
        <path d="M20 223 H255" stroke="#4b148e" opacity=".75" />
        <path d="M42 188 L137 145 L232 188 L137 235 Z" fill="#070713" stroke="url(#zawanPurple)" opacity=".86" />
        <path d="M70 148 L137 116 L205 148 L205 185 L137 220 L70 185 Z" fill="#090918" stroke="url(#zawanPurple)" opacity=".9" />
        <path d="M70 148 L137 182 L205 148 M137 182 V220" stroke="#7c2dff" opacity=".6" />
        <g className="float">
          <path d="M36 60 L137 10 L238 60 L238 150 L137 204 L36 150 Z" fill="#0c0922" stroke="url(#zawanPurple)" strokeWidth="2" />
          <path d="M36 60 L137 111 L238 60 M137 111 V204" stroke="#a23cff" opacity=".82" />
          <path d="M96 52 L137 31 L180 52 L137 73 Z" stroke="#7430ff" opacity=".78" />
          <path d="M114 90 H169 L140 132 H176 L95 194 L126 144 H90 Z" fill="url(#zawanPurple)" filter="url(#neon)" />
        </g>
      </g>

      <g filter="url(#neon)" opacity=".8">
        <circle className="pulse-soft" cx="390" cy="348" r="5.5" fill="#e06cff" />
        <circle cx="390" cy="348" r="86" stroke="#8b36ff" opacity=".38" />
        <path d="M390 262 V196 M304 348 H210 M476 348 H630" stroke="#8b36ff" opacity=".45" />
      </g>
    </svg>
  );
}
