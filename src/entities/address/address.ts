import { z } from 'zod';
import { Z } from 'zod-class';

const UF = z.enum([
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
]);

export class Address extends Z.class({
  id: z.number().int(),
  country: z.string().trim().toUpperCase().min(3).max(30),
  state: z
    .string()
    .transform((s) => s.trim().toUpperCase())
    .pipe(UF),
  city: z.string().trim().toUpperCase().min(3).max(50),
  cep: z.string().regex(/^\d{5}-?\d{3}$/, 'CEP inválido'),
  neighborhood: z.string().trim().toUpperCase().min(3).max(50),
  street: z.string().trim().toUpperCase().min(3).max(50),
  number: z.number().int(),
  addicional: z.string().trim().toUpperCase().max(255).optional().default(''),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
}) {
  static create(input: z.input<ReturnType<typeof Address.schema>>): Address {
    return Address.parse(input);
  }
}
