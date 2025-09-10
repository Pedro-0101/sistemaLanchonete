import { DeliveryType } from '../../entities/deliveryType/deliveryType';
import { DeliveryTypeRepository } from '../../repositories/deliveryType/deliveryTypeRepository';

const deliveryRepo = new DeliveryTypeRepository();

export class ManageDeliveryType {
  async listDeliveryType(): Promise<DeliveryType[]> {
    return await deliveryRepo.list();
  }

  async getDeliveryTypeById(id: number): Promise<DeliveryType | null> {
    return await deliveryRepo.getById(id);
  }
}
