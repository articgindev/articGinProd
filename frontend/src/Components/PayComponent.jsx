import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import back from '../assets/shop/back.png';
import comprar from '../assets/cart/cartComprar.png'; // Usamos temporalmente la imagen de "comprar" para el botón de pagar
import './PayComponent.css';

const Pay = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    direccion: '',
    localidad: '',
    altura: '',
    entreCalles: '',
    tipoVivienda: 'casa',
    piso: '',
    contactoReceptor: '',
    notasPedido: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleToggle = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      tipoVivienda: type,
    }));
  };

  const handleBack = () => {
    navigate('/cart'); // Navegar de vuelta al carrito
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías añadir la lógica para procesar el pago
    console.log('Datos del formulario:', formData);
  };

  return (
    <div className="pay-overlay">
      <div className="pay-container">
        <img
          src={back}
          alt="Back"
          className="pay-back-button"
          onClick={handleBack}
        />
        <form className="pay-form" onSubmit={handleSubmit}>
          <div className="pay-form-row">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={handleInputChange}
              className="pay-input"
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              className="pay-input"
            />
          </div>
          <div className="pay-form-row">
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={handleInputChange}
              className="pay-input-complete"
            />
          </div>
          <div className="pay-form-row">
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={formData.direccion}
              onChange={handleInputChange}
              className="pay-input"
            />
            <input
              type="text"
              name="localidad"
              placeholder="Localidad"
              value={formData.localidad}
              onChange={handleInputChange}
              className="pay-input"
            />
          </div>
          <div className="pay-form-row">
            <input
              type="text"
              name="altura"
              placeholder="Altura"
              value={formData.altura}
              onChange={handleInputChange}
              className="pay-input"
            />
            <input
              type="text"
              name="entreCalles"
              placeholder="Entre Calles"
              value={formData.entreCalles}
              onChange={handleInputChange}
              className="pay-input"
            />
          </div>
          <div className="pay-form-row">
            <div className="toggle-container">
              <button
                type="button"
                className={`toggle-button ${
                  formData.tipoVivienda === 'casa' ? 'active' : ''
                }`}
                onClick={() => handleToggle('casa')}
              >
                CASA
              </button>
              <button
                type="button"
                className={`toggle-button ${
                  formData.tipoVivienda === 'depto' ? 'active' : ''
                }`}
                onClick={() => handleToggle('depto')}
              >
                DPTO.
              </button>
            </div>
            <input
              type="text"
              name="piso"
              placeholder="Piso (opcional)"
              value={formData.piso}
              onChange={handleInputChange}
              className="pay-input"
            />
          </div>
          <div className="pay-form-row">
            <input
              type="text"
              name="contactoReceptor"
              placeholder="Nombre y Contacto receptor (opcional)"
              value={formData.contactoReceptor}
              onChange={handleInputChange}
              className="pay-input-complete-opcional"
            />
          </div>
          <div className="pay-form-row">
            <input
              type="text"
              name="notasPedido"
              placeholder="Notas del pedido (opcional)"
              value={formData.notasPedido}
              onChange={handleInputChange}
              className="pay-input-complete-opcional"
            />
          </div>
          <img
            src={comprar}
            alt="Pagar"
            className="pay-submit-button"
            onClick={handleSubmit}
          />
        </form>
      </div>
    </div>
  );
};

export default Pay;
