"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Locale, VisitorType } from "@/lib/translations";
import { t } from "@/lib/translations";
import { getVisitorType, getLocale } from "@/lib/store";
import Navigation from "@/components/Navigation";

export default function HomePage() {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("en");
  const [visitorType, setVisitorType] = useState<VisitorType>("visitor");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLocale = getLocale();
    setLocale(savedLocale);

    const savedType = getVisitorType();
    if (!savedType) {
      router.replace("/");
      return;
    }
    setVisitorType(savedType);
  }, [router]);

  if (!mounted) return null;

  const strings = t(locale);
  const hero = strings.hero[visitorType];

  const otherSections = ["finance", "creative", "photography", "projects", "contact"] as const;

  const aboutData = strings.about[visitorType];

  return (
    <div className="min-h-screen bg-cream">
      <Navigation locale={locale} onLocaleChange={setLocale} />

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-end pl-16 md:pl-28 lg:pl-40 pr-8 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="block font-sans text-[11px] tracking-[0.3em] uppercase text-black/30 mb-6"
          >
            {visitorType === "recruiter"
              ? "01 — Hire"
              : visitorType === "collaborator"
              ? "01 — Collaborate"
              : visitorType === "curious"
              ? "01 — Explore"
              : "01 — Portfolio"}
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] font-normal leading-[0.95] max-w-3xl mb-8"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="font-sans text-base md:text-lg text-black/50 max-w-md"
          >
            {hero.sub}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[45%] right-0 w-32 h-px bg-red origin-right"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute top-24 right-16 w-2 h-2 bg-orange rounded-full"
        />
      </section>

      {/* About — adaptive */}
      <section
        id="about"
        className="min-h-[70vh] border-t border-black/10 pl-16 md:pl-28 lg:pl-40 pr-8 py-24 relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-baseline gap-6 mb-16">
            <span className="font-sans text-[11px] tracking-widest text-black/30 tabular-nums">
              02
            </span>
            <h2 className="font-serif text-4xl md:text-5xl">
              {strings.about.title}
            </h2>
          </div>

          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-sans text-base md:text-lg leading-[1.75] text-black/70"
            >
              {aboutData.bio}
            </motion.p>

            {"extra" in aboutData && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6 font-sans text-base md:text-lg leading-[1.75] text-red/80"
              >
                {aboutData.extra}
              </motion.p>
            )}

            {/* Decorative accent */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-12 flex items-center gap-4 origin-left"
            >
              <div className="w-16 h-px bg-red" />
              <div className="w-2 h-2 bg-red rounded-full" />
            </motion.div>
          </div>
        </motion.div>

        {/* Offset decorative block */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="absolute top-24 right-12 w-8 h-24 bg-orange/10 hidden lg:block"
        />
      </section>

      {/* Other Sections */}
      {otherSections.map((key, i) => (
        <section
          key={key}
          id={key}
          className="min-h-[60vh] border-t border-black/10 pl-16 md:pl-28 lg:pl-40 pr-8 py-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-baseline gap-6 mb-16">
              <span className="font-sans text-[11px] tracking-widest text-black/30 tabular-nums">
                {String(i + 3).padStart(2, "0")}
              </span>
              <h2 className="font-serif text-4xl md:text-5xl">
                {strings.sections[key].title}
              </h2>
            </div>

            <div className="max-w-2xl">
              <p className="font-sans text-black/40 text-base leading-relaxed">
                {strings.sections[key].placeholder}
              </p>

              <div className="mt-12 flex gap-3">
                <div
                  className="w-16 h-16"
                  style={{
                    backgroundColor:
                      i % 3 === 0
                        ? "#E63329"
                        : i % 3 === 1
                        ? "#E8732A"
                        : "#0A0A0A",
                    opacity: i % 3 === 2 ? 0.08 : 0.15,
                  }}
                />
                <div className="w-px h-16 bg-black/10" />
              </div>
            </div>
          </motion.div>
        </section>
      ))}

      {/* Footer */}
      <footer className="border-t border-black/10 pl-16 md:pl-28 lg:pl-40 pr-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <span className="font-sans text-[11px] tracking-widest text-black/30 uppercase">
            Cyprien Métivier-Robcis &copy; 2025
          </span>
          <button
            onClick={() => {
              localStorage.removeItem("portfolio-visitor-type");
              router.push("/");
            }}
            className="font-sans text-[11px] tracking-widest text-black/30 uppercase hover:text-red transition-colors duration-300 text-left md:text-right"
          >
            {locale === "en" ? "Change identity" : "Changer d\u2019identité"}
          </button>
        </div>
      </footer>
    </div>
  );
}
