import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';

import paymentRoutes from './routes/payment.routes.js';
import cartRoutes from './routes/cart.routes.js';

dotenv.config();

const PORT = process.env.PORT || 5555;
const mongoDBURL = process.env.MONGODB_URL;

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Configuración de CORS con un manejo explícito de OPTIONS
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:5173', 'https://artictv.com'];
  const origin = req.headers.origin;

  // Solo permitimos los orígenes que están en la lista
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  // Si la solicitud es de tipo OPTIONS (preflight), respondemos con 200
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Rutas
app.use(paymentRoutes);
app.use(cartRoutes);

// Archivos estáticos
app.use(express.static(path.resolve('src/public')));

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
