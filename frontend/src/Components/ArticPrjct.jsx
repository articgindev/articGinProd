// src/components/ArticPrjctComponent.jsx
import React from 'react';
import './ArticPrjct.css';
import Menu from './Menu';

const ArticPrjctComponent = () => {
  return (
    <div>
      <header className="artic-prjct-header">
        <h1>Artic Gin</h1>
      </header>
      <main className="artic-prjct-main">
        <Menu className="artic-prjct-menu-button" />
        <div style={{ width: '100%', height: '80vh' }}>
          <h1>ARTIC PRJCT SECTION</h1>
        </div>
      </main>
    </div>
  );
};

export default ArticPrjctComponent;
