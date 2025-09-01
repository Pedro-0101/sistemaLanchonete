import { nanoid } from 'nanoid';
import { deliveryType } from '../deliveryType/deliveryType';
import { Establishment } from '../establishment/establishment';
import { PaymentMethod } from '../paymentMethod/paymentMethod';
import { Status } from '../status/Status';
import { User } from '../user/user';

export type orderProps = {
  id: string;
  user: User;
  establishment: Establishment;
  paymentMethod: PaymentMethod;
  deliveryType: deliveryType;
  status: Status;
  createdAt: Date;
  sentDate: Date | null;
  deliveryDate: Date | null;
};

export class Order {
  private constructor(readonly props: orderProps) {}

  public static create(
    user: User,
    establishment: Establishment,
    paymentMethod: PaymentMethod,
    deliveryType: deliveryType,
    status: Status,
  ) {
    const id = nanoid();
    const createdAt = new Date();
    return new Order({
      id,
      user,
      establishment,
      paymentMethod,
      deliveryType,
      status,
      createdAt,
      sentDate: null,
      deliveryDate: null,
    });
  }
}
