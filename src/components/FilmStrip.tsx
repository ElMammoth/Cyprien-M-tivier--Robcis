"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Photo {
  filename: string;
  src: string;
  width: number;
  height: number;
  focalLength: string | null;
  aperture: string | null;
  shutterSpeed: string | null;
  iso: string | null;
  blurDataURL?: string;
}

interface FilmStripProps {
  photos: Photo[];
}

function formatMeta(photo: Photo, index: number) {
  const parts = [
    photo.focalLength || "—",
    photo.aperture || "—",
    photo.shutterSpeed || "—",
    photo.iso || "—",
  ];
  return `[${String(index + 1).padStart(2, "0")}] ${parts.join(" · ")}`;
}

export default function FilmStrip({ photos }: FilmStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    const el = scrollRef.current;
    if (!el) return;
    setIsMouseDown(true);
    setHasDragged(false);
    setStartX(e.pageX - el.offsetLeft);
    setScrollLeft(el.scrollLeft);
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isMouseDown) return;
      e.preventDefault();
      const el = scrollRef.current;
      if (!el) return;
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5;
      if (Math.abs(x - startX) > 5) setHasDragged(true);
      el.scrollLeft = scrollLeft - walk;
    },
    [isMouseDown, startX, scrollLeft]
  );

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
  }, []);

  // Lightbox keyboard
  useEffect(() => {
    if (lightboxIndex === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight" && lightboxIndex !== null) {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % photos.length : null
        );
      }
      if (e.key === "ArrowLeft" && lightboxIndex !== null) {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + photos.length) % photos.length : null
        );
      }
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightboxIndex, photos.length]);

  // Wheel scroll hijacking — vertical wheel → horizontal scroll on desktop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    function handleWheel(e: WheelEvent) {
      // Only hijack if there's meaningful vertical delta and the strip is scrollable
      if (Math.abs(e.deltaY) < 5) return;
      const maxScroll = el!.scrollWidth - el!.clientWidth;
      if (maxScroll <= 0) return;

      // Don't hijack if already at the edge and scrolling further in that direction
      const atStart = el!.scrollLeft <= 0 && e.deltaY < 0;
      const atEnd = el!.scrollLeft >= maxScroll - 1 && e.deltaY > 0;
      if (atStart || atEnd) return;

      e.preventDefault();
      el!.scrollLeft += e.deltaY;
    }
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  if (photos.length === 0) return null;

  return (
    <>
      {/* Film strip container — CSS var drives responsive photo height */}
      <div
        className="bg-black w-full overflow-hidden [--strip-h:220px] md:[--strip-h:320px]"
      >
        {/* Top film border */}
        <div className="h-4 md:h-6 bg-black relative">
          <div className="absolute bottom-0 left-0 right-0 flex gap-[2px] px-4">
            {Array.from({ length: 80 }).map((_, i) => (
              <div
                key={i}
                className="w-[6px] h-[3px] bg-white/[0.06] shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Scrollable strip */}
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex gap-4 md:gap-6 px-4 md:px-8 overflow-x-auto py-3 md:py-4 scrollbar-hide ${
            isMouseDown ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {photos.map((photo, i) => {
            // Calculate width based on aspect ratio at fixed height
            const aspectRatio = photo.width / photo.height || 1.5;

            return (
              <div key={photo.filename} className="shrink-0 select-none">
                <button
                  onClick={() => {
                    if (!hasDragged) setLightboxIndex(i);
                  }}
                  className="block focus:outline-none"
                  draggable={false}
                >
                  <div
                    className="relative bg-white/[0.03] overflow-hidden"
                    style={{
                      height: `var(--strip-h)`,
                      width: `calc(var(--strip-h) * ${aspectRatio})`,
                    }}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.filename}
                      fill
                      className="object-cover pointer-events-none"
                      sizes={`${Math.round(320 * aspectRatio)}px`}
                      draggable={false}
                      placeholder={photo.blurDataURL ? "blur" : "empty"}
                      blurDataURL={photo.blurDataURL}
                    />
                  </div>
                </button>

                {/* EXIF metadata */}
                <p
                  className="mt-2 font-sans text-[10px] md:text-[11px] tracking-wider text-[#888888] whitespace-nowrap"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {formatMeta(photo, i)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom film border */}
        <div className="h-4 md:h-6 bg-black relative">
          <div className="absolute top-0 left-0 right-0 flex gap-[2px] px-4">
            {Array.from({ length: 80 }).map((_, i) => (
              <div
                key={i}
                className="w-[6px] h-[3px] bg-white/[0.06] shrink-0"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && photos[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/95" />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center max-w-[92vw] max-h-[88vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setLightboxIndex(null)}
                className="absolute -top-10 right-0 font-sans text-sm text-white/40 hover:text-white transition-colors duration-200 w-8 h-8 flex items-center justify-center z-10"
              >
                &#x2715;
              </button>

              {/* Photo */}
              <div className="relative">
                <Image
                  src={photos[lightboxIndex].src}
                  alt={photos[lightboxIndex].filename}
                  width={photos[lightboxIndex].width}
                  height={photos[lightboxIndex].height}
                  className="max-w-[90vw] max-h-[80vh] w-auto h-auto object-contain"
                  priority
                  placeholder={photos[lightboxIndex].blurDataURL ? "blur" : "empty"}
                  blurDataURL={photos[lightboxIndex].blurDataURL}
                />
              </div>

              {/* Metadata */}
              <p
                className="mt-4 font-sans text-[11px] md:text-[12px] tracking-wider text-[#888888] whitespace-nowrap"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {formatMeta(photos[lightboxIndex], lightboxIndex)}
              </p>
            </motion.div>

            {/* Nav arrows */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      (prev) =>
                        prev !== null
                          ? (prev - 1 + photos.length) % photos.length
                          : null
                    );
                  }}
                  className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors duration-200 text-2xl md:text-3xl z-10"
                >
                  &larr;
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex(
                      (prev) =>
                        prev !== null
                          ? (prev + 1) % photos.length
                          : null
                    );
                  }}
                  className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors duration-200 text-2xl md:text-3xl z-10"
                >
                  &rarr;
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
