import { z } from 'zod';
import { Z } from 'zod-class';

export class Address extends Z.class({
  id: z.number().int(),
  country: z.string().min(1).max(50),
  state: z.string().min(1),
  city: z.string().min(1),
  cep: z.string(),
  neighborhood: z.string().min(1),
  street: z.string().min(1),
  number: z.number().int(),
  addicional: z.string().optional().default(''),
}) {
  static create(input: z.input<ReturnType<typeof Address.schema>>) {
    return Address.parse(input);
  }
}
