import { FastifyInstance } from 'fastify';
import { requireAuth } from '../middleware/auth.js';
import prisma from '../db/prisma.js';

export async function announcementRoutes(app: FastifyInstance) {

  // GET all (public)
  app.get('/api/announcements', async () => {
    return prisma.announcement.findMany({ orderBy: { createdAt: 'desc' } });
  });

  // POST create (admin)
  app.post('/api/announcements', { preHandler: [requireAuth] }, async (req, reply) => {
    const data = req.body as {
      titleAr: string; titleEn: string;
      bodyAr?: string; bodyEn?: string; type?: string;
    };
    const ann = await prisma.announcement.create({ data });
    return reply.code(201).send(ann);
  });

  // DELETE (admin)
  app.delete('/api/announcements/:id', { preHandler: [requireAuth] }, async (req, reply) => {
    const { id } = req.params as { id: string };
    try {
      await prisma.announcement.delete({ where: { id } });
      return { success: true };
    } catch {
      return reply.code(404).send({ error: 'Not found' });
    }
  });
}
