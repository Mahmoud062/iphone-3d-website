import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook to trigger video playback synced with scroll position
 * Consolidates video scroll trigger pattern across components
 * Automatically manages video DOM element and cleanup
 *
 * @param {string} target - CSS selector for video element
 * @param {Object} options - Configuration { start, end, toggleActions }
 *
 * @example
 * useVideoScrollTrigger('#exploreVideo', {
 *   start: '-10% bottom',
 *   toggleActions: 'play pause reverse restart'
 * });
 */
export const useVideoScrollTrigger = (target, options = {}) => {
  useEffect(() => {
    const videoElement = document.querySelector(target);
    if (!videoElement) return;

    const defaults = {
      trigger: target,
      toggleActions: "play pause reverse restart",
      start: "-10% bottom",
      end: "bottom bottom",
      ...options,
    };

    gsap.to(target, {
      scrollTrigger: defaults,
      onComplete: () => {
        // Optional: play video when animation completes
        videoElement.play?.();
      },
    });

    return () => {
      // Cleanup: Kill all ScrollTriggers for this element
      ScrollTrigger.getAll()
        .filter((trigger) => trigger.target === videoElement)
        .forEach((trigger) => trigger.kill());
    };
  }, [target, options]);
};
