"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/useMobileMotion";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  downloadLabel: string;
}

const PDF_NATIVE_W = 794; // A4 at 96 dpi

export default function CvModal({ isOpen, onClose, pdfUrl, downloadLabel }: CvModalProps) {
  const mob = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const measure = useCallback(() => {
    if (!mob || !containerRef.current) { setScale(1); return; }
    const w = containerRef.current.clientWidth;
    setScale(Math.min(w / PDF_NATIVE_W, 1));
  }, [mob]);

  useEffect(() => {
    if (!isOpen) return;
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [isOpen, measure]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKey);
      return () => window.removeEventListener("keydown", handleKey);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/90" />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[94vw] h-[92vh] max-w-6xl flex flex-col max-h-[100dvh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between mb-4">
              <a
                href={pdfUrl}
                download
                className="font-sans text-label tracking-widest uppercase text-cream/50 hover:text-cream transition-colors duration-200 flex items-center gap-2"
              >
                <svg
                  width="14"
                  height="14"
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
                {downloadLabel}
              </a>

              <button
                onClick={onClose}
                className="font-sans text-sm text-cream/50 hover:text-cream transition-colors duration-200 w-8 h-8 flex items-center justify-center"
              >
                &#x2715;
              </button>
            </div>

            {/* PDF viewer */}
            {mob ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-6 bg-white/5 border border-white/10 px-6">
                <a
                  href="/cv/Resume_Cyprien_EN_26.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-label tracking-widest uppercase text-cream/50 hover:text-cream transition-colors duration-200 flex items-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="inline-block">
                    <path d="M7 1v9m0 0L3.5 6.5M7 10l3.5-3.5M1 13h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Open CV in English ↗
                </a>
                <a
                  href="/cv/Resume_Cyprien_FR_26.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-label tracking-widest uppercase text-cream/50 hover:text-cream transition-colors duration-200 flex items-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="inline-block">
                    <path d="M7 1v9m0 0L3.5 6.5M7 10l3.5-3.5M1 13h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Open CV in French ↗
                </a>
              </div>
            ) : (
              <div ref={containerRef} className="flex-1 bg-white/5 border border-white/10 overflow-hidden relative">
                <iframe
                  src={`${pdfUrl}#view=FitH`}
                  className="w-full h-full"
                  title="CV Preview"
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
