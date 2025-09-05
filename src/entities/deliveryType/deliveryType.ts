import { z } from 'zod';
import { Z } from 'zod-class';
import { Status } from '../status/Status';

export class DeliveryType extends Z.class({
  id: z.number().int(),
  name: z.string().trim().toUpperCase().min(3).max(50),
  status: Status.schema(),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
}) {
  static create(
    input: z.input<ReturnType<typeof DeliveryType.schema>>,
  ): DeliveryType {
    return DeliveryType.parse(input);
  }
}
