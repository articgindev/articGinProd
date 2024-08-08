// src/components/EcoComponent.jsx
import React from 'react';
import './Eco.css';
import Menu from './Menu';

const EcoComponent = () => {
  return (
    <div>
      <header className="eco-header">
        <h1>Artic Gin</h1>
      </header>
      <main className="eco-main">
        <Menu className="eco-menu-button" />
        <div style={{ width: '100%', height: '80vh' }}>
          <h1>ECO SECTION</h1>
        </div>
      </main>
    </div>
  );
};

export default EcoComponent;
