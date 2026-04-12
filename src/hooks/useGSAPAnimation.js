import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable hook for scroll-triggered element animations
 * Consolidates repeated scroll animation patterns across components
 * Automatically handles ScrollTrigger cleanup on unmount
 *
 * @param {string} target - CSS selector for element to animate
 * @param {Object} animation - GSAP animation props (opacity, y, x, etc.)
 * @param {Object} scrollProps - ScrollTrigger configuration (optional)
 *
 * @example
 * useGSAPAnimation('#features_title', { y: 0, opacity: 1 }, {
 *   start: 'top 80%',
 *   end: 'top 50%'
 * });
 */
export const useGSAPAnimation = (target, animation, scrollProps = {}) => {
  useEffect(() => {
    // Guard: ensure DOM is ready and element exists
    const element = document.querySelector(target);
    if (!element) return;

    const defaults = {
      trigger: target,
      start: "top 80%",
      end: "top 50%",
      toggleActions: "play none none reverse",
      ...scrollProps,
    };

    gsap.to(target, {
      ...animation,
      scrollTrigger: defaults,
    });

    return () => {
      // Cleanup: Kill all ScrollTriggers for this element
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.target === element)
        .forEach((trigger) => trigger.kill());
    };
  }, [target, animation, scrollProps]);
};
