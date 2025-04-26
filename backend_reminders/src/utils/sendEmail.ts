// utils/sendEmail.ts
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendEmail(
  title: string,
  description: string,
  to: string
) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,      // usa STARTTLS
    requireTLS: true,   // força upgrade para TLS
    auth: {
      user: process.env.EMAIL_USER,    // ex: seu@gmail.com
      pass: process.env.EMAIL_PASS,    // App Password de 16 chars
    },
    connectionTimeout: 10_000,
    greetingTimeout: 5_000,
  });

  // valida conexão antes de enviar
  await transporter.verify();

  const subject = `Lembrete: ${title}`;
  const text = `
Evento: ${title}

Descrição:
${description}

Está prestes a acontecer em breve!
  `.trim();

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
}
