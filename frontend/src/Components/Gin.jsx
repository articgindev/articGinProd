import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import h1Logo from '../assets/logos/h1Logo.png';
import comprarGin from '../assets/buttons/comprarGin.png';
import './Gin.css';

const GinComponent = () => {
  const navigate = useNavigate();

  const handleComprarClick = () => {
    navigate('/cart');
  };

  return (
    <div className="gin-container">
      <header className="home-header">
        <img src={h1Logo} alt="Logo Artic Gin" className="gin-logo" />
      </header>

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
