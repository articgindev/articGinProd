import React, { useState } from 'react';
import './CartComponent.css';
import back from '../assets/shop/back.png';
import cartFilled from '../assets/shop/cartFilled.png';
import cartBotella from '../assets/cart/cartBotella.png';
import cartUnidades from '../assets/cart/cartUnidades.png';
import less from '../assets/shop/less.png';
import more from '../assets/shop/more.png';
import productDescript from '../assets/cart/productDescript.png';
import cartOkDesc from '../assets/cart/cartOkDesc.png';

// Use environment variables for the API key and Spreadsheet ID
const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const CartComponent = ({
  quantity,
  total,
  cartId,
  onBackClick,
  onUpdateQuantity,
}) => {
  const [postalCode, setPostalCode] = useState('');
  const [shippingCost, setShippingCost] = useState(null);
  const [cartQuantity, setCartQuantity] = useState(quantity);
  const [discountCode, setDiscountCode] = useState('');
  const [discountValue, setDiscountValue] = useState(null);
  const [calculatedDiscount, setCalculatedDiscount] = useState(null);

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
  };

  const handleCalculateShipping = async () => {
    try {
      const postalCodeRange = 'sCodigoPostal';
      const tariffRange = 'sTarifaSegunCodigo';

      const postalCodeResponse = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${postalCodeRange}?key=${API_KEY}`
      );

      if (!postalCodeResponse.ok) {
        throw new Error('Error fetching postal codes from Google Sheets');
      }

      const postalCodeData = await postalCodeResponse.json();
      const postalCodeRows = postalCodeData.values;

      const tariffResponse = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${tariffRange}?key=${API_KEY}`
      );

      if (!tariffResponse.ok) {
        throw new Error('Error fetching tariffs from Google Sheets');
      }

      const tariffData = await tariffResponse.json();
      const tariffRows = tariffData.values;

      const index = postalCodeRows.findIndex((row) => row[0] === postalCode);

      if (index !== -1) {
        const calculatedCost = tariffRows[index][0];
        setShippingCost(calculatedCost);
      } else {
        setShippingCost('Postal code not found');
      }
    } catch (error) {
      console.error('Error calculating shipping cost:', error);
      setShippingCost('Error calculating shipping cost');
    }
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

  const handleDiscountCodeChange = (e) => {
    setDiscountCode(e.target.value);
  };

  //BUSCADOR DE DESCUENTOS

  const handleApplyDiscount = async () => {
    try {
      const discountRange = 'dCodigoDesc';
      const percentageRange = 'dPorcentajeDesc';

      const discountResponse = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${discountRange}?key=${API_KEY}`
      );

      if (!discountResponse.ok) {
        throw new Error('Ups, no reconocemos ese codigo :( ');
      }

      const discountData = await discountResponse.json();
      const discountRows = discountData.values;

      const percentageResponse = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${percentageRange}?key=${API_KEY}`
      );
      if (!percentageResponse.ok) {
        throw new Error(
          'Error fetching discount percentages from Google Sheets'
        );
      }

      const percentageData = await percentageResponse.json();
      const percentageRows = percentageData.values;

      const index = discountRows.findIndex((row) => row[0] === discountCode);

      if (index !== -1) {
        const discountPercentage = parseFloat(percentageRows[index][0]);
        const discountAmount = (total * discountPercentage) / 100;
        setDiscountValue(discountPercentage);
        setCalculatedDiscount(discountAmount);
      } else {
        setDiscountValue('Invalid discount code');
      }
    } catch (error) {
      console.error('Error applying discount code:', error);
      setDiscountValue('Error applying discount code');
    }
  };

  // Handle focus and blur for discount code input
  const handleFocus = (e) => {
    e.target.placeholder = '';
  };

  const handleBlur = (e) => {
    if (e.target.value === '') {
      e.target.placeholder = 'CÓDIGO DE DESCUENTO';
    }
  };

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-sub-container">
          <div className="cart-header">
            <img
              src={back}
              alt="Back"
              className="cart-back-button"
              onClick={onBackClick}
            />
            <img src={cartFilled} alt="Cart" className="cart-icon" />
          </div>
          <div className="cart-main">
            <div className="cart-bottle-container">
              <img src={cartBotella} alt="Botella" className="cart-bottle" />
            </div>
            <div className="cart-right-container">
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
                <form className="discount-form">
                  <input
                    type="text"
                    id="discountCode"
                    name="discountCode"
                    placeholder="CÓDIGO DE DESCUENTO"
                    value={discountCode}
                    onChange={handleDiscountCodeChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
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
                  <div className="cart-discount-container">
                    {discountValue && typeof discountValue === 'string' && (
                      <p className="cart-discount-text">{discountValue}</p>
                    )}
                    {discountValue && typeof discountValue === 'number' && (
                      <p className="cart-discount-percentage">
                        {discountValue}% OFF
                      </p>
                    )}
                    {calculatedDiscount !== null && (
                      <p className="cart-discount-amount">
                        - ${calculatedDiscount.toFixed(2)} ARS
                      </p>
                    )}
                  </div>
                  <div className="cart-subtotal-values">
                    <p className="cart-cartSubtotal-label">Subtotal:</p>
                    <p className="cart-cartSubtotal-value">${total} ARS</p>
                  </div>
                </div>
              </div>
              {/* <p>Cantidad: {quantity || 0}</p>
              <p>Total: ${total || 0} ARS</p> */}
              {/* <div className="shipping-form">
                <label htmlFor="postalCode">Método de Envío:</label>
                <input
                  type="text"
                  id="postalCode"
                  placeholder="Código Postal"
                  value={postalCode}
                  onChange={handlePostalCodeChange}
                />
                <button onClick={handleCalculateShipping}>
                  Calcular Envío
                </button>
              </div> */}
              {/* Muestra el costo de envío si está calculado */}
              {shippingCost !== null && (
                <p>Costo de Envío: ${shippingCost} ARS</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;
