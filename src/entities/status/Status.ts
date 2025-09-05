import { z } from 'zod';
import { Z } from 'zod-class';

export class Status extends Z.class({
  id: z.number().int().positive(),
  name: z.string().min(3).max(50),
  active: z.boolean(),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
}) {
  static create(input: z.input<ReturnType<typeof Status.schema>>): Status {
    return Status.parse(input);
  }

  public getName() {
    return this.name;
  }

  public getActive() {
    return this.active;
  }
}
