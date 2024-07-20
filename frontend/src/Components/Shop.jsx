// src/components/ShopComponent.jsx
import React from 'react';
import './Shop.css';
import Menu from './Menu';

const ShopComponent = () => {
  return (
    <div>
      <header className="shop-header">
        <h1>Artic Gin</h1>
      </header>
      <main className="shop-main">
        <Menu className="shop-menu-button" />
        <div style={{ width: '100%', height: '80vh' }}>
          <h1>SHOP SECTION</h1>
        </div>
      </main>
    </div>
  );
};

export default ShopComponent;
