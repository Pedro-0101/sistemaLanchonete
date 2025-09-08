import { DeliveryType } from '../../entities/deliveryType/deliveryType';
import { Status } from '../../entities/status/Status';
import { PrismaDeliveryTypeRepository } from '../../repositories/deliveryType/prismaDeliveryTypeRepository';

export type createDeliveryTypeDto = {
  id: number;
  name: string;
  status: Status;
};

const prismaDeliveryTypeRepository = new PrismaDeliveryTypeRepository();

export async function createDeliveryType(
  deliveryType: createDeliveryTypeDto,
): Promise<DeliveryType> {
  const parsedDT = DeliveryType.create(deliveryType);
  await prismaDeliveryTypeRepository.save(parsedDT);
  return parsedDT;
}
