import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';

import cartRoutes from './routes/cart.routes.js'; // Importar rutas de carrito
import paymentRoutes from './routes/payment.routes.js'; // Importar rutas de carrito

dotenv.config();

const PORT = process.env.PORT || 5555;
const mongoDBURL = process.env.MONGODB_URL;

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Configuración de CORS usando encabezados manuales
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:5173', // Permitir el origen local para desarrollo
    'https://www.artictv.com', // Permitir el origen en producción
  ];
  const origin = req.headers.origin;

  // Comprobar si el origen está en la lista permitida
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Permitir cookies/credenciales
  }

  // Si la solicitud es de tipo OPTIONS, responder con éxito inmediato
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Rutas
app.use(cartRoutes); // Usar las rutas de carrito
app.use(paymentRoutes); // Registrar la ruta /create-order

// Conexión a la base de datos
mongoose.connect(mongoDBURL)
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error en la conexión a la base de datos:', error);
  });
