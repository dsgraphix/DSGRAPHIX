import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenisInstance = null;

export function initSmoothScroll() {
  if (typeof window === "undefined") return null;

  // Gate Lenis behind prefers-reduced-motion check
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    return null;
  }

  if (!lenisInstance) {
    gsap.registerPlugin(ScrollTrigger);

    lenisInstance = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisInstance.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenisInstance?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(500, 33);
  }

  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}
