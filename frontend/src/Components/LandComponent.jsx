import React from 'react';
import './LandComponent.css';
import logoLanding from '../assets/logos/logoLanding.png';

const LandComponent = () => {
  return (
    <div className="landComponent">
      <div className="tableComponent">
        <img src={logoLanding} alt="Side Image" />
      </div>
    </div>
  );
};

export default LandComponent;
