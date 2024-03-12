import './Product.css';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const Product = () => {
  initMercadoPago('YOUR_PUBLIC_KEY');
  return (
    <div className="container">
      <div className="product-description">
        <img src="/src/assets/product.webp" alt="Botella de Gin Artesanal" />
        <p>Gin Artesanal 1</p>
        <button>Comprar</button>
        <Wallet
          initialization={{ preferenceId: '<PREFERENCE_ID>' }}
          customization={{ texts: { valueProp: 'smart_option' } }}
        />
        ;
      </div>
    </div>
  );
};

export default Product;
