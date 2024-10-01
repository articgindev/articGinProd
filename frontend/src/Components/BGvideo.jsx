import React, { useState, useEffect } from 'react';
import './BGvideo.css';

const BackgroundVideo = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);

    // Limpiar el event listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const video = document.getElementById('autoplay');

    const tryPlayVideo = () => {
      if (video && video.paused) {
        video.muted = true; // Asegúrate de que esté silenciado
        video.play().catch((error) => {
          console.log('Error al intentar reproducir el video:', error);
        });
      }
    };

    // Reproducir el video cuando el DOM esté completamente cargado
    window.onload = () => {
      tryPlayVideo();
    };

    // Si la reproducción automática falla, reproducir cuando el usuario interactúe
    document.addEventListener('click', tryPlayVideo);
    document.addEventListener('scroll', tryPlayVideo);

    // Limpiar los event listeners cuando el componente se desmonte
    return () => {
      document.removeEventListener('click', tryPlayVideo);
      document.removeEventListener('scroll', tryPlayVideo);
    };
  }, []);

  return (
    <video loop muted id="autoplay" playsInline className="background-video">
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
