import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

/**
 * Hook for creating and managing GSAP timelines safely
 * Prevents timeline recreation on every render
 * Handles cleanup to prevent memory leaks
 *
 * @param {Array<Object>} animations - Array of animation configs
 * @param {Array<*>} dependencies - Re-run animations when these change
 * @returns {Object} { timeline: useRef object, getTimeline: function }
 */
export const useGSAPTimeline = (animations = [], dependencies = []) => {
  const timelineRef = useRef(null);

  // Create timeline ONCE on mount, never recreate it
  useEffect(() => {
    if (!timelineRef.current) {
      timelineRef.current = gsap.timeline();
    }

    // Cleanup: Kill timeline completely on unmount
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, []); // Empty deps - only runs on mount/unmount

  // Update animations when dependencies change
  useEffect(() => {
    if (!timelineRef.current || animations.length === 0) return;

    // Clear existing animations before adding new ones
    timelineRef.current.clear();

    // Add all animations to timeline
    animations.forEach((anim) => {
      timelineRef.current.to(
        anim.target,
        anim.props,
        anim.position !== undefined ? anim.position : 0,
      );
    });
  }, dependencies); // Re-run only when actual dependencies change

  const getTimeline = useCallback(() => timelineRef.current, []);

  return { timeline: timelineRef, getTimeline };
};
