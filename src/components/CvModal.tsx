"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CvModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  downloadLabel: string;
}

export default function CvModal({ isOpen, onClose, pdfUrl, downloadLabel }: CvModalProps) {
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
            className="relative w-[94vw] h-[92vh] max-w-6xl flex flex-col"
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
            <div className="flex-1 bg-white/5 border border-white/10">
              <iframe
                src={`${pdfUrl}#view=FitH`}
                className="w-full h-full"
                title="CV Preview"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
