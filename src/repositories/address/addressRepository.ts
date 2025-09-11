import { PrismaClient } from '../../generated/prisma';
import { Address } from '../../entities/address/address';

const prisma = new PrismaClient();

export interface addressRepositoryInteface {
  save(address: Address): Promise<Address>;
  list(user_id: number): Promise<Address[]>;
  update(address: Address): Promise<Address>;
  delete(addressId: number): Promise<Address>; // Realizar softDelete
  getById(id: number): Promise<Address>;
}
