"use client";

import { useState, useEffect } from "react";

/** Detects touch/coarse-pointer devices (phones, tablets). */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(pointer: coarse)");
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

/** Standard viewport config — trigger early, never repeat. */
export const mViewport = { once: true as const, amount: 0.05 };

/** Caps duration at 0.3s on mobile / reduced-motion. */
export function mDur(d: number, mobile: boolean) {
  return mobile ? Math.min(d, 0.3) : d;
}

/** Returns `{ opacity: 0 }` on mobile, full transform on desktop. */
export function mInitial(
  desktop: { opacity?: number; y?: number; x?: number; scale?: number },
  mobile: boolean
) {
  if (mobile) return { opacity: desktop.opacity ?? 0 };
  return desktop;
}

/** Stagger delay — max 0.05s gap, max 4 items staggered on mobile. */
export function mStagger(
  index: number,
  gap: number,
  baseDelay: number,
  mobile: boolean
) {
  if (mobile) {
    const i = Math.min(index, 3); // max 4 items staggered (0-3)
    return baseDelay + i * 0.05;
  }
  return baseDelay + index * gap;
}
