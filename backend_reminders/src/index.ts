import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes  from './routes/auth.routes';
import eventRoutes from './routes/event.routes';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '4000', 10);

const allowedOrigins = [
  'http://localhost:3000',
  'https://reminders-app-sage.vercel.app',  // sem barra no final
  'https://reminders-app.online'
];

// src/index.ts

app.use(cors({
  origin: (origin, callback) => {
    console.log('➡️  Requisição vinda de origin:', origin);
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      /\.vercel\.app$/.test(origin)
    ) {
      return callback(null, true);
    }
    callback(new Error(`Not allowed by CORS — origin ${origin}`));
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));




app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
  res.send('API do lembrete está rodando! 🧠');
});

import './jobs/eventReminderJob';

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando em http://0.0.0.0:${PORT}`);
});

