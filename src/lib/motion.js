import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const ANIM = {
  ease: "power3.out",
  duration: 0.7,
  stagger: 0.08,
  yOffset: 36,
  hoverDuration: 0.22,
};

export function isReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Split text into masked word spans for rising word entrance animations
 */
export function initSplitHeadline(headlineElement, scrollTriggerOptions = null) {
  if (!headlineElement || isReducedMotion()) return () => {};

  const processNode = (node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (!text.trim()) return;
      const words = text.split(/(\s+)/);
      const fragment = document.createDocumentFragment();

      words.forEach((w) => {
        if (/^\s+$/.test(w)) {
          fragment.appendChild(document.createTextNode(w));
        } else if (w.length > 0) {
          const outer = document.createElement("span");
          outer.className = "inline-block overflow-hidden align-top py-0.5 mr-[0.2em]";
          const inner = document.createElement("span");
          inner.className = "split-word inline-block transform translate-y-[110%] opacity-0";
          inner.textContent = w;
          outer.appendChild(inner);
          fragment.appendChild(outer);
        }
      });

      node.parentNode.replaceChild(fragment, node);
    } else if (node.nodeType === Node.ELEMENT_NODE && !node.classList.contains("split-word")) {
      Array.from(node.childNodes).forEach(processNode);
    }
  };

  const ctx = gsap.context(() => {
    processNode(headlineElement);
    const words = headlineElement.querySelectorAll(".split-word");

    if (words.length > 0) {
      const animConfig = {
        y: "0%",
        opacity: 1,
        duration: 0.8,
        stagger: 0.035,
        ease: ANIM.ease,
      };

      if (scrollTriggerOptions) {
        animConfig.scrollTrigger = {
          trigger: headlineElement,
          start: "top 88%",
          toggleActions: "play none none none",
          once: true,
          ...scrollTriggerOptions,
        };
      }

      gsap.to(words, animConfig);
    }
  }, headlineElement);

  return () => ctx.revert();
}

/**
 * Item 3: Multi-Layer Parallax scrubbing 3 depth layers at different speeds
 */
export function initMultiLayerParallax({ container, bgLayer, midLayer, fgLayer }) {
  if (!container || isReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    if (bgLayer) {
      gsap.to(bgLayer, {
        yPercent: 18,
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
        yPercent: -12,
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
        yPercent: -6,
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
 * Item 4: Portfolio & Case Study Image Reveal (Fast smooth scale + color reveal)
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
          scale: 1.06,
          opacity: 0.85,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
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
 * Item 5: Magnetic Hover Effect on Primary CTA Buttons using GSAP quickTo
 */
export function initMagneticButton(buttonElement) {
  if (!buttonElement || isReducedMotion()) return () => {};

  const xTo = gsap.quickTo(buttonElement, "x", { duration: 0.3, ease: "power3.out" });
  const yTo = gsap.quickTo(buttonElement, "y", { duration: 0.3, ease: "power3.out" });

  const handleMouseMove = (e) => {
    const rect = buttonElement.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    xTo(relX * 0.25);
    yTo(relY * 0.25);
  };

  const handleMouseLeave = () => {
    xTo(0);
    yTo(0);
  };

  buttonElement.addEventListener("mousemove", handleMouseMove);
  buttonElement.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    buttonElement.removeEventListener("mousemove", handleMouseMove);
    buttonElement.removeEventListener("mouseleave", handleMouseLeave);
  };
}

/**
 * Item 7: Animated Counter Numbers from 0 to target on ScrollTrigger
 */
export function initAnimatedCounters(containerElement) {
  if (!containerElement) return () => {};
  const counterElements = containerElement.querySelectorAll("[data-counter-target]");

  if (isReducedMotion()) {
    counterElements.forEach((el) => {
      const targetVal = el.getAttribute("data-counter-target") || "0";
      const suffix = el.getAttribute("data-counter-suffix") || "";
      const prefix = el.getAttribute("data-counter-prefix") || "";
      el.innerText = `${prefix}${targetVal}${suffix}`;
    });
    return () => {};
  }

  const ctx = gsap.context(() => {
    counterElements.forEach((el) => {
      const targetVal = parseFloat(el.getAttribute("data-counter-target")) || 0;
      const suffix = el.getAttribute("data-counter-suffix") || "";
      const prefix = el.getAttribute("data-counter-prefix") || "";
      const obj = { val: 0 };

      gsap.to(obj, {
        val: targetVal,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 95%",
          toggleActions: "play none none none",
          once: true,
        },
        onUpdate: () => {
          el.innerText = `${prefix}${Math.floor(obj.val)}${suffix}`;
        },
        onComplete: () => {
          el.innerText = `${prefix}${targetVal}${suffix}`;
        },
      });
    });
  }, containerElement);

  return () => ctx.revert();
}

/**
 * Creates clean GSAP ScrollTrigger batch animations with automatic context cleanup
 */
export function initScrollReveals(containerElement) {
  if (!containerElement || isReducedMotion()) return () => {};

  const ctx = gsap.context(() => {
    // Reveal section headers with split text
    const headers = containerElement.querySelectorAll("[data-reveal='header']");
    headers.forEach((header) => {
      initSplitHeadline(header, { start: "top 88%" });
    });

    // Staggered grid cards — subtle y-slide only, no opacity hiding (prevents latency feel)
    const grids = containerElement.querySelectorAll("[data-reveal-grid]");
    grids.forEach((grid) => {
      const items = grid.querySelectorAll("[data-reveal-item]");
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { y: ANIM.yOffset },
          {
            y: 0,
            duration: ANIM.duration,
            stagger: ANIM.stagger,
            ease: ANIM.ease,
            scrollTrigger: {
              trigger: grid,
              start: "top 85%",
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
      tl.fromTo(eyebrow, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
    }

    if (headline) {
      initSplitHeadline(headline);
    }

    if (lead) {
      tl.fromTo(lead, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
    }

    if (cta) {
      tl.fromTo(cta, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3");
      initMagneticButton(cta);
    }

    if (image) {
      tl.fromTo(image, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.8 }, "-=0.5");

      initMultiLayerParallax({
        container,
        bgLayer: image,
      });
    }
  }, container);

  return () => ctx.revert();
}
