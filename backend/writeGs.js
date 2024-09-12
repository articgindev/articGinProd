import { google } from 'googleapis';
import credentials from './google.json' assert { type: 'json' };

// Inicializa GoogleAuth usando las credenciales del archivo JSON
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

// Función asíncrona para apendear datos en la hoja de Google Sheets
export async function writeToSheet(values) {
  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = '142FhHrGYBWpp9mxQ0L2uiEY6kMlVmT86Nykxpn05Z10';  // ID de la hoja de cálculo
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
