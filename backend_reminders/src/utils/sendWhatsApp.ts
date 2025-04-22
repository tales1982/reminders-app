import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function sendWhatsApp(message: string, phone: string) {
  try {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://api.callmebot.com/whatsapp.php?phone=${phone}&text=${encodedMessage}&apikey=${process.env.WHATSAPP_API_KEY}`;

    const res = await axios.get(url);
    if (res.data.includes("Message Sent")) {
      console.log(`✅ WhatsApp enviado para ${phone}`);
    } else {
      console.warn(`⚠️ Resposta inesperada do CallMeBot: ${res.data}`);
    }
  } catch (err) {
    console.error("❌ Erro ao enviar WhatsApp:", err);
  }
}
