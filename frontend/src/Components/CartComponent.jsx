import React, { useState } from 'react';
import './CartComponent.css';
import back from '../assets/shop/back.png';
import cartFilled from '../assets/shop/cartFilled.png';
import cartBotella from '../assets/cart/cartBotella.png';
import cartUnidades from '../assets/cart/cartUnidades.png';
import less from '../assets/shop/less.png';
import more from '../assets/shop/more.png';
import productDescript from '../assets/cart/productDescript.png';

const CartComponent = ({
  quantity,
  total,
  cartId,
  onBackClick,
  onUpdateQuantity,
}) => {
  const [postalCode, setPostalCode] = useState(''); // Estado para almacenar el código postal
  const [shippingCost, setShippingCost] = useState(null); // Estado para almacenar el costo de envío
  const [cartQuantity, setCartQuantity] = useState(quantity); // Estado para la cantidad

  const handlePostalCodeChange = (e) => {
    setPostalCode(e.target.value); // Actualiza el código postal cuando el usuario lo ingresa
  };

  const handleCalculateShipping = async () => {
    try {
      console.log('handleCalculateShipping llamado.');

      // Nombre de la hoja
      const sheetName = 'Shipping';

      // Rango de los códigos postales
      const postalCodeRange = `sCodigoPostal`;

      // Rango de las tarifas según el código postal
      const tariffRange = `sTarifaSegunCodigo`;

      // Obtener los códigos postales
      const postalCodeResponse = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/142FhHrGYBWpp9mxQ0L2uiEY6kMlVmT86Nykxpn05Z10/values/${postalCodeRange}?key=AIzaSyArIIUeoXg-HXER9xCLcavWwXYToSq61Hw`
      );

      if (!postalCodeResponse.ok) {
        throw new Error(
          'Error al obtener los códigos postales de Google Sheets'
        );
      }

      const postalCodeData = await postalCodeResponse.json();
      console.log('Datos de códigos postales recibidos:', postalCodeData);

      const postalCodeRows = postalCodeData.values;
      console.log('Códigos postales obtenidos:', postalCodeRows);

      // Obtener las tarifas
      const tariffResponse = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/142FhHrGYBWpp9mxQ0L2uiEY6kMlVmT86Nykxpn05Z10/values/${tariffRange}?key=AIzaSyArIIUeoXg-HXER9xCLcavWwXYToSq61Hw`
      );

      if (!tariffResponse.ok) {
        throw new Error('Error al obtener las tarifas de Google Sheets');
      }

      const tariffData = await tariffResponse.json();
      console.log('Datos de tarifas recibidos:', tariffData);

      const tariffRows = tariffData.values;
      console.log('Tarifas obtenidas:', tariffRows);

      // Encuentra el índice del código postal ingresado
      const index = postalCodeRows.findIndex((row) => row[0] === postalCode);
      console.log('Índice del código postal encontrado:', index);

      if (index !== -1) {
        const calculatedCost = tariffRows[index][0]; // Obtener la tarifa correspondiente
        console.log('Costo de envío calculado:', calculatedCost);
        setShippingCost(calculatedCost);
      } else {
        console.log('Código postal no encontrado.');
        setShippingCost('Código postal no encontrado');
      }
    } catch (error) {
      console.error('Error al calcular el costo de envío:', error);
      setShippingCost('Error al calcular el costo de envío');
    }
  };

  const handleIncrease = () => {
    const newQuantity = cartQuantity + 1;
    setCartQuantity(newQuantity);
    onUpdateQuantity(newQuantity); // Actualiza la cantidad en ShopComponent
  };

  const handleDecrease = () => {
    if (cartQuantity > 1) {
      const newQuantity = cartQuantity - 1;
      setCartQuantity(newQuantity);
      onUpdateQuantity(newQuantity); // Actualiza la cantidad en ShopComponent
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
              <form className="discount-form">
                <input
                  type="text"
                  id="discountCode"
                  name="discountCode"
                  placeholder="CÓDIGO DE DESCUENTO"
                  onFocus={() =>
                    document.getElementById('discountCode').focus()
                  }
                />
              </form>
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
