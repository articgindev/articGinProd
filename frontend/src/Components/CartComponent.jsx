import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartComponent.css';
import back from '../assets/shop/back.png';
import cartBotella from '../assets/cart/cartBotella.png';
import cartUnidades from '../assets/cart/cartUnidades.png';
import less from '../assets/shop/less.png';
import more from '../assets/shop/more.png';
import productDescript from '../assets/cart/productDescript.png';
import cartOkDesc from '../assets/cart/cartOkDesc.png';
import comprar from '../assets/cart/cartComprar.png';

const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const CartComponent = ({
  quantity,
  cartId,
  onBackClick,
  onUpdateQuantity,
  unitPrice,
}) => {
  const [postalCode, setPostalCode] = useState('');
  const [shippingCost, setShippingCost] = useState('$XX ARS');
  const [cartQuantity, setCartQuantity] = useState(quantity);
  const [discountCode, setDiscountCode] = useState('');
  const [discountValue, setDiscountValue] = useState(0);
  const [calculatedDiscount, setCalculatedDiscount] = useState(0);
  const [pickupDates, setPickupDates] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [showInvalidPostalCodePopup, setShowInvalidPostalCodePopup] =
    useState(false);
  const [showInvalidDiscountPopup, setShowInvalidDiscountPopup] =
    useState(false);
  const [showInvalidDeliveryDatePopup, setShowInvalidDeliveryDatePopup] =
    useState(false);
  const [isPostalCodeInvalid, setIsPostalCodeInvalid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPickupDates = async () => {
      try {
        const dateRange = 'sFechas';
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${dateRange}?key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error('Error fetching pickup dates from Google Sheets');
        }
        const data = await response.json();
        const dates = data.values.flat();
        setPickupDates(dates);
        setSelectedIndex(0);
      } catch (error) {
        console.error('Error fetching pickup dates:', error);
      }
    };
    fetchPickupDates();
  }, []);

  useEffect(() => {
    const discountAmount = (unitPrice * cartQuantity * discountValue) / 100;
    setCalculatedDiscount(discountAmount);
  }, [cartQuantity, discountValue, unitPrice]);

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
    setShippingCost('$XX ARS');
    setIsPostalCodeInvalid(false); // Reset the placeholder color when the user starts typing again
  };

  const handleCalculateShipping = async () => {
    try {
      const postalCodeRange1 = 'sCodigoPostal';
      const postalCodeRange2 = 'sCodigoPostalSinNum';
      const tariffRange = 'sTarifaSegunCodigo';

      const postalCodeResponse1 = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${postalCodeRange1}?key=${API_KEY}`
      );
      const postalCodeData1 = await postalCodeResponse1.json();
      const postalCodeRows1 = postalCodeData1.values;
      let index = postalCodeRows1.findIndex((row) => row[0] === postalCode);

      if (index === -1) {
        const postalCodeResponse2 = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${postalCodeRange2}?key=${API_KEY}`
        );
        const postalCodeData2 = await postalCodeResponse2.json();
        const postalCodeRows2 = postalCodeData2.values;
        index = postalCodeRows2.findIndex((row) => row[0] === postalCode);
      }

      if (index !== -1) {
        const tariffResponse = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${tariffRange}?key=${API_KEY}`
        );
        const tariffData = await tariffResponse.json();
        const calculatedCost = tariffData.values[index][0];
        setShippingCost(`$${calculatedCost} ARS`);
      } else {
        setShowInvalidPostalCodePopup(true);
        setIsPostalCodeInvalid(true); // Marks the CP as invalid to show the placeholder in red
      }
    } catch (error) {
      console.error('Error calculating shipping cost:', error);
      setShippingCost('$XX ARS');
      setShowInvalidPostalCodePopup(true);
      setIsPostalCodeInvalid(true);
    }
  };

  const handleKeyDown = (e, handler) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handler();
    }
  };

  const handleBlur = (handler) => {
    handler();
  };

  const handleIncrease = () => {
    const newQuantity = cartQuantity + 1;
    setCartQuantity(newQuantity);
    onUpdateQuantity(newQuantity);
  };

  const handleDecrease = () => {
    if (cartQuantity > 1) {
      const newQuantity = cartQuantity - 1;
      setCartQuantity(newQuantity);
      onUpdateQuantity(newQuantity);
    }
  };

  const handleApplyDiscount = async () => {
    try {
      const discountRange = 'dCodigoDesc';
      const percentageRange = 'dPorcentajeDesc';

      const discountResponse = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${discountRange}?key=${API_KEY}`
      );
      const discountData = await discountResponse.json();
      const discountRows = discountData.values;

      const percentageResponse = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${percentageRange}?key=${API_KEY}`
      );
      const percentageData = await percentageResponse.json();
      const percentageRows = percentageData.values;

      const index = discountRows.findIndex((row) => row[0] === discountCode);

      if (index !== -1) {
        const discountPercentage = parseFloat(percentageRows[index][0]);
        setDiscountValue(discountPercentage);
        setIsDiscountApplied(true);
      } else {
        setShowInvalidDiscountPopup(true);
        setIsDiscountApplied(false);
        setDiscountValue(0);
        setCalculatedDiscount(0);
      }
    } catch (error) {
      console.error('Error applying discount:', error);
      setShowInvalidDiscountPopup(true);
      setDiscountValue(0);
      setCalculatedDiscount(0);
      setIsDiscountApplied(false);
    }
  };

  const subtotal = (unitPrice * cartQuantity - calculatedDiscount).toFixed(2);
  const shippingCostNumber =
    parseFloat(shippingCost.replace('$', '').replace(' ARS', '')) || 0;
  const totalCost = (parseFloat(subtotal) + shippingCostNumber).toFixed(2);

  const handlePurchase = () => {
    if (shippingCost === '$XX ARS') {
      setShowInvalidPostalCodePopup(true);
      setIsPostalCodeInvalid(true);
      return;
    }

    if (pickupDates[selectedIndex] === 'OTRO') {
      setShowInvalidDeliveryDatePopup(true);
      return;
    }

    const purchaseData = {
      cartId,
      cantidad: cartQuantity,
      descuentoAplicado: discountValue > 0 ? calculatedDiscount : '',
      codigoDescuento: discountValue > 0 ? discountCode : '',
      porcentajeDescuento: discountValue > 0 ? discountValue : '',
      codigoPostal: postalCode,
      costoEnvio: shippingCostNumber,
      fechaEnvio: pickupDates[selectedIndex],
      importeTotal: totalCost,
    };

    localStorage.setItem('purchaseData', JSON.stringify(purchaseData));
    navigate('/pagar');
  };

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-bottle-container">
          <img src={cartBotella} alt="Botella" className="cart-bottle" />
        </div>
        <div className="cart-right-container">
          <div className="cart-header">
            <img
              src={back}
              alt="Back"
              className="cart-back-button"
              onClick={onBackClick}
            />
          </div>
          <div className="cart-unidades">
            <img
              src={cartUnidades}
              alt="Unidades"
              className="cart-unidades-img"
            />
            <div className="cart-quantity-control">
              <img
                src={less}
                alt="Decrease Quantity"
                onClick={handleDecrease}
              />
              <p>{cartQuantity}</p>
              <img
                src={more}
                alt="Increase Quantity"
                onClick={handleIncrease}
              />
            </div>
          </div>
          <div className="cart-description">
            <img
              src={productDescript}
              alt="Description"
              className="cart-description-img"
            />
          </div>
          <div className="cart-discount-form-container">
            <form className="discount-form" onSubmit={handleApplyDiscount}>
              <input
                type="text"
                id="discountCode"
                name="discountCode"
                placeholder="CÓDIGO DE DESCUENTO"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
                onBlur={() => handleBlur(handleApplyDiscount)}
                onKeyDown={(e) => handleKeyDown(e, handleApplyDiscount)}
              />
            </form>
            <img
              src={cartOkDesc}
              alt="okDesc"
              className="cart-descuentoOk-img"
              onClick={handleApplyDiscount}
            />
          </div>
          <div className="cart-cartSubtotal">
            <div className="cart-subtotal-container">
              {isDiscountApplied && (
                <div className="cart-discount-container">
                  <p className="cart-discount-percentage">
                    {discountValue > 0 ? `${discountValue}% OFF` : '0% OFF'}
                  </p>
                  <p className="cart-discount-amount">
                    - ${calculatedDiscount.toFixed(2)} ARS
                  </p>
                </div>
              )}
              <div className="cart-subtotal-values">
                <p className="cart-cartSubtotal-label">Subtotal:</p>
                <p className="cart-cartSubtotal-value">${subtotal} ARS</p>
              </div>
            </div>
          </div>
          <div className="shipping-form">
            <div className="cart-shipping-form-container">
              <p className="cart-cartCP-label">Carga tu CP:</p>
              <form onSubmit={handleCalculateShipping} className="cart-CP-form">
                <input
                  type="text"
                  id="postalCode"
                  placeholder="Código Postal"
                  value={postalCode}
                  onChange={handlePostalCodeChange}
                  onBlur={() => handleBlur(handleCalculateShipping)}
                  onKeyDown={(e) => handleKeyDown(e, handleCalculateShipping)}
                  className={isPostalCodeInvalid ? 'invalid-placeholder' : ''}
                />
              </form>
            </div>
            <div className="cart-CP-cost">
              <p className="shipping-label">Costo de Envío:</p>
              <p className="shipping-value">{shippingCost}</p>
            </div>
          </div>
          <div className="cart-total">
            <p className="cart-label">Total:</p>
            <p className="cart-value">${totalCost} ARS</p>
          </div>
          <div className="cart-end-container">
            <p className="cart-end-label">Día de entrega</p>
            <select
              className="select-date"
              value={selectedIndex}
              onChange={(e) => setSelectedIndex(e.target.value)}
            >
              <option disabled value="">
                Selecciona una fecha
              </option>
              {pickupDates.map((date, index) => (
                <option key={index} value={index}>
                  {date}
                </option>
              ))}
            </select>
          </div>
          <img
            src={comprar}
            alt="Comprar"
            className="cart-comprar-button"
            onClick={handlePurchase}
          />
        </div>
      </div>
      {showInvalidPostalCodePopup && (
        <div className="ups-popup">
          <div className="ups-popup-content">
            <p>
              No reconocemos ese código postal. Por favor, introduce un código
              válido.
            </p>
            <button onClick={() => setShowInvalidPostalCodePopup(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
      {showInvalidDiscountPopup && (
        <div className="ups-popup">
          <div className="ups-popup-content">
            <p>¡UPS! No reconocemos ese código de descuento :(</p>
            <button onClick={() => setShowInvalidDiscountPopup(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
      {showInvalidDeliveryDatePopup && (
        <div className="ups-popup">
          <div className="ups-popup-content">
            <p>
              Nuestra logística trabaja solo viernes y sábados de 14hs a 21hs.
              En breve estaremos agregando más días. Por favor, selecciona una
              fecha de entrega válida.
            </p>
            <button onClick={() => setShowInvalidDeliveryDatePopup(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
