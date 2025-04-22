import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "secretao";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, surname, city, email, password, whatsapp } = req.body; // ← adiciona whatsapp

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        surname,
        city,
        email,
        password: hashedPassword,
        whatsapp, // ← salva no banco
      },
    });

    console.log(`✅ Novo usuário registrado:
🧑 Nome: ${name} ${surname}
📍 Cidade: ${city}
📧 Email: ${email}
📱 WhatsApp: ${whatsapp}
🆔 ID do usuário: ${user.id}
`);

    res.status(201).json({ message: "User created successfully", userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error by registering user" });
  }
};


export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json({ message: "Incorrect password" });
      return;
    }

    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // LOG NO TERMINAL:
    console.log(`🔐 Login realizado:
👤 Usuário: ${user.name} ${user.surname}
📧 Email: ${user.email}
🆔 ID: ${user.id}
`);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error when logging" });
  }
};

// ✅ Função adicionada ao final do arquivo
export const protectedRoute = (req: Request, res: Response): void => {
  res.json({ message: "Você acessou uma rota protegida! 🔒" });
};
