"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, Rocket } from "lucide-react";
import Logo from "./Logo";

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/systems", label: "الأنظمة" },
  { href: "/services", label: "خدماتنا" },
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "تواصل معنا" },
];

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const path = pathname.replace(/\/+$/, "") || "/";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the drawer whenever navigation lands on a new page.
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The demo workspace and dashboard run their own chrome.
  if (path.startsWith("/admin") || path.startsWith("/demo/")) return null;

  const isActive = (href: string) =>
    href === "/" ? path === "/" : path === href || path.startsWith(href + "/");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-b border-[--color-line] bg-[#0a0618]/95 backdrop-blur-xl"
          : "border-b border-transparent bg-[#0a0618]/70 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link href="/" aria-label="ZAWAN — الصفحة الرئيسية" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
          {links.map(({ href, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1.5 text-[14.5px] font-bold transition-opacity ${
                  active ? "opacity-100" : "opacity-70 hover:opacity-100"
                }`}
              >
                {label}
                <span
                  className={`block h-0.5 w-14 rounded-full transition-all ${
                    active
                      ? "bg-gradient-to-r from-transparent via-[#c13cff] to-transparent shadow-[0_0_14px_#c13cff]"
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
            className="hidden items-center gap-2 rounded-xl bg-gradient-to-l from-[#7c3cff] to-[#c13cff] px-5 py-2.5 text-sm font-extrabold shadow-[0_0_26px_rgba(124,60,255,0.35)] transition-transform hover:scale-[1.03] sm:inline-flex lg:px-6 lg:py-3"
          >
            <Rocket size={16} />
            ابدأ مشروعك
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
        <nav className="border-t border-[--color-line] bg-[#0a0618]/98 px-4 pb-5 pt-2 lg:hidden">
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
                {active && <span className="ml-2 text-[#c13cff]">—</span>}
                {label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-[#7c3cff] to-[#c13cff] py-3 text-sm font-extrabold"
          >
            <Rocket size={16} />
            ابدأ مشروعك
          </Link>
        </nav>
      )}
    </header>
  );
}
