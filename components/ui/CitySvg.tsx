export default function CitySvg() {
  const towers = [
    { x: 40,  y: 150, h: 145 },
    { x: 96,  y: 210, h: 88  },
    { x: 158, y: 128, h: 170 },
    { x: 505, y: 130, h: 165 },
    { x: 575, y: 188, h: 104 },
    { x: 655, y: 224, h: 68  },
  ];
  return (
    <svg viewBox="0 0 760 480" className="h-full w-full city-line" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="p" x1="0" x2="1">
          <stop stopColor="#5b18ff"/>
          <stop offset="1" stopColor="#d26bff"/>
        </linearGradient>
        <filter id="g">
          <feGaussianBlur stdDeviation="3" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <path d="M30 375 L180 305 L380 385 L720 265" stroke="#5b18ff" opacity=".45" />
      <path d="M20 405 H720 M70 352 H700 M130 438 H640" stroke="#35106d" opacity=".8"/>
      <path d="M85 394 L185 345 L292 392 L190 442 Z M465 347 L555 300 L662 348 L558 407 Z" stroke="url(#p)" opacity=".8"/>

      {towers.map((t, i) => (
        <g key={i} opacity=".9">
          <path d={`M${t.x} ${t.y} L${t.x+32} ${t.y-18} L${t.x+68} ${t.y} L${t.x+68} ${t.y+t.h} L${t.x+32} ${t.y+t.h+18} L${t.x} ${t.y+t.h} Z`} fill="#090b1a" stroke="url(#p)"/>
          <path d={`M${t.x+32} ${t.y-18} V${t.y+t.h+18} M${t.x} ${t.y} L${t.x+32} ${t.y+18} L${t.x+68} ${t.y}`} stroke="#7c2dff" opacity=".65"/>
          {Array.from({ length: Math.floor(t.h / 24) }).map((_, j) => (
            <path key={j} d={`M${t.x+14} ${t.y+28+j*24} h12 M${t.x+43} ${t.y+20+j*24} h12`} stroke="#b86cff" opacity=".7"/>
          ))}
          <path d={`M${t.x+32} ${t.y-18} V${t.y-48}`} stroke="#a855f7"/>
          <circle cx={t.x+32} cy={t.y-52} r="2.5" fill="#d86bff" filter="url(#g)"/>
        </g>
      ))}

      {/* Central floating Z cube */}
      <g className="float" transform="translate(265 105)">
        <path d="M20 64 L110 18 L205 62 L205 180 L112 228 L20 180 Z" fill="#0b0920" stroke="url(#p)" strokeWidth="2"/>
        <path d="M20 64 L112 110 L205 62 M112 110 V228" stroke="#8b36ff" opacity=".85"/>
        <path d="M78 56 L116 36 L158 56 L116 76 Z" stroke="#7330ff" opacity=".7"/>
        <path d="M91 91 h56 l-28 42 h35 l-70 65 28-51 H78 Z" fill="url(#p)" filter="url(#g)"/>
      </g>

      {/* Ground glow ring */}
      <g filter="url(#g)">
        <circle cx="380" cy="330" r="98" stroke="#8b36ff" opacity=".55"/>
        <path d="M270 327 H140 M490 327 H660 M380 235 V158" stroke="#8b36ff" opacity=".7"/>
        <circle className="pulse-soft" cx="380" cy="330" r="5" fill="#d86bff"/>
      </g>
    </svg>
  );
}
