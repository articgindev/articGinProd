import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import h1Logo from '../assets/logos/h1Logo.png';
import comprarGin from '../assets/buttons/comprarGin.png';
import bottleCartoonWebmPub from '/bottleCartoon1.mp4'; // Video para móvil
import desktopVideo from '/bottleCartoon.mp4';

import './Gin.css';

const GinComponent = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      const isMobileScreen = window.innerWidth <= 1024;
      setIsMobile(isMobileScreen);
      console.log(
        `Window width: ${window.innerWidth}, isMobile: ${isMobileScreen}`
      );
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Llamada inicial para establecer el estado correcto al cargar la página.

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
        <video
          src={bottleCartoonWebmPub}
          autoPlay
          loop
          muted
          playsInline
          className="background-video"
        />
      ) : (
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
      <div className="comprarButton">
        <img
          src={comprarGin}
          alt="Comprar Gin"
          className="gin-comprar-button"
          onClick={handleComprarClick}
        />
      </div>
    </div>
  );
};

export default GinComponent;
