"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const circle = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only render on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;
    setIsDesktop(true);

    function onMouseMove(e: MouseEvent) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!visible) setVisible(true);

      // Move dot instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 3}px, ${e.clientY - 3}px)`;
      }
    }

    function onMouseEnter() { setVisible(true); }
    function onMouseLeave() { setVisible(false); }

    // Detect hoverable elements
    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], label, .cursor-pointer, input[type='submit']")) {
        setHovering(true);
      }
    }

    function onMouseOut(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], label, .cursor-pointer, input[type='submit']")) {
        setHovering(false);
      }
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    // Lerp animation for circle follower
    let raf: number;
    function animate() {
      const lerp = 0.12;
      circle.current.x += (mouse.current.x - circle.current.x) * lerp;
      circle.current.y += (mouse.current.y - circle.current.y) * lerp;

      if (circleRef.current) {
        const size = hovering ? 48 : 28;
        const offset = size / 2;
        circleRef.current.style.transform = `translate(${circle.current.x - offset}px, ${circle.current.y - offset}px)`;
      }
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      cancelAnimationFrame(raf);
    };
  }, [visible, hovering]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Dot — follows instantly */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          backgroundColor: "#0A0A0A",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.15s",
        }}
      />
      {/* Circle follower — follows with lerp lag */}
      <div
        ref={circleRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: hovering ? 48 : 28,
          height: hovering ? 48 : 28,
          borderRadius: "50%",
          border: "1.5px solid #0A0A0A",
          backgroundColor: "transparent",
          opacity: visible ? (hovering ? 0.35 : 1) : 0,
          transition: "width 0.2s ease, height 0.2s ease, opacity 0.2s ease",
        }}
      />
    </>
  );
}
