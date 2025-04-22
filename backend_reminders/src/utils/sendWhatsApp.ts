import axios from "axios";
import dotenv from "dotenv";

// ✅ caminho absoluto para o .env
dotenv.config({ path: __dirname + "/../../.env" });

export const sendWhatsApp = async (message: string, phone: string) => {
  const apiKey = process.env.WHATSAPP_API_KEY;
  if (!apiKey) {
    console.error("❌ API Key do CallMeBot não encontrada.");
    return;
  }

  // ✅ Adiciona "+" se não estiver presente
  const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;

  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${formattedPhone}&text=${encodeURIComponent(
      message
    )}&apikey=${apiKey}`;
    await axios.get(url);
    console.log(`✅ Mensagem enviada via WhatsApp para ${formattedPhone}`);
  } catch (error: any) {
    console.error("❌ Erro ao enviar WhatsApp:", error.response?.data || error);
  }
};
