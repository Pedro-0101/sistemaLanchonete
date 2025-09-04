import { z } from 'zod';
import { Z } from 'zod-class';
import { Status } from '../status/Status';

export class PaymentMethod extends Z.class({
  id: z.number().int(),
  name: z.string().min(3).max(50),
  status: Status.schema(),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
}) {
  static create(input: z.input<ReturnType<typeof PaymentMethod.schema>>) {
    return PaymentMethod.parse(input);
  }
}
