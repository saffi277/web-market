"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/systems", label: "الأنظمة" },
  { href: "/services", label: "خدماتنا" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const path = pathname.replace(/\/+$/, "") || "/";
  const [open, setOpen] = useState(false);

  // Close the drawer whenever navigation lands on a new page.
  useEffect(() => setOpen(false), [pathname]);

  // The demo workspace and dashboard run their own chrome.
  if (path.startsWith("/admin") || path.startsWith("/demo/")) return null;

  const isActive = (href: string) =>
    href === "/" ? path === "/" : path === href || path.startsWith(href + "/");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[--color-line] bg-[#05040b]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" aria-label="ZAWAN — الصفحة الرئيسية" className="shrink-0">
          <Logo className="h-10 w-auto lg:h-12" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex xl:gap-11">
          {links.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1.5 text-[15px] font-bold transition-opacity ${
                  active ? "opacity-100" : "opacity-70 hover:opacity-100"
                }`}
              >
                {label}
                <span
                  className={`block h-0.5 w-16 rounded-full transition-all ${
                    active
                      ? "bg-gradient-to-r from-transparent via-[#d844ff] to-transparent shadow-[0_0_14px_#d844ff]"
                      : "bg-transparent"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden rounded-xl bg-gradient-to-br from-[#7c3cff] to-[#d844ff] px-5 py-2.5 text-sm font-extrabold shadow-[0_0_26px_rgba(168,85,247,0.35)] transition-transform hover:scale-[1.03] sm:block lg:px-6 lg:py-3"
          >
            ابدأ مشروعك ↗
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
            className="rounded-lg border border-[--color-line] p-2 lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[--color-line] bg-[#05040b]/98 px-4 pb-5 pt-2 lg:hidden">
          {links.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`block border-b border-white/5 py-3.5 text-[15px] font-bold last:border-0 ${
                  active ? "text-[#e879f9]" : "text-white/75"
                }`}
              >
                {active && <span className="ml-2 text-[#d844ff]">—</span>}
                {label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="mt-4 block rounded-xl bg-gradient-to-br from-[#7c3cff] to-[#d844ff] py-3 text-center text-sm font-extrabold"
          >
            ابدأ مشروعك ↗
          </Link>
        </nav>
      )}
    </header>
  );
}
