import { CreateUserDto } from '../../dtos/userDto';
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
import { CreateContactNumberDto } from '../../dtos/contactNumber.dto';

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
    let ms = new ManageStatus();
    const status = await ms.getStatusById(input.status_id);
    let ma = new ManageAddress();
    const address = await ma.create(input.address);
    let mc = new ManageContactNumber();
    const contactNumber = await mc.create(
      input.contactNumber as CreateContactNumberDto,
    );

    if (!status) {
      throw new DomainError(
        'INVALID_STATUS',
        'Invalid status on user creation',
        { status },
      );
    }
    if (!address.id) {
      throw new DomainError(
        'ADDRESS_INVALID_ID',
        'Address invalid id on user creation',
        { address },
      );
    }
    if (!contactNumber.id) {
      throw new DomainError(
        'CONTACT_NUMBER_INVALID_ID',
        'Contact number invalid id on user creation',
        { contactNumber },
      );
    }

    const user = User.create({
      id: nanoid(),
      name: input.name,
      email: input.email,
      contactNumber: contactNumber,
      address: address,
      status: status,
      usertype: input.userType,
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
