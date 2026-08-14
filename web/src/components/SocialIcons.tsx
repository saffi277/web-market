type IconProps = { size?: number; style?: React.CSSProperties; className?: string };

/** Brand marks, hand-rolled because lucide dropped its brand set. */
function wrap(path: React.ReactNode, { size = 20, style, className }: IconProps, filled = false) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke={filled ? "none" : "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
      aria-hidden
    >
      {path}
    </svg>
  );
}

export function InstagramIcon(p: IconProps) {
  return wrap(
    <>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </>,
    p,
  );
}

export function FacebookIcon(p: IconProps) {
  return wrap(<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />, p);
}

export function LinkedinIcon(p: IconProps) {
  return wrap(
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-11h4v1.5A6 6 0 0 1 16 8z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </>,
    p,
  );
}

export function XIcon(p: IconProps) {
  return wrap(
    <>
      <path d="M4 3 L20 21" />
      <path d="M20 3 L4 21" />
    </>,
    p,
  );
}

export function YoutubeIcon(p: IconProps) {
  return wrap(
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="M10 9.5 L15 12 L10 14.5 Z" />
    </>,
    p,
  );
}
