"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Locale } from "@/lib/translations";
import { t } from "@/lib/translations";
import { setLocale } from "@/lib/store";

interface NavigationProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export default function Navigation({ locale, onLocaleChange }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const strings = t(locale);
  const isHome = pathname === "/home";

  function toggleLocale() {
    const next = locale === "en" ? "fr" : "en";
    setLocale(next);
    onLocaleChange(next);
  }

  const navItems = [
    { key: "about", label: strings.nav.about },
    { key: "background", label: strings.nav.background },
    { key: "projects", label: strings.nav.projects },
    { key: "photography", label: strings.nav.photography },
    { key: "contact", label: strings.nav.contact },
  ];

  function handleNavClick(sectionKey: string) {
    setMenuOpen(false);
    if (isHome) {
      const el = document.getElementById(sectionKey);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/home#${sectionKey}`);
    }
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 px-8 py-5 flex items-center justify-between mix-blend-difference">
        <a
          href="/home"
          className="font-serif text-lg text-cream tracking-tight"
        >
          CMR
        </a>

        <div className="flex items-center gap-6">
          <button
            onClick={toggleLocale}
            className="font-sans text-xs tracking-widest uppercase text-cream hover:text-orange transition-colors duration-300"
          >
            {locale === "en" ? "FR" : "EN"}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="font-sans text-xs tracking-widest uppercase text-cream hover:text-orange transition-colors duration-300"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 bg-black flex items-end"
          >
            <div className="w-full pb-16 pl-16 md:pl-28 lg:pl-40 pr-8">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                  onClick={() => handleNavClick(item.key)}
                  className="block font-serif text-4xl md:text-6xl text-cream/70 hover:text-cream py-2 md:py-3 transition-colors duration-200 text-left"
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex gap-8"
              >
                <span className="font-sans text-label tracking-widest text-cream/30 uppercase">
                  Cyprien Métivier-Robcis
                </span>
                <span className="font-sans text-label tracking-widest text-cream/30 uppercase">
                  Portfolio 2025
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
