import { sendWhatsApp } from "../src/utils/sendWhatsApp";

const phone = "352661124040"; // ✅ Substitua com o seu número (formato internacional SEM o '+')
const message = "🔔 amanha tem q tira a pubela";

sendWhatsApp(message, phone);
