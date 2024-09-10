import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path'; // Para servir archivos estáticos

import paymentRoutes from './routes/payment.routes.js'; // Importa tus rutas de pagos

dotenv.config();

const PORT = process.env.PORT || 5555;
const mongoDBURL = process.env.MONGODB_URL;

// Inicializar la aplicación Express
const app = express();

// Configuración de middlewares
app.use(express.json()); // Parsear JSON
app.use(morgan('dev')); // Middleware para ver las peticiones HTTP

// Middleware para manejo de CORS
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.PROD_FRONTEND_URL
        : 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  })
);

// Rutas
app.use(paymentRoutes); // Agregamos las rutas de pagos

// Servir archivos estáticos si tienes una carpeta pública
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
