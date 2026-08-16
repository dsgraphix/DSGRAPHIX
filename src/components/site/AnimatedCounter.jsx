import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isReducedMotion } from "@/lib/motion";

export function AnimatedCounter({ target, prefix = "", suffix = "" }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isReducedMotion()) {
      setCount(target);
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration: 1.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 92%",
          toggleActions: "play none none none",
          once: true,
        },
        onUpdate: () => {
          setCount(Math.floor(obj.val));
        },
        onComplete: () => {
          setCount(target);
        },
      });
    }, elementRef);

    return () => ctx.revert();
  }, [target]);

  return (
    <span ref={elementRef}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
