/** ZAWAN lockup: gradient Z glyph + wordmark with Arabic tagline. */
export default function Logo({
  className = "",
  withTagline = true,
}: {
  className?: string;
  withTagline?: boolean;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`} dir="ltr">
      <svg viewBox="0 0 44 44" className="h-9 w-9 shrink-0" role="img" aria-label="ZAWAN">
        <defs>
          <linearGradient id="zw-mark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="50%" stopColor="#7c3cff" />
            <stop offset="100%" stopColor="#d844ff" />
          </linearGradient>
        </defs>
        <rect x="1.5" y="1.5" width="41" height="41" rx="12" fill="url(#zw-mark)" opacity="0.16" />
        <rect x="1.5" y="1.5" width="41" height="41" rx="12" fill="none" stroke="url(#zw-mark)" strokeWidth="1.6" />
        <path
          d="M13 13 H31 L17 27 H31"
          fill="none"
          stroke="url(#zw-mark)"
          strokeWidth="3.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="31" cy="31" r="2.6" fill="#00d4ff" />
      </svg>

      <span className="leading-none">
        <span className="block text-[19px] font-black tracking-wide text-white">ZAWAN</span>
        {withTagline && (
          <span className="mt-1 block text-[10px] font-medium text-[--color-muted]" dir="rtl">
            للأنظمة والبرمجيات
          </span>
        )}
      </span>
    </span>
  );
}
