import { useGSAP } from "@gsap/react"
import gsap from "gsap";
import ModelView from "./ModelView";
import { useRef, useState } from "react";
import { yellowImg } from "../utils";
import { useGSAPTimeline } from "../hooks/useGSAPTimeline";

import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from "../constants";

const Model = () => {
  // Current size selected: 'small' (6.1") or 'large' (6.7")
  const [size, setSize] = useState('small');

  // Currently selected model (color variant)
  const [model, setModel] = useState({
    title: 'iPhone 15 Pro in Natural Titanium',
    color: ['#8F8A81', '#FFE7B9', '#6F6C64'],
    img: yellowImg,
  });

  // Refs to OrbitControls (for camera rotation)
  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  // Refs to THREE.Group (the model containers)
  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // Track rotation angles for GSAP animation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  // Use custom hook to manage GSAP timeline safely
  // Prevents timeline recreation on every render and handles cleanup
  const { getTimeline } = useGSAPTimeline(
    [
      {
        target: '#view1',
        props: {
          transform: size === 'large' ? 'translateX(-100%)' : 'translateX(0)',
          duration: 2,
        },
      },
      {
        target: '#view2',
        props: {
          transform: size === 'large' ? 'translateX(0)' : 'translateX(100%)',
          duration: 2,
        },
        position: 0, // Start at same time as view1
      },
    ],
    [size] // Only re-animate when size actually changes
  );

  // Animate section heading on mount
  useGSAP(() => {
    gsap.to('#heading', { y: 0, opacity: 1 });
  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look.
        </h1>

        <div className="flex flex-col items-center mt-5">
          {/* 3D Viewport Container */}
          <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
            {/* Small model view (6.1") */}
            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />

            {/* Large model view (6.7") - positioned off-screen initially */}
            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />

            {/* Three.js Canvas with view ports */}
            <Canvas
              className="w-full h-full"
              style={{
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                overflow: 'hidden'
              }}
              eventSource={document.getElementById('root')}
            >
              {/* Render port for all View components */}
              <View.Port />
            </Canvas>
          </div>

          {/* Selectors: Color & Size */}
          <div className="mx-auto w-full">
            {/* Current model title */}
            <p className="text-sm font-light text-center mb-5" id="model-description">
              {model.title}
            </p>

            <div className="flex-center">
              {/* Color selector - 4 color circles */}
              <fieldset className="color-container" aria-labelledby="color-label">
                <legend id="color-label" className="sr-only">
                  iPhone color selection
                </legend>
                {models.map((item, i) => (
                  <button
                    key={i}
                    className="w-6 h-6 rounded-full mx-2 cursor-pointer border-2 transition-all"
                    style={{
                      backgroundColor: item.color[0],
                      borderColor: model.color[0] === item.color[0] ? 'white' : 'transparent',
                      boxShadow:
                        model.color[0] === item.color[0] ? '0 0 10px rgba(255,255,255,0.5)' : 'none',
                    }}
                    onClick={() => setModel(item)}
                    aria-label={`Select ${item.title}`}
                    aria-pressed={model.color[0] === item.color[0]}
                    role="radio"
                    title={item.title}
                  />
                ))}
              </fieldset>

              {/* Size selector - 6.1" and 6.7" buttons */}
              <fieldset className="size-btn-container" aria-labelledby="size-label">
                <legend id="size-label" className="sr-only">
                  iPhone screen size selection
                </legend>
                {sizes.map(({ label, value }) => (
                  <button
                    key={label}
                    className="size-btn"
                    style={{
                      backgroundColor: size === value ? 'white' : 'transparent',
                      color: size === value ? 'black' : 'white',
                    }}
                    onClick={() => setSize(value)}
                    aria-label={`Select ${label} inch iPhone`}
                    aria-pressed={size === value}
                    role="radio"
                  >
                    {label}
                  </button>
                ))}
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Model;
