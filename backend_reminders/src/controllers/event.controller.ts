import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createEvent = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.userId;
  const { title, description, datetime, notifyBefore, notifyEmail, notifyWhats } = req.body;

  try {
    const event = await prisma.event.create({
      data: {
        title,
        description,
        datetime: new Date(datetime),
        notifyBefore,
        notifyEmail,
        notifyWhats,
        userId,
      },
    });

    console.log(`📅 Novo evento criado:
📝 Título: ${title}
📆 Data e hora: ${datetime}
🔔 Notificar ${notifyBefore} minutos antes | Email: ${notifyEmail} | WhatsApp: ${notifyWhats}
👤 ID do usuário: ${userId}
🆔 ID do evento: ${event.id}
`);

    res.status(201).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar evento' });
  }
};

export const getUserEvents = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.userId;

  try {
    const events = await prisma.event.findMany({
      where: { userId },
      orderBy: { datetime: 'asc' },
    });

    console.log(`📋 Usuário ${userId} listou ${events.length} eventos`);

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar eventos' });
  }
};

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.userId;
  const eventId = Number(req.params.id);
  const { title, description, datetime, notifyBefore, notifyEmail, notifyWhats } = req.body;

  try {
    const event = await prisma.event.updateMany({
      where: { id: eventId, userId },
      data: {
        title,
        description,
        datetime: new Date(datetime),
        notifyBefore,
        notifyEmail,
        notifyWhats,
      },
    });

    console.log(`✏️ Evento atualizado:
🆔 ID do evento: ${eventId}
👤 ID do usuário: ${userId}
✅ Registros afetados: ${event.count}
`);

    res.json({ message: 'Evento atualizado', updated: event.count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar evento' });
  }
};

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.userId;
  const eventId = Number(req.params.id);

  try {
    const deleted = await prisma.event.deleteMany({
      where: { id: eventId, userId },
    });

    console.log(`🗑️ Evento deletado:
🆔 ID do evento: ${eventId}
👤 ID do usuário: ${userId}
🧹 Registros removidos: ${deleted.count}
`);

    res.json({ message: 'Evento deletado', deleted: deleted.count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar evento' });
  }
};
