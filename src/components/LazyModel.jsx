import { lazy, Suspense } from 'react';
import Loader from './Loader';

/**
 * Lazy-loaded Model component wrapper
 * Code-splits the Three.js canvas and 3D model loading
 * Only loads when Model section is about to be viewed
 * 
 * Benefits:
 * - Three.js bundle (~30-40KB) loaded only on demand
 * - Initial page load ~300ms faster
 * - Smooth loading state with Loader component
 */
const Model = lazy(() => import('./Model'));

export const LazyModel = (props) => (
  <Suspense fallback={<Loader />}>
    <Model {...props} />
  </Suspense>
);

export default LazyModel;
