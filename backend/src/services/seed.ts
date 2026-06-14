/* Run once to create the first admin:
   npx tsx src/services/seed.ts */
import bcrypt from 'bcryptjs';
import prisma from '../db/prisma.js';

async function seed() {
  const email    = process.env.ADMIN_EMAIL    ?? 'admin@zawan.com';
  const password = process.env.ADMIN_PASSWORD ?? 'Admin@2024!';
  const name     = 'ZAWAN Admin';

  const exists = await prisma.admin.findUnique({ where: { email } });
  if (exists) {
    console.log('✅ Admin already exists:', email);
    return;
  }

  const hash = await bcrypt.hash(password, 12);
  await prisma.admin.create({ data: { email, password: hash, name } });
  console.log('✅ Admin created:', email);
}

seed().then(() => process.exit(0)).catch(console.error);
