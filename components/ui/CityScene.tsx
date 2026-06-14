export default function CityScene() {
  return (
    <div className="relative w-full max-w-[620px]" style={{ filter: 'drop-shadow(0 0 40px rgba(109,40,217,.35))' }}>

      {/* Ambient glow blob behind city */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 55%, rgba(91,33,182,.35) 0%, transparent 70%)',
        animation: 'pulse 4s ease-in-out infinite',
      }}/>

      <svg className="city-float w-full h-auto" viewBox="0 0 620 540" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Gradients */}
          <linearGradient id="g-top"  x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC"/><stop offset="100%" stopColor="#7C3AED"/>
          </linearGradient>
          <linearGradient id="g-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4C1D95"/><stop offset="100%" stopColor="#3B0764"/>
          </linearGradient>
          <linearGradient id="g-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5B21B6"/><stop offset="100%" stopColor="#4C1D95"/>
          </linearGradient>
          <linearGradient id="g-btop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e0d3e"/><stop offset="100%" stopColor="#120830"/>
          </linearGradient>
          <linearGradient id="g-br" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#16093a"/><stop offset="100%" stopColor="#0a0420"/>
          </linearGradient>
          <linearGradient id="g-bl" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#110730"/><stop offset="100%" stopColor="#08031a"/>
          </linearGradient>
          <linearGradient id="g-plat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a0840"/><stop offset="100%" stopColor="#0e0526"/>
          </linearGradient>
          <linearGradient id="g-z" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3E8FF"/><stop offset="100%" stopColor="#C084FC"/>
          </linearGradient>
          <radialGradient id="g-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.4"/>
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="g-floor" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5B21B6" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#5B21B6" stopOpacity="0"/>
          </radialGradient>

          {/* Filters */}
          <filter id="f-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="f-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="f-big" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="16" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* === GROUND PLATFORM === */}
        <ellipse cx="310" cy="390" rx="270" ry="80" fill="url(#g-floor)"/>
        <polygon points="540,320 310,190 80,320 310,450" fill="url(#g-plat)" opacity="0.7"/>
        {/* Grid lines on platform */}
        {[0.25,0.5,0.75].map((t, i) => (
          <g key={i} opacity="0.15">
            <line x1={80 + (540-80)*t} y1={320 - (320-190)*t} x2={80 + (540-80)*t} y2={320 + (450-320)*t} stroke="#8B5CF6" strokeWidth="0.8"/>
            <line x1={80 + (310-80)*t} y1={320 - (320-190)*t} x2={540 - (540-310)*t} y2={320 + (450-320)*t} stroke="#8B5CF6" strokeWidth="0.8"/>
          </g>
        ))}
        <polygon points="540,320 310,190 80,320 310,450" fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.5" filter="url(#f-glow)"/>

        {/* === BUILDING A — far-left TALL === */}
        {/* Right face */}
        <polygon points="235,258 285,283 285,73 235,48" fill="url(#g-br)"/>
        {/* Left face */}
        <polygon points="185,283 235,258 235,48 185,73" fill="url(#g-bl)"/>
        {/* Top face */}
        <polygon points="235,48 285,73 235,98 185,73" fill="url(#g-btop)"/>
        {/* Edge glow */}
        <line x1="235" y1="48" x2="235" y2="258" stroke="#7C3AED" strokeWidth="1" opacity="0.6"/>
        {/* Dot matrix right face */}
        {[58,75,92,109,126,143,160,177,194,211,228].map((y,yi) =>
          [242,256,270].map((x,xi) => (
            <rect key={`ar${yi}-${xi}`} x={x} y={y} width="6" height="7" rx="1"
              fill={xi===1 ? '#00D4FF' : '#8B5CF6'} opacity={0.7 - yi*0.05}
              filter={yi < 3 ? 'url(#f-soft)' : undefined}/>
          ))
        )}
        {/* Dot matrix left face */}
        {[60,77,94,111,128,145,162,179,196].map((y,yi) =>
          [190,204].map((x,xi) => (
            <rect key={`al${yi}-${xi}`} x={x} y={y} width="6" height="7" rx="1"
              fill={xi===0 ? '#7C3AED' : '#00D4FF'} opacity={0.55 - yi*0.04}/>
          ))
        )}

        {/* === BUILDING B — left medium === */}
        <polygon points="185,318 235,343 235,183 185,158" fill="url(#g-br)"/>
        <polygon points="135,343 185,318 185,158 135,183" fill="url(#g-bl)"/>
        <polygon points="185,158 235,183 185,208 135,183" fill="url(#g-btop)"/>
        {[168,185,202,219,236,253,270,287,304].map((y,yi) =>
          [190,204,218].map((x,xi) => (
            <rect key={`br${yi}-${xi}`} x={x} y={y} width="6" height="7" rx="1"
              fill={xi===1 ? '#00D4FF' : '#8B5CF6'} opacity={0.65 - yi*0.05}
              filter={yi < 2 ? 'url(#f-soft)' : undefined}/>
          ))
        )}
        {[170,187,204,221,238,255,272].map((y,yi) =>
          [140,154].map((x,xi) => (
            <rect key={`bl${yi}-${xi}`} x={x} y={y} width="5" height="7" rx="1"
              fill={xi===0 ? '#8B5CF6' : '#00D4FF'} opacity={0.5 - yi*0.04}/>
          ))
        )}

        {/* === BUILDING C — far-right TALL === */}
        <polygon points="385,258 435,233 435,43 385,68" fill="url(#g-br)"/>
        <polygon points="335,283 385,258 385,68 335,93" fill="url(#g-bl)"/>
        <polygon points="385,68 435,43 385,18 335,43" fill="url(#g-btop)"/>
        <line x1="385" y1="68" x2="385" y2="258" stroke="#7C3AED" strokeWidth="1" opacity="0.6"/>
        {[53,70,87,104,121,138,155,172,189,206,223].map((y,yi) =>
          [390,404,418].map((x,xi) => (
            <rect key={`cr${yi}-${xi}`} x={x} y={y} width="6" height="7" rx="1"
              fill={xi===0 ? '#7C3AED' : '#00D4FF'} opacity={0.72 - yi*0.05}
              filter={yi < 3 ? 'url(#f-soft)' : undefined}/>
          ))
        )}
        {[55,72,89,106,123,140,157,174,191,208].map((y,yi) =>
          [340,354].map((x,xi) => (
            <rect key={`cl${yi}-${xi}`} x={x} y={y} width="5" height="7" rx="1"
              fill={xi===0 ? '#8B5CF6' : '#00D4FF'} opacity={0.55 - yi*0.04}/>
          ))
        )}

        {/* === BUILDING D — right medium === */}
        <polygon points="385,318 435,293 435,133 385,158" fill="url(#g-br)"/>
        <polygon points="335,343 385,318 385,158 335,183" fill="url(#g-bl)"/>
        <polygon points="385,158 435,133 385,108 335,133" fill="url(#g-btop)"/>
        {[168,185,202,219,236,253,270,287].map((y,yi) =>
          [390,404,418].map((x,xi) => (
            <rect key={`dr${yi}-${xi}`} x={x} y={y} width="6" height="7" rx="1"
              fill={xi===1 ? '#00D4FF' : '#8B5CF6'} opacity={0.65 - yi*0.06}
              filter={yi < 2 ? 'url(#f-soft)' : undefined}/>
          ))
        )}
        {[170,187,204,221,238,255].map((y,yi) =>
          [340,354].map((x,xi) => (
            <rect key={`dl${yi}-${xi}`} x={x} y={y} width="5" height="7" rx="1"
              fill={xi===0 ? '#7C3AED' : '#00D4FF'} opacity={0.5 - yi*0.05}/>
          ))
        )}

        {/* === BUILDING E — small front-left === */}
        <polygon points="185,383 235,358 235,258 185,283" fill="url(#g-br)"/>
        <polygon points="135,358 185,383 185,283 135,308" fill="url(#g-bl)"/>
        <polygon points="185,283 235,258 185,233 135,258" fill="url(#g-btop)"/>
        {[268,283,298,313,328,343].map((y,yi) =>
          [190,203].map((x,xi) => (
            <rect key={`er${yi}-${xi}`} x={x} y={y} width="5" height="6" rx="1"
              fill={xi===0 ? '#00D4FF' : '#7C3AED'} opacity={0.6 - yi*0.06} filter="url(#f-soft)"/>
          ))
        )}

        {/* === BUILDING F — small front-right === */}
        <polygon points="435,383 485,358 485,258 435,283" fill="url(#g-br)"/>
        <polygon points="385,358 435,383 435,283 385,308" fill="url(#g-bl)"/>
        <polygon points="435,283 485,258 435,233 385,258" fill="url(#g-btop)"/>
        {[268,283,298,313,328,343].map((y,yi) =>
          [440,453].map((x,xi) => (
            <rect key={`fr${yi}-${xi}`} x={x} y={y} width="5" height="6" rx="1"
              fill={xi===0 ? '#8B5CF6' : '#00D4FF'} opacity={0.55 - yi*0.06}/>
          ))
        )}

        {/* === CENTRAL Z CUBE (main focal point) === */}
        {/* Shadow/glow under cube */}
        <ellipse cx="310" cy="335" rx="90" ry="28" fill="#7C3AED" opacity="0.25" filter="url(#f-big)"/>

        {/* Cube left face */}
        <polygon points="310,278 245,313 245,143 310,108" fill="url(#g-left)" filter="url(#f-glow)"/>
        {/* Cube right face */}
        <polygon points="310,278 375,313 375,143 310,108" fill="url(#g-right)" filter="url(#f-glow)"/>
        {/* Cube top face */}
        <polygon points="310,108 375,143 310,178 245,143" fill="url(#g-top)" filter="url(#f-glow)"/>

        {/* Edge highlights */}
        <line x1="310" y1="108" x2="310" y2="278" stroke="#C084FC" strokeWidth="2" opacity="0.7"/>
        <line x1="245" y1="143" x2="245" y2="313" stroke="#9B5CF6" strokeWidth="1.2" opacity="0.55"/>
        <line x1="375" y1="143" x2="375" y2="313" stroke="#9B5CF6" strokeWidth="1.2" opacity="0.55"/>
        <polyline points="245,143 310,108 375,143" fill="none" stroke="#EDE9FE" strokeWidth="2.5" opacity="0.9" filter="url(#f-glow)"/>
        <polyline points="245,313 310,278 375,313" fill="none" stroke="#7C3AED" strokeWidth="1.5" opacity="0.5"/>

        {/* Z letter */}
        <text x="310" y="262" fontFamily="Space Grotesk,sans-serif" fontSize="90" fontWeight="900"
              fill="url(#g-z)" filter="url(#f-big)" textAnchor="middle" dominantBaseline="auto">Z</text>

        {/* Dot matrix on Z cube left face */}
        {[125,150,175,200,225,250].map((y,yi) =>
          [252,264,276].map((x,xi) => (
            <rect key={`zl${yi}-${xi}`} x={x} y={y} width="5" height="6" rx="1"
              fill={xi===1 ? '#A855F7' : '#6D28D9'} opacity={0.4 - yi*0.03}/>
          ))
        )}
        {/* Dot matrix on Z cube right face */}
        {[125,150,175,200,225,250].map((y,yi) =>
          [318,330,342,354].map((x,xi) => (
            <rect key={`zr${yi}-${xi}`} x={x} y={y} width="5" height="6" rx="1"
              fill={xi%2===0 ? '#4C1D95' : '#5B21B6'} opacity={0.35 - yi*0.03}/>
          ))
        )}

        {/* Ring glows around cube */}
        <ellipse cx="310" cy="325" rx="125" ry="35" fill="none" stroke="#8B5CF6" strokeWidth="2" opacity="0.45" filter="url(#f-glow)"/>
        <ellipse cx="310" cy="325" rx="95"  ry="26" fill="none" stroke="#6D28D9" strokeWidth="1" opacity="0.3"/>
        <ellipse cx="310" cy="325" rx="155" ry="42" fill="none" stroke="#7C3AED" strokeWidth="0.8" opacity="0.2"/>

        {/* Signal / connection lines */}
        <line x1="245" y1="143" x2="150" y2="88"  stroke="#8B5CF6" strokeWidth="1" opacity="0.35" strokeDasharray="6,5"/>
        <line x1="375" y1="143" x2="460" y2="90"  stroke="#8B5CF6" strokeWidth="1" opacity="0.35" strokeDasharray="6,5"/>
        <line x1="310" y1="108" x2="310" y2="50"  stroke="#C084FC" strokeWidth="1" opacity="0.3"  strokeDasharray="4,6"/>
        <circle cx="310" cy="50"  r="3" fill="#C084FC" opacity="0.6" filter="url(#f-soft)"/>
        <circle cx="150" cy="88"  r="3" fill="#8B5CF6" opacity="0.6" filter="url(#f-soft)"/>
        <circle cx="460" cy="90"  r="3" fill="#00D4FF" opacity="0.6" filter="url(#f-soft)"/>

        {/* Floating particles */}
        <circle cx="120" cy="130" r="3"   fill="#C084FC" opacity="0.9" filter="url(#f-soft)"/>
        <circle cx="495" cy="120" r="2.5" fill="#00D4FF" opacity="0.85" filter="url(#f-soft)"/>
        <circle cx="530" cy="230" r="3.5" fill="#A855F7" opacity="0.75" filter="url(#f-soft)"/>
        <circle cx="85"  cy="225" r="2.5" fill="#00D4FF" opacity="0.75" filter="url(#f-soft)"/>
        <circle cx="550" cy="340" r="2.5" fill="#C084FC" opacity="0.6"/>
        <circle cx="70"  cy="330" r="2"   fill="#8B5CF6" opacity="0.6"/>
        <circle cx="205" cy="55"  r="2"   fill="#00D4FF" opacity="0.7"/>
        <circle cx="415" cy="40"  r="2"   fill="#A855F7" opacity="0.7"/>
        <circle cx="160" cy="350" r="2"   fill="#00D4FF" opacity="0.5"/>
        <circle cx="458" cy="360" r="2"   fill="#C084FC" opacity="0.5"/>

        {/* Small floating diamond particles */}
        <polygon points="100,180 105,186 100,192 95,186" fill="#8B5CF6" opacity="0.6"/>
        <polygon points="510,180 515,186 510,192 505,186" fill="#00D4FF" opacity="0.6"/>
      </svg>

      {/* Floating info chips */}
      <div className="chip-bob absolute top-[6%] right-[-2%] flex items-center gap-2 px-3 py-2 text-xs text-slate-300 backdrop-blur-lg rounded-xl whitespace-nowrap"
        style={{ background: 'rgba(14,9,32,.92)', border: '1px solid rgba(139,92,246,.25)' }}>
        <span className="dot-blink w-2 h-2 rounded-full bg-purple-400" style={{ boxShadow: '0 0 8px #8B5CF6' }}/>
        <span>أنظمة نشطة</span>
        <strong className="text-white">50+</strong>
      </div>

      <div className="chip-bob absolute bottom-[6%] left-[-2%] flex items-center gap-2 px-3 py-2 text-xs text-slate-300 backdrop-blur-lg rounded-xl whitespace-nowrap"
        style={{ background: 'rgba(14,9,32,.92)', border: '1px solid rgba(34,197,94,.2)', animationDelay: '1.8s' }}>
        <span className="dot-blink w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: '0 0 8px #22C55E', animationDelay: '.7s' }}/>
        <span>عميل راضٍ</span>
        <strong className="text-white">100+</strong>
      </div>
    </div>
  );
}
