import { google } from 'googleapis';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Convertir la clave privada que contiene saltos de línea para que sea válida
const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

// Inicializa GoogleAuth usando las credenciales del archivo .env
const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: privateKey,
    project_id: process.env.GOOGLE_PROJECT_ID,
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

// Función asíncrona para apendear datos en la hoja de Google Sheets
export async function writeToSheet(values) {
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.VITE_SPREADSHEET_ID;  // ID de la hoja de cálculo
  const range = 'Payments!A2';  // Especifica la hoja y el rango desde donde empezará a apendear
  const valueInputOption = 'USER_ENTERED';  // Los valores serán interpretados como ingresados por el usuario

  const resource = {
    values,
  };

  try {
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption,
      resource,
    });
    console.log('Datos añadidos a Google Sheets:', response.data);
  } catch (error) {
    console.error('Error al apendear datos en Google Sheets:', error);
  }
}
