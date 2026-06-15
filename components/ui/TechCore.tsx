export default function TechCore() {
  const services = [
    { x: 110, y: 170, label: 'تطوير البرمجيات', icon: '‹/›' },
    { x: 310, y: 78, label: 'الحوسبة السحابية', icon: '☁' },
    { x: 610, y: 178, label: 'التطبيقات الذكية', icon: '▯' },
    { x: 650, y: 395, label: 'قواعد البيانات', icon: '▤' },
    { x: 420, y: 480, label: 'الذكاء الاصطناعي', icon: '✺' },
    { x: 155, y: 430, label: 'تحليل البيانات', icon: '↗' },
    { x: 70, y: 315, label: 'الأمن السيبراني', icon: '♙' },
  ]
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 780 560" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <linearGradient id="p" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#6e24ff"/><stop offset="1" stopColor="#ff4ee9"/></linearGradient>
        <radialGradient id="core" cx="50%" cy="50%" r="50%"><stop stopColor="#c15cff"/><stop offset=".45" stopColor="#6e27ff"/><stop offset="1" stopColor="#150b2c"/></radialGradient>
      </defs>
      <g opacity=".45" stroke="#7a2cff" strokeWidth="1">
        {Array.from({length:20}).map((_,i)=><path key={i} d={`M${30+i*38} 518h${18+i%5*20}M${20+i*35} 86v${26+i%6*24}`} />)}
        <path d="M20 500h720M60 452h630M120 380h560M45 270h660" />
      </g>
      <g opacity=".45" stroke="#842fff"><ellipse cx="390" cy="315" rx="210" ry="54"/><ellipse cx="390" cy="315" rx="210" ry="54" transform="rotate(24 390 315)"/><ellipse cx="390" cy="315" rx="210" ry="54" transform="rotate(-24 390 315)"/></g>
      <g filter="url(#glow)">
        <circle cx="390" cy="310" r="84" fill="url(#core)" fillOpacity=".28" stroke="url(#p)"/>
        <circle cx="390" cy="310" r="62" fill="#090711" stroke="#a23cff"/>
        <circle cx="390" cy="310" r="46" fill="#12091e"/>
        <text x="390" y="337" textAnchor="middle" fontFamily="Arial" fontSize="78" fontWeight="900" fill="url(#p)">Z</text>
        <circle cx="390" cy="310" r="4" fill="#fff"/>
      </g>
      {services.map((s, i) => (
        <g key={s.label} filter="url(#glow)">
          <path d={`M390 310 L${s.x} ${s.y}`} stroke="#9c37ff" strokeWidth="2" opacity=".9"/>
          <circle cx={s.x} cy={s.y} r="5" fill="#fff"/>
          <circle cx={s.x} cy={s.y} r="44" fill="#0b0a12" stroke="url(#p)" strokeWidth="2"/>
          <circle cx={s.x} cy={s.y} r="32" fill="#151020" stroke="#7025d8" opacity=".75"/>
          <text x={s.x} y={s.y+12} textAnchor="middle" fontSize="33" fontWeight="900" fill="#e9c7ff">{s.icon}</text>
          <rect x={s.x-66} y={s.y+52} width="132" height="35" rx="9" fill="#06060b" stroke="#7e2aff"/>
          <text x={s.x} y={s.y+75} textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">{s.label}</text>
        </g>
      ))}
      <g opacity=".65" fill="#8d2dff">
        {Array.from({length:70}).map((_,i)=><circle key={i} cx={(i*89)%760+10} cy={(i*47)%500+30} r={i%3===0?2:1}/>) }
      </g>
    </svg>
  )
}
