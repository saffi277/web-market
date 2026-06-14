import { FastifyInstance } from 'fastify';
import bcrypt from 'bcryptjs';
import prisma from '../db/prisma.js';

export async function authRoutes(app: FastifyInstance) {

  // Login
  app.post('/api/auth/login', {
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email:    { type: 'string', format: 'email' },
          password: { type: 'string', minLength: 6 },
        },
      },
    },
  }, async (req, reply) => {
    const { email, password } = req.body as { email: string; password: string };

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) return reply.code(401).send({ error: 'بيانات خاطئة' });

    const valid = await bcrypt.compare(password, admin.password);
    if (!valid) return reply.code(401).send({ error: 'بيانات خاطئة' });

    const token = app.jwt.sign(
      { id: admin.id, email: admin.email, name: admin.name },
      { expiresIn: '7d' }
    );

    return { token, admin: { id: admin.id, email: admin.email, name: admin.name } };
  });

  // Get current admin (verify token)
  app.get('/api/auth/me', {
    preHandler: [async (req, reply) => {
      try { await req.jwtVerify(); } catch { reply.code(401).send({ error: 'Unauthorized' }); }
    }],
  }, async (req) => {
    return req.user;
  });
}
