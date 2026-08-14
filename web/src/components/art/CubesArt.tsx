/** Small isometric cube cluster used as decorative corner art. */
export default function CubesArt({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 140" className={className} aria-hidden>
      <defs>
        <linearGradient id="cb-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c13cff" />
          <stop offset="100%" stopColor="#7c3cff" />
        </linearGradient>
        <linearGradient id="cb-left" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3cff" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#4c1d95" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="cb-right" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3b1d7a" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {[
        { x: 40, y: 34, s: 30 },
        { x: 82, y: 58, s: 24 },
        { x: 22, y: 82, s: 22 },
        { x: 66, y: 100, s: 18 },
      ].map(({ x, y, s }) => (
        <g key={`${x}-${y}`}>
          <path d={`M${x} ${y} L${x + s} ${y - s * 0.55} L${x + s * 2} ${y} L${x + s} ${y + s * 0.55} Z`} fill="url(#cb-top)" opacity="0.9" />
          <path d={`M${x} ${y} L${x + s} ${y + s * 0.55} L${x + s} ${y + s * 1.65} L${x} ${y + s * 1.1} Z`} fill="url(#cb-left)" />
          <path d={`M${x + s * 2} ${y} L${x + s} ${y + s * 0.55} L${x + s} ${y + s * 1.65} L${x + s * 2} ${y + s * 1.1} Z`} fill="url(#cb-right)" />
        </g>
      ))}

      {[
        [128, 30, 2.5],
        [16, 50, 2],
        [110, 118, 2.2],
        [142, 82, 1.8],
      ].map(([cx, cy, r]) => (
        <circle key={cx} cx={cx} cy={cy} r={r} fill="#c084fc" opacity="0.7" />
      ))}
    </svg>
  );
}
