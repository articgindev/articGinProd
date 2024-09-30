import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import back from '../assets/shop/back.png';
import pagar from '../assets/buttons/pagar.png';
import './PayComponent.css';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';

const Pay = () => {
  const { cartId } = useParams();

  //APP_USR-da7ab2f6-03c1-4f91-a659-b992782beb11 prod
  //APP_USR-c1392b0e-bd6c-4224-8089-1cf48f811b58 uat

  useEffect(() => {
    initMercadoPago('APP_USR-c1392b0e-bd6c-4224-8089-1cf48f811b58', {
      locale: 'es-AR',
    });
  }, []);

  const navigate = useNavigate();
  const [totalCost, setTotalCost] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showGeneralErrorPopup, setShowGeneralErrorPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    cel: '', // Campo para el número de teléfono
    direccion: '',
    altura: '',
    localidad: '',
    entreCalles: '',
    tipoVivienda: 'casa',
    piso: '',
    contactoReceptor: '',
    notasPedido: '',
  });

  useEffect(() => {
    const fetchCartTotal = async () => {
      try {
        const baseUrl = 'http://localhost:5555';

        console.log('Fetching cart with ID:', cartId);
        const response = await axios.get(`${baseUrl}/get-cart/${cartId}`);
        setTotalCost(response.data.total);
      } catch (error) {
        console.error('Error obteniendo el total del carrito:', error);
      }
    };

    if (cartId) {
      fetchCartTotal();
    }
  }, [cartId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
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
    if (!formData.cel) newErrors.cel = true; // Validación para el número de teléfono
    if (!formData.direccion) newErrors.direccion = true;
    if (!formData.altura) newErrors.altura = true;
    if (!formData.localidad) newErrors.localidad = true;
    if (!formData.entreCalles) newErrors.entreCalles = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const createPreference = async () => {
    try {
      if (!totalCost) {
        throw new Error('El total aún no ha sido cargado');
      }

      const baseUrl =
        process.env.NODE_ENV === 'production'
          ? 'https://artic-gin-server.vercel.app'
          : 'http://localhost:5555';

      const personalData = {
        name: formData.nombre,
        surname: formData.apellido,
        email: formData.email,
        cel: formData.cel,
        address: formData.direccion,
        altura: formData.altura,
        city: formData.localidad,
        streets: formData.entreCalles,
        contact: formData.contactoReceptor || 'N/A',
        notes: formData.notasPedido || 'N/A',
        tipoVivienda: formData.tipoVivienda,
        piso: formData.piso, // Aquí capturamos si es casa o depto
      };

      const response = await axios.post(`${baseUrl}/create-order`, {
        total: totalCost,
        personalData,
        cartId,
      });

      const { id } = response.data;
      return id;
    } catch (error) {
      console.error('Error creando la preferencia:', error);
      setShowGeneralErrorPopup(true);
      return null;
    }
  };

  const handleBuy = async () => {
    if (preferenceId) return; // Evita crear una nueva preferencia si ya existe una
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    } else {
      setIsButtonDisabled(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isButtonDisabled && !preferenceId) {
      // Asegura que solo se haga una vez
      setIsButtonDisabled(true);
      if (validateForm()) {
        await handleBuy();
      } else {
        setShowErrorPopup(true);
      }
      setIsButtonDisabled(false);
    }
  };

  const handleToggle = (type) => {
    setFormData((prevData) => ({
      ...prevData,
      tipoVivienda: type,
    }));
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
              name="cel"
              placeholder="Número de Teléfono"
              value={formData.cel} // Valor para el número de teléfono
              onChange={handleInputChange}
              className={`pay-input-complete ${
                errors.cel ? 'invalid-placeholder' : ''
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
              name="altura"
              placeholder="Altura"
              value={formData.altura}
              onChange={handleInputChange}
              className={`pay-input ${
                errors.altura ? 'invalid-placeholder' : ''
              }`}
            />
          </div>
          <div className="pay-form-row">
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
            <input
              type="text"
              name="entreCalles"
              placeholder="Entre Calles"
              value={formData.entreCalles}
              onChange={handleInputChange}
              className={`pay-input ${
                errors.entreCalles ? 'invalid-placeholder' : ''
              }`}
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
          {!preferenceId && (
            <div className="pay-submit-button-container">
              <img
                src={pagar}
                alt="Pagar"
                className="pay-submit-button"
                onClick={handleSubmit}
                style={{ display: isButtonDisabled ? 'none' : 'block' }}
              />
            </div>
          )}
          {preferenceId && (
            <div className="pay-submit-button-container">
              <Wallet
                initialization={{ preferenceId }}
                customization={{ texts: { valueProp: 'smart_option' } }}
              />
            </div>
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

      {showGeneralErrorPopup && (
        <div className="ups-popup">
          <div className="ups-popup-content">
            <p>Nuestra web tiene un error. Intenta más tarde.</p>
            <button onClick={() => setShowGeneralErrorPopup(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pay;
