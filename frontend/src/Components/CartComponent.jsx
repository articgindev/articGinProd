import React, { useState, useEffect, useRef } from 'react';
import './CartComponent.css';
import back from '../assets/shop/back.png';
import cartFilled from '../assets/shop/cartFilled.png';
import cartBotella from '../assets/cart/cartBotella.png';
import cartUnidades from '../assets/cart/cartUnidades.png';
import less from '../assets/shop/less.png';
import more from '../assets/shop/more.png';
import productDescript from '../assets/cart/productDescript.png';
import cartOkDesc from '../assets/cart/cartOkDesc.png';

const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

const CartComponent = ({
  quantity,
  total,
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
  const [isDiscountVisible, setIsDiscountVisible] = useState(false);
  const [showUpsPopup, setShowUpsPopup] = useState(false);
  const [showDiscountPopup, setShowDiscountPopup] = useState(false);
  const [pickupDates, setPickupDates] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scrollRef = useRef(null); // Referencia al contenedor de scroll

  useEffect(() => {
    // Bloquear el scroll del fondo cuando el carrito está abierto
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; // Deshabilitar scroll de fondo

    return () => {
      document.body.style.overflow = originalOverflow; // Restaurar el scroll de fondo
    };
  }, []);

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

  // Nueva función para ajustar el scroll al elemento más cercano
  const adjustScrollPosition = () => {
    if (scrollRef.current) {
      const itemHeight = scrollRef.current.firstChild.clientHeight;
      const scrollTop = scrollRef.current.scrollTop;
      const nearestIndex = Math.round(scrollTop / itemHeight);
      scrollRef.current.scrollTo({
        top: nearestIndex * itemHeight,
        behavior: 'smooth',
      });
      setSelectedIndex(nearestIndex);
    }
  };

  const handleScroll = (e) => {
    const container = e.target;
    const itemHeight = container.firstChild.clientHeight;
    const scrollTop = container.scrollTop;
    const newIndex = Math.round(scrollTop / itemHeight);
    setSelectedIndex(newIndex);
  };

  const handleScrollStop = () => {
    adjustScrollPosition(); // Ajusta el scroll al elemento más cercano cuando el scroll se detiene
  };

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value);
    setShippingCost('$XX ARS');
    setShowUpsPopup(false);
  };

  const handleCalculateShipping = async (e) => {
    e.preventDefault();
    try {
      const postalCodeRange1 = 'sCodigoPostal';
      const postalCodeRange2 = 'sCodigoPostalSinNum';
      const tariffRange = 'sTarifaSegunCodigo';

      const postalCodeResponse1 = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${postalCodeRange1}?key=${API_KEY}`
      );

      if (!postalCodeResponse1.ok) {
        throw new Error('Error fetching postal codes from Google Sheets');
      }

      const postalCodeData1 = await postalCodeResponse1.json();
      const postalCodeRows1 = postalCodeData1.values;
      let index = postalCodeRows1.findIndex((row) => row[0] === postalCode);

      if (index === -1) {
        const postalCodeResponse2 = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${postalCodeRange2}?key=${API_KEY}`
        );

        if (!postalCodeResponse2.ok) {
          throw new Error(
            'Error fetching postal codes from Google Sheets (second range)'
          );
        }

        const postalCodeData2 = await postalCodeResponse2.json();
        const postalCodeRows2 = postalCodeData2.values;
        index = postalCodeRows2.findIndex((row) => row[0] === postalCode);
      }

      if (index !== -1) {
        const tariffResponse = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${tariffRange}?key=${API_KEY}`
        );

        if (!tariffResponse.ok) {
          throw new Error('Error fetching tariffs from Google Sheets');
        }

        const tariffData = await tariffResponse.json();
        const tariffRows = tariffData.values;
        const calculatedCost = tariffRows[index][0];
        setShippingCost(`$${calculatedCost} ARS`);
      } else {
        setShippingCost('$XX ARS');
        setShowUpsPopup(true);
      }
    } catch (error) {
      console.error('Error calculating shipping cost:', error);
      setShippingCost('$XX ARS');
      setShowUpsPopup(true);
    }

    document.activeElement.blur();
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

  const handleApplyDiscount = async (e) => {
    if (e) e.preventDefault();

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
        setDiscountValue(discountPercentage);
        setShowDiscountPopup(false); // Oculta el pop-up de descuento
      } else {
        setDiscountValue(0);
        setCalculatedDiscount(0);
        setShowDiscountPopup(true); // Muestra el pop-up de descuento
      }
    } catch (error) {
      console.error('Ups, no reconocemos ese codigo :(', error);
      setDiscountValue(0);
      setCalculatedDiscount(0);
      setShowDiscountPopup(true); // Muestra el pop-up de descuento
    }

    document.activeElement.blur();
  };

  const handleFocus = (e) => {
    e.target.placeholder = '';
    setIsDiscountVisible(true);
  };

  const handleBlur = (e) => {
    if (e.target.value === '') {
      e.target.placeholder = 'CÓDIGO DE DESCUENTO';
      setIsDiscountVisible(false);
    }
  };

  const subtotal = (unitPrice * cartQuantity - calculatedDiscount).toFixed(2);

  const getShippingCostNumber = () => {
    const costNumber = parseFloat(
      shippingCost.replace('$', '').replace(' ARS', '')
    );
    return isNaN(costNumber) ? 0 : costNumber;
  };

  const totalCost = parseFloat(subtotal) + getShippingCostNumber();

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
                <form className="discount-form" onSubmit={handleApplyDiscount}>
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
                  <div
                    className="cart-discount-container"
                    style={{
                      visibility:
                        discountValue > 0 && !showDiscountPopup
                          ? 'visible'
                          : 'hidden', // Se muestra solo si hay descuento y no hay pop-up
                    }}
                  >
                    {typeof discountValue === 'number' &&
                      discountValue === 0 &&
                      calculatedDiscount === 0 && (
                        <>
                          <p className="cart-discount-percentage">0% OFF</p>
                          <p className="cart-discount-amount">- $0.00 ARS</p>
                        </>
                      )}
                    {typeof discountValue === 'number' && discountValue > 0 && (
                      <>
                        <p className="cart-discount-percentage">
                          {discountValue}% OFF
                        </p>
                        <p className="cart-discount-amount">
                          - ${calculatedDiscount.toFixed(2)} ARS
                        </p>
                      </>
                    )}
                    {typeof discountValue === 'string' && (
                      <p className="discount-error">{discountValue}</p>
                    )}
                  </div>
                  <div className="cart-subtotal-values">
                    <p className="cart-cartSubtotal-label">Subtotal:</p>
                    <p className="cart-cartSubtotal-value">${subtotal} ARS</p>
                  </div>
                </div>
              </div>
              <div className="shipping-form">
                <div className="cart-shipping-form-container">
                  <p className="cart-cartCP-label">Carga tu CP:</p>
                  <form
                    onSubmit={handleCalculateShipping}
                    className="cart-CP-form"
                  >
                    <input
                      type="text"
                      id="postalCode"
                      placeholder="Código Postal"
                      value={postalCode}
                      onChange={handlePostalCodeChange}
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
                <p className="cart-value">${totalCost.toFixed(2)} ARS</p>
              </div>
            </div>
          </div>
        </div>
        <div className="cart-end-container">
          <p className="cart-end-label">Día de entrega</p>
          <div className="date-picker">
            <div
              className="date-scroll"
              onScroll={handleScroll}
              ref={scrollRef}
              onTouchEnd={handleScrollStop} // Ajustar scroll al detener
            >
              {pickupDates.map((date, index) => (
                <div
                  key={index}
                  className={`date-item ${
                    index === selectedIndex ? 'selected' : ''
                  }`}
                >
                  {date}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {showUpsPopup && (
        <div className="ups-popup">
          <div className="ups-popup-content">
            <p>
              ¡UPS! Aun no llegamos a esa zona, pero no te quedes con las ganas.
              Queremos que pueda llegar a tus manos. Háblanos por Instagram
              @artic.tv
            </p>
            <button onClick={() => setShowUpsPopup(false)}>Cerrar</button>
          </div>
        </div>
      )}
      {showDiscountPopup && (
        <div className="ups-popup">
          <div className="ups-popup-content">
            <p>¡UPS! No reconocemos ese código de descuento :(</p>
            <button onClick={() => setShowDiscountPopup(false)}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartComponent;
