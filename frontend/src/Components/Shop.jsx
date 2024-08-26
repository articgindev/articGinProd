import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Shop.css';
import Menu from './Menu';
import CartComponent from './CartComponent';
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
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isCartFilled, setIsCartFilled] = useState(false);
  const [cartId, setCartId] = useState(null);
  const unitPrice = 16000;

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);

  const handleAddToCart = () => {
    setIsCartFilled(true);
  };

  const handleShowCart = () => {
    if (isCartFilled) {
      const newCartId = uuidv4();
      setCartId(newCartId);
      setIsCartVisible(true);
    }
  };

  const handleHideCart = () => {
    setIsCartVisible(false); // Oculta el CartComponent
  };

  const handleUpdateQuantity = (newQuantity) => {
    setQuantity(newQuantity); // Actualiza la cantidad en ShopComponent
  };

  return (
    <div className="shop-container">
      <Menu className="shop-menu-button" />
      <div
        className={`shop-sub-container ${
          isCartVisible ? 'blur-background' : ''
        }`}
      >
        <div className="shop-header">
          <img src={h1Logo} alt="Artic Gin Logo" className="shop-logo" />
          <img src={back} alt="Back" className="shop-back-button" />
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
          <div className="shop-addTocart-container">
            <img
              src={isCartFilled ? cartFilled : cartNotFilled}
              alt="Cart"
              className="shop-cart-icon"
              onClick={handleShowCart}
            />
            <img
              src={addToCart}
              alt="Add to Cart"
              className="shop-add-to-cart"
              onClick={handleAddToCart}
            />
          </div>
        </div>
      </div>
      {isCartVisible && (
        <CartComponent
          quantity={quantity}
          total={unitPrice * quantity}
          cartId={cartId}
          onUpdateQuantity={handleUpdateQuantity} // Pasamos la función para actualizar la cantidad
          onBackClick={handleHideCart} // Pasamos la función para ocultar el CartComponent
        />
      )}
    </div>
  );
};

export default ShopComponent;
