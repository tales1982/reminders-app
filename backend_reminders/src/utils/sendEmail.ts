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
    port: 465,
    secure: true,   // SSL direto
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 10_000,
    greetingTimeout: 5_000,
  });

  // Verifica a conexão e autenticação
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
