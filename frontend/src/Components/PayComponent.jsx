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
    initMercadoPago('APP_USR-da7ab2f6-03c1-4f91-a659-b992782beb11', {
      locale: 'es-AR',
    });
  }, []);

  const navigate = useNavigate();
  const [isWalletVisible, setIsWalletVisible] = useState(false);
  const [totalCost, setTotalCost] = useState(null);
  const [preferenceId, setPreferenceId] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showGeneralErrorPopup, setShowGeneralErrorPopup] = useState(false);
  const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para el loader
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    cel: '',
    direccion: '',
    altura: '',
    localidad: '',
    entreCalles: '',
    tipoVivienda: 'casa',
    piso: '',
    contactoReceptor: '',
    notasPedido: '',
  });
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  useEffect(() => {
    const fetchCartTotal = async () => {
      try {
        const baseUrl = 'http://localhost:5555';
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
    if (!formData.cel) newErrors.cel = true;
    if (!formData.direccion) newErrors.direccion = true;
    if (!formData.altura) newErrors.altura = true;
    if (!formData.localidad) newErrors.localidad = true;
    if (!formData.entreCalles) newErrors.entreCalles = true;
    if (formData.tipoVivienda === 'depto' && !formData.piso) {
      newErrors.piso = true;
    }

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
        piso: formData.piso,
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
    if (validateForm()) {
      setShowConfirmationPopup(true);
    } else {
      setShowErrorPopup(true);
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true); // Inicia el loader
    setShowConfirmationPopup(false);
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
      setIsWalletVisible(true);
    }
    setIsLoading(false); // Finaliza el loader
  };

  const handleEdit = () => {
    setShowConfirmationPopup(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isButtonDisabled && !preferenceId) {
      setIsButtonDisabled(true);
      await handleBuy();
      setIsButtonDisabled(false);
    }
  };

  const handleBack = () => {
    navigate('/cart');
  };

  const handleToggle = (type) => {
    setFormData((prev) => ({
      ...prev,
      tipoVivienda: type,
    }));

    // Si el usuario elige "Casa", limpiar el error de "Piso"
    if (type === 'casa') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        piso: false,
      }));
    }
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
        <form
          className={`pay-form ${isWalletVisible ? 'wallet-visible' : ''}`}
          onSubmit={handleSubmit}
        >
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
              disabled={isFormDisabled}
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
              disabled={isFormDisabled}
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
              disabled={isFormDisabled}
            />
          </div>
          <div className="pay-form-row">
            <input
              type="text"
              name="cel"
              placeholder="Número de Teléfono"
              value={formData.cel}
              onChange={handleInputChange}
              className={`pay-input-complete ${
                errors.cel ? 'invalid-placeholder' : ''
              }`}
              disabled={isFormDisabled}
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
              disabled={isFormDisabled}
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
              disabled={isFormDisabled}
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
              disabled={isFormDisabled}
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
              disabled={isFormDisabled}
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
                disabled={isFormDisabled}
              >
                CASA
              </button>
              <button
                type="button"
                className={`toggle-button ${
                  formData.tipoVivienda === 'depto' ? 'active' : ''
                }`}
                onClick={() => handleToggle('depto')}
                disabled={isFormDisabled}
              >
                DPTO.
              </button>
            </div>

            <input
              type="text"
              name="piso"
              placeholder={
                formData.tipoVivienda === 'depto' ? 'PISO' : 'Piso (opcional)'
              }
              value={formData.piso}
              onChange={handleInputChange}
              className={`pay-input ${
                errors.piso ? 'invalid-placeholder' : ''
              }`}
              disabled={isFormDisabled}
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
              disabled={isFormDisabled}
            />
          </div>
          <div className="pay-form-row">
            <textarea
              name="notasPedido"
              placeholder="Notas del pedido (opcional)"
              value={formData.notasPedido}
              onChange={handleInputChange}
              className="pay-textarea"
              style={{
                borderRadius: '15px',
                resize: 'none',
              }}
              rows="3"
              disabled={isFormDisabled}
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
            <div className="pay-submit-button-container.wallet-visible">
              <Wallet
                initialization={{ preferenceId }}
                customization={{
                  texts: {
                    action: 'pay',
                    valueProp: '',
                  },
                  visual: {
                    buttonBackground: 'black',
                    borderRadius: '100px',
                    valuePropColor: 'grey',
                    verticalPadding: '8px',
                    horizontalPadding: '6px',
                  },
                }}
              />
            </div>
          )}
        </form>
      </div>

      {showConfirmationPopup && (
        <div className="ups-popup">
          <div className="ups-popup-content">
            <p>
              <strong>ATENCIÓN</strong>, para que ARTIC llegue bien a tus manos
              necesitamos que hagas un doble chequeo de tus datos.
            </p>
            <ul>
              <li>
                <strong>Email:</strong> {formData.email}
              </li>
              <li>
                <strong>Teléfono:</strong> {formData.cel}
              </li>
              <li>
                <strong>Dirección:</strong> {formData.direccion}{' '}
                {formData.altura}
              </li>
              <li>
                <strong>Localidad:</strong> {formData.localidad}
              </li>
              <li>
                <strong>Entre Calles:</strong> {formData.entreCalles}
              </li>
              <li>
                <strong>Tipo de Vivienda:</strong>{' '}
                {formData.tipoVivienda === 'casa' ? 'Casa' : 'Depto'}
              </li>
              {formData.tipoVivienda === 'depto' && (
                <li>
                  <strong>Piso:</strong> {formData.piso}
                </li>
              )}
            </ul>
            <div className="popup-actions">
              <button onClick={handleEdit}>Editar</button>
              <button onClick={handleConfirm}>Ok</button>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-bar">
            <div className="loading-progress"></div>
          </div>
        </div>
      )}

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
