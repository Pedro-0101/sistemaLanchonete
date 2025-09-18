import { ContactNumber } from '../../entities/contactNumber/contactNumber';
import { CreateContactNumberDto } from '../../dtos/contactNumber/createContactNumber.dto';
import { DomainError } from '../../errors/domainError';
import { ContactNumberRepository } from '../../repositories/contactNumber/contactNumberRepository';
import { ManageStatus } from '../status/manageStatus';

interface ManageContactNumberInterface {
  create(cn: CreateContactNumberDto): Promise<ContactNumber>;
  update(cn: ContactNumber): Promise<ContactNumber>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<ContactNumber | null>;
}

export class ManageContactNumber implements ManageContactNumberInterface {
  constructor(
    private readonly repo: ContactNumberRepository = ContactNumberRepository.getInstance(),
  ) {}

  async create(cn: CreateContactNumberDto): Promise<ContactNumber> {
    const statusManager = new ManageStatus();
    const status = await statusManager.getStatusById(cn.status_id);

    const contactNumberData = {
      ddd: cn.ddd,
      number: cn.number,
      status_id: status.id,
    };

    return this.repo.save(contactNumberData);
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
