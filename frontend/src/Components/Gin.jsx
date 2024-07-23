// src/components/HomeComponent.jsx
// src/components/HomeComponent.jsx
import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { PointLightHelper } from 'three';
import Model from './BOTELLA_ARTIC';

import './Gin.css';

const GinComponent = () => {
  const lightRef = useRef();

  return (
    <div className="container">
      <header className="home-header">
        <h1>Artic Gin</h1>
      </header>
      <main className="home-main">
        <div className="canvas-container">
          <Canvas>
            <PerspectiveCamera fov={10} aspect={1} position={[0, 0, 0]} />
            <OrbitControls
              enableZoom={false}
              minDistance={5}
              maxDistance={5}
              minPolarAngle={Math.PI / 2} // Limita completamente la rotación vertical
              maxPolarAngle={Math.PI / 2}
            />
            <ambientLight intensity={2} />
            <pointLight ref={lightRef} position={[-1, 3, 0]} intensity={1} />
            <pointLight ref={lightRef} position={[0, -3, 0]} intensity={10} />
            {lightRef.current && (
              <primitive object={new PointLightHelper(lightRef.current, 1)} />
            )}{' '}
            <Suspense fallback={null}>
              <Model scale={7} />
            </Suspense>
          </Canvas>
        </div>
        <button>Comprar</button>
      </main>
    </div>
  );
};

export default GinComponent;
