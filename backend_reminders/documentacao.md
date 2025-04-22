# Documentação do Backend - Projeto de Lembretes

## 📄 Visão Geral
Este backend foi desenvolvido em **Node.js com TypeScript**, utilizando o framework **Express** e o ORM **Prisma** para comunicação com banco de dados **PostgreSQL**. O sistema fornece autenticação via **JWT** e permite que usuários cadastrem eventos com opções de notificações futuras por e-mail e WhatsApp.

---

## 🔄 Tecnologias Utilizadas

| Tecnologia     | Descrição |
|----------------|------------|
| **Express**    | Framework para criar APIs HTTP |
| **Prisma**     | ORM para PostgreSQL |
| **PostgreSQL** | Banco de dados relacional |
| **JWT**        | Autenticação baseada em token |
| **bcrypt**     | Criptografia de senha |
| **dotenv**     | Gerenciamento de variáveis de ambiente |
| **CORS**       | Permite conexões de domínios diferentes |
| **node-cron**  | (futuramente) Agendamento de tarefas |
| **nodemailer** | (futuramente) Envio de e-mails |
| **Twilio API** | (futuramente) Envio de mensagens WhatsApp |

---

## 🌐 Estrutura de Pastas

```
backend_reminders/
├── prisma/
│   └── schema.prisma         # Schema do banco de dados
├── src/
│   ├── controllers/          # Lógica de negócio das rotas
│   │   ├── auth.controller.ts
│   │   └── event.controller.ts
│   ├── middleware/
│   │   └── auth.middleware.ts
│   ├── routes/               # Definição de rotas da API
│   │   ├── auth.routes.ts
│   │   └── event.routes.ts
│   └── index.ts              # Ponto de entrada da aplicação
├── .env                      # Variáveis de ambiente
├── package.json              # Dependências do projeto
├── tsconfig.json             # Configuração do TypeScript
```

---

## 💼 Modelos do Prisma

### `User`
```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  surname   String
  city      String
  email     String   @unique
  password  String
  events    Event[]
}
```

### `Event`
```prisma
model Event {
  id           Int      @id @default(autoincrement())
  title        String
  description  String?
  datetime     DateTime
  notifyBefore Int      // minutos antes
  notifyEmail  Boolean
  notifyWhats  Boolean
  userId       Int
  user         User     @relation(fields: [userId], references: [id])
}
```

---

## 📅 Rotas da API

### `/api/auth/register` - Registro de novo usuário
- **POST**
- Body JSON:
```json
{
  "name": "Thales",
  "surname": "Lima",
  "city": "Luxembourg",
  "email": "thales@email.com",
  "password": "123456"
}
```

### `/api/auth/login` - Login de usuário
- **POST**
- Body JSON:
```json
{
  "email": "thales@email.com",
  "password": "123456"
}
```
- Retorna:
```json
{
  "token": "<JWT Token>"
}
```

### `/api/auth/protected` - Rota de teste protegida
- **GET**
- Header:
  - `Authorization: Bearer <token>`

---

### `/api/events` - CRUD de eventos (requer token)

#### Criar evento
- **POST**
```json
{
  "title": "Consulta",
  "description": "Dentista 10h",
  "datetime": "2025-04-23T10:00:00Z",
  "notifyBefore": 60,
  "notifyEmail": true,
  "notifyWhats": false
}
```

#### Listar eventos do usuário
- **GET**

#### Atualizar evento
- **PUT** `/api/events/:id`

#### Deletar evento
- **DELETE** `/api/events/:id`

---

## 🌐 Middleware

### `verifyToken`
Protege rotas verificando o JWT. Insere `userId` no `req.user` para uso posterior nos controllers.

---

**Desenvolvido por Thales — Backend Finalizado e Funcionando com Sucesso!** 🎉

