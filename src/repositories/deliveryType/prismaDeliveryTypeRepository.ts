import { DeliveryType } from '../../entities/deliveryType/deliveryType';
import { deliveryTypeRepository } from './deliveryTypeRepository';
import { PrismaClient } from '../../generated/prisma';
import { Status } from '../../entities/status/Status';

const prisma = new PrismaClient();

export class PrismaDeliveryTypeRepository implements deliveryTypeRepository {
  async save(deliveryTypeToSave: DeliveryType): Promise<void> {
    await prisma.delivery_type.create({
      data: {
        id: deliveryTypeToSave.id,
        name: deliveryTypeToSave.name,
        status_id: deliveryTypeToSave.status.id,
      },
    });
  }

  async list(): Promise<DeliveryType[]> {
    const rows = await prisma.delivery_type.findMany({
      include: { status: true },
    });

    return rows.map(
      (d) =>
        new DeliveryType({
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

  async update(deliveryTypeToUpdate: DeliveryType): Promise<void> {
    await prisma.delivery_type.update({
      where: { id: deliveryTypeToUpdate.id },
      data: {
        name: deliveryTypeToUpdate.name,
        status_id: deliveryTypeToUpdate.status.id,
      },
    });
  }

  async delete(deliveryTypeId: number): Promise<void> {
    await prisma.delivery_type.delete({
      where: { id: deliveryTypeId },
    });
  }
}
