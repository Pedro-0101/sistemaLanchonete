import { z } from 'zod';
import { Z } from 'zod-class';
import { Order } from '../order/order';
import { ItemMenu } from '../itemMenu/itemMenu';
import { Status } from '../status/Status';

export class ItemOrder extends Z.class({
  id: z.string().nanoid(),
  order: Order.schema(),
  item: ItemMenu.schema(),
  quantity: z.number().int().positive().min(1),
  obs: z.string().min(3).max(255).optional(),
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
  public static create(input: z.input<ReturnType<typeof ItemOrder.schema>>) {
    return ItemOrder.parse(input);
  }
}
