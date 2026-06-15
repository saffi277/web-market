export default function ZawanVisual() {
  return (
    <div className="relative mx-auto h-[430px] w-full max-w-[610px] overflow-visible">
      <svg viewBox="0 0 640 460" className="absolute inset-0 h-full w-full overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#7c3aed" />
            <stop offset=".55" stopColor="#c026d3" />
            <stop offset="1" stopColor="#fb7185" />
          </linearGradient>
          <radialGradient id="orb" cx="50%" cy="48%" r="50%">
            <stop stopColor="#d946ef" stopOpacity=".45" />
            <stop offset=".55" stopColor="#7c3aed" stopOpacity=".16" />
            <stop offset="1" stopColor="#020617" stopOpacity="0" />
          </radialGradient>
          <filter id="glow"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>

        <ellipse cx="320" cy="245" rx="230" ry="76" stroke="#7c3aed" strokeOpacity=".38" />
        <ellipse cx="320" cy="245" rx="168" ry="55" stroke="#c026d3" strokeOpacity=".30" transform="rotate(-18 320 245)" />
        <ellipse cx="320" cy="245" rx="168" ry="55" stroke="#a855f7" strokeOpacity=".24" transform="rotate(18 320 245)" />
        <circle cx="320" cy="245" r="118" fill="url(#orb)" className="float-mid" />
        <circle cx="320" cy="245" r="7" fill="#f0abfc" filter="url(#glow)" />

        <g className="float-slow" filter="url(#glow)">
          <path d="M236 98 L320 50 L404 98 L404 195 L320 244 L236 195 Z" fill="#11101e" stroke="url(#g1)" strokeWidth="3" />
          <path d="M236 98 L320 146 L404 98" stroke="#a855f7" strokeWidth="2" />
          <path d="M320 146 L320 244" stroke="#7c3aed" strokeWidth="2" />
          <path d="M289 166 H336 L315 218 L365 150 H318 L337 111 L287 111 L265 166 H289Z" fill="url(#g1)" />
          <path d="M276 81 L320 58 L364 81 L320 105 Z" stroke="#7c3aed" strokeOpacity=".8" />
        </g>

        <g stroke="#8b5cf6" strokeOpacity=".65">
          <path d="M78 330 H238 L320 286 L402 330 H562" />
          <path d="M96 374 H545" opacity=".45" />
          <path d="M165 394 H475" opacity=".25" />
          <path d="M120 310 L218 360 L310 318 L426 362 L532 308" opacity=".8" />
        </g>

        {[110, 175, 485, 550].map((x, i) => (
          <g key={x} className={i % 2 ? "float-slow" : "float-mid"}>
            <rect x={x} y={150 + (i%2)*28} width="46" height="138" rx="10" fill="#0b0a15" stroke="#9333ea" />
            <path d={`M${x} 150 L${x+23} 128 L${x+46} 150`} stroke="#a855f7" />
            <path d={`M${x+23} 128 V95`} stroke="#c026d3" /><circle cx={x+23} cy="93" r="3" fill="#e879f9" />
            {Array.from({length: 7}).map((_, n) => <path key={n} d={`M${x+14} ${174+n*16} H${x+23}`} stroke="#d946ef" opacity=".75" />)}
          </g>
        ))}

        <g filter="url(#glow)">
          <rect x="48" y="236" width="58" height="58" rx="16" fill="#11101e" stroke="#7c3aed" />
          <path d="M62 266 H92 M77 251 V281" stroke="#e879f9" strokeWidth="3" />
          <rect x="534" y="235" width="58" height="58" rx="16" fill="#11101e" stroke="#7c3aed" />
          <path d="M551 266 C560 250 574 250 584 266 C574 282 560 282 551 266Z" stroke="#e879f9" strokeWidth="3" />
        </g>
      </svg>
    </div>
  );
}
