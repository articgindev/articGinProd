import React from 'react';
import GinComponent from '../Components/Gin';
import BotanicosComponent from '../Components/Botanicos';
import OrigenComponent from '../Components/Origen';
import EcoComponent from '../Components/Eco';
import NosotrosComponent from '../Components/Nosotros';
import AgeComponent from '../Components/AgeComponent';
import LandComponent from '../Components/LandComponent';

const Home = () => {
  return (
    <div>
      <section id="age-section">
        <AgeComponent />
      </section>
      <section id="land-section">
        <LandComponent />
      </section>
      <section id="gin-section">
        <GinComponent />
      </section>
      <section id="botanicos-section">
        <BotanicosComponent />
      </section>
      <section id="origen-section">
        <OrigenComponent />
      </section>
      <section id="eco-section">
        <EcoComponent />
      </section>
      <section id="nosotros-section">
        <NosotrosComponent />
      </section>
    </div>
  );
};

export default Home;
