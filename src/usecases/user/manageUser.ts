import { User } from '../../entities/user/user';
import { DomainError } from '../../errors/domainError';
import {
  UserRepository,
  UserInterface,
} from '../../repositories/user/userRepository';

interface ManageUserInterface {
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<User | null>;
  list(): Promise<User[]>;
}

export class ManageUser implements ManageUserInterface {
  constructor(private readonly repo: UserInterface = new UserRepository()) {}

  async create(user: User): Promise<User> {
    return this.repo.save(user);
  }

  async update(user: User): Promise<User> {
    if (!user.id) {
      throw new DomainError('MISSING_ID', 'Missing id for update', {
        entity: 'User',
      });
    }
    return this.repo.update(user);
  }

  async delete(id: string): Promise<void> {
    if (!id) {
      throw new DomainError('MISSING_ID', 'Missing id for delete', {
        entity: 'User',
      });
    }
    await this.repo.delete(id);
  }

  async findById(id: string): Promise<User | null> {
    if (!id) {
      throw new DomainError('MISSING_ID', 'Missing id for search', {
        entity: 'User',
      });
    }
    return this.repo.getById(id);
  }

  async list(): Promise<User[]> {
    return this.repo.list();
  }
}
