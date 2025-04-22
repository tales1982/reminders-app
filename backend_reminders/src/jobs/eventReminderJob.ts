import cron from "node-cron";
import { prisma } from "../lib/prisma"; // Prisma Client
import { sendEmail } from "../utils/sendEmail";
import { sendWhatsApp } from "../utils/sendWhatsApp";

// Roda a cada minuto
cron.schedule("* * * * *", async () => {
  const now = new Date();
  const upcoming = new Date(now.getTime() + 60 * 1000); // Próximo minuto

  try {
    const events = await prisma.event.findMany({
      where: {
        wasNotified: false, // Apenas eventos ainda não notificados
        datetime: {
          gte: now,
          lte: upcoming,
        },
      },
      include: {
        user: true,
      },
    });

    for (const event of events) {
      const diffMinutes =
        (new Date(event.datetime).getTime() - now.getTime()) / 60000;

      if (diffMinutes <= event.notifyBefore) {
        if (event.notifyEmail && event.user.email) {
          await sendEmail(event.title, event.user.email);
        }

        if (event.notifyWhats && event.user.whatsapp) {
          await sendWhatsApp(event.title, event.user.whatsapp);
        }

        await prisma.event.update({
          where: { id: event.id },
          data: { wasNotified: true },
        });
      }
    }
  } catch (error) {
    console.error("❌ Erro ao executar tarefa de notificação:", error);
  }
});
