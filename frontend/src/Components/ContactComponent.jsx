import React, { useState } from 'react';
import './ContactComponent.css';
import axios from 'axios';
import header from '../assets/contact/GraciasPorComunicarteArtic.png';
import header1 from '../assets/contact/TextoContacto.png';
import logoIg from '../assets/contact/LogoIgContacto.png';
import enviar from '../assets/contact/EnviarContacto.png';
import Menu from './Menu';

export const Consultas = () => {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [numero, setNumero] = useState('');
  const [motivoConsulta, setMotivoConsulta] = useState('');
  const [consulta, setConsulta] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [successPopup, setSuccessPopup] = useState(false);

  // Determinamos la URL base según el entorno
  const baseUrl = window.location.origin.includes('localhost')
    ? 'http://localhost:5555'
    : 'https://artic-gin-server.vercel.app';

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailValid(true); // Resetea la validación al cambiar el correo
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateEmail(email)) {
      try {
        // Hacemos la solicitud POST al backend usando la URL correcta
        const response = await axios.post(`${baseUrl}/contact`, {
          nombre,
          apellido,
          correo: email,
          numero,
          motivoConsulta,
          consulta,
        });

        if (response.status === 200) {
          // Mostrar el pop-up de éxito y limpiar el formulario
          setSuccessPopup(true);
          handleFormReset(); // Limpia los campos
        } else {
          console.log('Error al enviar el formulario');
        }
      } catch (error) {
        console.error('Error al enviar la consulta:', error);
      }
    } else {
      setIsEmailValid(false);
      setShowPopup(true); // Muestra el pop-up si el email es inválido
    }
  };

  const handleFormReset = () => {
    setEmail('');
    setNombre('');
    setApellido('');
    setNumero('');
    setMotivoConsulta('');
    setConsulta('');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleCloseSuccessPopup = () => {
    setSuccessPopup(false); // Cierra el pop-up de éxito
  };

  return (
    <div className="contact-form-container">
      <Menu className="shop-menu-button" />

      <div className="title-image-placeholder">
        <img src={header} alt="Title Placeholder" className="title-image" />
        <img src={header1} alt="Text Placeholder" className="subtitle-image" />
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            placeholder="NOMBRE"
            className="form-input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="APELLIDO"
            className="form-input"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </div>

        <div className="form-row">
          <input
            type="email"
            placeholder="CORREO"
            className={`form-input ${
              !isEmailValid ? 'invalid-placeholder' : ''
            }`}
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="tel"
            placeholder="NÚMERO"
            className="form-input"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
          />
        </div>

        <div className="form-row">
          <input
            type="text"
            placeholder="MOTIVO DE LA CONSULTA"
            className="form-input-full"
            value={motivoConsulta}
            onChange={(e) => setMotivoConsulta(e.target.value)}
          />
        </div>

        <div className="form-row">
          <textarea
            placeholder="CONSULTA"
            className="form-textarea"
            value={consulta}
            onChange={(e) => setConsulta(e.target.value)}
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          <img src={enviar} alt="Enviar" className="submit-image" />
        </button>
      </form>

      {/* Pop-up para correo inválido */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Por favor ingrese un correo válido.</p>
            <button onClick={handleClosePopup}>Cerrar</button>
          </div>
        </div>
      )}

      {/* Pop-up de éxito al enviar */}
      {successPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Consulta enviada con éxito.</p>
            <button onClick={handleCloseSuccessPopup}>Ok</button>
          </div>
        </div>
      )}

      <div className="social-media">
        <a
          href="https://www.instagram.com/artic.tv/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logoIg} alt="Instagram Icon" className="instagram-icon" />
        </a>
      </div>
    </div>
  );
};
