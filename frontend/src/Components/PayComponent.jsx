import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Importamos useParams para obtener el cartId desde la URL
import back from '../assets/shop/back.png';
import comprar from '../assets/cart/cartComprar.png';
import './PayComponent.css';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';

const Pay = () => {
  const { cartId } = useParams(); // Obtener el cartId desde la URL
  initMercadoPago('APP_USR-c1392b0e-bd6c-4224-8089-1cf48f811b58', {
    locale: 'es-AR',
  });

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

  const [errors, setErrors] = useState({});
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);

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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = true;
    if (!formData.apellido) newErrors.apellido = true;
    if (!validateEmail(formData.email)) newErrors.email = true;
    if (!formData.direccion) newErrors.direccion = true;
    if (!formData.localidad) newErrors.localidad = true;
    if (!formData.altura) newErrors.altura = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Crear preferencia y obtener el ID desde el backend
  const createPreference = async () => {
    try {
      const baseUrl =
        process.env.NODE_ENV === 'production'
          ? 'https://artic-gin-server.vercel.app' // URL en producción
          : 'http://localhost:5555'; // URL en desarrollo

      // Verifica que `cartId` esté siendo extraído correctamente de la URL
      if (!cartId) {
        throw new Error('cartId no está presente en la URL');
      }

      // Crear el objeto personalData a partir del formulario
      const personalData = {
        name: formData.nombre,
        address: formData.direccion,
        city: formData.localidad,
        postalCode: formData.altura,
        email: formData.email,
        contact: formData.contactoReceptor || 'N/A',
        notes: formData.notasPedido || 'N/A',
      };

      // Verificar que todos los campos requeridos en `personalData` estén presentes
      if (
        !personalData.name ||
        !personalData.address ||
        !personalData.city ||
        !personalData.postalCode ||
        !personalData.email
      ) {
        throw new Error('Faltan datos personales necesarios');
      }

      // Enviar la preferencia al backend con el cartId desde la URL
      const response = await axios.post(`${baseUrl}/create-order`, {
        total: 17999, // Aquí debes colocar el total correcto (asumido como 17999 en este caso)
        personalData,
        cartId, // Enviar el cartId desde la URL
      });

      console.log('Preferencia creada:', response.data);

      const { id } = response.data;
      return id;
    } catch (error) {
      console.error('Error creando la preferencia:', error);
      return null;
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      handleBuy();
    } else {
      setShowErrorPopup(true);
    }
  };

  const handleBack = () => {
    navigate('/cart');
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
              className={`pay-input ${
                errors.nombre ? 'invalid-placeholder' : ''
              }`}
            />
            <input
              type="text"
              name="apellido"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={handleInputChange}
              className={`pay-input ${
                errors.apellido ? 'invalid-placeholder' : ''
              }`}
            />
          </div>
          <div className="pay-form-row">
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={handleInputChange}
              className={`pay-input-complete ${
                errors.email ? 'invalid-placeholder' : ''
              }`}
            />
          </div>
          <div className="pay-form-row">
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={formData.direccion}
              onChange={handleInputChange}
              className={`pay-input ${
                errors.direccion ? 'invalid-placeholder' : ''
              }`}
            />
            <input
              type="text"
              name="localidad"
              placeholder="Localidad"
              value={formData.localidad}
              onChange={handleInputChange}
              className={`pay-input ${
                errors.localidad ? 'invalid-placeholder' : ''
              }`}
            />
          </div>
          <div className="pay-form-row">
            <input
              type="text"
              name="altura"
              placeholder="Altura"
              value={formData.altura}
              onChange={handleInputChange}
              className={`pay-input ${
                errors.altura ? 'invalid-placeholder' : ''
              }`}
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
              style={{
                height: '2rem',
                borderRadius: '15px',
              }}
            />
          </div>
          <div className="pay-submit-button-container">
            <img
              src={comprar}
              alt="Pagar"
              className="pay-submit-button"
              onClick={handleSubmit}
            />
          </div>
          {preferenceId && (
            <Wallet
              initialization={{ preferenceId }}
              customization={{ texts: { valueProp: 'smart_option' } }}
            />
          )}
        </form>
      </div>

      {showErrorPopup && (
        <div className="ups-popup">
          <div className="ups-popup-content">
            <p>
              Hay un error con tus datos, por favor revisalos y vuelve a
              intentarlo.
            </p>
            <button onClick={() => setShowErrorPopup(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pay;
