import { it, expect } from 'vitest';
import { ManageDeliveryType } from '../../usecases/deliveryType/manageDeliveryType';
import { DeliveryType } from '../../entities/deliveryType/deliveryType';

const manageDeliveryType = new ManageDeliveryType();

it('Realiza a consulta no banco e retorna lista de delivety types', async () => {
  const deliveryTypes = await manageDeliveryType.listDeliveryType();

  expect(deliveryTypes.length).toBeGreaterThan(0);
  expect(deliveryTypes[0]).toBeInstanceOf(DeliveryType);
});

it('Realiza a consulta de delivery type com id e retorna o delivery type com id 1', async () => {
  const deliveryType = await manageDeliveryType.getDeliveryTypeById(1);

  expect(deliveryType?.id).toBe(1);
  expect(deliveryType).toBeInstanceOf(DeliveryType);
});
