import { CreateUserDto } from '../../dtos/user/createUser.dto';
import { ManageStatus } from '../status/manageStatus';
import { ManageAddress } from '../address/manageAddress';
import { User } from '../../entities/user/user';
import { DomainError } from '../../errors/domainError';
import {
  UserRepository,
  UserInterface,
} from '../../repositories/user/userRepository';
import { nanoid } from 'nanoid';
import { ManageContactNumber } from '../contactNumber/manageContactNumber';

interface ManageUserInterface {
  create(input: CreateUserDto): Promise<User>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<User | null>;
  list(): Promise<User[]>;
}

export class ManageUser implements ManageUserInterface {
  constructor(
    private readonly repo: UserInterface = UserRepository.getInstance(),
  ) {}

  async create(input: CreateUserDto): Promise<User> {
    const statusManager = new ManageStatus();
    const status = await statusManager.getStatusById(input.status_id);

    const addressManager = new ManageAddress();
    const address = await addressManager.create(input.address);

    const contactManager = new ManageContactNumber();
    const contactNumber = await contactManager.create(input.contactNumber);

    if (!address.id) {
      throw new DomainError(
        'ADDRESS_INVALID_ID',
        'Failed to create user because address lacks id',
        { address },
      );
    }

    if (!contactNumber.id) {
      throw new DomainError(
        'CONTACT_NUMBER_INVALID_ID',
        'Failed to create user because contact number lacks id',
        { contactNumber },
      );
    }

    const user = User.create({
      id: nanoid(),
      name: input.name,
      email: input.email,
      contactNumber,
      address,
      status,
      userType: input.userType,
    });

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
