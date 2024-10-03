import emailHelper from '../utils/emailHelper.js';

export const sendContactEmail = async (req, res) => {
  const { nombre, apellido, correo, numero, motivo, consulta } = req.body;

  const subject = `Consulta con motivo ${motivo} de ${nombre} ${apellido}`;
  const text = `Tienes una consulta desde la web:\n\n${consulta}\n\nPara responder, contacta a ${correo} o al número ${numero}.`;

  try {
    await emailHelper('support@artictv.com', subject, text);
    res.status(200).json({ message: 'Correo enviado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar el correo', error });
  }
};
