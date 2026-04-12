import { Html, OrbitControls, PerspectiveCamera, View } from "@react-three/drei"
import * as THREE from 'three'
import Lights from './Lights';
import Loader from './Loader';
import IPhone from './IPhone';
import { Suspense, memo } from "react";

// Model view for a single iPhone variant (small or large)
// Memoized to prevent unnecessary re-renders when parent Model component updates
// but this component's props haven't changed
const ModelView = memo(
  ({ index, groupRef, gsapType, controlRef, setRotationState, size, item }) => {
    return (
      <View
        index={index}
        id={gsapType}
        className={`w-full h-full absolute ${index === 2 ? 'right-[-100%]' : ''}`}
      >
        {/* Ambient light - basic illumination */}
        <ambientLight intensity={0.3} />

        {/* Perspective camera */}
        <PerspectiveCamera makeDefault position={[0, 0, 4]} />

        {/* Professional lighting setup */}
        <Lights />

        {/* Allow user to rotate model with mouse */}
        <OrbitControls
          makeDefault
          ref={controlRef}
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.4}
          target={new THREE.Vector3(0, 0, 0)}
          onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
        />

        {/* Group that holds the iPhone model */}
        <group ref={groupRef} name={index === 1 ? 'small' : 'large'} position={[0, 0, 0]}>
          {/* Load iPhone component, show Loader while loading */}
          <Suspense fallback={<Loader />}>
            <IPhone
              scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
              item={item}
              size={size}
            />
          </Suspense>
        </group>
      </View>
    );
  },
  // Custom comparison function - only re-render if these props actually change
  (prevProps, nextProps) => {
    return (
      prevProps.gsapType === nextProps.gsapType &&
      prevProps.size === nextProps.size &&
      prevProps.item.color?.[0] === nextProps.item.color?.[0] &&
      prevProps.item.img === nextProps.item.img
    );
  }
);

ModelView.displayName = 'ModelView';

export default ModelView;
