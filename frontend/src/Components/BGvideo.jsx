import React, { useState, useEffect } from 'react';

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

  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className="background-video"
    >
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
