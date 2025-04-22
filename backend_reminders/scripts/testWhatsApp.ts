// scripts/testWhatsApp.ts
import { sendWhatsApp } from "../src/utils/sendWhatsApp";

const phone = "352661124040"; // seu número no formato internacional SEM o +
const message = "🔔 Lembrete: tirar o lixo amanhã cedo!";

sendWhatsApp(message, phone);
