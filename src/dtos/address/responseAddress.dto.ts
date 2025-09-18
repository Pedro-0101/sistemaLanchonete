export interface ResponseAddressDto {
  id: number;
  country: string;
  state: string;
  city: string;
  cep: string;
  neighborhood: string;
  street: string;
  number: number;
  addicional: string;
  createdAt?: Date;
}
