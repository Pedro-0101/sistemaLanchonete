import { z } from 'zod';
import { Z } from 'zod-class';
import { Establishment } from '../establishment/establishment';
import { Status } from '../status/Status';

export class ItemMenu extends Z.class({
  id: z.string().nanoid(),
  establishment: Establishment.schema(),
  name: z.string().trim().toUpperCase().min(3).max(50),
  description: z.string().min(3).max(255),
  price: z
    .number()
    .positive()
    .finite()
    .transform((n) => Math.round((n + Number.EPSILON) * 100) / 100),
  status: Status.schema(),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
}) {
  public static create(input: z.input<ReturnType<typeof ItemMenu.schema>>) {
    return ItemMenu.parse(input);
  }
}
