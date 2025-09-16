import { z } from 'zod';

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

export const ExampleAddress: CreateAddressDto = {
  country: 'BRASIL',
  state: 'SP',
  city: 'SÃO PAULO',
  cep: '01001-000',
  neighborhood: 'CENTRO',
  street: 'RUA XV DE NOVEMBRO',
  number: 123,
  addicional: 'APTO 45',
};

// Schema zod para validacao
export const CreateAddressDtoSchema = z.object({
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
});

export type AddressResponseDto = {
  id: number;
  country: string;
  state: string;
  city: string;
  cep: string;
  neighborhood: string;
  street: string;
  number: number;
  addicional: string;
};

// type para uso
export type CreateAddressDto = z.input<typeof CreateAddressDtoSchema>;
