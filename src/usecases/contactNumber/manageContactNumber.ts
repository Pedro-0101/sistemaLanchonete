import { ContactNumber } from '../../entities/contactNumber/contactNumber';
import { DomainError } from '../../errors/domainError';
import { ContactNumberRepository } from '../../repositories/contactNumber/contactNumberRepository';

interface ManageContactNumberInterface {
  create(cn: ContactNumber): Promise<ContactNumber>;
  update(cn: ContactNumber): Promise<ContactNumber>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<ContactNumber | null>;
}

export class ManageContactNumber implements ManageContactNumberInterface {
  constructor(private readonly repo: ContactNumberRepository) {}

  async create(cn: ContactNumber): Promise<ContactNumber> {
    return this.repo.save(cn);
  }

  async update(cn: ContactNumber): Promise<ContactNumber> {
    if (cn.id == null) {
      throw new DomainError('MISSING_ID', 'Missing id for update', {
        entity: 'ContactNumber',
      });
    }
    return this.repo.update(cn);
  }

  async delete(id: number): Promise<void> {
    if (id == null) {
      throw new DomainError('MISSING_ID', 'Missing id for delete', {
        entity: 'ContactNumber',
      });
    }
    await this.repo.delete(id);
  }

  async findById(id: number): Promise<ContactNumber | null> {
    if (id == null) {
      throw new DomainError('MISSING_ID', 'Missing id for search', {
        entity: 'ContactNumber',
      });
    }
    return this.repo.getById(id);
  }
}
