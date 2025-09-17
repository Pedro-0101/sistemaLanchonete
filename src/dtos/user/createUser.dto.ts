import { CreateAddressDto } from '../address/createAddress.dto';
import { CreateContactNumberDto } from '../contactNumber/createContactNumber.dto';

export interface CreateUserDto {
  name: string;
  email: string;
  contactNumber: CreateContactNumberDto;
  address: CreateAddressDto;
  status_id: number;
  userType: string;
}
