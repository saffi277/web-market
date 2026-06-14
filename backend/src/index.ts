import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import jwt from '@fastify/jwt';

import { authRoutes }         from './routes/auth.js';
import { productRoutes }      from './routes/products.js';
import { messageRoutes }      from './routes/messages.js';
import { announcementRoutes } from './routes/announcements.js';

const app = Fastify({ logger: true });

// ── Plugins ──────────────────────────────────────────────
await app.register(helmet);
await app.register(cors, {
  origin: process.env.FRONTEND_URL ?? '*',
  credentials: true,
});
await app.register(rateLimit, { max: 100, timeWindow: '1 minute' });
await app.register(jwt, {
  secret: process.env.JWT_SECRET ?? 'change-this-in-production',
});

// ── Routes ───────────────────────────────────────────────
await app.register(authRoutes);
await app.register(productRoutes);
await app.register(messageRoutes);
await app.register(announcementRoutes);

// ── Health check ─────────────────────────────────────────
app.get('/health', async () => ({ status: 'ok', time: new Date().toISOString() }));

// ── Start ────────────────────────────────────────────────
const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.HOST ?? '0.0.0.0';

try {
  await app.listen({ port: PORT, host: HOST });
  console.log(`🚀 ZAWAN API running on http://${HOST}:${PORT}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
