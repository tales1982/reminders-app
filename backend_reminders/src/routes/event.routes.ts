//routes/event.routes.ts
import { Router } from 'express';
import {
  createEvent,
  getUserEvents,
  updateEvent,
  deleteEvent,
} from '../controllers/event.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

// Todas as rotas de evento exigem autenticação
router.use(verifyToken);

router.post('/', createEvent);          // Criar evento
router.get('/', getUserEvents);         // Listar eventos
router.put('/:id', updateEvent);        // Atualizar evento
router.delete('/:id', deleteEvent);     // Deletar evento

export default router;
