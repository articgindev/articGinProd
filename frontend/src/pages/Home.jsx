import React from 'react';
import GinComponent from '../Components/Gin';
import BotanicosComponent from '../Components/Botanicos';
import OrigenComponent from '../Components/Origen';
import EcoComponent from '../Components/Eco';
import NosotrosComponent from '../Components/Nosotros';
import LandComponent from '../Components/LandComponent';
import BackgroundVideo from '../Components/BGvideo'; // Importamos el video de fondo
import './Home.css'; // Asegúrate de importar los estilos
import Menu from '../Components/Menu'; // Asegúrate de importar el menú

const Home = () => {
  return (
    <div>
      <Menu />
      <div className="background-video-container">
        <BackgroundVideo />
        <section id="land-section">
          <LandComponent />
        </section>
        <section id="gin-section">
          <GinComponent />
        </section>
      </div>
      {/* <section id="botanicos-section">
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
      </section> */}
    </div>
  );
};

export default Home;
