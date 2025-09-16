import { z } from 'zod';
import {
  ContactNumberResponseDto,
  CreateContactNumberDtoSchema,
  ExampleContactNumber,
} from './contactNumber.dto';
import {
  AddressResponseDto,
  CreateAddressDtoSchema,
  ExampleAddress,
} from './address.dto';
import { StatusResponseDto } from './status.dto';

export const ExampleUser: CreateUserDto = {
  name: 'JOÃO SILVA',
  email: 'joao.silva@email.com',
  contactNumber: ExampleContactNumber,
  address: ExampleAddress,
  status_id: 1,
  userType: 'CLIENT', // ou "OWNER"
};

// Schema zod para validacao
export const CreateUserDtoSchema = z.object({
  name: z.string().trim().toUpperCase().min(3).max(50),
  email: z.string().trim().toLowerCase().email(),
  contactNumber: CreateContactNumberDtoSchema,
  address: CreateAddressDtoSchema,
  status_id: z.number().int().positive(),
  userType: z.enum(['CLIENT', 'OWNER']),
});

export type UserResponseDto = {
  id: string;
  name: string;
  email: string;
  contactNumber: ContactNumberResponseDto;
  address: AddressResponseDto;
  status: StatusResponseDto;
  userType: string;
};

// type para uso
export type CreateUserDto = z.input<typeof CreateUserDtoSchema>;
