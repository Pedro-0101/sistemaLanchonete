import { it, expect } from 'vitest';
import { ManagePaymentMethod } from '../../usecases/paymentMethod/managePaymentMethod';
import { PaymentMethod } from '../../entities/paymentMethod/paymentMethod';

const managePaymentMethod = new ManagePaymentMethod();

it('Realiza a consulta e retorna lista de metodos de pagamento', async () => {
  const paymentMethodList = await managePaymentMethod.list();

  expect(paymentMethodList.length).toBeGreaterThan(0);
  expect(paymentMethodList[0]).toBeInstanceOf(PaymentMethod);
});

it('Realiza a consulta de metodos de pagamento com id e retorna o metodo com id 1', async () => {
  const paymentMethod = await managePaymentMethod.getPaymentMethodById(1);

  expect(paymentMethod?.id).toBe(1);
  expect(paymentMethod).toBeInstanceOf(PaymentMethod);
});
