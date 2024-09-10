import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import back from '../assets/shop/back.png';
import comprar from '../assets/cart/cartComprar.png';
import './PayComponent.css';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';

const Pay = () => {
  initMercadoPago('YOUR_PUBLIC_KEY', { locale: 'es-AR' });
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

  const [preferenceId, setPreferenceId] = useState(null);
  const [errors, setErrors] = useState({});
  const [showErrorPopup, setShowErrorPopup] = useState(false);

  useEffect(() => {
    // Cargar los datos del carrito guardados
    const purchaseData = JSON.parse(localStorage.getItem('purchaseData'));
    if (purchaseData) {
      createPreference(purchaseData);
    }
  }, []);

  // Función para crear la preferencia en MercadoPago
  const createPreference = async (purchaseData) => {
    try {
      const response = await axios.post(
        'https://tu-backend.vercel.app/create_preference',
        {
          title: 'Gin Artesanal 1', // O cualquier otro título dinámico
          quantity: purchaseData.cantidad,
          unit_price: purchaseData.importeTotal, // Total a pagar
        }
      );
      const { id } = response.data;
      setPreferenceId(id); // Guarda el preferenceId para el Wallet de MercadoPago
    } catch (error) {
      console.error('Error al crear la preferencia:', error);
    }
  };

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
    if (!formData.direccion) newErrors.direccion = true;
    if (!formData.localidad) newErrors.localidad = true;
    if (!formData.altura) newErrors.altura = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (preferenceId) {
        // Redirigir al checkout de MercadoPago usando el preferenceId
        window.location.href = `https://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${preferenceId}`;
      } else {
        setShowErrorPopup(true);
      }
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
          {/* Formulario */}
          <div className="pay-submit-button-container">
            <img
              src={comprar}
              alt="Pagar"
              className="pay-submit-button"
              onClick={handleSubmit}
            />
          </div>
          {/* Wallet component with preferenceId */}
          {preferenceId && (
            <Wallet
              initialization={{ preferenceId }}
              customization={{ texts: { valueProp: 'smart_option' } }}
            />
          )}
        </form>
      </div>

      {/* Pop-up de error */}
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
