import React from 'react';
import GinComponent from '../Components/Gin';
import ShopComponent from '../Components/Shop';
import BotanicosComponent from '../Components/Botanicos';
import OrigenComponent from '../Components/Origen';
import EcoComponent from '../Components/Eco';
import NosotrosComponent from '../Components/Nosotros';

const Home = () => {
  return (
    <div>
      <section id="gin-section">
        <GinComponent />
      </section>
      <section id="shop-section">
        <ShopComponent />
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
