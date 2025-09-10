import { PaymentMethodRepository } from '../../repositories/paymentMethod/paymentMethodRepository';
import { PaymentMethod } from '../../entities/paymentMethod/paymentMethod';

const paymentRepo = new PaymentMethodRepository();

export class ManagePaymentMethod {
  async list(): Promise<PaymentMethod[]> {
    return await paymentRepo.list();
  }

  async getPaymentMethodById(id: number): Promise<PaymentMethod | null> {
    return paymentRepo.getPaymentMethodById(id);
  }
}
