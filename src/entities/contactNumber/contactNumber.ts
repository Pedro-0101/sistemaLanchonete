import { z } from 'zod';
import { Z } from 'zod-class';
import { Status } from '../status/Status';

export class ContactNumber extends Z.class({
  id: z.number(),
  ddd: z.number().min(11).max(99),
  number: z.number().min(11111111).max(999999999),
  status: Status.schema(),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
}) {
  static create(input: z.input<ReturnType<typeof ContactNumber.schema>>) {
    return ContactNumber.parse(input);
  }
}
