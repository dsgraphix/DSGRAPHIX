import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "@/lib/motion";

export function AmbientBackground() {
  const blobRef = useRef(null);

  useEffect(() => {
    if (isReducedMotion() || typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (blobRef.current) {
        gsap.to(blobRef.current, {
          yPercent: 120,
          xPercent: 25,
          scale: 1.2,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Soft brand orange ambient light bleed */}
      <div
        ref={blobRef}
        className="absolute -top-40 -left-40 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full bg-[#FF6636]/10 blur-[130px] will-change-transform"
      />
    </div>
  );
}
