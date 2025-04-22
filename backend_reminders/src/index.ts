import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import eventRoutes from './routes/event.routes';


dotenv.config();

const app = express(); // ✅ Agora sim, app está declarado
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
  res.send('API do lembrete está rodando! 🧠');
});

import './jobs/eventReminderJob';
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
