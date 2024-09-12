import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el nombre de archivo y directorio en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importa el archivo JSON con el assertion de tipo JSON
import credentials from './google.json' assert { type: 'json' };

// Inicializar la autenticación utilizando GoogleAuth
const auth = new google.auth.GoogleAuth({
  credentials,  // Ya no necesitas el keyFile, puedes pasar el objeto de credenciales directamente
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

export default auth;
