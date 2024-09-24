import React, { useState, useEffect } from 'react';

const BackgroundVideo = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  // Función para detectar si es móvil o PC
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024); // Si el ancho de la pantalla es menor o igual a 1024px, es móvil
    };

    window.addEventListener('resize', handleResize);

    // Limpiar el event listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <video autoPlay loop muted playsInline className="background-video">
      <source
        src={
          isMobile
            ? 'https://res.cloudinary.com/dtu2unujm/video/upload/v1726876272/fondoCel_br0wnh.mp4'
            : 'https://res.cloudinary.com/dtu2unujm/video/upload/v1726876233/fondoPc_yyrpxb.mp4'
        }
        type="video/mp4"
      />
      Tu navegador no soporta el video en HTML5.
    </video>
  );
};

export default BackgroundVideo;
