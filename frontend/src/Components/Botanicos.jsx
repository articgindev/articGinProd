import React from 'react';
import './Botanicos.css';
import Menu from './Menu';

// Importación de las imágenes de los botánicos
import botanico1 from '../assets/botanicos/botanico1.jpg';
import botanico2 from '../assets/botanicos/botanico2.jpg';
import botanico3 from '../assets/botanicos/botanico3.jpg';
import botanico4 from '../assets/botanicos/botanico4.jpg';
import botanico5 from '../assets/botanicos/botanico5.jpg';
import botanico6 from '../assets/botanicos/botanico6.jpg';
import botanico7 from '../assets/botanicos/botanico7.jpg';
import botanico8 from '../assets/botanicos/botanico8.jpg';
import botanico9 from '../assets/botanicos/botanico9.jpg';

const BotanicosComponent = () => {
  return (
    <div className="botanicos-container">
      <header className="botanicos-header">
        <Menu className="botanicos-menu-button" />
        <h1>NUESTROS BOTANICOS</h1>
      </header>
      <div className="banner">
        <div className="slider" style={{ '--quantity': 9 }}>
          <div className="item" style={{ '--position': 1 }}>
            <img src={botanico1} alt="Botanico 1" />
          </div>
          <div className="item" style={{ '--position': 2 }}>
            <img src={botanico2} alt="Botanico 2" />
          </div>
          <div className="item" style={{ '--position': 3 }}>
            <img src={botanico3} alt="Botanico 3" />
          </div>
          <div className="item" style={{ '--position': 4 }}>
            <img src={botanico4} alt="Botanico 4" />
          </div>
          <div className="item" style={{ '--position': 5 }}>
            <img src={botanico5} alt="Botanico 5" />
          </div>
          <div className="item" style={{ '--position': 6 }}>
            <img src={botanico6} alt="Botanico 6" />
          </div>
          <div className="item" style={{ '--position': 7 }}>
            <img src={botanico7} alt="Botanico 7" />
          </div>
          <div className="item" style={{ '--position': 8 }}>
            <img src={botanico8} alt="Botanico 8" />
          </div>
          <div className="item" style={{ '--position': 9 }}>
            <img src={botanico9} alt="Botanico 9" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotanicosComponent;
