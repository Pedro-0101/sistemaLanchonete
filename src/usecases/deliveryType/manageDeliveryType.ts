import { DeliveryType } from '../../entities/deliveryType/deliveryType';
import { PrismaDeliveryTypeRepository } from '../../repositories/deliveryType/prismaDeliveryTypeRepository';

const deliveryRepo = new PrismaDeliveryTypeRepository();

export class ManageDeliveryType {
  async listDeliveryType(): Promise<DeliveryType[]> {
    return await deliveryRepo.list();
  }

  async getDeliveryTypeById(id: number): Promise<DeliveryType | null> {
    return await deliveryRepo.getById(id);
  }
}
