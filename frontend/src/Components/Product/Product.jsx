import './Product.css';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';
import { useState } from 'react';

const Product = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  initMercadoPago('TEST-1f94ee66-30a0-491b-916b-26aea01fd9f3', {
    locale: 'es_AR',
  });

  const createPreference = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/create_preference',
        {
          title: 'Gin Artesanal 1',
          quantity: 1,
          unit_price: 1000,
        }
      );
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };
  return (
    <div className="container">
      <div className="product-description">
        <img src="/src/assets/product.webp" alt="Botella de Gin Artesanal" />
        <p>Gin Artesanal 1</p>
        <button onClick={handleBuy}>Comprar</button>
        {preferenceId && (
          <Wallet
            initialization={{
              preferenceId: preferenceId,
              redirectMode: 'modal',
            }}
            customization={{ texts: { valueProp: 'smart_option' } }}
          />
        )}
      </div>
    </div>
  );
};

export default Product;
