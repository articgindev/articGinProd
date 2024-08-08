// src/components/BotanicosComponent.jsx
import React from 'react';
import './Botanicos.css';
import Menu from './Menu';

const BotanicosComponent = () => {
  return (
    <div>
      <header className="botanicos-header">
        <h1>Artic Gin</h1>
      </header>
      <main className="botanicos-main">
        <Menu className="botanicos-menu-button" />
        <div style={{ width: '100%', height: '80vh' }}>
          <h1>BOTANICOS SECTION</h1>
        </div>
      </main>
    </div>
  );
};

export default BotanicosComponent;
