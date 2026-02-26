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

  return (
    <div className="min-h-screen bg-cream">
      <Navigation locale={locale} onLocaleChange={setLocale} />

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full h-[50vh] md:h-[65vh] relative bg-black/[0.03] overflow-hidden"
      >
        <Image
          src={project.thumbnail}
          alt={title}
          fill
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Content */}
      <div className="pl-16 md:pl-28 lg:pl-40 pr-8 py-16 md:py-24">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onClick={() => router.push("/home#creative")}
          className="font-sans text-[11px] tracking-widest uppercase text-black/30 hover:text-red transition-colors duration-300 mb-12 flex items-center gap-2"
        >
          &larr; {isFR ? "Retour" : "Back"}
        </motion.button>

        {/* Title + category */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12"
        >
          <span className="font-sans text-[11px] tracking-widest uppercase text-red/60 block mb-4">
            {project.category}
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-normal leading-[0.95] max-w-3xl">
            {title}
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="font-sans text-base md:text-lg leading-[1.8] text-black/60 max-w-2xl mb-20"
        >
          {description}
        </motion.p>

        {/* Image gallery — asymmetric grid */}
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
            className="font-sans text-[11px] tracking-widest uppercase text-black/30 hover:text-red transition-colors duration-300 flex items-center gap-2"
          >
            &larr; {isFR ? "Tous les projets" : "All projects"}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
