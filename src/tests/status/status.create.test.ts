import { beforeAll, afterAll, beforeEach, it, expect } from 'vitest';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

beforeAll(async () => {
  // Conecta antes de tudo
  await prisma.$connect();
});

afterAll(async () => {
  // Desconecta no fim da suíte
  await prisma.$disconnect();
});

beforeEach(async () => {
  // Limpa a tabela status antes de cada teste
  await prisma.status.deleteMany();
});

it('insere um status no banco', async () => {
  const status = await prisma.status.create({
    data: {
      id: 1,
      name: 'Teste Status',
      active: true,
    },
  });

  const found = await prisma.status.findUnique({
    where: { id: status.id },
  });

  expect(found).not.toBeNull();
  expect(found?.name).toBe('Teste Status');
  expect(found?.active).toBe(true);
});
