import { ResposeStatusDto } from '../status/responseStatus.dto';

export type ContactNumberResponseDto = {
  id: number;
  ddd: number;
  number: number;
  status: ResposeStatusDto;
  createdAt?: Date;
};
