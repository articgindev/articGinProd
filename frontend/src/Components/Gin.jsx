import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import h1Logo from '../assets/logos/h1Logo.png';
import comprarGin from '../assets/buttons/comprarGin.png';
import bottleCartoonWebmPub from '/bottleCartoon1.mp4'; // Video para móvil
import ArticGinFondoCompu from '../assets/backgrounds/ArticGinFondoCompu.jpg'; // Fondo para PC
import desktopVideo from '../assets/videos/bottleCartoon.webm'; // Video para PC
import './Gin.css';

const GinComponent = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleComprarClick = () => {
    navigate('/cart');
  };

  return (
    <div className="gin-container">
      <header className="home-header">
        <img src={h1Logo} alt="Logo Artic Gin" className="gin-logo" />
      </header>

      {isMobile ? (
        // Si es móvil, muestra el video
        <video
          src={bottleCartoonWebmPub}
          autoPlay
          loop
          muted
          playsInline
          className="background-video"
        />
      ) : (
        // Si es PC, muestra el video de fondo
        <div className="desktop-background">
          <video
            src={desktopVideo}
            autoPlay
            loop
            muted
            playsInline
            className="webp-video"
          />
        </div>
      )}

      <main className="home-main">
        <div className="canvas-container"></div>
        <div className="comprarButton">
          <img
            src={comprarGin}
            alt="Comprar Gin"
            className="gin-comprar-button"
            onClick={handleComprarClick}
          />
        </div>
      </main>
    </div>
  );
};

export default GinComponent;
