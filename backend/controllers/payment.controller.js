import { MercadoPagoConfig, Preference } from 'mercadopago';
import { MERCADOPAGO_API_KEY } from '../config.js';
import Sale from '../models/Sale.js';

// Crear una instancia del cliente Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: MERCADOPAGO_API_KEY,  // Verifica que esta clave esté correctamente configurada
});

export const createOrder = async (req, res) => {
  try {
    const { total } = req.body;

    if (!total) {
      return res.status(400).json({ message: "El total es obligatorio" });
    }

    // Crear preferencia de Mercado Pago
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [{
          title: 'ARTIC GIN',
          quantity: 1,
          unit_price: parseFloat(total),
          currency_id: "ARS"
        }],
        back_urls: {
          success: "https://3ea1-181-85-53-220.ngrok-free.app/success",
        },
        notification_url: "https://3ea1-181-85-53-220.ngrok-free.app/webhook",
      },
    });

    res.json({ message: "Payment created", id: result.id });
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    res.status(500).json({ message: "Error al crear la preferencia", error: error.message });
  }
};


export const receiveWebhook = async (req, res) => {
  try {
    const payment = req.query;
    console.log(payment);
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      console.log(data);
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
