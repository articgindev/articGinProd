// src/components/HomeComponent.jsx
import React, { Suspense, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { PointLightHelper } from 'three';
import Model from './BOTELLA_ARTIC';
import h1Logo from '../assets/logos/h1Logo.png';
import comprarGin from '../assets/buttons/comprarGin.png';

import './Gin.css';

const GinComponent = () => {
  const navigate = useNavigate(); // Usa el hook useNavigate
  const lightRef = useRef();

  const handleComprarClick = () => {
    navigate('/cart'); // Redirige a la ruta /comprar
  };

  return (
    <div className="gin-container">
      <header className="home-header">
        <img src={h1Logo} />
      </header>
      <main className="home-main">
        <div className="canvas-container">
          <Canvas>
            <PerspectiveCamera fov={10} aspect={1} position={[0, 0, 0]} />
            <OrbitControls
              enableZoom={false}
              minDistance={4}
              maxDistance={4}
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
      </main>
      <div className="comprarButton">
        <img src={comprarGin} alt="Comprar Gin" onClick={handleComprarClick} />
      </div>
    </div>
  );
};

export default GinComponent;
