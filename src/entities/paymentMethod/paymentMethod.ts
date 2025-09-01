import { Status } from '../status/Status';

export type paymentMethodProps = {
  id: number;
  name: string;
  status: Status;
  createdAt: Date;
};

export class PaymentMethod {
  private constructor(readonly props: paymentMethodProps) {}

  public static create(id: number, name: string, status: Status) {
    const createdAt = new Date();
    return new PaymentMethod({
      id,
      name,
      status,
      createdAt,
    });
  }
}
