"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useIsMobile, mDur, mInitial, mStagger, mViewport } from "@/hooks/useMobileMotion";
import { Locale } from "@/lib/translations";
import { getLocale } from "@/lib/store";
import { getProjectBySlug, CreativeProject } from "@/data/creative-projects";
import Navigation from "@/components/Navigation";

export default function CreativeDetailClient() {
  const params = useParams();
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);
  const [project, setProject] = useState<CreativeProject | null>(null);
  const mob = useIsMobile();

  useEffect(() => {
    setMounted(true);
    setLocale(getLocale());
    const slug = params.slug as string;
    const found = getProjectBySlug(slug);
    if (!found) {
      router.replace("/home#projects");
      return;
    }
    setProject(found);
  }, [params.slug, router]);

  if (!mounted || !project) return null;

  const isFR = locale === "fr";
  const title = isFR ? project.titleFR : project.title;
  const description = isFR ? project.descriptionFR : project.description;
  const date = isFR ? (project.dateFR || project.date) : project.date;
  const heroSrc = project.heroImage;

  return (
    <div className="min-h-screen bg-cream">
      <Navigation locale={locale} onLocaleChange={setLocale} />

      {heroSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: mDur(0.6, mob) }}
          className="w-full relative overflow-hidden pt-20 flex justify-center"
        >
          <div className="w-full max-h-[600px] flex items-center justify-center">
            <Image
              src={heroSrc}
              alt={title}
              width={2400}
              height={1350}
              className="w-full h-auto max-h-[600px] object-contain"
              priority
            />
          </div>
        </motion.div>
      )}

      <div className={`px-6 md:pl-28 md:pr-8 lg:pl-40 py-16 md:py-24 ${!heroSrc ? "pt-28 md:pt-36" : ""}`}>
        <motion.button
          initial={mInitial({ opacity: 0, x: -12 }, mob)}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: mDur(0.4, mob), delay: 0.2 }}
          onClick={() => router.push("/home#projects")}
          className="font-sans text-label tracking-widest uppercase text-black/30 hover:text-red transition-colors duration-300 mb-16 flex items-center gap-2"
        >
          &larr; {isFR ? "Retour" : "Back"}
        </motion.button>

        <motion.div
          initial={mInitial({ opacity: 0, y: 24 }, mob)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: mDur(0.6, mob), delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          {date && (
            <span className="font-serif text-lg md:text-xl text-black/30 block mb-4">
              {date}
            </span>
          )}

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal leading-heading max-w-3xl mb-6">
            {title}
          </h1>

          <span className="font-sans text-label tracking-widest uppercase text-red/60 block mb-5">
            {project.category}
          </span>

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-sans text-micro tracking-widest uppercase border border-black/10 px-3 py-1.5 text-black/40"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {project.websiteUrl && (
            <motion.a
              href={project.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-5 font-sans text-label tracking-widest uppercase text-black/40 hover:text-red transition-colors duration-300 group"
              whileHover="hover"
            >
              {project.websiteUrl.replace(/^https?:\/\//, "")}
              <motion.span
                className="inline-block"
                variants={{ hover: { x: 4 } }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                &rarr;
              </motion.span>
            </motion.a>
          )}
        </motion.div>

        <motion.div
          initial={mInitial({ opacity: 0, y: 16 }, mob)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: mDur(0.5, mob), delay: 0.5 }}
          className="max-w-2xl mb-20"
        >
          {description.split("\n\n").map((paragraph, i) => (
            <motion.p
              key={i}
              initial={mInitial({ opacity: 0, y: 12 }, mob)}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: mDur(0.4, mob), delay: mStagger(i, 0.1, 0.5, mob) }}
              className="font-sans text-base md:text-lg leading-reading text-black/60 mb-6 last:mb-0"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        {project.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 max-w-5xl">
            {project.images.map((src, i) => {
              const spans =
                i === 0
                  ? "md:col-span-8"
                  : i === 1
                  ? "md:col-span-4"
                  : "md:col-span-6 md:col-start-4";

              return (
                <motion.div
                  key={src}
                  initial={mInitial({ opacity: 0, y: 20 }, mob)}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={mViewport}
                  transition={{ duration: mDur(0.5, mob), delay: mStagger(i, 0.1, 0, mob) }}
                  className={`relative aspect-[4/3] bg-black/[0.03] overflow-hidden ${spans}`}
                >
                  <Image
                    src={src}
                    alt={`${title} — ${i + 1}`}
                    fill
                    className="object-contain"
                    loading="lazy"
                  />
                </motion.div>
              );
            })}
          </div>
        )}

        {project.beforeAfter && (
          <motion.div
            initial={mInitial({ opacity: 0, y: 24 }, mob)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={mViewport}
            transition={{ duration: mDur(0.6, mob) }}
            className="max-w-5xl mb-24"
          >
            <div className="grid grid-cols-2 gap-4 md:gap-12">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={mViewport}
                transition={{ duration: mDur(0.4, mob) }}
              >
                <span className="font-sans text-micro tracking-super uppercase text-black/30 block mb-4">
                  {project.beforeAfter.labelBefore || "Before"}
                </span>
                <div className="flex items-center justify-center p-2 md:p-8">
                  <Image
                    src={project.beforeAfter.before}
                    alt={`${title} — Before`}
                    width={1314}
                    height={1310}
                    className="w-full h-auto max-h-[400px] object-contain"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={mViewport}
                transition={{ duration: mDur(0.4, mob), delay: 0.1 }}
              >
                <span className="font-sans text-micro tracking-super uppercase text-black/30 block mb-4">
                  {project.beforeAfter.labelAfter || "After"}
                </span>
                <div className="flex items-center justify-center p-2 md:p-8">
                  <Image
                    src={project.beforeAfter.after}
                    alt={`${title} — After`}
                    width={937}
                    height={937}
                    className="w-full h-auto max-h-[400px] object-contain"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {project.detailText && (
          <motion.div
            initial={mInitial({ opacity: 0, y: 16 }, mob)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={mViewport}
            transition={{ duration: mDur(0.5, mob) }}
            className="max-w-2xl mb-24"
          >
            {(isFR ? (project.detailTextFR || project.detailText) : project.detailText)
              .split("\n\n")
              .map((paragraph: string, i: number) => (
                <motion.p
                  key={i}
                  initial={mInitial({ opacity: 0, y: 12 }, mob)}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={mViewport}
                  transition={{ duration: mDur(0.4, mob), delay: mStagger(i, 0.1, 0, mob) }}
                  className="font-sans text-base md:text-lg leading-reading text-black/60 mb-6 last:mb-0"
                >
                  {paragraph}
                </motion.p>
              ))}
          </motion.div>
        )}

        {project.logoVariations && (
          <motion.div
            initial={mInitial({ opacity: 0, y: 24 }, mob)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={mViewport}
            transition={{ duration: mDur(0.6, mob) }}
            className="max-w-5xl mb-24"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-normal mb-12">
              {isFR ? project.logoVariations.titleFR : project.logoVariations.titleEN}
            </h2>

            <div className="grid grid-cols-3 gap-3 md:gap-8">
              {project.logoVariations.items.map((variation, i) => (
                <motion.div
                  key={variation.label}
                  initial={mInitial({ opacity: 0, y: 16 }, mob)}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={mViewport}
                  transition={{ duration: mDur(0.4, mob), delay: mStagger(i, 0.1, 0, mob) }}
                >
                  <div className="flex items-center justify-center p-2 md:p-8 aspect-square">
                    <Image
                      src={variation.src}
                      alt={variation.label}
                      width={937}
                      height={937}
                      className="w-full h-auto max-h-[120px] md:max-h-[280px] object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-sans text-micro tracking-ultra uppercase text-black/40 block mt-4 text-center">
                    {isFR ? (variation.labelFR || variation.label) : variation.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {project.pdfEmbed && (
          <motion.div
            initial={mInitial({ opacity: 0, y: 24 }, mob)}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={mViewport}
            transition={{ duration: mDur(0.6, mob) }}
            className="max-w-5xl mb-24"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-normal mb-12">
              {isFR ? project.pdfEmbed.titleFR : project.pdfEmbed.titleEN}
            </h2>

            <div className="border border-black/10 overflow-hidden">
              <iframe
                src={`${project.pdfEmbed.src}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                className="w-full h-[350px] md:h-[600px]"
                title={isFR ? project.pdfEmbed.titleFR : project.pdfEmbed.titleEN}
              />
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={mViewport}
          transition={{ duration: mDur(0.4, mob) }}
          className="mt-20 pt-8 border-t border-black/10"
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
  );
}
