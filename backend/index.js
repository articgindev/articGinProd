import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from 'path';
import fs from 'fs'; // Asegúrate de importar fs si no lo tienes ya

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
  const allowedOrigins = [
    'http://localhost:5173',
    'https://www.artictv.com'
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

// OAuth2 callback route
app.get('/oauth2callback', (req, res) => {
  const code = req.query.code;
  if (code) {
    oAuth2Client.getToken(code, (err, token) => {
      if (err) {
        return res.status(500).send('Error al recuperar el token');
      }
      oAuth2Client.setCredentials(token);
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
      res.send('Autenticación completada, token guardado.');
    });
  } else {
    res.status(400).send('No se recibió ningún código de autorización');
  }
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
