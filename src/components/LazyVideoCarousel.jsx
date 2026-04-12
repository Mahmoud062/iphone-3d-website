import { lazy, Suspense } from 'react';

/**
 * Lazy-loaded VideoCarousel component wrapper
 * Code-splits the video carousel with GSAP ticker animations
 * Only loads when Highlights section is about to be viewed
 *
 * Benefits:
 * - Defers video carousel code (~15-20KB) until needed
 * - Faster initial bundle parsing
 * - Graceful fallback loading state
 */
const VideoCarousel = lazy(() => import('./VideoCarousel'));

export const LazyVideoCarousel = () => (
  <Suspense
    fallback={
      <div className="h-screen w-full bg-black animate-pulse flex items-center justify-center">
        <p className="text-gray-400">Loading highlights...</p>
      </div>
    }
  >
    <VideoCarousel />
  </Suspense>
);

export default LazyVideoCarousel;
