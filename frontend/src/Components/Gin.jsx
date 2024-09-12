import React from 'react';
import { useNavigate } from 'react-router-dom';
import h1Logo from '../assets/logos/h1Logo.png';
import comprarGin from '../assets/buttons/comprarGin.png';
import bottleCartoonWebm from '../assets/videos/bottleCartoon.webm'; // Importa el video .webm
import './Gin.css';

const GinComponent = () => {
  const navigate = useNavigate();

  const handleComprarClick = () => {
    navigate('/cart');
  };

  return (
    <div className="gin-container">
      {/* Video de fondo con transparencia */}
      <video
        src={bottleCartoonWebm}
        autoPlay
        loop
        muted
        playsInline
        className="background-video"
      />

      <header className="home-header">
        <img src={h1Logo} alt="Logo Artic Gin" />
      </header>

      <main className="home-main">
        <div className="canvas-container"></div>
        <div className="comprarButton">
          <img
            src={comprarGin}
            alt="Comprar Gin"
            onClick={handleComprarClick}
          />
        </div>
      </main>
    </div>
  );
};

export default GinComponent;
