import { z } from 'zod';
import { Z } from 'zod-class';
import { Status } from '../status/Status';
import { User } from '../user/user';

export class Establishment extends Z.class({
  id: z.string().nanoid(),
  name: z.string().trim().toUpperCase().min(3).max(50),
  description: z.string().min(3).max(255),
  user: User.schema(),
  status: Status.schema(),
  isOpen: z.boolean(),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
}) {
  public static create(
    input: z.input<ReturnType<typeof Establishment.schema>>,
  ): Establishment {
    return Establishment.parse(input);
  }
}
