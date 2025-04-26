import cron from "node-cron";
import { prisma } from "../lib/prisma";
import { sendEmail } from "../utils/sendEmail";
// import { sendWhatsApp } from "../utils/sendWhatsApp"; // removido, já não usamos

cron.schedule("* * * * *", async () => {
  const now = new Date();
  const to = new Date(now.getTime() + 60 * 60 * 1000);

  console.log(`🔍 Verificando eventos entre ${now.toISOString()} e ${to.toISOString()}`);

  try {
    const events = await prisma.event.findMany({
      where: {
        wasNotified: false,
        datetime: { gte: now, lte: to },
      },
      include: { user: true },
    });

    if (events.length === 0) {
      console.log("📭 Nenhum evento encontrado para notificação.");
      return;
    }

    await Promise.all(
      events.map(async (event) => {
        const diffMinutes = (event.datetime.getTime() - now.getTime()) / 60000;

        if (diffMinutes <= event.notifyBefore && event.notifyEmail && event.user.email) {
          console.log(`🔔 Notificando evento: ${event.title}`);

          try {
            await sendEmail(
              event.title,
              event.description ?? "(sem descrição)",
              event.user.email
            );
            console.log(`📧 Email enviado para ${event.user.email}`);
          } catch (err) {
            console.error(`❌ Erro ao enviar email do evento "${event.title}":`, err);
            return; // interrompe só este evento
          }

          // marca como notificado somente após sucesso no envio
          await prisma.event.update({
            where: { id: event.id },
            data: { wasNotified: true },
          });
          console.log(`✅ Evento "${event.title}" marcado como notificado.`);
        }
      })
    );
  } catch (error) {
    console.error("❌ Erro ao buscar eventos:", error);
  }
}); // <-- fecha o cron.schedule
