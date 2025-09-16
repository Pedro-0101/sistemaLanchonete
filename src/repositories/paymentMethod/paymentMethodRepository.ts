import { PaymentMethod } from '../../entities/paymentMethod/paymentMethod';
import { Status } from '../../entities/status/Status';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export interface paymentMethodRepositoryInterface {
  list(): Promise<PaymentMethod[]>;
  getPaymentMethodById(id: number): Promise<PaymentMethod | null>;
}

export class PaymentMethodRepository
  implements paymentMethodRepositoryInterface
{
  private static instance: PaymentMethodRepository;

  private constructor() {}

  static getInstance(): PaymentMethodRepository {
    if (!PaymentMethodRepository.instance) {
      PaymentMethodRepository.instance = new PaymentMethodRepository();
    }

    return PaymentMethodRepository.instance;
  }

  async list(): Promise<PaymentMethod[]> {
    const rows = await prisma.payment_method.findMany({
      include: { status: true },
    });

    return rows.map((p) =>
      PaymentMethod.create({
        id: p.id,
        name: p.name,
        status: Status.create({
          id: p.status.id,
          name: p.status.name,
          active: p.status.active,
          createdAt: p.status.created_at,
        }),
        createdAt: p.created_at,
      }),
    );
  }

  async getPaymentMethodById(id: number): Promise<PaymentMethod | null> {
    const payment = await prisma.payment_method.findFirst({
      where: { id: id },
      include: { status: true },
    });

    if (!payment) {
      throw new Error('Nao encontrado');
    }

    const paymentMethod = PaymentMethod.create({
      id: payment.id,
      name: payment.name,
      status: Status.create({
        id: payment.status.id,
        name: payment.status.name,
        active: payment.status.active,
        createdAt: payment.status.created_at,
      }),
      createdAt: payment.created_at,
    });

    return paymentMethod;
  }
}
