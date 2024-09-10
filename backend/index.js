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

app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:5173',
    'https://artictv.com'
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', true); // Si usas cookies o tokens de autorización
  next();
});

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
