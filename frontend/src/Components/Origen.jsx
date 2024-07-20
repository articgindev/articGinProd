// src/components/OrigenComponent.jsx
import React from 'react';
import './Origen.css';
import Menu from './Menu';

const OrigenComponent = () => {
  return (
    <div>
      <header className="origen-header">
        <h1>Artic Gin</h1>
      </header>
      <main className="origen-main">
        <Menu className="origen-menu-button" />
        <div style={{ width: '100%', height: '80vh' }}>
          <h1>ORIGEN SECTION</h1>
        </div>
      </main>
    </div>
  );
};

export default OrigenComponent;
