// src/routes/event.routes.ts
import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';

const router = Router();

// GET /api/events — lista todos os eventos
router.get('/', async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({ orderBy: { datetime: 'asc' } });
    res.json(events);
  } catch (error) {
    console.error('❌ [EVENTS] Erro ao buscar eventos:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
});

// POST /api/events — cria um novo evento
router.post('/', async (req: Request, res: Response) => {
  try {
    const {
      title,
      description,                  // opcional
      datetime,                     // string ISO 8601 no body
      notifyBefore,                 // número de minutos
      notifyEmail,                  // boolean
      notifyWhats,                  // boolean
      userId
    } = req.body;

    const event = await prisma.event.create({
      data: {
        title,
        description,
        datetime: new Date(datetime),
        notifyBefore,
        notifyEmail,
        notifyWhats,
        userId
      },
    });

    res.status(201).json(event);
  } catch (error) {
    console.error('❌ [EVENTS] Erro ao criar evento:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
});

// **EXPORT DEFAULT** do router — essencial para o import padrão funcionar
export default router;
