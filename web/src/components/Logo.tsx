export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 130 52"
      className={className}
      role="img"
      aria-label="ZAWAN"
    >
      <defs>
        <linearGradient id="zw-purple" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f0abfc" />
          <stop offset="30%" stopColor="#d844ff" />
          <stop offset="65%" stopColor="#7c3cff" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
        <linearGradient id="zw-white" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#e9e4ff" />
          <stop offset="75%" stopColor="#c4b5fd" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <linearGradient id="zw-swoosh" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7c3cff" stopOpacity="0" />
          <stop offset="45%" stopColor="#a855f7" />
          <stop offset="75%" stopColor="#d844ff" />
          <stop offset="100%" stopColor="#7c3cff" stopOpacity="0" />
        </linearGradient>
        <filter id="zw-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path d="M 8 38 Q 65 44 122 34" stroke="url(#zw-swoosh)" strokeWidth="1.6" fill="none" />
      <path d="M 12 41 Q 65 48 118 38" stroke="url(#zw-swoosh)" strokeWidth="0.7" fill="none" opacity="0.5" />

      <g filter="url(#zw-glow)" transform="translate(108,7)">
        <path d="M0,-6 L1.2,-1.2 L6,0 L1.2,1.2 L0,6 L-1.2,1.2 L-6,0 L-1.2,-1.2 Z" fill="#f0abfc" />
      </g>

      <text
        x="8"
        y="34"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="34"
        fontStyle="italic"
        fontWeight="bold"
        filter="url(#zw-glow)"
      >
        <tspan fill="url(#zw-purple)">Z</tspan>
        <tspan fill="url(#zw-white)">a</tspan>
        <tspan fill="url(#zw-purple)">w</tspan>
        <tspan fill="url(#zw-white)">a</tspan>
        <tspan fill="url(#zw-purple)">n</tspan>
      </text>
    </svg>
  );
}
