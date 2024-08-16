import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './Shop.css';
import Menu from './Menu';
import back from '../assets/shop/back.png';
import batch from '../assets/shop/batch.png';
import less from '../assets/shop/less.png';
import more from '../assets/shop/more.png';
import addToCart from '../assets/shop/addToCart.png';
import productDescript from '../assets/shop/productDescript.png';
import cartFilled from '../assets/shop/cartFilled.png';
import cartNotFilled from '../assets/shop/cartNotFIlled.png';
import bottle from '../assets/shop/bottle.png';
import h1Logo from '../assets/logos/h1Logo.png';

const ShopComponent = () => {
  const [quantity, setQuantity] = useState(1);
  const [isCartFilled, setIsCartFilled] = useState(false);
  const unitPrice = 16000;
  const navigate = useNavigate(); // Usa el hook useNavigate

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);
  const handleAddToCart = () => setIsCartFilled(true);

  const handleBackClick = () => {
    navigate('/'); // Navega a la ruta base (localhost:5173)
  };

  return (
    <div className="shop-container">
      <Menu className="shop-menu-button" />
      <div className="shop-sub-container">
        <div className="shop-header">
          <img src={h1Logo} alt="Artic Gin Logo" className="shop-logo" />
          <img
            src={back}
            alt="Back"
            className="shop-back-button"
            onClick={handleBackClick} // Añade el evento onClick para el botón "back"
          />
        </div>
        <div className="shop-main">
          <img src={bottle} alt="Bottle" className="shop-bottle" />
          <img src={batch} alt="Batch Number" className="shop-batch-number" />
          <img
            src={productDescript}
            alt="Product Description"
            className="shop-product-description"
          />
          <div className="shop-price">
            <p>- ${unitPrice * quantity} ARS -</p>
          </div>
          <div className="shop-quantity-control">
            <img src={less} alt="Decrease Quantity" onClick={handleDecrease} />
            <p>{quantity}</p>
            <img src={more} alt="Increase Quantity" onClick={handleIncrease} />
          </div>
          <img
            src={addToCart}
            alt="Add to Cart"
            className="shop-add-to-cart"
            onClick={handleAddToCart}
          />
          <img
            src={isCartFilled ? cartFilled : cartNotFilled}
            alt="Cart"
            className="shop-cart-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default ShopComponent;
