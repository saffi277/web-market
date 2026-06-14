import { FastifyInstance } from 'fastify';
import { requireAuth } from '../middleware/auth.js';
import prisma from '../db/prisma.js';

export async function productRoutes(app: FastifyInstance) {

  // GET all products (public)
  app.get('/api/products', async (req) => {
    const { category, featured, search } = req.query as Record<string, string>;

    return prisma.product.findMany({
      where: {
        ...(category  && { category }),
        ...(featured  && { featured: featured === 'true' }),
        ...(search    && {
          OR: [
            { nameAr: { contains: search, mode: 'insensitive' } },
            { nameEn: { contains: search, mode: 'insensitive' } },
          ],
        }),
      },
      orderBy: [{ featured: 'desc' }, { createdAt: 'desc' }],
    });
  });

  // GET single product (public)
  app.get('/api/products/:id', async (req, reply) => {
    const { id } = req.params as { id: string };
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return reply.code(404).send({ error: 'Product not found' });
    return product;
  });

  // POST create product (admin)
  app.post('/api/products', { preHandler: [requireAuth] }, async (req, reply) => {
    const data = req.body as {
      nameAr: string; nameEn: string;
      descAr?: string; descEn?: string;
      category?: string; price?: number;
      icon?: string; tags?: string[]; featured?: boolean;
    };
    const product = await prisma.product.create({ data });
    return reply.code(201).send(product);
  });

  // PUT update product (admin)
  app.put('/api/products/:id', { preHandler: [requireAuth] }, async (req, reply) => {
    const { id } = req.params as { id: string };
    const data = req.body as Partial<{
      nameAr: string; nameEn: string; descAr: string; descEn: string;
      category: string; price: number; icon: string; tags: string[]; featured: boolean;
    }>;
    try {
      const product = await prisma.product.update({ where: { id }, data });
      return product;
    } catch {
      return reply.code(404).send({ error: 'Product not found' });
    }
  });

  // DELETE product (admin)
  app.delete('/api/products/:id', { preHandler: [requireAuth] }, async (req, reply) => {
    const { id } = req.params as { id: string };
    try {
      await prisma.product.delete({ where: { id } });
      return { success: true };
    } catch {
      return reply.code(404).send({ error: 'Product not found' });
    }
  });
}
