import { z } from 'zod';
import { Z } from 'zod-class';
import { DeliveryType } from '../deliveryType/deliveryType';
import { Establishment } from '../establishment/establishment';
import { PaymentMethod } from '../paymentMethod/paymentMethod';
import { Status } from '../status/Status';
import { User } from '../user/user';

export class Order extends Z.class({
  id: z.string().nanoid(),
  user: User.schema(),
  establishment: Establishment.schema(),
  paymentMethod: PaymentMethod.schema(),
  deliveryType: DeliveryType.schema(),
  status: Status.schema(),
  createdAt: z.date().default(() => new Date()),
  sentDate: z.date().nullable(),
  deliveryDate: z.date().nullable(),
}) {
  public static create(input: z.input<ReturnType<typeof Order.schema>>) {
    return Order.parse(input);
  }
}
