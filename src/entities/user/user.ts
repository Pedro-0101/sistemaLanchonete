import { z } from 'zod';
import { Z } from 'zod-class';
import { Address } from '../address/address';
import { Status } from '../status/Status';
import { ContactNumber } from '../contactNumber/contactNumber';

export class User extends Z.class({
  id: z.string().nanoid(),
  name: z.string().trim().toUpperCase().min(3).max(50),
  email: z.string().trim().toLowerCase().email(),
  contactNumber: ContactNumber.schema(),
  address: Address.schema(),
  status: Status.schema(),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
}) {
  public static create(input: z.input<ReturnType<typeof User.schema>>): User {
    return User.parse(input);
  }
}
