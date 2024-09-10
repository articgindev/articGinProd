import { MercadoPagoConfig, Preference } from 'mercadopago';
import { MERCADOPAGO_API_KEY } from '../config.js';

// Crear una instancia del cliente Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: MERCADOPAGO_API_KEY,
});

export const createOrder = async (req, res) => {
  try {
    // Crear una instancia de Preference utilizando el cliente
    const preference = new Preference(client);

    // Crear la preferencia de pago
    const result = await preference.create({
      body: {
        items: [
          {
            title: 'ARTIC GIN',
            quantity: 1,
            unit_price: 500,
            currency_id: "ARS"
          }
        ],
        notification_url: "https://localhost:5555/webhook",
        back_urls: {
          success: "https://9459-181-85-45-222.ngrok-free.app/success",
          // pending: "https://e720-190-237-16-208.sa.ngrok.io/pending",
          // failure: "https://e720-190-237-16-208.sa.ngrok.io/failure",
        },
      }
    });

    console.log(result);
    res.json({ message: "Payment created", data: result.body });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

export const receiveWebhook = async (req, res) => {
  try {
    // Extraer los parámetros de la query
    const { payment_id, status, merchant_order_id } = req.query;

    // Registrar la información que llega del webhook
    console.log({
      Payment: payment_id,
      Status: status,
      MerchantOrder: merchant_order_id,
    });

    // Responder con el estado 200 y los datos
    res.status(200).json({
      Payment: payment_id,
      Status: status,
      MerchantOrder: merchant_order_id,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};


