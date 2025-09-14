import { PrismaClient } from '../../generated/prisma';
import { Address } from '../../entities/address/address';

const prisma = new PrismaClient();

export interface AddressRepositoryInterface {
  save(address: Address): Promise<Address>;
  list(userId?: number): Promise<Address[]>;
  update(address: Address): Promise<Address>;
  delete(addressId: number): Promise<void>;
  getById(id: number): Promise<Address | null>;
}

export class AddressRepository implements AddressRepositoryInterface {
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
        // user_id: address.userId,  // se tiver relação
      },
    });

    return Address.create(savedAddress);
  }

  async list(userId?: number): Promise<Address[]> {
    const addressList = await prisma.address.findMany({
      where:
        userId != null
          ? {
              /* user_id: userId */
            }
          : undefined,
    });

    return addressList.map((a) => Address.create(a));
  }

  async update(address: Address): Promise<Address> {
    const updatedAddress = await prisma.address.update({
      where: { id: address.id },
      data: {
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

  async getById(id: number): Promise<Address | null> {
    const address = await prisma.address.findFirst({
      where: { id },
    });

    if (!address) {
      return null;
    }

    return Address.create(address);
  }
}
