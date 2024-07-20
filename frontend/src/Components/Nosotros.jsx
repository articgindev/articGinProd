// src/components/NosotrosComponent.jsx
import React from 'react';
import './Nosotros.css';
import Menu from './Menu';

const NosotrosComponent = () => {
  return (
    <div>
      <header className="nosotros-header">
        <h1>Artic Gin</h1>
      </header>
      <main className="nosotros-main">
        <Menu className="nosotros-menu-button" />
        <div style={{ width: '100%', height: '80vh' }}>
          <h1>NOSOTROS SECTION</h1>
        </div>
      </main>
    </div>
  );
};

export default NosotrosComponent;
