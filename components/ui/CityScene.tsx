'use client';

export default function CityScene() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 75% at 50% 50%, rgba(91,33,182,.38) 0%, transparent 70%)',
      }}/>

      <svg
        className="city-float"
        style={{ width: '100%', height: '100%', maxHeight: 'calc(100vh - 80px)', filter: 'drop-shadow(0 0 45px rgba(109,40,217,.4))' }}
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="g-top"  x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC"/><stop offset="100%" stopColor="#7C3AED"/>
          </linearGradient>
          <linearGradient id="g-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4C1D95"/><stop offset="100%" stopColor="#3B0764"/>
          </linearGradient>
          <linearGradient id="g-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6D28D9"/><stop offset="100%" stopColor="#4C1D95"/>
          </linearGradient>
          <linearGradient id="g-btop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e0d3e"/><stop offset="100%" stopColor="#120830"/>
          </linearGradient>
          <linearGradient id="g-bfr" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#180940"/><stop offset="100%" stopColor="#0b0420"/>
          </linearGradient>
          <linearGradient id="g-bfl" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#12072e"/><stop offset="100%" stopColor="#07021a"/>
          </linearGradient>
          <linearGradient id="g-plat" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a0840"/><stop offset="100%" stopColor="#0e0526"/>
          </linearGradient>
          <linearGradient id="g-z" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3E8FF"/><stop offset="50%" stopColor="#E9D5FF"/><stop offset="100%" stopColor="#C084FC"/>
          </linearGradient>
          <radialGradient id="g-gfloor" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#5B21B6" stopOpacity="0.35"/>
            <stop offset="100%" stopColor="#5B21B6" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="g-zshadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.5"/>
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0"/>
          </radialGradient>

          <filter id="f-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="f-soft" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="2" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="f-big" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="18" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="f-med" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="9" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ── GROUND PLATFORM ── */}
        <ellipse cx="300" cy="440" rx="280" ry="80" fill="url(#g-gfloor)"/>
        <polygon points="520,360 300,240 80,360 300,480" fill="url(#g-plat)" opacity="0.65"/>
        <line x1="300" y1="240" x2="300" y2="480" stroke="#7C3AED" strokeWidth="0.6" opacity="0.2"/>
        <line x1="80"  y1="360" x2="520" y2="360" stroke="#7C3AED" strokeWidth="0.6" opacity="0.2"/>
        <line x1="190" y1="300" x2="410" y2="420" stroke="#7C3AED" strokeWidth="0.5" opacity="0.16"/>
        <line x1="410" y1="300" x2="190" y2="420" stroke="#7C3AED" strokeWidth="0.5" opacity="0.16"/>
        <polygon points="520,360 300,240 80,360 300,480" fill="none" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.55" filter="url(#f-glow)"/>

        {/* ── BUILDING A — far-left VERY TALL ── */}
        {/* Right face */}
        <polygon points="230,340 280,365 280,50 230,25" fill="url(#g-bfr)"/>
        {/* Left face */}
        <polygon points="180,365 230,340 230,25 180,50" fill="url(#g-bfl)"/>
        {/* Top face */}
        <polygon points="230,25 280,50 230,75 180,50" fill="url(#g-btop)"/>
        <line x1="230" y1="25" x2="230" y2="340" stroke="#7C3AED" strokeWidth="1" opacity="0.6" filter="url(#f-glow)"/>
        {/* Right face dots */}
        {Array.from({length:18},(_, yi)=>
          [237,251,265].map((x,xi)=>{
            const y = 57 + yi*16;
            return <rect key={`ar${yi}-${xi}`} x={x} y={y} width="8" height="9" rx="1.5"
              fill={xi===1?'#00D4FF':'#8B5CF6'} opacity={Math.max(0.15, 0.8 - yi*0.03)}
              filter={yi<4?'url(#f-soft)':undefined}/>
          })
        )}
        {/* Left face dots */}
        {Array.from({length:15},(_, yi)=>
          [185,199].map((x,xi)=>{
            const y = 60 + yi*18;
            return <rect key={`al${yi}-${xi}`} x={x} y={y} width="7" height="8" rx="1.5"
              fill={xi===0?'#7C3AED':'#00D4FF'} opacity={Math.max(0.1, 0.6 - yi*0.03)}/>
          })
        )}

        {/* ── BUILDING B — left medium-tall ── */}
        <polygon points="180,365 230,390 230,175 180,150" fill="url(#g-bfr)"/>
        <polygon points="130,390 180,365 180,150 130,175" fill="url(#g-bfl)"/>
        <polygon points="180,150 230,175 180,200 130,175" fill="url(#g-btop)"/>
        {Array.from({length:12},(_, yi)=>
          [186,200,214].map((x,xi)=>{
            const y = 182 + yi*15;
            return <rect key={`br${yi}-${xi}`} x={x} y={y} width="7" height="8" rx="1.5"
              fill={xi===1?'#00D4FF':'#8B5CF6'} opacity={Math.max(0.1, 0.7 - yi*0.04)}
              filter={yi<3?'url(#f-soft)':undefined}/>
          })
        )}
        {Array.from({length:10},(_, yi)=>
          [135,149].map((x,xi)=>{
            const y = 185 + yi*17;
            return <rect key={`bl${yi}-${xi}`} x={x} y={y} width="6" height="8" rx="1.5"
              fill={xi===0?'#8B5CF6':'#00D4FF'} opacity={Math.max(0.1, 0.5 - yi*0.03)}/>
          })
        )}

        {/* ── BUILDING C — far-right VERY TALL ── */}
        <polygon points="370,340 420,315 420,25 370,50" fill="url(#g-bfr)"/>
        <polygon points="320,365 370,340 370,50 320,75" fill="url(#g-bfl)"/>
        <polygon points="370,50 420,25 370,0 320,25" fill="url(#g-btop)"/>
        <line x1="370" y1="50" x2="370" y2="340" stroke="#7C3AED" strokeWidth="1" opacity="0.6" filter="url(#f-glow)"/>
        {Array.from({length:18},(_, yi)=>
          [376,390,404].map((x,xi)=>{
            const y = 35 + yi*16;
            return <rect key={`cr${yi}-${xi}`} x={x} y={y} width="8" height="9" rx="1.5"
              fill={xi===0?'#7C3AED':'#00D4FF'} opacity={Math.max(0.15, 0.78 - yi*0.03)}
              filter={yi<4?'url(#f-soft)':undefined}/>
          })
        )}
        {Array.from({length:15},(_, yi)=>
          [325,339].map((x,xi)=>{
            const y = 80 + yi*18;
            return <rect key={`cl${yi}-${xi}`} x={x} y={y} width="7" height="8" rx="1.5"
              fill={xi===0?'#8B5CF6':'#00D4FF'} opacity={Math.max(0.1, 0.55 - yi*0.03)}/>
          })
        )}

        {/* ── BUILDING D — right medium ── */}
        <polygon points="370,390 420,365 420,175 370,200" fill="url(#g-bfr)"/>
        <polygon points="320,415 370,390 370,200 320,225" fill="url(#g-bfl)"/>
        <polygon points="370,200 420,175 370,150 320,175" fill="url(#g-btop)"/>
        {Array.from({length:12},(_, yi)=>
          [375,389,403].map((x,xi)=>{
            const y = 207 + yi*15;
            return <rect key={`dr${yi}-${xi}`} x={x} y={y} width="7" height="8" rx="1.5"
              fill={xi===1?'#00D4FF':'#8B5CF6'} opacity={Math.max(0.1, 0.65 - yi*0.04)}
              filter={yi<3?'url(#f-soft)':undefined}/>
          })
        )}
        {Array.from({length:10},(_, yi)=>
          [325,339].map((x,xi)=>{
            const y = 230 + yi*17;
            return <rect key={`dl${yi}-${xi}`} x={x} y={y} width="6" height="8" rx="1.5"
              fill={xi===0?'#7C3AED':'#00D4FF'} opacity={Math.max(0.1, 0.48 - yi*0.03)}/>
          })
        )}

        {/* ── BUILDING E — small front-left ── */}
        <polygon points="180,415 230,390 230,300 180,325" fill="url(#g-bfr)"/>
        <polygon points="130,440 180,415 180,325 130,350" fill="url(#g-bfl)"/>
        <polygon points="180,325 230,300 180,275 130,300" fill="url(#g-btop)"/>
        {Array.from({length:7},(_, yi)=>
          [185,199].map((x,xi)=>{
            const y = 308 + yi*14;
            return <rect key={`er${yi}-${xi}`} x={x} y={y} width="7" height="8" rx="1.5"
              fill={xi===0?'#00D4FF':'#7C3AED'} opacity={Math.max(0.1, 0.6 - yi*0.06)}
              filter={yi<2?'url(#f-soft)':undefined}/>
          })
        )}

        {/* ── BUILDING F — small front-right ── */}
        <polygon points="420,415 470,390 470,300 420,325" fill="url(#g-bfr)"/>
        <polygon points="370,440 420,415 420,325 370,350" fill="url(#g-bfl)"/>
        <polygon points="420,325 470,300 420,275 370,300" fill="url(#g-btop)"/>
        {Array.from({length:7},(_, yi)=>
          [424,438].map((x,xi)=>{
            const y = 308 + yi*14;
            return <rect key={`fr${yi}-${xi}`} x={x} y={y} width="7" height="8" rx="1.5"
              fill={xi===0?'#8B5CF6':'#00D4FF'} opacity={Math.max(0.1, 0.55 - yi*0.06)}/>
          })
        )}

        {/* ── CENTRAL Z CUBE (main hero piece) ── */}
        <ellipse cx="300" cy="380" rx="100" ry="30" fill="url(#g-zshadow)" filter="url(#f-big)"/>

        {/* Left face */}
        <polygon points="300,310 235,345 235,145 300,110" fill="url(#g-left)" filter="url(#f-glow)"/>
        {/* Right face */}
        <polygon points="300,310 365,345 365,145 300,110" fill="url(#g-right)" filter="url(#f-glow)"/>
        {/* Top face */}
        <polygon points="300,110 365,145 300,180 235,145" fill="url(#g-top)" filter="url(#f-glow)"/>

        {/* Edge lines */}
        <line x1="300" y1="110" x2="300" y2="310" stroke="#C084FC" strokeWidth="2" opacity="0.8"/>
        <line x1="235" y1="145" x2="235" y2="345" stroke="#A78BFA" strokeWidth="1.3" opacity="0.6"/>
        <line x1="365" y1="145" x2="365" y2="345" stroke="#A78BFA" strokeWidth="1.3" opacity="0.6"/>
        <polyline points="235,145 300,110 365,145" fill="none" stroke="#EDE9FE" strokeWidth="3" opacity="0.9" filter="url(#f-glow)"/>
        <polyline points="235,345 300,310 365,345" fill="none" stroke="#7C3AED" strokeWidth="1.5" opacity="0.55"/>

        {/* Z letter */}
        <text x="300" y="298" fontFamily="Space Grotesk,sans-serif" fontSize="110" fontWeight="900"
              fill="url(#g-z)" filter="url(#f-big)" textAnchor="middle" dominantBaseline="auto">Z</text>

        {/* Subtle dot matrix on cube faces */}
        {[128,152,176,200,224,248,272].map((y, yi) =>
          [244,256,268].map((x, xi) => (
            <rect key={`zl${yi}-${xi}`} x={x} y={y} width="5" height="6" rx="1"
              fill={xi===1?'#6D28D9':'#4C1D95'} opacity={0.3 - yi*0.02}/>
          ))
        )}
        {[128,152,176,200,224,248,272].map((y, yi) =>
          [310,322,334,346].map((x, xi) => (
            <rect key={`zr${yi}-${xi}`} x={x} y={y} width="5" height="6" rx="1"
              fill={xi%2===0?'#3B0764':'#4C1D95'} opacity={0.28 - yi*0.02}/>
          ))
        )}

        {/* Ring glows */}
        <ellipse cx="300" cy="365" rx="135" ry="38" fill="none" stroke="#8B5CF6" strokeWidth="2.5" opacity="0.5" filter="url(#f-glow)"/>
        <ellipse cx="300" cy="365" rx="105" ry="29" fill="none" stroke="#6D28D9" strokeWidth="1" opacity="0.35"/>
        <ellipse cx="300" cy="365" rx="165" ry="46" fill="none" stroke="#7C3AED" strokeWidth="1" opacity="0.22"/>

        {/* Signal lines */}
        <line x1="235" y1="145" x2="140" y2="90"  stroke="#8B5CF6" strokeWidth="1.2" opacity="0.4" strokeDasharray="7,5"/>
        <line x1="365" y1="145" x2="458" y2="88"  stroke="#8B5CF6" strokeWidth="1.2" opacity="0.4" strokeDasharray="7,5"/>
        <line x1="300" y1="110" x2="300" y2="45"  stroke="#C084FC" strokeWidth="1"   opacity="0.35" strokeDasharray="5,7"/>
        <circle cx="300" cy="45"  r="4" fill="#C084FC" opacity="0.7" filter="url(#f-soft)"/>
        <circle cx="140" cy="90"  r="3.5" fill="#8B5CF6" opacity="0.7" filter="url(#f-soft)"/>
        <circle cx="458" cy="88"  r="3.5" fill="#00D4FF" opacity="0.7" filter="url(#f-soft)"/>

        {/* Particles */}
        <circle cx="110" cy="110" r="3.5" fill="#C084FC" opacity="0.9" filter="url(#f-soft)"/>
        <circle cx="488" cy="100" r="3"   fill="#00D4FF" opacity="0.85" filter="url(#f-soft)"/>
        <circle cx="540" cy="220" r="3.5" fill="#A855F7" opacity="0.75" filter="url(#f-soft)"/>
        <circle cx="60"  cy="200" r="3"   fill="#00D4FF" opacity="0.75" filter="url(#f-soft)"/>
        <circle cx="565" cy="340" r="3"   fill="#C084FC" opacity="0.6"/>
        <circle cx="38"  cy="320" r="2.5" fill="#8B5CF6" opacity="0.6"/>
        <circle cx="195" cy="28"  r="2.5" fill="#00D4FF" opacity="0.7"/>
        <circle cx="408" cy="15"  r="2.5" fill="#A855F7" opacity="0.7"/>
        <circle cx="150" cy="440" r="2.5" fill="#00D4FF" opacity="0.45"/>
        <circle cx="448" cy="445" r="2.5" fill="#C084FC" opacity="0.45"/>

        {/* Diamond particles */}
        <polygon points="85,165 91,172 85,179 79,172"  fill="#8B5CF6" opacity="0.65" filter="url(#f-soft)"/>
        <polygon points="513,165 519,172 513,179 507,172" fill="#00D4FF" opacity="0.65" filter="url(#f-soft)"/>
        <polygon points="300,520 305,526 300,532 295,526" fill="#8B5CF6" opacity="0.4"/>
      </svg>

      {/* Floating chips */}
      <div className="chip-bob absolute top-[14%] right-0 flex items-center gap-2 px-3 py-2 text-xs text-slate-300 backdrop-blur-lg rounded-xl whitespace-nowrap"
        style={{ background: 'rgba(14,9,32,.92)', border: '1px solid rgba(139,92,246,.25)' }}>
        <span className="dot-blink w-2 h-2 rounded-full bg-purple-400" style={{ boxShadow: '0 0 8px #8B5CF6' }}/>
        <span>أنظمة نشطة</span>
        <strong className="text-white">50+</strong>
      </div>

      <div className="chip-bob absolute bottom-[14%] left-0 flex items-center gap-2 px-3 py-2 text-xs text-slate-300 backdrop-blur-lg rounded-xl whitespace-nowrap"
        style={{ background: 'rgba(14,9,32,.92)', border: '1px solid rgba(34,197,94,.2)', animationDelay: '1.8s' }}>
        <span className="dot-blink w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: '0 0 8px #22C55E', animationDelay: '.7s' }}/>
        <span>عميل راضٍ</span>
        <strong className="text-white">100+</strong>
      </div>
    </div>
  );
}
