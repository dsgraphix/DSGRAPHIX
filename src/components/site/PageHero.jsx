import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function PageHero({ eyebrow, title, lead, className = "" }) {
  const headlineRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !headlineRef.current) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(headlineRef.current, {
        scrollTrigger: {
          trigger: headlineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1,
        },
        y: -30,
        duration: 1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className={`bg-[#2A2A29] text-white py-16 lg:py-24 border-b-2 border-white relative overflow-hidden ${className}`}>
      <div className="container-page relative z-10">
        {eyebrow && (
          <div className="mb-4">
            <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
              {eyebrow}
            </span>
          </div>
        )}
        
        <div ref={headlineRef} className="scrub-text">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.9] uppercase tracking-tighter text-white max-w-5xl">
            {title}
          </h1>
        </div>

        {lead && (
          <div className="mt-8 border-l-4 border-[#FF6636] pl-6 max-w-3xl">
            <p className="text-lg lg:text-xl text-[#F2F4F8] font-bold leading-relaxed">
              {lead}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
