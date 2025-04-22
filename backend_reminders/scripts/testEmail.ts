// scripts/testEmail.ts
import { sendEmail } from "../src/utils/sendEmail";

(async () => {
  try {
    await sendEmail("Teste de Lembrete", "tales@maildrop.cc");
    console.log("✅ Email enviado com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:", error);
  }
})();
