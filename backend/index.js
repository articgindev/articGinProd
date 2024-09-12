import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors'; // Añadir cors para gestionar las políticas CORS

import cartRoutes from './routes/cart.routes.js'; // Importar rutas de carrito

dotenv.config();

const PORT = process.env.PORT || 5555;
const mongoDBURL = process.env.MONGODB_URL;

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Configuración de CORS
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://localhost:5173',
    'https://www.artictv.com',
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});


// Rutas
app.use(cartRoutes); // Usar las rutas de carrito
app.use(paymentRoutes);  // Registrar la ruta /create-order


// Conexión a la base de datos
mongoose.connect(mongoDBURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto: ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error en la conexión a la base de datos:', error);
  });
