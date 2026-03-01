"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Locale, VisitorType } from "@/lib/translations";
import { t } from "@/lib/translations";
import { setVisitorType, setLocale, getVisitorType, getLocale } from "@/lib/store";
import { useIsMobile, mDur, mInitial, mStagger } from "@/hooks/useMobileMotion";

const visitorTypes: VisitorType[] = ["recruiter", "collaborator", "curious", "visitor"];

export default function EntryPage() {
  const router = useRouter();
  const [locale, setLocaleState] = useState<Locale>("en");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const mob = useIsMobile();

  useEffect(() => {
    const saved = getLocale();
    setLocaleState(saved);

    const existing = getVisitorType();
    if (existing) {
      router.replace("/home");
      return;
    }

    // Lock scroll while gate is visible
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    setMounted(true);

    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [router]);

  const strings = t(locale);

  function handleSelect(type: VisitorType, index: number) {
    setSelectedIndex(index);
    setVisitorType(type);
    setTimeout(() => {
      router.push("/home");
    }, 600);
  }

  function toggleLocale() {
    const next = locale === "en" ? "fr" : "en";
    setLocaleState(next);
    setLocale(next);
  }

  if (!mounted) return null;

  return (
    <div className="relative bg-cream overflow-hidden h-[100dvh] touch-none">
      {/* Language toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: mob ? 0.6 : 1.2, duration: mDur(0.5, mob) }}
        onClick={toggleLocale}
        className="fixed top-6 right-8 z-50 font-sans text-sm tracking-widest uppercase hover:text-red transition-colors duration-300"
      >
        {locale === "en" ? "FR" : "EN"}
      </motion.button>

      {/* Decorative elements — hidden on mobile for performance */}
      {!mob && (
        <>
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed left-12 top-0 w-px h-screen bg-black/10 origin-top"
          />
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-1/3 left-0 w-24 h-px bg-red origin-left"
          />
        </>
      )}

      {/* Main content — offset left for brutalist asymmetry */}
      <div className="h-full flex flex-col justify-center px-6 md:pl-28 md:pr-8 lg:pl-40 max-w-4xl">
        {/* Heading */}
        <motion.p
          initial={mInitial({ opacity: 0, x: -20 }, mob)}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: mDur(0.6, mob), delay: 0.2 }}
          className="font-sans text-label tracking-extreme uppercase text-black/40 mb-4"
        >
          {strings.entry.heading}
        </motion.p>

        <motion.h1
          initial={mInitial({ opacity: 0, y: 30 }, mob)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: mDur(0.7, mob), delay: mob ? 0.2 : 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-heading mb-16"
        >
          {strings.entry.subheading}
        </motion.h1>

        {/* Options */}
        <div className="space-y-1">
          {visitorTypes.map((type, i) => (
            <motion.button
              key={type}
              initial={mInitial({ opacity: 0, x: -40 }, mob)}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: mDur(0.5, mob),
                delay: mStagger(i, 0.1, 0.6, mob),
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleSelect(type, i)}
              className="group relative block w-full text-left py-4 md:py-5"
            >
              <AnimatePresence>
                {hoveredIndex === i && selectedIndex === null && (
                  <motion.div
                    layoutId="hover-bg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 bg-black/[0.03] -ml-6 -mr-4 pl-6 pr-4"
                  />
                )}
              </AnimatePresence>

              <AnimatePresence>
                {selectedIndex === i && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 bg-red -ml-6 -mr-4 origin-left"
                  />
                )}
              </AnimatePresence>

              <div className="relative flex items-baseline gap-6">
                <span
                  className={`font-sans text-label tracking-widest tabular-nums transition-colors duration-200 ${
                    selectedIndex === i ? "text-cream" : "text-black/30"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`font-serif text-2xl md:text-3xl lg:text-4xl transition-colors duration-200 ${
                    selectedIndex === i
                      ? "text-cream"
                      : hoveredIndex === i
                      ? "text-black"
                      : "text-black/70"
                  }`}
                >
                  {strings.entry.options[type]}
                </span>

                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{
                    opacity: hoveredIndex === i && selectedIndex === null ? 1 : 0,
                    x: hoveredIndex === i && selectedIndex === null ? 0 : -8,
                  }}
                  transition={{ duration: 0.2 }}
                  className="font-sans text-lg text-red ml-auto"
                >
                  &rarr;
                </motion.span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-px bg-black/10" />
            </motion.button>
          ))}
        </div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: mob ? 0.6 : 1.2, duration: mDur(0.5, mob) }}
          className="font-sans text-label tracking-wider text-black/30 mt-12 max-w-xs"
        >
          {strings.entry.hint}
        </motion.p>
      </div>

      {/* Corner accent — hidden on mobile */}
      {!mob && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-8 right-8 w-3 h-3 bg-red rounded-full"
        />
      )}
    </div>
  );
}
