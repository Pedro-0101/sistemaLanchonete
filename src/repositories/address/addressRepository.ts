import { PrismaClient } from '../../generated/prisma';
import { Address } from '../../entities/address/address';
import { DomainError } from '../../errors/domainError';

const prisma = new PrismaClient();

export interface addressRepositoryInteface {
  save(address: Address): Promise<Address>;
  list(user_id: number): Promise<Address[]>;
  update(address: Address): Promise<Address>;
  delete(addressId: number): Promise<void>;
  getById(id: number): Promise<Address>;
}

export class AddressRepsitory implements addressRepositoryInteface {
  async save(address: Address): Promise<Address> {
    const savedAddress = await prisma.address.create({
      data: {
        id: address.id,
        country: address.country,
        state: address.state,
        city: address.city,
        cep: address.cep,
        neighborhood: address.neighborhood,
        street: address.street,
        number: address.number,
        additional: address.addicional,
      },
    });

    const parsedAddress = Address.create(savedAddress);
    return parsedAddress;
  }

  async list(user_id: number): Promise<Address[]> {
    const addressList = await prisma.address.findMany();

    const addresses = addressList.map((a) => Address.create({ a }));

    return addresses;
  }

  async update(address: Address): Promise<Address> {
    const updatedAddress = await prisma.address.update({
      where: { id: address.id },
      data: {
        id: address.id,
        country: address.country,
        state: address.state,
        city: address.city,
        cep: address.cep,
        neighborhood: address.neighborhood,
        street: address.street,
        number: address.number,
        additional: address.addicional,
      },
    });
    return Address.create(updatedAddress);
  }

  async delete(addressId: number): Promise<void> {
    await prisma.address.delete({
      where: { id: addressId },
    });
  }

  async getById(id: number): Promise<Address> {
    const address = await prisma.address.findFirst({
      where: { id: id },
    });

    if (!address) {
      throw new DomainError('ADDRESS_NOT_FOUND', 'Address not found', { id });
    }

    return Address.create(address);
  }
}
