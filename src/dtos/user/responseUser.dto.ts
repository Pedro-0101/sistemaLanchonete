import { ResposeStatusDto } from '../status/responseStatus.dto';
import { ResponseAddressDto } from '../address/responseAddress.dto';
import { ContactNumberResponseDto } from '../contactNumber/responseContactNumber.dto';

export type ResponseUserDto = {
  id: string;
  name: string;
  email: string;
  contactNumber: ContactNumberResponseDto;
  address: ResponseAddressDto;
  status: ResposeStatusDto;
  userType: 'CLIENT' | 'OWNER';
  createdAt?: Date;
};
