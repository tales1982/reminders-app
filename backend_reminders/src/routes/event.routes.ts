import { Router } from 'express';
import { createEvent, getUserEvents, updateEvent, deleteEvent } from '../controllers/event.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

// Aplica autenticação a todas as rotas de evento
router.use(verifyToken);

// GET /api/events — lista eventos do usuário
router.get('/', getUserEvents);

// POST /api/events — cria um novo evento
router.post('/', createEvent);

// PUT /api/events/:id — atualiza um evento existente
router.put('/:id', updateEvent);

// DELETE /api/events/:id — deleta um evento existente
router.delete('/:id', deleteEvent);

export default router;

