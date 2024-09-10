import { MercadoPagoConfig, Preference } from 'mercadopago';
import { MERCADOPAGO_API_KEY } from '../config.js';
import Sale from '../models/Sale.js'; // Importar el modelo de ventas

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
          success: "https://3ea1-181-85-53-220.ngrok-free.app/success",
        },
        notification_url: "https://3ea1-181-85-53-220.ngrok-free.app/webhook",
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
export const receiveWebhook = async (req, res) => {
  try {
    const { id, type } = req.query; // Capturar los datos del webhook
    console.log(req.query); // Para depuración

    if (type === "payment") {
      const data = await mercadopago.payment.findById(id); // Obtener los detalles del pago
      console.log(data); // Ver los datos completos del pago para depuración

      const { status, order } = data.body; // Extraer el estado y el ID de la orden

      // Actualizar la venta correspondiente en MongoDB
      const sale = await Sale.findOne({ cartId: order.id }); // Buscar la venta con el cartId correspondiente

      if (sale) {
        sale.paymentStatus = status; // Actualizar el estado de la venta con el estado del pago
        await sale.save(); // Guardar los cambios en la base de datos

        // Aquí se podría enviar el correo de confirmación, si es necesario.
        // await sendConfirmationEmail(sale.personalData.email, sale);
      }
    }

    res.sendStatus(204); // Devolver estado 204 (No Content) para indicar que el webhook fue procesado
  } catch (error) {
    console.error('Error al procesar el webhook:', error);
    return res.status(500).json({ message: "Error al procesar el webhook", error: error.message });
  }
};
