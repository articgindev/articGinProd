// src/config.js
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

export const PORT = process.env.PORT;
export const mongoDBURL = process.env.MONGODB_URL;
export const MERCADOPAGO_API_KEY = process.env.MERCADOPAGO_API_KEY;