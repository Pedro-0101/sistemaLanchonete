import { DeliveryType } from '../../entities/deliveryType/deliveryType';

export interface deliveryTypeRepository {
  save(deliveryType: DeliveryType): Promise<void>;
  list(): Promise<DeliveryType[]>;
  update(deliveryType: DeliveryType): Promise<void>;
  delete(deliveryTypeId: number): Promise<void>;
}
