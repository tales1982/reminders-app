import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

export const register = async (req: Request, res: Response) => {
  console.log('📥 [REGISTER] Requisição recebida');
  console.log('📝 Dados recebidos:', req.body);

  const { name, surname, city, email, password, whatsapp } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.warn('⚠️ [REGISTER] Email já existe:', email);
      return res.status(400).json({ message: 'Email já registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        surname,
        city,
        email,
        password: hashedPassword,
        whatsapp,
      },
    });

    console.log('✅ [REGISTER] Usuário criado com sucesso:', user.email);
    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error('❌ [REGISTER] Erro ao registrar:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

export const login = async (req: Request, res: Response) => {
  console.log('📥 [LOGIN] Requisição recebida');
  console.log('📝 Dados recebidos:', req.body);

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      console.warn('⚠️ [LOGIN] Usuário não encontrado:', email);
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      console.warn('⚠️ [LOGIN] Senha incorreta para:', email);
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    console.log('✅ [LOGIN] Login bem-sucedido:', email);
    res.status(200).json({ token });
  } catch (error) {
    console.error('❌ [LOGIN] Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
};

export const protectedRoute = async (req: Request, res: Response) => {
  console.log('🔐 [PROTECTED] Rota protegida acessada');
  res.status(200).json({ message: 'Você acessou uma rota protegida!' });
};
