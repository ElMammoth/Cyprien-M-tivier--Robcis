"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Locale, VisitorType } from "@/lib/translations";
import { t } from "@/lib/translations";
import { getVisitorType, getLocale } from "@/lib/store";
import Navigation from "@/components/Navigation";
import CvModal from "@/components/CvModal";
import { creativeProjects } from "@/data/creative-projects";
import photos from "@/data/photos.json";
import FilmStrip from "@/components/FilmStrip";
import ContactForm from "@/components/ContactForm";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("en");
  const [visitorType, setVisitorType] = useState<VisitorType>("visitor");
  const [mounted, setMounted] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);

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

    // Scroll to hash section after page mount (e.g. navigating from /creative/slug → /home#projects)
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [router]);

  if (!mounted) return null;

  const strings = t(locale);
  const hero = strings.hero[visitorType];

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
            className="block font-sans text-label tracking-extreme uppercase text-black/30 mb-6"
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
            className="font-serif text-5xl md:text-7xl lg:text-hero font-normal leading-heading max-w-3xl mb-8"
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
            <span className="font-sans text-label tracking-widest text-black/30 tabular-nums">
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
              className="font-sans text-base md:text-lg leading-prose text-black/70"
            >
              {aboutData.bio}
            </motion.p>

            {"extra" in aboutData && (
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-6 font-sans text-base md:text-lg leading-prose text-red/80"
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

      {/* Background — timeline, CV, seeking */}
      <section
        id="background"
        className="border-t border-black/10 pl-16 md:pl-28 lg:pl-40 pr-8 py-24 relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-baseline gap-6 mb-16">
            <span className="font-sans text-label tracking-widest text-black/30 tabular-nums">
              03
            </span>
            <h2 className="font-serif text-4xl md:text-5xl">
              {strings.sections.background.title}
            </h2>
          </div>
        </motion.div>

        {/* Experience timeline */}
        <div className="max-w-3xl">
          {strings.sections.background.experience.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative pl-8 md:pl-12 pb-12 last:pb-0 group"
            >
              {/* Vertical line */}
              <div className="absolute left-0 top-2 bottom-0 w-px bg-black/10" />

              {/* Dot marker */}
              <div className="absolute left-0 top-[7px] w-[7px] h-[7px] -translate-x-[3px] bg-black/20 group-hover:bg-red transition-colors duration-300" />

              {/* Year — bold, offset */}
              <div className="flex flex-col md:flex-row md:items-baseline md:gap-6 mb-3">
                <span className="font-serif text-2xl md:text-3xl font-normal leading-none">
                  {exp.year}
                </span>
                <span className="font-sans text-label tracking-widest uppercase text-black/30 mt-1 md:mt-0">
                  {exp.location}
                </span>
              </div>

              {/* Company & role */}
              <p className="font-sans text-sm font-medium text-black/80 mb-1">
                {exp.company}
              </p>
              <p className="font-sans text-caption text-black/50 italic mb-2">
                {exp.role}
              </p>
              <p className="font-sans text-sm text-black/40 leading-relaxed max-w-xl">
                {exp.description}
              </p>
            </motion.div>
          ))}

          {/* Continuation hint — implies earlier history */}
          <div className="relative pl-8 pt-4 pb-2">
            <div className="absolute left-0 top-0 w-px h-4 bg-black/10" />
            <div className="absolute left-0 top-4 flex flex-col gap-[5px] -translate-x-[1.5px]">
              <span className="block w-[4px] h-[4px] rounded-full bg-black/15" />
              <span className="block w-[4px] h-[4px] rounded-full bg-black/10" />
              <span className="block w-[4px] h-[4px] rounded-full bg-black/[0.06]" />
            </div>
          </div>
        </div>

        {/* CV buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-4 mt-16 max-w-3xl"
        >
          <button
            onClick={() => setCvModalOpen(true)}
            className="group relative font-sans text-label tracking-widest uppercase px-6 py-4 border border-black/20 hover:border-black transition-colors duration-300 overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-cream transition-colors duration-300">
              {strings.sections.background.cvPreview}
            </span>
            <span className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          </button>

          <a
            href={strings.sections.background.cvFile}
            download
            className="group relative font-sans text-label tracking-widest uppercase px-6 py-4 border border-red/30 hover:border-red transition-colors duration-300 overflow-hidden"
          >
            <span className="relative z-10 text-red/70 group-hover:text-cream transition-colors duration-300 flex items-center gap-2">
              <svg
                width="12"
                height="12"
                viewBox="0 0 14 14"
                fill="none"
                className="inline-block"
              >
                <path
                  d="M7 1v9m0 0L3.5 6.5M7 10l3.5-3.5M1 13h12"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {strings.sections.background.cvDownload}
            </span>
            <span className="absolute inset-0 bg-red scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          </a>
        </motion.div>

        {/* Currently seeking */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 max-w-2xl border-l-2 border-red pl-6"
        >
          <span className="font-sans text-label tracking-ultra uppercase text-red/60 block mb-3">
            {strings.sections.background.seekingLabel}
          </span>
          <p className="font-sans text-base leading-body text-black/60">
            {strings.sections.background.seeking}
          </p>
          <motion.a
            href="https://www.linkedin.com/in/m%C3%A9tivier--robcis-cyprien/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 font-sans text-label tracking-widest uppercase text-black/40 hover:text-red transition-colors duration-300 group"
            whileHover="hover"
          >
            {strings.sections.background.linkedin}
            <motion.span
              className="inline-block"
              variants={{ hover: { x: 4 } }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              &rarr;
            </motion.span>
          </motion.a>
        </motion.div>
      </section>

      <CvModal
        isOpen={cvModalOpen}
        onClose={() => setCvModalOpen(false)}
        pdfUrl={strings.sections.background.cvFile}
        downloadLabel={strings.sections.background.cvDownload}
      />

      {/* Projects — project grid */}
      <section
        id="projects"
        className="border-t border-black/10 pl-16 md:pl-28 lg:pl-40 pr-8 py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-baseline gap-6 mb-16">
            <span className="font-sans text-label tracking-widest text-black/30 tabular-nums">
              04
            </span>
            <h2 className="font-serif text-4xl md:text-5xl">
              {strings.sections.projects.title}
            </h2>
          </div>
        </motion.div>

        {/* Typography-driven project list */}
        <div className="max-w-5xl">
          {[...creativeProjects].sort((a, b) => (b.sortDate ?? 0) - (a.sortDate ?? 0)).map((project, i) => {
            const isFR = locale === "fr";
            const title = isFR ? project.titleFR : project.title;
            const year = project.date
              ? project.date.split(" ").pop()
              : "";

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Link
                  href={`/creative/${project.slug}`}
                  className="group block border-b border-black/10 py-8 md:py-10"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-0">
                    {/* Number */}
                    <span className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-none text-black/[0.07] group-hover:text-red/20 transition-colors duration-500 md:w-32 lg:w-40 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Title + meta */}
                    <div className="flex-1 md:pl-4">
                      <h3 className="font-serif text-2xl md:text-4xl lg:text-5xl leading-title group-hover:text-red transition-colors duration-300">
                        {title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3">
                        <span className="font-sans text-micro tracking-widest uppercase text-black/40 group-hover:text-red/60 transition-colors duration-300">
                          {project.category}
                        </span>
                        {year && (
                          <span className="font-sans text-label tracking-widest text-black/25">
                            {year}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Arrow — right aligned on desktop */}
                    <motion.span
                      className="hidden md:flex items-center font-sans text-sm text-black/15 group-hover:text-red transition-colors duration-300 shrink-0 ml-8"
                      variants={{ hover: { x: 6 } }}
                      initial="rest"
                      whileHover="hover"
                    >
                      &rarr;
                    </motion.span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Photography — film strip */}
      <section
        id="photography"
        className="border-t border-black/10 py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="pl-16 md:pl-28 lg:pl-40 pr-8 mb-12"
        >
          <div className="flex items-baseline gap-6 mb-4">
            <span className="font-sans text-label tracking-widest text-black/30 tabular-nums">
              05
            </span>
            <h2 className="font-serif text-4xl md:text-5xl">
              {strings.sections.photography.title}
            </h2>
          </div>
          <p className="font-sans text-caption tracking-wider text-black/30 ml-[calc(1.5rem+theme(spacing.6))]">
            Fujifilm X-T5 &middot; 16-80mm
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <FilmStrip photos={photos} />
        </motion.div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="border-t border-black/10 pl-16 md:pl-28 lg:pl-40 pr-8 py-24"
      >
        {/* Section number + animated title */}
        <div className="mb-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.4 }}
            className="block font-sans text-label tracking-widest text-black/30 tabular-nums mb-6"
          >
            06
          </motion.span>

          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal leading-heading overflow-hidden">
            {(locale === "fr" ? "Parlons ensemble." : "Let\u2019s talk.")
              .split(" ")
              .map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 + i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
          </h2>
        </div>

        {/* Availability line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="font-sans text-caption tracking-wider text-black/30 mb-16 max-w-lg"
        >
          {locale === "fr"
            ? "Disponible pour un stage de 4 mois — Paris \u00B7 Z\u00FCrich \u00B7 Montr\u00E9al"
            : "Currently seeking a 4-month internship — Paris \u00B7 Z\u00FCrich \u00B7 Montr\u00E9al"}
        </motion.p>

        {/* Form */}
        <ContactForm locale={locale} />

        {/* Info block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 pt-12 border-t border-black/10 max-w-[680px]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <span className="font-sans text-micro tracking-ultra uppercase text-black/30 block mb-3">
                {locale === "fr" ? "Localisation" : "Location"}
              </span>
              <p className="font-sans text-sm text-black/60">
                Paris, near Parc Monceau
              </p>
            </div>

            <div>
              <span className="font-sans text-micro tracking-ultra uppercase text-black/30 block mb-3">
                {locale === "fr" ? "Liens" : "Links"}
              </span>
              <div className="flex flex-col gap-2">
                <motion.a
                  href="mailto:metiviercyprien@yahoo.fr"
                  className="inline-flex items-center gap-1.5 font-sans text-sm text-black/50 hover:text-red transition-colors duration-300"
                  whileHover="hover"
                >
                  metiviercyprien@yahoo.fr
                  <motion.span
                    className="inline-block text-[10px]"
                    variants={{ hover: { x: 2, y: -2 } }}
                    transition={{ duration: 0.2 }}
                  >
                    ↗
                  </motion.span>
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/métivier--robcis-cyprien/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-sm text-black/50 hover:text-red transition-colors duration-300"
                  whileHover="hover"
                >
                  LinkedIn
                  <motion.span
                    className="inline-block text-[10px]"
                    variants={{ hover: { x: 2, y: -2 } }}
                    transition={{ duration: 0.2 }}
                  >
                    ↗
                  </motion.span>
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/cypwithacamera/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-sans text-sm text-black/50 hover:text-red transition-colors duration-300"
                  whileHover="hover"
                >
                  Instagram
                  <motion.span
                    className="inline-block text-[10px]"
                    variants={{ hover: { x: 2, y: -2 } }}
                    transition={{ duration: 0.2 }}
                  >
                    ↗
                  </motion.span>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 pl-16 md:pl-28 lg:pl-40 pr-8 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <span className="font-sans text-label tracking-widest text-black/30 uppercase">
            Cyprien Métivier-Robcis &copy; 2025
          </span>
          <button
            onClick={() => {
              localStorage.removeItem("portfolio-visitor-type");
              router.push("/");
            }}
            className="font-sans text-label tracking-widest text-black/30 uppercase hover:text-red transition-colors duration-300 text-left md:text-right"
          >
            {locale === "en" ? "Change identity" : "Changer d\u2019identité"}
          </button>
        </div>
      </footer>
    </div>
  );
}
