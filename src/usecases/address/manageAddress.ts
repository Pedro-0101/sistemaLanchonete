import { Address } from '../../entities/address/address';
import { DomainError } from '../../errors/domainError';
import { AddressRepository } from '../../repositories/address/addressRepository';

interface ManageAddressInterface {
  create(address: Address): Promise<Address>;
  update(address: Address): Promise<Address>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Address | null>;
  list(userId?: number): Promise<Address[]>;
}

export class ManageAddress implements ManageAddressInterface {
  constructor(private readonly repo: AddressRepository) {}

  async create(address: Address): Promise<Address> {
    return this.repo.save(address);
  }

  async update(address: Address): Promise<Address> {
    if (address.id == null) {
      throw new DomainError('MISSING_ID', 'Missing id for update', {
        entity: 'Address',
      });
    }
    return this.repo.update(address);
  }

  async delete(id: number): Promise<void> {
    if (id == null) {
      throw new DomainError('MISSING_ID', 'Missing id for delete', {
        entity: 'Address',
      });
    }
    await this.repo.delete(id);
  }

  async findById(id: number): Promise<Address | null> {
    if (id == null) {
      throw new DomainError('MISSING_ID', 'Missing id for search', {
        entity: 'Address',
      });
    }
    return this.repo.getById(id);
  }

  async list(userId?: number): Promise<Address[]> {
    return this.repo.list(userId);
  }
}
