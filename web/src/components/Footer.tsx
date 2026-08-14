import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { LinkedinIcon, XIcon, FacebookIcon, InstagramIcon, YoutubeIcon } from "./SocialIcons";
import Logo from "./Logo";

const contact = [
  { Icon: MapPin, text: "كربلاء، العراق" },
  { Icon: Phone, text: "0777 865 0640", href: "https://wa.me/9647778650640", ltr: true },
  { Icon: Mail, text: "zawan.dev@gmail.com", href: "mailto:zawan.dev@gmail.com", ltr: true },
  { Icon: Clock, text: "ساعات العمل: 9 ص - 6 م" },
];

const columns: { title: string; links: [string, string][] }[] = [
  {
    title: "الشركة",
    links: [
      ["/about", "من نحن"],
      ["/about#vision", "رؤيتنا ورسالتنا"],
      ["/about#team", "فريق العمل"],
      ["/contact", "سياسة الخصوصية"],
    ],
  },
  {
    title: "خدماتنا",
    links: [
      ["/services", "تطوير أنظمة مخصصة"],
      ["/services", "تطبيقات الموبايل"],
      ["/services", "تكامل الأنظمة"],
      ["/services", "الدعم الفني والصيانة"],
    ],
  },
  {
    title: "الأنظمة",
    links: [
      ["/systems/pos", "نظام نقاط البيع"],
      ["/systems/sales-crm", "نظام إدارة المبيعات"],
      ["/systems/store", "منصة التجارة الإلكترونية"],
      ["/systems", "جميع الأنظمة"],
    ],
  },
];

const social = [
  { Icon: LinkedinIcon, href: "https://linkedin.com/company/zawan", label: "لينكدإن" },
  { Icon: XIcon, href: "https://twitter.com/zawan_dev", label: "إكس" },
  { Icon: FacebookIcon, href: "https://facebook.com/zawan.dev", label: "فيسبوك" },
  { Icon: InstagramIcon, href: "https://instagram.com/zawan.dev", label: "انستغرام" },
  { Icon: YoutubeIcon, href: "https://youtube.com/@zawan", label: "يوتيوب" },
];

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[--color-line] bg-black/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {/* contact */}
        <div>
          <h3 className="mb-5 font-extrabold">تواصل معنا</h3>
          <ul className="space-y-3.5 text-sm text-[--color-muted]">
            {contact.map(({ Icon, text, href, ltr }) => (
              <li key={text} className="flex items-center gap-2.5">
                <Icon size={15} className="shrink-0 text-[#c084fc]" />
                {href ? (
                  <a href={href} className="transition-colors hover:text-white" dir={ltr ? "ltr" : undefined}>
                    {text}
                  </a>
                ) : (
                  <span>{text}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {columns.map((col) => (
          <nav key={col.title}>
            <h3 className="mb-5 font-extrabold">{col.title}</h3>
            <ul className="space-y-3 text-sm text-[--color-muted]">
              {col.links.map(([href, label]) => (
                <li key={label}>
                  <Link href={href} className="transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* brand strip */}
      <div className="mx-auto max-w-7xl border-t border-white/5 px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm text-center lg:text-right">
            <Logo className="justify-center lg:justify-start" />
            <p className="mt-4 text-sm leading-7 text-[--color-muted]">
              نطوّر أنظمة برمجية متقدمة تساعد الشركات على النمو وتحقيق التحول الرقمي بكفاءة
              وأمان وموثوقية عالية.
            </p>
          </div>

          <ul className="flex gap-3">
            {social.map(({ Icon, href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#8b5cf6]/20 bg-white/[0.03] text-[--color-muted] transition-colors hover:border-[#8b5cf6]/60 hover:text-white"
                >
                  <Icon size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 px-4 py-5 text-center text-xs text-[--color-muted]">
        © {new Date().getFullYear()} ZAWAN للأنظمة والبرمجيات. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
