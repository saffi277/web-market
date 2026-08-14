import Link from "next/link";
import Logo from "./Logo";

const social = [
  { label: "واتساب", href: "https://wa.me/9647778650640", text: "0777 865 0640" },
  { label: "انستغرام", href: "https://instagram.com/zawan.dev", text: "@zawan.dev" },
  { label: "فيسبوك", href: "https://facebook.com/zawan.dev", text: "zawan.dev" },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[--color-line] bg-black/25">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Logo className="h-11 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-7 text-[--color-muted]">
            نبني أنظمة برمجية متكاملة تساعد الشركات على النمو والتوسع.
          </p>
        </div>

        <nav className="text-sm">
          <h3 className="mb-4 font-extrabold">روابط سريعة</h3>
          <ul className="space-y-2.5 text-[--color-muted]">
            {[
              ["/systems", "الأنظمة"],
              ["/services", "خدماتنا"],
              ["/contact", "تواصل معنا"],
              ["/admin", "لوحة الإدارة"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="transition-colors hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="text-sm">
          <h3 className="mb-4 font-extrabold">تواصل معنا</h3>
          <ul className="space-y-2.5 text-[--color-muted]">
            {social.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {s.label}: <span dir="ltr">{s.text}</span>
                </a>
              </li>
            ))}
            <li>الموقع: العراق</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-5 text-center text-xs text-[--color-muted]">
        © {new Date().getFullYear()} ZAWAN — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
