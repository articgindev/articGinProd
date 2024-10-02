import React from 'react';
import './ContactComponent.css'; // Importa el archivo CSS

const ContactComponent = () => {
  return (
    <div className="contact-form-container">
      {/* Aquí va la imagen del título */}
      <div className="title-image-placeholder">
        {/* Reserva para la imagen */}
        <img src="" alt="Title Placeholder" className="title-image" />
      </div>

      {/* Formulario de contacto */}
      <form className="contact-form">
        <div className="form-row">
          <input type="text" placeholder="NOMBRE" className="form-input" />
          <input type="text" placeholder="APELLIDO" className="form-input" />
        </div>

        <div className="form-row">
          <input
            type="email"
            placeholder="CORREO ELECTRÓNICO"
            className="form-input"
          />
          <input
            type="tel"
            placeholder="NÚMERO DE CONTACTO"
            className="form-input"
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            placeholder="MOTIVO DE LA CONSULTA"
            className="form-input-full"
          />
        </div>

        <div className="form-row">
          <textarea placeholder="CONSULTA" className="form-textarea"></textarea>
        </div>

        <button type="submit" className="submit-button">
          ENVIAR
        </button>
      </form>

      {/* Reserva para el icono de Instagram */}
      <div className="social-media">
        <img src="" alt="Instagram Icon" className="instagram-icon" />
      </div>
    </div>
  );
};

export default ContactComponent;
