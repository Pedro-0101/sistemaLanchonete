import { PaymentMethodRepository } from '../../repositories/paymentMethod/paymentMethodRepository';
import { PaymentMethod } from '../../entities/paymentMethod/paymentMethod';
import { DomainError } from '../../errors/domainError';

const paymentRepo = new PaymentMethodRepository();

export class ManagePaymentMethod {
  async list(): Promise<PaymentMethod[]> {
    return await paymentRepo.list();
  }

  async getPaymentMethodById(id: number): Promise<PaymentMethod> {
    if (!Number.isInteger(id) || id < 0) {
      throw new DomainError(
        'PAYMENT_METHOD_MISSING_ID',
        'Missing id for realize the search',
        { id },
      );
    }

    const paymentMethod = await paymentRepo.getPaymentMethodById(id);

    if (!paymentMethod) {
      throw new DomainError(
        'PAYMENT_METHOD_NOT_FOUND',
        'Payment method not found',
      );
    }

    return paymentMethod;
  }
}
