import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { DateTime } from 'luxon';

const prisma = new PrismaClient();

/**
 * Helper: converte ISO local (sem Z) mais timezone para UTC Date
 */
function toUtcDate(isoLocal: string, tz: string): Date {
  return DateTime.fromISO(isoLocal, { zone: tz }).toUTC().toJSDate();
}

/** Criar um evento */
export async function createEvent(req: Request, res: Response): Promise<void> {
  const userId = (req as any).user.userId;
  const { title, description, datetime, notifyBefore, notifyEmail} = req.body;
  try {
    // Busca timezone do usuário
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { timezone: true } });
    const tz = user?.timezone ?? 'UTC';
    const dtUtc = toUtcDate(datetime, tz);

    const event = await prisma.event.create({
      data: {
        title,
        description,
        datetime: dtUtc,
        notifyBefore,
        notifyEmail,
        user: { connect: { id: userId } },
      }
    });

    console.log(`📅 Evento criado: ${event.id} para usuário ${userId}`);
    res.status(201).json(event);
  } catch (error) {
    console.error('Erro ao criar evento:', error);
    res.status(500).json({ message: 'Erro ao criar evento' });
  }
}

/** Listar eventos do usuário */
export async function getUserEvents(req: Request, res: Response): Promise<void> {
  const userId = (req as any).user.userId;
  try {
    const events = await prisma.event.findMany({ where: { userId }, orderBy: { datetime: 'asc' } });
    res.json(events);
  } catch (err) {
    console.error('Erro ao buscar eventos:', err);
    res.status(500).json({ message: 'Erro ao buscar eventos' });
  }
}

/** Atualizar evento */
export async function updateEvent(req: Request, res: Response): Promise<void> {
  const userId = (req as any).user.userId;
  const eventId = Number(req.params.id);
  const { title, description, datetime, notifyBefore, notifyEmail } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: { timezone: true } });
    const tz = user?.timezone ?? 'UTC';
    const dtUtc = toUtcDate(datetime, tz);
    const result = await prisma.event.updateMany({
      where: { id: eventId, userId },
      data: { title, description, datetime: dtUtc, notifyBefore, notifyEmail }
    });
    res.json({ message: 'Evento atualizado', updated: result.count });
  } catch (err) {
    console.error('Erro ao atualizar evento:', err);
    res.status(500).json({ message: 'Erro ao atualizar evento' });
  }
}

/** Deletar evento */
export async function deleteEvent(req: Request, res: Response): Promise<void> {
  const userId = (req as any).user.userId;
  const eventId = Number(req.params.id);
  try {
    const result = await prisma.event.deleteMany({ where: { id: eventId, userId } });
    res.json({ message: 'Evento deletado', deleted: result.count });
  } catch (err) {
    console.error('Erro ao deletar evento:', err);
    res.status(500).json({ message: 'Erro ao deletar evento' });
  }
}
