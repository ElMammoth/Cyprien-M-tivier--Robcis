"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Locale } from "@/lib/translations";
import { getLocale } from "@/lib/store";
import Navigation from "@/components/Navigation";

const sections = [
  { id: "overview", labelEN: "Overview", labelFR: "Aperçu" },
  { id: "map", labelEN: "Map", labelFR: "Carte" },
  { id: "gdp", labelEN: "GDP per Capita", labelFR: "PIB par habitant" },
  { id: "inflation", labelEN: "Inflation Rate", labelFR: "Taux d\u2019inflation" },
  { id: "public-debt", labelEN: "Public Debt", labelFR: "Dette publique" },
];

export default function CaribbeanIslandsPage() {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

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
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6 },
  };

  function scrollTo(id: string) {
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navigation locale={locale} onLocaleChange={setLocale} />

      {/* Content wrapper */}
      <div className="pt-28 md:pt-36 px-6 md:pl-28 md:pr-8 lg:pl-40 pb-24">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onClick={() => router.push("/home#projects")}
          className="font-sans text-label tracking-widest uppercase text-black/30 hover:text-red transition-colors duration-300 mb-16 flex items-center gap-2"
        >
          &larr; {isFR ? "Retour" : "Back"}
        </motion.button>

        {/* Two-column layout: sticky nav + scrollable content */}
        <div className="flex gap-12 lg:gap-20 max-w-6xl">
          {/* Sticky side navigation */}
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
            {/* Section 1 — Overview */}
            <section
              ref={(el) => { sectionRefs.current["overview"] = el; }}
              id="overview"
              className="mb-24"
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Date */}
                <span className="font-serif text-lg md:text-xl text-black/30 block mb-4">
                  2025
                </span>

                {/* Title */}
                <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-normal leading-heading max-w-3xl mb-6">
                  {isFR
                    ? "Comparaison de données — Barbade, Antigua-et-Barbuda et Saint-Kitts-et-Nevis"
                    : "Data Comparison — Barbados, Antigua & Barbuda and St Kitts & Nevis"}
                </h1>

                {/* Category */}
                <span className="font-sans text-label tracking-widest uppercase text-red/60 block mb-5">
                  Data Visualization
                </span>

                {/* Tags */}
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

              {/* Intro text */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="max-w-2xl"
              >
                <p className="font-sans text-base md:text-lg leading-reading text-black/60">
                  {isFR ? (
                    <>
                      Cette comparaison de données a été réalisée dans le cadre d{"\u2019"}une présentation one-to-one pour un cours de deuxième année de Bachelor, animé par le professeur{" "}
                      <a
                        href="https://www.linkedin.com/in/al-kamienski-m-b-a-ph-d-1b71127/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red hover:underline transition-all duration-200"
                      >
                        Al Kamiensky
                      </a>
                      , originaire de Chicago. Le projet a impliqué des recherches indépendantes sur trois nations insulaires caribéennes — Barbade, Antigua-et-Barbuda et Saint-Kitts-et-Nevis — en comparant des indicateurs économiques clés à travers des visualisations personnalisées réalisées sous Adobe Illustrator.
                    </>
                  ) : (
                    <>
                      This data comparison was produced as part of a one-to-one presentation for a second-year Bachelor course led by Professor{" "}
                      <a
                        href="https://www.linkedin.com/in/al-kamienski-m-b-a-ph-d-1b71127/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-red hover:underline transition-all duration-200"
                      >
                        Al Kamiensky
                      </a>
                      , originally from Chicago. The project involved independent research across three Caribbean island nations — Barbados, Antigua &amp; Barbuda, and St Kitts &amp; Nevis — comparing key economic indicators through custom-designed visualizations built in Adobe Illustrator.
                    </>
                  )}
                </p>
              </motion.div>
            </section>

            {/* Section 2 — Map */}
            <section
              ref={(el) => { sectionRefs.current["map"] = el; }}
              id="map"
              className="mb-24 pt-8 border-t border-black/10"
            >
              <motion.h2
                {...fadeUp}
                className="font-serif text-2xl md:text-4xl font-normal mb-10"
              >
                {isFR
                  ? "Trois îles / archipels dans la mer des Caraïbes"
                  : "Three Islands / Archipelagos in the Caribbean Sea"}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8 }}
                className="w-full flex justify-center"
              >
                <Image
                  src="/creative/caribbean/map-caribbean.svg"
                  alt="Map of Caribbean islands"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  priority
                />
              </motion.div>
            </section>

            {/* Section 3 — GDP per Capita */}
            <section
              ref={(el) => { sectionRefs.current["gdp"] = el; }}
              id="gdp"
              className="mb-24 pt-8 border-t border-black/10"
            >
              <motion.h2
                {...fadeUp}
                className="font-serif text-2xl md:text-4xl font-normal mb-10"
              >
                {isFR
                  ? "Graphique comparant le PIB par habitant (USD)"
                  : "Graph Comparing the GDP per Capita (USD)"}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className="w-full"
              >
                <Image
                  src="/creative/caribbean/graph-gdp.svg"
                  alt="GDP per Capita comparison graph"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </motion.div>
            </section>

            {/* Section 4 — Inflation Rate */}
            <section
              ref={(el) => { sectionRefs.current["inflation"] = el; }}
              id="inflation"
              className="mb-24 pt-8 border-t border-black/10"
            >
              <motion.h2
                {...fadeUp}
                className="font-serif text-2xl md:text-4xl font-normal mb-10"
              >
                {isFR
                  ? "Graphique comparant le taux d\u2019inflation"
                  : "Graph Comparing the Inflation Rate"}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className="w-full"
              >
                <Image
                  src="/creative/caribbean/graph-inflation.svg"
                  alt="Inflation Rate comparison graph"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </motion.div>
            </section>

            {/* Section 5 — Public Debt */}
            <section
              ref={(el) => { sectionRefs.current["public-debt"] = el; }}
              id="public-debt"
              className="mb-24 pt-8 border-t border-black/10"
            >
              <motion.h2
                {...fadeUp}
                className="font-serif text-2xl md:text-4xl font-normal mb-10"
              >
                {isFR
                  ? "Graphique comparant la dette publique (% du PIB)"
                  : "Graph Comparing the Public Debt (% of GDP)"}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7 }}
                className="w-full"
              >
                <Image
                  src="/creative/caribbean/graph-public-debt.svg"
                  alt="Public Debt comparison graph"
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                />
              </motion.div>
            </section>

            {/* Bottom back link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="pt-8 border-t border-black/10"
            >
              <button
                onClick={() => router.push("/home#projects")}
                className="font-sans text-label tracking-widest uppercase text-black/30 hover:text-red transition-colors duration-300 flex items-center gap-2"
              >
                &larr; {isFR ? "Tous les projets" : "All projects"}
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
