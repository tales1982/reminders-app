import cron from "node-cron";
import { prisma } from "../lib/prisma"; // Prisma Client
import { sendEmail } from "../utils/sendEmail";
import { sendWhatsApp } from "../utils/sendWhatsApp";


// Roda a cada minuto
cron.schedule("* * * * *", async () => {
  const now = new Date();
  const from = now;
  const to = new Date(now.getTime() + 60 * 60 * 1000); // Procura eventos até 1 hora no futuro

  console.log(`🔍 Verificando eventos entre ${from.toISOString()} e ${to.toISOString()}`);

  try {
    const events = await prisma.event.findMany({
      where: {
        wasNotified: false,
        datetime: {
          gte: from,
          lte: to,
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

