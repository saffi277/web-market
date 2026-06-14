'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const navLinks = [
  { href: '/',                label: 'الرئيسية'  },
  { href: '/products',        label: 'الأنظمة'   },
  { href: '/#projects',       label: 'المشاريع'  },
  { href: '/#pricing',        label: 'الأسعار'   },
  { href: '/#about',          label: 'من نحن'    },
  { href: '/#blog',           label: 'المدونة'   },
  { href: '/contact',         label: 'تواصل معنا'},
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 h-16 transition-all duration-300
        ${scrolled
          ? 'bg-[#06030f]/97 border-b border-purple-700/20'
          : 'bg-[#06030f]/88 border-b border-purple-800/08'
        } backdrop-blur-xl`}
    >
      <div className="max-w-[1300px] mx-auto h-full px-6 flex items-center gap-5">

        {/* 04 counter box */}
        <div className="shrink-0 w-10 h-9 border border-purple-700/30 rounded-lg flex items-center justify-center
                        font-[var(--font-space)] font-bold text-sm text-purple-300">
          04
        </div>

        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center
                           font-[var(--font-space)] font-black text-white text-sm shadow-[0_0_14px_rgba(139,92,246,.5)]">
            Z
          </span>
          <span className="font-[var(--font-space)] font-bold text-lg text-white tracking-wide">ZAWAN</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center flex-1 justify-center gap-0">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-3 py-1.5 text-[.9rem] text-slate-400 hover:text-white transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/products"
          className="hidden sm:flex shrink-0 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white
                     rounded-lg text-[.88rem] font-semibold transition-all duration-300
                     hover:shadow-[0_0_20px_rgba(139,92,246,.45)] hover:-translate-y-px"
        >
          جرب الأنظمة
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          className="lg:hidden shrink-0 flex flex-col gap-1.5 p-1.5 ml-auto"
          aria-label="القائمة"
        >
          <span className={`block w-5 h-0.5 bg-slate-400 rounded transition-all duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}/>
          <span className={`block w-5 h-0.5 bg-slate-400 rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}/>
          <span className={`block w-5 h-0.5 bg-slate-400 rounded transition-all duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}/>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-16 inset-x-0 bg-[#06030f]/98 border-b border-purple-800/20 px-6 py-3">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 text-slate-400 hover:text-white border-b border-purple-900/20 text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/products" className="mt-3 block text-center py-2 bg-purple-600 rounded-lg text-white text-sm font-semibold">
            جرب الأنظمة
          </Link>
        </div>
      )}
    </nav>
  );
}
