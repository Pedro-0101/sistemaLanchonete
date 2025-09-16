import { DeliveryType } from '../../entities/deliveryType/deliveryType';
import { DomainError } from '../../errors/domainError';
import { DeliveryTypeRepository } from '../../repositories/deliveryType/deliveryTypeRepository';

const deliveryRepo = DeliveryTypeRepository.getInstance();

export class ManageDeliveryType {
  async listDeliveryType(): Promise<DeliveryType[]> {
    return await deliveryRepo.list();
  }

  async getDeliveryTypeById(id: number): Promise<DeliveryType> {
    if (!Number.isInteger(id) || id < 0) {
      throw new DomainError(
        'DELIVERY_TYPE_MISSING_ID',
        'Missing id for realize the search',
        { id },
      );
    }
    const delivery = await deliveryRepo.getById(id);

    if (!delivery) {
      throw new DomainError(
        'DELIVERY_TYPE_NOT_FOUND',
        'Delivery type not found',
      );
    }

    return delivery;
  }
}
