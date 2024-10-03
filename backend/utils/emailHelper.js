import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();
const userGmail = process.env.GMAIL_USER;
const passAppGmail = process.env.GMAIL_PASS_APP;
const userSender = process.env.GMAIL_SENDER;

const emailHelper = async (to, subject, text, htmlContent) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: userGmail,
      pass: passAppGmail,
    },
  });

  let mailOptions = {
    from: userSender,
    to: to,
    subject,
    text: text,
    html: htmlContent,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Email enviado: " + info.response);
    return info;
  } catch (error) {
    console.error("Error enviando el email:", error);
    throw error;
  }
};

export default emailHelper;
