import cron from "node-cron";
import { prisma } from "../lib/prisma"; // Prisma Client
import { sendEmail } from "../utils/sendEmail";
import { sendWhatsApp } from "../utils/sendWhatsApp";

// Roda a cada minuto
cron.schedule("* * * * *", async () => {
  const now = new Date();
  const past = new Date(now.getTime() - 30 * 1000);        // Tolerância para atrasos
  const upcoming = new Date(now.getTime() + 90 * 1000);    // Próximos 90 segundos

  console.log(`🔍 Verificando eventos entre ${past.toISOString()} e ${upcoming.toISOString()}`);

  try {
    const events = await prisma.event.findMany({
      where: {
        wasNotified: false,
        datetime: {
          gte: past,
          lte: upcoming,
        },
      },
      include: {
        user: true,
      },
    });

    if (events.length === 0) {
      console.log("📭 Nenhum evento encontrado para notificação.");
      return;
    }

    await Promise.all(
      events.map(async (event) => {
        const diffMinutes =
          (new Date(event.datetime).getTime() - now.getTime()) / 60000;

        if (diffMinutes <= event.notifyBefore) {
          console.log(`🔔 Notificando evento: ${event.title}`);

          try {
            if (event.notifyEmail && event.user.email) {
              await sendEmail(event.title, event.user.email);
              console.log(`📧 Email enviado para ${event.user.email}`);
            }

            if (event.notifyWhats && event.user.whatsapp) {
              await sendWhatsApp(event.title, event.user.whatsapp);
              console.log(`📱 WhatsApp enviado para ${event.user.whatsapp}`);
            }

            await prisma.event.update({
              where: { id: event.id },
              data: { wasNotified: true },
            });
            console.log(`✅ Evento ${event.title} marcado como notificado.`);
          } catch (err) {
            console.error(`❌ Erro ao notificar evento "${event.title}":`, err);
          }
        }
      })
    );
  } catch (error) {
    console.error("❌ Erro ao buscar eventos:", error);
  }
});
