"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Locale } from "@/lib/translations";
import { getLocale } from "@/lib/store";
import { getProjectBySlug, CreativeProject } from "@/data/creative-projects";
import Navigation from "@/components/Navigation";

export default function CreativeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);
  const [project, setProject] = useState<CreativeProject | null>(null);

  useEffect(() => {
    setMounted(true);
    setLocale(getLocale());
    const slug = params.slug as string;
    const found = getProjectBySlug(slug);
    if (!found) {
      router.replace("/home#creative");
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

      {/* Hero image — full width, page bg shows through transparency */}
      {heroSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full relative overflow-hidden pt-20 flex justify-center"
        >
          {/* ⬇️ Change max-h-[600px] to control the hero image height manually */}
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

      {/* Content */}
      <div className={`pl-16 md:pl-28 lg:pl-40 pr-8 py-16 md:py-24 ${!heroSrc ? "pt-28 md:pt-36" : ""}`}>
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onClick={() => router.push("/home#creative")}
          className="font-sans text-label tracking-widest uppercase text-black/30 hover:text-red transition-colors duration-300 mb-16 flex items-center gap-2"
        >
          &larr; {isFR ? "Retour" : "Back"}
        </motion.button>

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          {/* Date — large serif */}
          {date && (
            <span className="font-serif text-lg md:text-xl text-black/30 block mb-4">
              {date}
            </span>
          )}

          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal leading-heading max-w-3xl mb-6">
            {title}
          </h1>

          {/* Category */}
          <span className="font-sans text-label tracking-widest uppercase text-red/60 block mb-5">
            {project.category}
          </span>

          {/* Tags */}
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

          {/* Website link */}
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

        {/* Description — supports multiline via \n */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-2xl mb-20"
        >
          {description.split("\n\n").map((paragraph, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              className="font-sans text-base md:text-lg leading-reading text-black/60 mb-6 last:mb-0"
            >
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        {/* Image gallery — only if images exist */}
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
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative aspect-[4/3] bg-black/[0.03] overflow-hidden ${spans}`}
                >
                  <Image
                    src={src}
                    alt={`${title} — ${i + 1}`}
                    fill
                    className="object-contain"
                  />
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Before / After — only if defined */}
        {project.beforeAfter && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mb-24"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Before */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4 }}
              >
                <span className="font-sans text-micro tracking-super uppercase text-black/30 block mb-4">
                  {project.beforeAfter.labelBefore || "Before"}
                </span>
                <div className="flex items-center justify-center p-8">
                  <Image
                    src={project.beforeAfter.before}
                    alt={`${title} — Before`}
                    width={1314}
                    height={1310}
                    className="w-full h-auto max-h-[400px] object-contain"
                  />
                </div>
              </motion.div>

              {/* After */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <span className="font-sans text-micro tracking-super uppercase text-black/30 block mb-4">
                  {project.beforeAfter.labelAfter || "After"}
                </span>
                <div className="flex items-center justify-center p-8">
                  <Image
                    src={project.beforeAfter.after}
                    alt={`${title} — After`}
                    width={937}
                    height={937}
                    className="w-full h-auto max-h-[400px] object-contain"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Detail text — between before/after and logo variations */}
        {project.detailText && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mb-24"
          >
            {(isFR ? (project.detailTextFR || project.detailText) : project.detailText)
              .split("\n\n")
              .map((paragraph: string, i: number) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="font-sans text-base md:text-lg leading-reading text-black/60 mb-6 last:mb-0"
                >
                  {paragraph}
                </motion.p>
              ))}
          </motion.div>
        )}

        {/* Logo Variations — only if defined */}
        {project.logoVariations && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mb-24"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-normal mb-12">
              {isFR ? project.logoVariations.titleFR : project.logoVariations.titleEN}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {project.logoVariations.items.map((variation, i) => (
                <motion.div
                  key={variation.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <div className="flex items-center justify-center p-8 aspect-square">
                    <Image
                      src={variation.src}
                      alt={variation.label}
                      width={937}
                      height={937}
                      className="w-full h-auto max-h-[280px] object-contain"
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

        {/* PDF Embed — only if defined */}
        {project.pdfEmbed && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mb-24"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-normal mb-12">
              {isFR ? project.pdfEmbed.titleFR : project.pdfEmbed.titleEN}
            </h2>

            <div className="border border-black/10 overflow-hidden">
              <iframe
                src={`${project.pdfEmbed.src}#toolbar=0&navpanes=0&scrollbar=1`}
                className="w-full"
                style={{ height: 600 }}
                title={isFR ? project.pdfEmbed.titleFR : project.pdfEmbed.titleEN}
              />
            </div>
          </motion.div>
        )}

        {/* Bottom back link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-20 pt-8 border-t border-black/10"
        >
          <button
            onClick={() => router.push("/home#creative")}
            className="font-sans text-label tracking-widest uppercase text-black/30 hover:text-red transition-colors duration-300 flex items-center gap-2"
          >
            &larr; {isFR ? "Tous les projets" : "All projects"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
