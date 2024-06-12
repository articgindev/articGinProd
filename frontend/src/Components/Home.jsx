// src/components/HomeComponent.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Bottle from './Bottle';
import './Home.css';
import { OrbitControls } from '@react-three/drei';

const HomeComponent = () => {
  return (
    <div>
      <header className="home-header">
        <h1>Bienvenido a Nuestra Aplicación de Ventas</h1>
        <p>Tu solución integral para gestionar ventas.</p>
      </header>
      <main className="home-main">
        <section className="home-section">
          <h2>¿Por qué elegirnos?</h2>
          <p>
            Ofrecemos las mejores herramientas para que puedas gestionar tus
            ventas de manera eficiente y sencilla.
          </p>
        </section>
        <div style={{ width: '100%', height: '80vh' }}>
          <Canvas camera={{ zoom: 20, position: [15, 20, 15] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[35, 35, 0]} intensity={0.4} />
            <pointLight position={[-35, 35, 0]} intensity={0.4} />
            <Suspense fallback={null}>
              <Bottle />
            </Suspense>
            <OrbitControls />
          </Canvas>
        </div>
      </main>
    </div>
  );
};

export default HomeComponent;
