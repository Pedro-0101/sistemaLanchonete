import { z } from 'zod';
import { Status } from '../entities/status/Status';
import { StatusResponseDto } from './status.dto';

export const ExampleContactNumber: CreateContactNumberDto = {
  ddd: 11,
  number: 987654321,
  status_id: 1,
};

// Schema zod para validacao
export const CreateContactNumberDtoSchema = z.object({
  ddd: z.preprocess(
    (v) => (typeof v === 'string' ? Number(v) : v),
    z.number().int().min(11).max(99),
  ),
  number: z.preprocess(
    (v) => (typeof v === 'string' ? Number(v) : v),
    z.number().int().min(11111111).max(999999999),
  ),
  status_id: z.preprocess(
    (v) => (typeof v === 'string' ? Number(v) : v),
    z.number().int().positive(),
  ),
});

export type ContactNumberResponseDto = {
  id: number;
  ddd: number;
  number: number;
  status: StatusResponseDto;
};

// type para uso
export type CreateContactNumberDto = z.infer<
  typeof CreateContactNumberDtoSchema
>;
