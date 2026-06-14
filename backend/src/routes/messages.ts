import { FastifyInstance } from 'fastify';
import { requireAuth } from '../middleware/auth.js';
import prisma from '../db/prisma.js';

export async function messageRoutes(app: FastifyInstance) {

  // POST send message (public — contact form)
  app.post('/api/messages', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'email', 'message'],
        properties: {
          name:    { type: 'string', minLength: 2 },
          email:   { type: 'string', format: 'email' },
          phone:   { type: 'string' },
          service: { type: 'string' },
          budget:  { type: 'string' },
          message: { type: 'string', minLength: 10 },
        },
      },
    },
  }, async (req, reply) => {
    const data = req.body as {
      name: string; email: string; phone?: string;
      service?: string; budget?: string; message: string;
    };
    const msg = await prisma.message.create({ data });
    return reply.code(201).send({ success: true, id: msg.id });
  });

  // GET all messages (admin)
  app.get('/api/messages', { preHandler: [requireAuth] }, async (req) => {
    const { status } = req.query as { status?: string };
    return prisma.message.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    });
  });

  // PATCH update message status (admin)
  app.patch('/api/messages/:id', { preHandler: [requireAuth] }, async (req, reply) => {
    const { id } = req.params as { id: string };
    const { status } = req.body as { status: string };
    try {
      const msg = await prisma.message.update({ where: { id }, data: { status } });
      return msg;
    } catch {
      return reply.code(404).send({ error: 'Message not found' });
    }
  });

  // DELETE message (admin)
  app.delete('/api/messages/:id', { preHandler: [requireAuth] }, async (req, reply) => {
    const { id } = req.params as { id: string };
    try {
      await prisma.message.delete({ where: { id } });
      return { success: true };
    } catch {
      return reply.code(404).send({ error: 'Message not found' });
    }
  });
}
