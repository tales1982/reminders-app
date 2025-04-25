import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

export const createEvent = async (req: Request, res: Response) => {
  console.log("📥 [EVENTO] Requisição de criação recebida");
  console.log("📝 Dados:", req.body);

  try {
    const { title, datetime, notifyBefore, notifyEmail, notifyWhats } =
      req.body;
    const userId = (req as any).userId;

    const newEvent = await prisma.event.create({
      data: {
        title,
        datetime: new Date(datetime),
        notifyBefore,
        notifyEmail,
        notifyWhats,
        userId,
      },
    });

    console.log("✅ [EVENTO] Evento criado com sucesso:", newEvent.id);

    res.status(201).json(newEvent);
  } catch (error) {
    console.error("❌ [EVENTO] Erro ao criar evento:", error);
    res.status(500).json({ message: "Erro ao criar evento" });
  }
};

export const getUserEvents = async (req: Request, res: Response) => {
  console.log("📥 [EVENTO] Requisição para listar eventos");

  try {
    const userId = (req as any).userId;
    const events = await prisma.event.findMany({
      where: { userId },
    });

    console.log(`📦 [EVENTO] ${events.length} eventos encontrados`);

    res.status(200).json(events);
  } catch (error) {
    console.error("❌ [EVENTO] Erro ao buscar eventos:", error);
    res.status(500).json({ message: "Erro ao buscar eventos" });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  console.log("📥 [EVENTO] Requisição de atualização recebida");
  console.log("📝 ID:", req.params.id, "Dados:", req.body);

  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    const { title, datetime, notifyBefore, notifyEmail, notifyWhats } =
      req.body;

    const event = await prisma.event.updateMany({
      where: { id: parseInt(id), userId },
      data: {
        title,
        datetime: new Date(datetime),
        notifyBefore,
        notifyEmail,
        notifyWhats,
      },
    });

    if (event.count === 0) {
      console.warn(
        "⚠️ [EVENTO] Nenhum evento atualizado (ID inválido ou não pertence ao usuário)"
      );
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    console.log("✅ [EVENTO] Evento atualizado com sucesso:", id);

    res.status(200).json({ message: "Evento atualizado com sucesso" });
  } catch (error) {
    console.error("❌ [EVENTO] Erro ao atualizar evento:", error);
    res.status(500).json({ message: "Erro ao atualizar evento" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  console.log("📥 [EVENTO] Requisição para deletar evento");
  console.log("📝 ID:", req.params.id);

  try {
    const userId = (req as any).userId;
    const { id } = req.params;

    const deleted = await prisma.event.deleteMany({
      where: {
        id: parseInt(id),
        userId,
      },
    });

    if (deleted.count === 0) {
      console.warn(
        "⚠️ [EVENTO] Nenhum evento deletado (ID inválido ou não pertence ao usuário)"
      );
      return res.status(404).json({ message: "Evento não encontrado" });
    }

    console.log("🗑️ [EVENTO] Evento deletado com sucesso:", id);

    res.status(200).json({ message: "Evento deletado com sucesso" });
  } catch (error) {
    console.error("❌ [EVENTO] Erro ao deletar evento:", error);
    res.status(500).json({ message: "Erro ao deletar evento" });
  }
};
