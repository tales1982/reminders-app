// utils/sendWhatsApp.ts
import axios from "axios";
import dotenv from "dotenv";

// ✅ caminho absoluto para o .env
dotenv.config({ path: __dirname + "/../../.env" });

// utils/sendWhatsApp.ts
export const sendWhatsApp = async (message: string, phone: string) => {
  const apiKey = process.env.WHATSAPP_API_KEY!;
  // garante só dígitos
  const formattedPhone = phone.replace(/\D+/g, ""); 

  const url = `https://api.callmebot.com/whatsapp.php`
    + `?phone=${formattedPhone}`
    + `&text=${encodeURIComponent(message)}`
    + `&apikey=${apiKey}`;

  try {
    const res = await axios.get(url);
    console.log(`✅ Mensagem enviada via WhatsApp para ${formattedPhone}`, res.data);
  } catch (err: any) {
    console.error("❌ Erro ao enviar WhatsApp:", err.response?.data || err.message);
  }
};

