import React from 'react';
import './LandComponent.css';
import logoLanding from '../assets/logos/logoLanding.png';
import bienvenidoAArticCompu from '../assets/logos/BienvenidoAArticCompu.png';

const LandComponent = () => {
  return (
    <div className="landComponent">
      {/* <img src={logoLanding} alt="Logo Landing" className="mobile-tablet-img" /> */}
      <img
        src={bienvenidoAArticCompu}
        alt="Bienvenido a Artic"
        className="desktop-img"
      />
    </div>
  );
};

export default LandComponent;
