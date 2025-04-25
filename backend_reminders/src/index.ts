import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes  from './routes/auth.routes';
import eventRoutes from './routes/event.routes';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '4000', 10);

// src/index.ts
const allowedOrigins: (string|RegExp)[] = [
  'http://localhost:3000',
  'https://reminders-app.online',
  'https://reminders-app-sage.vercel.app',
  // regex que cobre qualquer subdomínio *.vercel.app
  /^https?:\/\/[A-Za-z0-9-]+\.vercel\.app$/
];

app.use(cors({
  origin: (origin, callback) => {
    console.log('CORS origin:', origin);
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(o =>
      typeof o === 'string'
        ? o === origin
        : o.test(origin)
    )) {
      return callback(null, true);
    }
    return callback(new Error(`Not allowed by CORS — ${origin}`));
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

// garante que o cors trate todas as options pré-flight
app.options('*', cors());


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

