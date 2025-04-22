//routes/auth.routes.ts
import { Router } from 'express';
import { register, login, protectedRoute } from '../controllers/auth.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// exemplo de rota protegida
router.get('/protected', verifyToken, protectedRoute);

export default router;
