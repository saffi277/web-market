export default function CityScene() {
  return (
    <div className="relative w-full max-w-[560px]">

      {/* Background blob glow */}
      <div
        className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full pointer-events-none"
        style={{
          transform: 'translate(-50%,-50%)',
          background: 'radial-gradient(circle, rgba(109,40,217,.28) 0%, transparent 70%)',
          animation: 'sceneGlow 3.5s ease-in-out infinite alternate',
        }}
      />

      {/* SVG City */}
      <svg
        className="city-float w-full h-auto"
        style={{ filter: 'drop-shadow(0 0 30px rgba(109,40,217,.3))' }}
        viewBox="0 0 560 470"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="ct" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC"/><stop offset="100%" stopColor="#8B5CF6"/>
          </linearGradient>
          <linearGradient id="cr" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5B21B6"/><stop offset="100%" stopColor="#4C1D95"/>
          </linearGradient>
          <linearGradient id="cl" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6D28D9"/><stop offset="100%" stopColor="#5B21B6"/>
          </linearGradient>
          <linearGradient id="zg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3E8FF"/><stop offset="100%" stopColor="#C084FC"/>
          </linearGradient>
          <linearGradient id="pt" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e103a"/><stop offset="100%" stopColor="#120830"/>
          </linearGradient>
          <linearGradient id="br" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1c0d40"/><stop offset="100%" stopColor="#0d0620"/>
          </linearGradient>
          <linearGradient id="bl" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#160a32"/><stop offset="100%" stopColor="#090418"/>
          </linearGradient>
          <linearGradient id="btop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2a1258"/><stop offset="100%" stopColor="#1c0c40"/>
          </linearGradient>
          <filter id="gw" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="gs" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="12" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="gf" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <radialGradient id="gg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5B21B6" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#5B21B6" stopOpacity="0"/>
          </radialGradient>
        </defs>

        {/* Ground glow */}
        <ellipse cx="280" cy="340" rx="230" ry="75" fill="url(#gg)"/>

        {/* Ground platform */}
        <polygon points="500,295 280,175 60,295 280,415" fill="url(#pt)" opacity="0.65"/>
        <line x1="280" y1="175" x2="280" y2="415" stroke="#7C3AED" strokeWidth="0.5" opacity="0.22"/>
        <line x1="60"  y1="295" x2="500" y2="295" stroke="#7C3AED" strokeWidth="0.5" opacity="0.22"/>
        <line x1="170" y1="235" x2="390" y2="355" stroke="#7C3AED" strokeWidth="0.5" opacity="0.18"/>
        <line x1="390" y1="235" x2="170" y2="355" stroke="#7C3AED" strokeWidth="0.5" opacity="0.18"/>
        <line x1="225" y1="205" x2="335" y2="385" stroke="#7C3AED" strokeWidth="0.4" opacity="0.14"/>
        <line x1="335" y1="205" x2="225" y2="385" stroke="#7C3AED" strokeWidth="0.4" opacity="0.14"/>
        <polygon points="500,295 280,175 60,295 280,415" fill="none" stroke="#8B5CF6" strokeWidth="1.2" opacity="0.45" filter="url(#gw)"/>

        {/* Building A — far left tall */}
        <polygon points="255,238 255,62 205,37 205,213"  fill="url(#br)"/>
        <polygon points="205,213 155,238 155,62  205,37"  fill="url(#bl)"/>
        <polygon points="255,62  205,37  155,62  205,87"  fill="url(#btop)"/>
        <line x1="205" y1="37" x2="205" y2="213" stroke="#7C3AED" strokeWidth="0.8" opacity="0.55"/>
        <rect x="215" y="68"  width="7" height="9" rx="1" fill="#00D4FF" opacity="0.75" filter="url(#gf)"/>
        <rect x="230" y="68"  width="7" height="9" rx="1" fill="#8B5CF6" opacity="0.8"  filter="url(#gf)"/>
        <rect x="244" y="70"  width="7" height="9" rx="1" fill="#00D4FF" opacity="0.6"/>
        <rect x="215" y="85"  width="7" height="9" rx="1" fill="#7C3AED" opacity="0.7"/>
        <rect x="230" y="85"  width="7" height="9" rx="1" fill="#00D4FF" opacity="0.7"  filter="url(#gf)"/>
        <rect x="215" y="102" width="7" height="9" rx="1" fill="#00D4FF" opacity="0.65"/>
        <rect x="230" y="102" width="7" height="9" rx="1" fill="#7C3AED" opacity="0.7"/>
        <rect x="215" y="119" width="7" height="9" rx="1" fill="#8B5CF6" opacity="0.65"/>
        <rect x="230" y="119" width="7" height="9" rx="1" fill="#00D4FF" opacity="0.6"/>
        <rect x="215" y="136" width="7" height="9" rx="1" fill="#7C3AED" opacity="0.6"/>
        <rect x="215" y="153" width="7" height="9" rx="1" fill="#00D4FF" opacity="0.55"/>
        <rect x="215" y="170" width="7" height="9" rx="1" fill="#8B5CF6" opacity="0.55"/>
        <rect x="163" y="70"  width="7" height="9" rx="1" fill="#8B5CF6" opacity="0.55"/>
        <rect x="178" y="70"  width="7" height="9" rx="1" fill="#00D4FF" opacity="0.5"/>
        <rect x="163" y="87"  width="7" height="9" rx="1" fill="#7C3AED" opacity="0.55"/>
        <rect x="163" y="104" width="7" height="9" rx="1" fill="#00D4FF" opacity="0.5"/>
        <rect x="163" y="121" width="7" height="9" rx="1" fill="#8B5CF6" opacity="0.5"/>

        {/* Building B — left medium */}
        <polygon points="230,300 230,190 180,165 180,275" fill="url(#br)"/>
        <polygon points="180,275 130,300 130,190 180,165" fill="url(#bl)"/>
        <polygon points="230,190 180,165 130,190 180,215" fill="url(#btop)"/>
        <rect x="188" y="173" width="7" height="8" rx="1" fill="#00D4FF" opacity="0.75" filter="url(#gf)"/>
        <rect x="202" y="173" width="7" height="8" rx="1" fill="#7C3AED" opacity="0.7"/>
        <rect x="188" y="188" width="7" height="8" rx="1" fill="#8B5CF6" opacity="0.7"/>
        <rect x="202" y="188" width="7" height="8" rx="1" fill="#00D4FF" opacity="0.65"/>
        <rect x="188" y="203" width="7" height="8" rx="1" fill="#00D4FF" opacity="0.6"/>
        <rect x="188" y="218" width="7" height="8" rx="1" fill="#7C3AED" opacity="0.55"/>
        <rect x="137" y="196" width="6" height="8" rx="1" fill="#8B5CF6" opacity="0.5"/>
        <rect x="152" y="194" width="6" height="8" rx="1" fill="#00D4FF" opacity="0.5"/>
        <rect x="137" y="210" width="6" height="8" rx="1" fill="#7C3AED" opacity="0.5"/>

        {/* Building C — far right tall */}
        <polygon points="355,338 405,363 405,187 355,162" fill="url(#br)"/>
        <polygon points="355,338 355,162 305,187 305,363" fill="url(#bl)"/>
        <polygon points="355,162 405,187 355,212 305,187" fill="url(#btop)"/>
        <line x1="355" y1="162" x2="355" y2="338" stroke="#7C3AED" strokeWidth="0.8" opacity="0.55"/>
        <rect x="362" y="193" width="7" height="9" rx="1" fill="#7C3AED" opacity="0.75" filter="url(#gf)"/>
        <rect x="376" y="193" width="7" height="9" rx="1" fill="#00D4FF" opacity="0.7"  filter="url(#gf)"/>
        <rect x="362" y="210" width="7" height="9" rx="1" fill="#00D4FF" opacity="0.7"/>
        <rect x="376" y="210" width="7" height="9" rx="1" fill="#7C3AED" opacity="0.65"/>
        <rect x="362" y="227" width="7" height="9" rx="1" fill="#8B5CF6" opacity="0.65"/>
        <rect x="362" y="244" width="7" height="9" rx="1" fill="#7C3AED" opacity="0.6"/>
        <rect x="362" y="261" width="7" height="9" rx="1" fill="#00D4FF" opacity="0.55"/>
        <rect x="362" y="278" width="7" height="9" rx="1" fill="#8B5CF6" opacity="0.5"/>
        <rect x="312" y="193" width="6" height="8" rx="1" fill="#8B5CF6" opacity="0.55"/>
        <rect x="326" y="195" width="6" height="8" rx="1" fill="#00D4FF" opacity="0.5"/>
        <rect x="312" y="210" width="6" height="8" rx="1" fill="#7C3AED" opacity="0.55"/>
        <rect x="312" y="227" width="6" height="8" rx="1" fill="#00D4FF" opacity="0.5"/>
        <rect x="312" y="244" width="6" height="8" rx="1" fill="#7C3AED" opacity="0.5"/>

        {/* Building D — right medium */}
        <polygon points="255,338 305,363 305,253 255,228" fill="url(#br)"/>
        <polygon points="255,338 255,228 205,253 205,363" fill="url(#bl)"/>
        <polygon points="255,228 305,253 255,278 205,253" fill="url(#btop)"/>
        <rect x="262" y="235" width="7" height="8" rx="1" fill="#00D4FF" opacity="0.7" filter="url(#gf)"/>
        <rect x="276" y="238" width="7" height="8" rx="1" fill="#7C3AED" opacity="0.65"/>
        <rect x="262" y="250" width="7" height="8" rx="1" fill="#8B5CF6" opacity="0.65"/>
        <rect x="276" y="253" width="7" height="8" rx="1" fill="#00D4FF" opacity="0.6"/>
        <rect x="262" y="265" width="7" height="8" rx="1" fill="#7C3AED" opacity="0.6"/>
        <rect x="262" y="280" width="7" height="8" rx="1" fill="#00D4FF" opacity="0.55"/>
        <rect x="212" y="258" width="6" height="8" rx="1" fill="#8B5CF6" opacity="0.5"/>
        <rect x="226" y="255" width="6" height="8" rx="1" fill="#00D4FF" opacity="0.5"/>

        {/* Building E — front left small */}
        <polygon points="230,325 180,300 180,234 230,259" fill="url(#br)"/>
        <polygon points="180,300 130,325 130,259 180,234" fill="url(#bl)"/>
        <polygon points="230,259 180,234 130,259 180,284" fill="url(#btop)"/>
        <rect x="188" y="240" width="6" height="7" rx="1" fill="#00D4FF" opacity="0.65" filter="url(#gf)"/>
        <rect x="202" y="243" width="6" height="7" rx="1" fill="#7C3AED" opacity="0.6"/>
        <rect x="188" y="255" width="6" height="7" rx="1" fill="#8B5CF6" opacity="0.6"/>
        <rect x="137" y="264" width="6" height="7" rx="1" fill="#7C3AED" opacity="0.5"/>

        {/* Sub-platform */}
        <polygon points="330,278 380,253 380,268 330,293" fill="#1a0840" opacity="0.9"/>
        <polygon points="230,278 280,253 280,268 230,293" fill="#110630" opacity="0.9"/>
        <polygon points="330,278 280,253 230,278 280,303" fill="#1e0e4c" opacity="0.9"/>
        <polygon points="330,278 280,253 230,278 280,303" fill="none" stroke="#8B5CF6" strokeWidth="1.1" opacity="0.55" filter="url(#gw)"/>

        {/* Central Z Cube */}
        <ellipse cx="280" cy="282" rx="58" ry="17" fill="#7C3AED" opacity="0.18" filter="url(#gs)"/>
        <polygon points="280,231 230,256 230,146 280,121" fill="url(#cl)" filter="url(#gw)"/>
        <polygon points="280,231 330,256 330,146 280,121" fill="url(#cr)" filter="url(#gw)"/>
        <polygon points="280,121 330,146 280,171 230,146" fill="url(#ct)" filter="url(#gw)"/>
        <polyline points="230,146 280,121 330,146" fill="none" stroke="#EDE9FE" strokeWidth="2" opacity="0.85" filter="url(#gw)"/>
        <line x1="280" y1="121" x2="280" y2="231" stroke="#C084FC" strokeWidth="1.1" opacity="0.55"/>
        <line x1="230" y1="146" x2="230" y2="256" stroke="#9B5CF6" strokeWidth="0.9" opacity="0.5"/>
        <line x1="330" y1="146" x2="330" y2="256" stroke="#9B5CF6" strokeWidth="0.9" opacity="0.5"/>
        <polyline points="230,256 280,231 330,256" fill="none" stroke="#7C3AED" strokeWidth="1" opacity="0.5"/>
        <text x="249" y="214" fontFamily="Space Grotesk,sans-serif" fontSize="64" fontWeight="900"
              fill="url(#zg)" filter="url(#gs)" textAnchor="middle">Z</text>

        {/* Ring glow */}
        <ellipse cx="280" cy="295" rx="108" ry="27" fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.4" filter="url(#gw)"/>
        <ellipse cx="280" cy="295" rx="78"  ry="19" fill="none" stroke="#6D28D9" strokeWidth="0.8" opacity="0.3"/>

        {/* Signal lines */}
        <line x1="280" y1="121" x2="185" y2="72"  stroke="#8B5CF6" strokeWidth="0.8" opacity="0.28" strokeDasharray="5,5"/>
        <line x1="330" y1="146" x2="405" y2="102" stroke="#6D28D9" strokeWidth="0.8" opacity="0.28" strokeDasharray="5,5"/>

        {/* Particles */}
        <circle cx="148" cy="148" r="2.5" fill="#C084FC" opacity="0.9" filter="url(#gw)"/>
        <circle cx="420" cy="138" r="2"   fill="#00D4FF" opacity="0.8" filter="url(#gw)"/>
        <circle cx="458" cy="208" r="2.8" fill="#A855F7" opacity="0.7" filter="url(#gw)"/>
        <circle cx="105" cy="218" r="2"   fill="#00D4FF" opacity="0.7" filter="url(#gw)"/>
        <circle cx="458" cy="318" r="2.2" fill="#C084FC" opacity="0.6" filter="url(#gw)"/>
        <circle cx="188" cy="93"  r="1.8" fill="#00D4FF" opacity="0.7"/>
        <circle cx="378" cy="88"  r="1.8" fill="#A855F7" opacity="0.7"/>
      </svg>

      {/* Floating chips */}
      <div
        className="chip-bob absolute top-[8%] right-0 flex items-center gap-2 px-3 py-2 text-xs text-slate-400 backdrop-blur-lg rounded-lg whitespace-nowrap"
        style={{ background: 'rgba(14,9,32,.92)', border: '1px solid rgba(139,92,246,.18)' }}
      >
        <span className="dot-blink w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_6px_#8B5CF6]"/>
        <span>أنظمة نشطة</span>
        <strong className="text-white">50+</strong>
      </div>

      <div
        className="chip-bob absolute bottom-[10%] left-0 flex items-center gap-2 px-3 py-2 text-xs text-slate-400 backdrop-blur-lg rounded-lg whitespace-nowrap"
        style={{ background: 'rgba(14,9,32,.92)', border: '1px solid rgba(139,92,246,.18)', animationDelay: '1.8s' }}
      >
        <span className="dot-blink w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_#22C55E]" style={{ animationDelay: '.6s' }}/>
        <span>عميل راضٍ</span>
        <strong className="text-white">100+</strong>
      </div>
    </div>
  );
}
