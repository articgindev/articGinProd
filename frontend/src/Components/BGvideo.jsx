import React from 'react';

const BackgroundVideo = () => {
  return (
    <video autoPlay loop muted playsInline className="background-video">
      <source
        src="https://res.cloudinary.com/dtu2unujm/video/upload/v1726876272/fondoCel_br0wnh.mp4"
        type="video/mp4"
      />
      Tu navegador no soporta el video en HTML5.
    </video>
  );
};

export default BackgroundVideo;
