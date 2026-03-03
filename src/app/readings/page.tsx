"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useIsMobile, mDur, mInitial, mStagger, mViewport } from "@/hooks/useMobileMotion";
import { Locale } from "@/lib/translations";
import { getLocale } from "@/lib/store";
import Navigation from "@/components/Navigation";
import books from "@/data/books.json";

interface Book {
  isbn: string;
  title: string;
  author: string;
}

function BookCard({ book, index, mob }: { book: Book; index: number; mob: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={mInitial({ opacity: 0, y: 24 }, mob)}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={mViewport}
      transition={{ duration: mDur(0.5, mob), delay: mStagger(index, 0.06, 0, mob) }}
      className="aspect-[2/3]"
      style={{ perspective: "800px" }}
    >
      <div
        onClick={() => setFlipped((f) => !f)}
        className={`relative w-full h-full cursor-pointer transition-transform duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          mob ? "" : "md:hover:[transform:rotateY(180deg)]"
        }`}
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front face */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          {imgError ? (
            <div className="w-full h-full bg-black flex flex-col items-center justify-center p-4 text-center">
              <span className="font-serif text-sm md:text-base text-cream leading-tight mb-2">
                {book.title}
              </span>
              <span className="font-sans text-micro tracking-widest uppercase text-cream/50">
                {book.author}
              </span>
            </div>
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={`https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
              alt={`${book.title} by ${book.author}`}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Back face */}
        <div
          className="absolute inset-0 bg-cream border border-black/10 flex flex-col items-center justify-center p-4 text-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <span className="font-serif text-sm md:text-lg leading-tight mb-3">
            {book.title}
          </span>
          <span className="font-sans text-micro md:text-caption tracking-widest uppercase text-black/40">
            {book.author}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function ReadingsPage() {
  const router = useRouter();
  const [locale, setLocale] = useState<Locale>("en");
  const [mounted, setMounted] = useState(false);
  const mob = useIsMobile();

  useEffect(() => {
    setMounted(true);
    setLocale(getLocale());
  }, []);

  if (!mounted) return null;

  const isFR = locale === "fr";

  return (
    <div className="min-h-screen bg-cream">
      <Navigation locale={locale} onLocaleChange={setLocale} />

      <div className="pt-28 md:pt-36 px-6 md:pl-28 md:pr-8 lg:pl-40 pb-24">
        {/* Back button */}
        <motion.button
          initial={mInitial({ opacity: 0, x: -12 }, mob)}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: mDur(0.4, mob), delay: 0.2 }}
          onClick={() => router.push("/home")}
          className="font-sans text-label tracking-widest uppercase text-black/30 hover:text-red transition-colors duration-300 mb-16 flex items-center gap-2"
        >
          &larr; {isFR ? "Retour" : "Back"}
        </motion.button>

        {/* Title */}
        <motion.div
          initial={mInitial({ opacity: 0, y: 24 }, mob)}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: mDur(0.6, mob), delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal leading-heading mb-4">
            {isFR ? "Lectures" : "Readings"}
          </h1>
          <p className="font-sans text-base md:text-lg text-black/40">
            {isFR ? "Livres que j\u2019ai lus ou que je poss\u00E8de." : "Books I\u2019ve read or own."}
          </p>
        </motion.div>

        {/* Book grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 max-w-6xl">
          {(books as Book[]).map((book, i) => (
            <BookCard key={book.isbn} book={book} index={i} mob={mob} />
          ))}
        </div>
      </div>
    </div>
  );
}
