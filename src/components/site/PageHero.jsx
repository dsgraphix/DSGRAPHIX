import React, { useEffect, useRef } from "react";
import { initHeroEntrance, initSplitHeadline } from "@/lib/motion";

export function PageHero({ eyebrow, title, lead, className = "" }) {
  const containerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const headlineRef = useRef(null);
  const leadRef = useRef(null);

  useEffect(() => {
    const heroCleanup = initHeroEntrance({
      container: containerRef.current,
      eyebrow: eyebrowRef.current,
      lead: leadRef.current,
    });

    const splitCleanup = initSplitHeadline(headlineRef.current);

    return () => {
      heroCleanup();
      splitCleanup();
    };
  }, [title]);

  return (
    <section ref={containerRef} className={`bg-[#2A2A29] text-white py-16 lg:py-24 border-b-2 border-white relative overflow-hidden ${className}`}>
      <div className="container-page relative z-10 space-y-4">
        {eyebrow && (
          <div ref={eyebrowRef}>
            <span className="text-[#FF6636] font-bold uppercase tracking-[0.3em] text-xs sm:text-sm">
              {eyebrow}
            </span>
          </div>
        )}
        
        <div>
          <h1 ref={headlineRef} className="font-display text-4xl sm:text-6xl lg:text-7xl font-black leading-[0.9] uppercase tracking-tighter text-white max-w-5xl">
            {title}
          </h1>
        </div>

        {lead && (
          <div ref={leadRef} className="pt-2 border-l-4 border-[#FF6636] pl-6 max-w-3xl">
            <p className="text-lg lg:text-xl text-[#F2F4F8] font-bold leading-relaxed">
              {lead}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
