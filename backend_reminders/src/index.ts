import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import eventRoutes from "./routes/event.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  process.env.FRONTEND_URL, // preview Vercel
  process.env.PROD_FRONTEND, // domínio custom
].filter(Boolean); // remove qualquer undefined

app.use(
  cors({
    origin: (origin, callback) => {
      // permitir requests sem origin (Postman, curl) ou com origin na lista
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

app.get("/", (req, res) => {
  res.send("API do lembrete está rodando! 🧠");
});

import "./jobs/eventReminderJob";

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
