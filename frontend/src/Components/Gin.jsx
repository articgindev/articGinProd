// src/components/HomeComponent.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Botella1 from './Botella1';
import './Gin.css';
import { OrbitControls } from '@react-three/drei';

const GinComponent = () => {
  return (
    <div className="container">
      <header className="home-header">
        <h1>Artic Gin</h1>
      </header>
      <main className="home-main">
        <div className="canvas-container">
          <Canvas camera={{ position: [-13, -20, 20], fov: 110 }}>
            <OrbitControls
              enableZoom={false}
              minDistance={280}
              maxDistance={100}
              enableRotate={true}
            />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <directionalLight position={[-5, -5, -5]} intensity={0.5} />
            <Suspense fallback={null}>
              <Botella1 rotation={[Math.PI / 4, Math.PI / 4, 0]} />
            </Suspense>
          </Canvas>
        </div>
        <button>Comprar</button>
      </main>
    </div>
  );
};

export default GinComponent;
