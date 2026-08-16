import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "@/lib/motion";

export function AnimatedCounter({ target, prefix = "", suffix = "" }) {
  const elementRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined" || !elementRef.current) return;

    if (isReducedMotion()) {
      elementRef.current.textContent = `${prefix}${target}${suffix}`;
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 92%",
          toggleActions: "play none none none",
          once: true,
        },
        onUpdate: () => {
          if (elementRef.current) {
            elementRef.current.textContent = `${prefix}${Math.floor(obj.val)}${suffix}`;
          }
        },
        onComplete: () => {
          if (elementRef.current) {
            elementRef.current.textContent = `${prefix}${target}${suffix}`;
          }
        },
      });
    }, elementRef);

    return () => ctx.revert();
  }, [target, prefix, suffix]);

  return (
    <span ref={elementRef}>
      {prefix}0{suffix}
    </span>
  );
}
