import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export async function sendEmail(
  title: string,
  description: string,
  email: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const subject = `Lembrete: ${title}`;
  const text = `
Seu evento "${title}" está para acontecer em breve!

Descrição:
${description}

— 
Este é um lembrete automático.
  `.trim();

  const html = `
    <h2>🔔 Lembrete de Evento</h2>
    <p><strong>${title}</strong></p>
    <p>${description}</p>
    <p>Está prestes a começar!</p>
    <hr/>
    <p style="font-size:0.8em;color:#666;">Este é um lembrete automático.</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    text,
    html,
  });
}
