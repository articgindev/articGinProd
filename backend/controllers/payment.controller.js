import { MercadoPagoConfig, Preference } from 'mercadopago';
import { MERCADOPAGO_API_KEY } from '../config.js';
import Sale from '../models/Sale.js'; // Importar el modelo de ventas
import crypto from 'crypto';


// Crear una instancia del cliente Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: MERCADOPAGO_API_KEY,  // Verifica que esta clave esté correctamente configurada
});

// Controlador para crear una nueva orden de pago
export const createOrder = async (req, res) => {
  try {
    const { total, personalData, cartId } = req.body;

    // Validación de los datos
    if (!total || !personalData || !cartId) {
      return res.status(400).json({ message: "Datos incompletos" });
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
          success: "https://artictv.com", // Cambia esta URL por la correcta para redireccionar tras éxito
        },
        notification_url: `https://5704-181-85-45-218.ngrok-free.app/webhook`, // Utiliza la variable de entorno para la URL de notificación
      },
    });

    // Guardar la venta en la base de datos
    const newSale = new Sale({
      cartId,
      total,
      personalData,
      paymentStatus: 'pending',
    });

    await newSale.save();

    res.json({ message: "Payment created", id: result.id });
  } catch (error) {
    console.error("Error al crear la preferencia:", error);
    res.status(500).json({ message: "Error al crear la preferencia", error: error.message });
  }
};

// Controlador para procesar el webhook de Mercado Pago

// Controlador para procesar el webhook de Mercado Pago
export const receiveWebhook = (req, res) => {
  try {
    // Mostrar los datos del webhook sin validación adicional
    console.log("Datos recibidos en el webhook (query):", req.query);
    console.log("Cuerpo completo del webhook:", req.body);

    // Responder con un estado 200 OK para confirmar la recepción
    res.sendStatus(200); // Aceptar el webhook
  } catch (error) {
    console.error('Error al procesar el webhook:', error);
    return res.status(500).json({ message: "Error al procesar el webhook", error: error.message });
  }
};



