import { PrismaClient } from '../src/generated/prisma';
const prisma = new PrismaClient();

async function seed() {
  await prisma.status.createMany({
    data: [
      { id: 1, name: 'ATIVO', active: true },
      { id: 2, name: 'INATIVO', active: false },
      { id: 3, name: 'PENDENTE', active: true },
    ],
  });

  // DELIVERY TYPE
  await prisma.delivery_type.createMany({
    data: [
      { id: 1, name: 'RETIRADA', status_id: 1 },
      { id: 2, name: 'ENTREGA LOCAL', status_id: 1 },
      { id: 3, name: 'ENTREGA TERCEIRIZADA', status_id: 1 },
    ],
  });

  // PAYMENT TYPE
  await prisma.payment_method.createMany({
    data: [
      { id: 1, name: 'DINHEIRO', status_id: 1 },
      { id: 2, name: 'PIX', status_id: 1 },
      { id: 3, name: 'CARTÃO CRÉDITO', status_id: 1 },
      { id: 4, name: 'CARTÃO DÉBITO', status_id: 1 },
    ],
  });
  console.log('Database seeded');
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
