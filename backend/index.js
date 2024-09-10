import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';

import paymentRoutes from './routes/payment.routes.js'; // Importa tus rutas de pagos
import cartRoutes from './routes/cart.routes.js'; // Importa las rutas de carrito

dotenv.config();

const PORT = process.env.PORT || 5555;
const mongoDBURL = process.env.MONGODB_URL;

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// CORS: Configuración dinámica basada en el entorno
const allowedOrigins = [
  'http://localhost:5173', // Origen de desarrollo
  "https://artictv.com" // Origen de producción
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir solicitudes sin origen (por ejemplo, desde Postman)
      if (!origin) return callback(null, true);

      // Verificar si el origen está en la lista permitida
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('No permitido por CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Permitir envío de cookies si es necesario
  })
);

// Manejar solicitudes preflight OPTIONS
app.options('*', cors());

// Rutas
app.use(paymentRoutes);
app.use(cartRoutes); // Agrega las rutas del carrito

// Archivos estáticos
app.use(express.static(path.resolve('src/public')));

// Conexión a la base de datos
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error en la conexión a la base de datos:', error);
  });
