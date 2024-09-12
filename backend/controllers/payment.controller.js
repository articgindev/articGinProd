import { MercadoPagoConfig, Preference } from 'mercadopago';
import { MERCADOPAGO_API_KEY } from '../config.js';
import Sale from '../models/Sale.js'; // Importar el modelo de ventas
import axios from 'axios';
import Payment from '../models/Payment.js'; // Importar el modelo de pagos
import { writeToSheet } from '../writeGs.js';


// Crear una instancia del cliente Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: MERCADOPAGO_API_KEY, // Verifica que esta clave esté correctamente configurada
});


// Controlador para crear una nueva orden de pago
export const createOrder = async (req, res) => {
  try {
    const { total, personalData, cartId } = req.body;

    // Validación de los datos
    if (!total || !personalData || !cartId) {
      return res.status(400).json({ message: 'Datos incompletos' });
    }

    // Crear un externalReference usando ciertos campos de personalData
    const externalReference = `${personalData.email}`;

    // Crear preferencia de Mercado Pago
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [
          {
            title: 'ARTIC GIN',
            quantity: 1,
            unit_price: parseFloat(total),
            currency_id: 'ARS',
          },
        ],
        back_urls: {
          success: 'https://artictv.com/success',
        },
        notification_url: `https://artic-gin-server.vercel.app/webhook`,
        external_reference: externalReference,
      },
    });

    console.log('Respuesta completa de Mercado Pago:', result);

    // Guardar la venta en la base de datos
    const newSale = new Sale({
      cartId,
      total,
      personalData,
      paymentStatus: 'pending',
      external_reference: externalReference,
    });

    await newSale.save();

    res.json({ message: 'Payment created', id: result.id });
  } catch (error) {
    console.error('Error al crear la preferencia:', error);
    res.status(500).json({ message: 'Error al crear la preferencia', error: error.message });
  }
};

export const receiveWebhook = async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      const paymentId = data.id;

      // Consulta a la API de Mercado Pago para obtener más detalles del pago
      const response = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${MERCADOPAGO_API_KEY}`,
        },
      });

      const paymentData = response.data;

      // Verificar si el pago ya fue guardado previamente
      const existingPayment = await Payment.findOne({ paymentId });
      if (existingPayment) {
        console.log(`El pago con ID ${paymentId} ya fue procesado.`);
        return res.status(200).send('Payment already processed');
      }

      // Crear un nuevo registro del pago en la base de datos
      const newPayment = new Payment({
        paymentId: paymentData.id,
        status: paymentData.status,
        dateCreated: paymentData.date_created,
        total: paymentData.transaction_amount,
        external_reference: paymentData.external_reference || 'No reference',
      });

      await newPayment.save();
      console.log(`Pago con ID ${paymentId} guardado correctamente.`);

      // Prepara los datos para Google Sheets
      const values = [
        [
          newPayment.paymentId,
          newPayment.status,
          newPayment.total,
          newPayment.external_reference,
          newPayment.dateCreated.toISOString(),
        ]
      ];

      // Agrega logs antes de llamar a writeToSheet
      console.log('Preparando para escribir en Google Sheets...');

      // Escribir los datos en Google Sheets
      await writeToSheet(values);

      console.log('Datos escritos exitosamente en Google Sheets.');

      res.status(200).send('Payment processed successfully');
    } else {
      res.status(400).send('Tipo de evento no soportado');
    }
  } catch (error) {
    console.error('Error al procesar el webhook:', error);
    res.status(500).json({ message: 'Error al procesar el webhook', error: error.message });
  }
};