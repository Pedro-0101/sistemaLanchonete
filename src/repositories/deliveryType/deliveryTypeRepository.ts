import { DeliveryType } from '../../entities/deliveryType/deliveryType';
import { PrismaClient } from '../../generated/prisma';
import { Status } from '../../entities/status/Status';

const prisma = new PrismaClient();

export interface deliveryTypeRepository {
  list(): Promise<DeliveryType[]>;
  getById(deliveryTypeId: number): Promise<DeliveryType>;
}

export class DeliveryTypeRepository implements deliveryTypeRepository {
  async list(): Promise<DeliveryType[]> {
    const rows = await prisma.delivery_type.findMany({
      include: { status: true },
    });

    return rows.map((d) =>
      DeliveryType.create({
        id: d.id,
        name: d.name,
        status: Status.create({
          id: d.status.id,
          name: d.status.name,
          active: d.status.active,
          createdAt: d.status.created_at,
        }),
        createdAt: d.created_at,
      }),
    );
  }

  async getById(deliveryTypeId: number): Promise<DeliveryType> {
    const deliveryType = await prisma.delivery_type.findFirst({
      where: { id: deliveryTypeId },
      include: { status: true },
    });
    if (!deliveryType) {
      throw new Error('Nao encontrado');
    }

    return DeliveryType.create({
      id: deliveryType.id,
      name: deliveryType.name,
      status: Status.create({
        id: deliveryType.status.id,
        name: deliveryType.status.name,
        active: deliveryType.status.active,
        creatededAt: deliveryType.status.created_at,
      }),
    });
  }
}
