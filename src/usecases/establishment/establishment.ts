import { Establishment } from '../../entities/establishment/establishment';
import { DomainError } from '../../errors/domainError';
import {
  EstablishmentRepository,
  EstablishmentInterface,
} from '../../repositories/establishment/establishmentRepository';

interface ManageEstablishmentInterface {
  create(establishment: Establishment): Promise<Establishment>;
  update(establishment: Establishment): Promise<Establishment>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Establishment | null>;
  list(): Promise<Establishment[]>;
}

export class ManageEstablishment implements ManageEstablishmentInterface {
  constructor(
    private readonly repo: EstablishmentInterface = new EstablishmentRepository(),
  ) {}

  async create(establishment: Establishment): Promise<Establishment> {
    return this.repo.save(establishment);
  }

  async update(establishment: Establishment): Promise<Establishment> {
    if (!establishment.id) {
      throw new DomainError('MISSING_ID', 'Missing id for update', {
        entity: 'Establishment',
      });
    }
    return this.repo.update(establishment);
  }

  async delete(id: string): Promise<void> {
    if (!id) {
      throw new DomainError('MISSING_ID', 'Missing id for delete', {
        entity: 'Establishment',
      });
    }
    await this.repo.delete(id);
  }

  async findById(id: string): Promise<Establishment | null> {
    if (!id) {
      throw new DomainError('MISSING_ID', 'Missing id for search', {
        entity: 'Establishment',
      });
    }
    return this.repo.getById(id);
  }

  async list(): Promise<Establishment[]> {
    return this.repo.list();
  }
}
