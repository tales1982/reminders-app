import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendEmail(
  title: string,
  description: string,
  to: string
) {
  // 1) Cria o transporter usando STARTTLS na porta 587
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,      // false = STARTTLS (upgrade depois do EHLO)
    requireTLS: true,   // força TLS
    auth: {
      user: process.env.EMAIL_USER,      // seu usuário Gmail
      pass: process.env.EMAIL_PASS,      // App Password de 16 chars (sem espaços!)
    },
    connectionTimeout: 10_000,  // 10s
    greetingTimeout: 5_000,     // 5s
  });

  // 2) Opcional: verifique antes se a conexão está ok
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
