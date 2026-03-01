"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useIsMobile, mDur, mInitial, mViewport } from "@/hooks/useMobileMotion";
import { Locale } from "@/lib/translations";
import { getLocale } from "@/lib/store";
import Navigation from "@/components/Navigation";

const sections = [
  { id: "overview", labelEN: "Overview", labelFR: "Aperçu" },
  { id: "cost-of-living", labelEN: "Cost of Living", labelFR: "Coût de la vie" },
  { id: "healthcare", labelEN: "Healthcare", labelFR: "Santé" },
  { id: "climate", labelEN: "Climate", labelFR: "Climat" },
  { id: "visa-policies", labelEN: "Visa Policies", labelFR: "Politiques de visa" },
  { id: "economic-overview", labelEN: "Economic Overview", labelFR: "Aperçu économique" },
];

export default function MaldivesMauritiusPage() {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const mob = useIsMobile();

  useEffect(() => {
    setMounted(true);
    setLocale(getLocale());
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = sectionRefs.current[id];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [mounted]);

  if (!mounted) return null;

  const isFR = locale === "fr";

  const fadeUp = {
    initial: mInitial({ opacity: 0, y: 24 }, mob),
    whileInView: { opacity: 1, y: 0 },
    viewport: mViewport,
    transition: { duration: mDur(0.6, mob) },
  };

  const fadeUpSvg = {
    initial: mInitial({ opacity: 0, y: 20 }, mob),
    whileInView: { opacity: 1, y: 0 },
    viewport: mViewport,
    transition: { duration: mDur(0.7, mob) },
  };

  function scrollTo(id: string) {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  }

  const professorLink = (
    <a
      href="https://www.linkedin.com/in/al-kamienski-m-b-a-ph-d-1b71127/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-red hover:underline transition-all duration-200"
    >
      Al Kamiensky
    </a>
  );

  return (
    <div className="min-h-screen bg-cream">
      <Navigation locale={locale} onLocaleChange={setLocale} />

      <div className="pt-28 md:pt-36 px-6 md:pl-28 md:pr-8 lg:pl-40 pb-24">
        {/* Back button */}
        <motion.button
          initial={mInitial({ opacity: 0, x: -12 }, mob)}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: mDur(0.4, mob), delay: 0.2 }}
          onClick={() => router.push("/home#projects")}
          className="font-sans text-label tracking-widest uppercase text-black/30 hover:text-red transition-colors duration-300 mb-16 flex items-center gap-2"
        >
          ← {isFR ? "Retour" : "Back"}
        </motion.button>

        {/* Mobile horizontal nav */}
        <div className="md:hidden mb-10 -mx-6 px-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 min-w-max">
            {sections.map(({ id, labelEN, labelFR }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className={`whitespace-nowrap py-2 px-3 font-sans text-micro tracking-widest uppercase transition-all duration-300 border-b-2 ${
                  activeSection === id
                    ? "border-red text-black"
                    : "border-transparent text-black/30"
                }`}
              >
                {isFR ? labelFR : labelEN}
              </button>
            ))}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex gap-12 lg:gap-20 max-w-6xl">
          {/* Sticky side navigation — desktop only */}
          <nav className="hidden md:block w-44 lg:w-52 shrink-0">
            <div className="sticky top-32">
              <ul className="flex flex-col gap-1">
                {sections.map(({ id, labelEN, labelFR }) => (
                  <li key={id}>
                    <button
                      onClick={() => scrollTo(id)}
                      className={`w-full text-left py-2.5 pl-4 font-sans text-label tracking-widest uppercase transition-all duration-300 border-l-2 ${
                        activeSection === id
                          ? "border-red text-black"
                          : "border-transparent text-black/30 hover:text-black/50"
                      }`}
                    >
                      {isFR ? labelFR : labelEN}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Scrollable content */}
          <div className="flex-1 min-w-0">
            {/* ─── Section 1 — Overview ─── */}
            <section
              ref={(el) => { sectionRefs.current["overview"] = el; }}
              id="overview"
              className="mb-24"
            >
              <motion.div
                initial={mInitial({ opacity: 0, y: 24 }, mob)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: mDur(0.6, mob), delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="font-serif text-lg md:text-xl text-black/30 block mb-4">
                  2025
                </span>

                <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-normal leading-heading max-w-3xl mb-6">
                  {isFR
                    ? "Comparaison de données — Les Maldives et Maurice"
                    : "Data Comparison — The Maldives & Mauritius"}
                </h1>

                <span className="font-sans text-label tracking-widest uppercase text-red/60 block mb-5">
                  Data Visualization
                </span>

                <div className="flex flex-wrap gap-2 mb-12">
                  {["Data Visualization", "Academic", "Economics", "Illustrator"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="font-sans text-micro tracking-widest uppercase border border-black/10 px-3 py-1.5 text-black/40"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </motion.div>

              {/* Academic context — EN/FR */}
              <motion.div
                initial={mInitial({ opacity: 0, y: 16 }, mob)}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: mDur(0.5, mob), delay: 0.5 }}
                className="max-w-2xl mb-12"
              >
                <p className="font-sans text-base md:text-lg leading-reading text-black/60">
                  {isFR ? (
                    <>
                      Cette comparaison de données a été réalisée dans le cadre d{"\u2019"}un mini-rapport pour un cours de deuxième année de Bachelor, animé par le professeur{" "}
                      {professorLink}
                      , originaire de Chicago. Le projet a impliqué des recherches indépendantes comparant deux nations insulaires de l{"\u2019"}océan Indien — les Maldives et Maurice — à travers des indicateurs économiques, sociaux et environnementaux clés, visualisés via des designs personnalisés réalisés sous Adobe Illustrator.
                    </>
                  ) : (
                    <>
                      This data comparison was produced as part of a mini-report assignment for a second-year Bachelor course led by Professor{" "}
                      {professorLink}
                      , originally from Chicago. The project involved independent research comparing two Indian Ocean island nations — the Maldives and Mauritius — across key economic, social, and environmental indicators, visualized through custom designs built in Adobe Illustrator.
                    </>
                  )}
                </p>
              </motion.div>

              {/* Intro text — EN only */}
              <motion.div
                {...fadeUp}
                className="max-w-2xl mb-16"
              >
                <p className="font-sans text-base md:text-lg leading-reading text-black/60 mb-6">
                  Two stunning islands in the Indian Ocean. Both the Maldives and Mauritius provide a canvas for an idyllic lifestyle — each with its distinct brushstrokes. The Maldives is an intimate escape, where every moment is a personal dialogue with nature, marked by quiet luxury and mesmerizing seascapes. Mauritius, on the other hand, offers an immersive experience that combines natural beauty with cultural vibrancy, inviting you to partake in both the tranquility of the ocean and the pulse of island life.
                </p>
                <p className="font-sans text-base md:text-lg leading-reading text-black/60">
                  In this comparative journey, whether you choose the secluded elegance of the Maldives or the culturally rich allure of Mauritius, the promise remains the same: a daily ritual of breathtaking beauty, invigorating activity, and the simple pleasure of embracing life&#8217;s unhurried rhythm.
                </p>
              </motion.div>

              {/* Two maps side by side */}
              <motion.div
                {...fadeUp}
                className="grid grid-cols-2 gap-4 sm:gap-8"
              >
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square flex items-center justify-center overflow-hidden">
                    <Image
                      src="/creative/maldives-mauritius/map-maldives.svg"
                      alt="Map of the Maldives"
                      width={600}
                      height={600}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-sans text-label tracking-widest uppercase text-black/40 mt-4">
                    Maldives
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square flex items-center justify-center overflow-hidden">
                    <Image
                      src="/creative/maldives-mauritius/map-mauritius.svg"
                      alt="Map of Mauritius"
                      width={600}
                      height={600}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-sans text-label tracking-widest uppercase text-black/40 mt-4">
                    Mauritius
                  </span>
                </div>
              </motion.div>
            </section>

            {/* ─── Section 2 — Cost of Living ─── */}
            <section
              ref={(el) => { sectionRefs.current["cost-of-living"] = el; }}
              id="cost-of-living"
              className="mb-24 pt-8 border-t border-black/10"
            >
              <motion.h2
                {...fadeUp}
                className="font-serif text-2xl md:text-4xl font-normal mb-10"
              >
                Cost of Living
              </motion.h2>

              {/* CPI graph */}
              <motion.div {...fadeUpSvg} className="mb-12">
                <h3 className="font-serif text-lg md:text-xl font-normal text-black/70 mb-6">
                  Graph Comparing the CPI of the Maldives &amp; Mauritius
                </h3>
                <Image
                  src="/creative/maldives-mauritius/graph-cpi.svg"
                  alt="CPI comparison graph"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </motion.div>

              {/* Housing graph + text */}
              <motion.div {...fadeUpSvg}>
                <h3 className="font-serif text-lg md:text-xl font-normal text-black/70 mb-6">
                  Housing Price Comparison between Malé &amp; Port Louis
                </h3>
                <div className="flex flex-col lg:flex-row gap-8 items-start">
                  <div className="flex-1 min-w-0">
                    <Image
                      src="/creative/maldives-mauritius/ousing-price.svg"
                      alt="Housing price comparison"
                      width={1200}
                      height={800}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                  </div>
                  <div className="lg:w-72 shrink-0 border-l-2 border-red pl-5">
                    <p className="font-sans text-sm leading-reading text-black/60">
                      Maldives is expensive, with a cost index of 92.9 and monthly expenses around $800 (excluding rent). In contrast, Mauritius is far more affordable, with an index of 64.3 and costs 40–50% lower.
                    </p>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* ─── Section 3 — Healthcare ─── */}
            <section
              ref={(el) => { sectionRefs.current["healthcare"] = el; }}
              id="healthcare"
              className="mb-24 pt-8 border-t border-black/10"
            >
              <motion.h2
                {...fadeUp}
                className="font-serif text-2xl md:text-4xl font-normal mb-10"
              >
                Healthcare
              </motion.h2>

              <motion.div
                {...fadeUp}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div>
                  <h3 className="font-serif text-lg md:text-xl font-normal text-black/70 mb-4">
                    Healthcare in the Maldives
                  </h3>
                  <p className="font-sans text-sm md:text-base leading-reading text-black/60">
                    Healthcare is free at the point of use for residents, but quality and capacity are variable. Most retirees would be strongly advised to have private health insurance to cover specialist care or medical evacuation, as the local system may not meet all needs.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-lg md:text-xl font-normal text-black/70 mb-4">
                    Healthcare in Mauritius
                  </h3>
                  <p className="font-sans text-sm md:text-base leading-reading text-black/60">
                    Public healthcare is free for all residents, including expatriate retirees. Public hospitals and clinics offer broad coverage (around 73% of all healthcare needs are managed free of charge in public facilities), ensuring affordable access. However, due to high demand, public facilities can be crowded and the care, while generally good, may not match the comfort or technology of private hospitals.
                  </p>
                </div>
              </motion.div>
            </section>

            {/* ─── Section 4 — Climate ─── */}
            <section
              ref={(el) => { sectionRefs.current["climate"] = el; }}
              id="climate"
              className="mb-24 pt-8 border-t border-black/10"
            >
              <motion.h2
                {...fadeUp}
                className="font-serif text-2xl md:text-4xl font-normal mb-2"
              >
                Climate
              </motion.h2>
              <motion.p
                {...fadeUp}
                className="font-sans text-sm text-black/40 mb-10"
              >
                Monthly climatology average from 1991 to 2020
              </motion.p>

              <motion.div
                {...fadeUpSvg}
                className="grid grid-cols-2 gap-4 sm:gap-8"
              >
                <div>
                  <h3 className="font-serif text-lg md:text-xl font-normal text-black/70 mb-4 text-center">
                    Mauritius
                  </h3>
                  <Image
                    src="/creative/maldives-mauritius/climate-mauritius.svg"
                    alt="Climate data for Mauritius"
                    width={600}
                    height={600}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-lg md:text-xl font-normal text-black/70 mb-4 text-center">
                    Maldives
                  </h3>
                  <Image
                    src="/creative/maldives-mauritius/climate-maldives.svg"
                    alt="Climate data for the Maldives"
                    width={600}
                    height={600}
                    className="w-full h-auto"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </section>

            {/* ─── Section 5 — Visa Policies ─── */}
            <section
              ref={(el) => { sectionRefs.current["visa-policies"] = el; }}
              id="visa-policies"
              className="mb-24 pt-8 border-t border-black/10"
            >
              <motion.h2
                {...fadeUp}
                className="font-serif text-2xl md:text-4xl font-normal mb-10"
              >
                Visa Policies
              </motion.h2>

              <motion.div {...fadeUp}>
                <h3 className="font-serif text-lg md:text-xl font-normal text-black/70 mb-6">
                  Retired Non-Citizen Residence Permit in Mauritius
                </h3>
                <p className="font-sans text-sm md:text-base leading-reading text-black/60 max-w-2xl mb-10">
                  Retiring in Mauritius may be your best choice if you are aged 50 or above. With just USD 1,500 monthly, you can benefit from a 10-year Residence Permit and live in a peaceful environment. The Residence Permit further offers you the possibility to apply for a 20-year Permanent Residence Permit after 3 consecutive years.
                </p>

                {/* Desktop: 3 columns with borders */}
                <div className="hidden sm:grid grid-cols-3 gap-6">
                  <div className="border border-black/10 p-6">
                    <span className="font-sans text-micro tracking-widest uppercase text-black/35 block mb-3">
                      Residency Validity
                    </span>
                    <span className="font-serif text-xl md:text-2xl font-normal">
                      10 Years
                    </span>
                  </div>
                  <div className="border border-black/10 p-6">
                    <span className="font-sans text-micro tracking-widest uppercase text-black/35 block mb-3">
                      Renewable
                    </span>
                    <p className="font-sans text-sm leading-reading text-black/60">
                      Evidence of availability of funds of USD 18,000 yearly from country of origin or residence
                    </p>
                  </div>
                  <div className="border border-black/10 p-6">
                    <span className="font-sans text-micro tracking-widest uppercase text-black/35 block mb-3">
                      Applicable Fee
                    </span>
                    <span className="font-serif text-xl md:text-2xl font-normal">
                      USD 1,000
                    </span>
                  </div>
                </div>

                {/* Mobile: stacked with red left border */}
                <div className="sm:hidden border-l-2 border-red pl-5 flex flex-col gap-6">
                  <div>
                    <span className="font-sans text-micro tracking-widest uppercase text-black/35 block mb-2">
                      Renewable
                    </span>
                    <p className="font-sans text-sm leading-reading text-black/60">
                      Evidence of availability of funds of USD 18,000 yearly from country of origin or residence
                    </p>
                  </div>
                  <div className="flex gap-8">
                    <div>
                      <span className="font-sans text-micro tracking-widest uppercase text-black/35 block mb-2">
                        Applicable Fee
                      </span>
                      <span className="font-serif text-xl font-normal">
                        USD 1,000
                      </span>
                    </div>
                    <div>
                      <span className="font-sans text-micro tracking-widest uppercase text-black/35 block mb-2">
                        Residency Validity
                      </span>
                      <span className="font-serif text-xl font-normal">
                        10 Years
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </section>

            {/* ─── Section 6 — Economic Overview ─── */}
            <section
              ref={(el) => { sectionRefs.current["economic-overview"] = el; }}
              id="economic-overview"
              className="mb-24 pt-8 border-t border-black/10"
            >
              <motion.h2
                {...fadeUp}
                className="font-serif text-2xl md:text-4xl font-normal mb-10"
              >
                Economic Overview
              </motion.h2>

              <motion.div {...fadeUpSvg}>
                <h3 className="font-serif text-lg md:text-xl font-normal text-black/70 mb-6">
                  GDP of Mauritius and the Maldives from 1980 to 2024
                </h3>
                <Image
                  src="/creative/maldives-mauritius/graph-gdp.svg"
                  alt="GDP comparison graph"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </motion.div>
            </section>

            {/* Bottom back link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={mViewport}
              transition={{ duration: mDur(0.4, mob) }}
              className="pt-8 border-t border-black/10"
            >
              <button
                onClick={() => router.push("/home#projects")}
                className="font-sans text-label tracking-widest uppercase text-black/30 hover:text-red transition-colors duration-300 flex items-center gap-2"
              >
                ← {isFR ? "Tous les projets" : "All projects"}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
