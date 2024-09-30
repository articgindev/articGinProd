import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'; // Import cors for handling CORS

import cartRoutes from './routes/cart.routes.js';
import paymentRoutes from './routes/payment.routes.js';

dotenv.config();

const PORT = process.env.PORT || 5555;
const mongoDBURL = process.env.MONGODB_URL;

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Configuración de CORS usando cors middleware
const allowedOrigins = [
  'http://localhost:5173',
  'https://www.artictv.com',
];

app.use(cors({
  origin: function (origin, callback) {
    // Si no hay origen o el origen está en la lista de permitidos, permite la solicitud
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // Permitir cookies o credenciales en las solicitudes
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
}));

// Rutas
app.use(cartRoutes); // Usar las rutas de carrito
app.use(paymentRoutes); // Usar las rutas de pago

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
