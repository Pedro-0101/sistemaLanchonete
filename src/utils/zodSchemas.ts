import { z } from 'zod';

export const UFs = [
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
] as const;

export const UfSchema = z
  .string()
  .trim()
  .transform((s) => s.toUpperCase())
  .pipe(z.enum(UFs));

export type UF = z.infer<typeof UfSchema>;

// mínimo 2 letras, só A-Z, normaliza para MAIÚSCULAS
export const PaisEstadoSchema = z
  .string()
  .trim()
  .min(2, 'Informe pelo menos 2 caracteres')
  .regex(/^[A-Za-zÀ-ÿ\s'.-]+$/, 'Apenas letras e sinais comuns')
  .transform((s) => s.toUpperCase());

export const CepSchema = z
  .string()
  .trim()
  .regex(/^(\d{5})-?(\d{3})$/, 'CEP inválido')
  .transform((s) => s.replace(/\D/g, '').replace(/^(\d{5})(\d{3})$/, '$1-$2'));
