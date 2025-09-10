import { DeliveryType } from '../../entities/deliveryType/deliveryType';

export interface deliveryTypeRepository {
  list(): Promise<DeliveryType[]>;
  getById(deliveryTypeId: number): Promise<DeliveryType>;
}
