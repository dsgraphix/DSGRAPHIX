import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ANIM = {
  ease: "power2.out",
  duration: 0.6,
  stagger: 0.06,
  yOffset: 24,
  hoverDuration: 0.2,
};

export function isReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Non-destructive, high-performance headline reveal animation
 * (Does NOT mutate React DOM text nodes, preventing duplicate text bugs)
 */
export function initSplitHeadline(headlineElement, scrollTriggerOptions = null) {
  if (!headlineElement || isReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    const animConfig = {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
    };

    if (scrollTriggerOptions) {
      animConfig.scrollTrigger = {
        trigger: headlineElement,
        start: "top 90%",
        toggleActions: "play none none none",
        once: true,
        ...scrollTriggerOptions,
      };
    }

    gsap.fromTo(
      headlineElement,
      { opacity: 0, y: 20 },
      animConfig
    );
  }, headlineElement);

  return () => ctx.revert();
}

/**
 * Multi-Layer Parallax scrubbing depth layers
 */
export function initMultiLayerParallax({ container, bgLayer, midLayer, fgLayer }) {
  if (!container || isReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    if (bgLayer) {
      gsap.to(bgLayer, {
        yPercent: 10,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (midLayer) {
      gsap.to(midLayer, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    if (fgLayer) {
      gsap.to(fgLayer, {
        yPercent: -4,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
  }, container);

  return () => ctx.revert();
}

/**
 * Image Reveal Treatment (Smooth hardware-accelerated scale + opacity reveal)
 */
export function initImageRevealTreatment(containerElement) {
  if (!containerElement || isReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    const revealImages = containerElement.querySelectorAll("[data-reveal-image]");
    revealImages.forEach((imgContainer) => {
      const img = imgContainer.querySelector("img") || imgContainer;

      gsap.fromTo(
        img,
        {
          scale: 1.04,
          opacity: 0.9,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imgContainer,
            start: "top 95%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    });
  }, containerElement);

  return () => ctx.revert();
}

/**
 * Magnetic Hover Effect on Primary CTA Buttons
 */
export function initMagneticButton(buttonElement) {
  if (!buttonElement || isReducedMotion()) return () => {};

  const xTo = gsap.quickTo(buttonElement, "x", { duration: 0.25, ease: "power2.out" });
  const yTo = gsap.quickTo(buttonElement, "y", { duration: 0.25, ease: "power2.out" });

  const handleMouseMove = (e) => {
    const rect = buttonElement.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    xTo(relX * 0.2);
    yTo(relY * 0.2);
  };

  const handleMouseLeave = () => {
    xTo(0);
    yTo(0);
  };

  buttonElement.addEventListener("mousemove", handleMouseMove, { passive: true });
  buttonElement.addEventListener("mouseleave", handleMouseLeave, { passive: true });

  return () => {
    buttonElement.removeEventListener("mousemove", handleMouseMove);
    buttonElement.removeEventListener("mouseleave", handleMouseLeave);
  };
}

/**
 * Clean GSAP ScrollTrigger batch animations with automatic context cleanup
 */
export function initScrollReveals(containerElement) {
  if (!containerElement || isReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    // Reveal section headers smoothly
    const headers = containerElement.querySelectorAll("[data-reveal='header']");
    headers.forEach((header) => {
      initSplitHeadline(header, { start: "top 90%" });
    });

    // Staggered grid cards
    const grids = containerElement.querySelectorAll("[data-reveal-grid]");
    grids.forEach((grid) => {
      const items = grid.querySelectorAll("[data-reveal-item]");
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { y: ANIM.yOffset, opacity: 0.95 },
          {
            y: 0,
            opacity: 1,
            duration: ANIM.duration,
            stagger: ANIM.stagger,
            ease: ANIM.ease,
            scrollTrigger: {
              trigger: grid,
              start: "top 88%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      }
    });
  }, containerElement);

  return () => ctx.revert();
}

/**
 * Hero section entrance animation sequence
 */
export function initHeroEntrance({ container, eyebrow, headline, lead, cta, image }) {
  if (!container || isReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: ANIM.ease } });

    if (eyebrow) {
      tl.fromTo(eyebrow, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 });
    }

    if (headline) {
      tl.fromTo(headline, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");
    }

    if (lead) {
      tl.fromTo(lead, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
    }

    if (cta) {
      tl.fromTo(cta, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.4 }, "-=0.25");
      initMagneticButton(cta);
    }

    if (image) {
      tl.fromTo(image, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.6 }, "-=0.4");
    }
  }, container);

  return () => ctx.revert();
}
