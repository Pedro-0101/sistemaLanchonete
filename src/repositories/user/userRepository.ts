import { PrismaClient } from '../../generated/prisma';
import { User } from '../../entities/user/user';

const prisma = new PrismaClient();

export interface userInterface {
  save(user: User): Promise<User>;
  list(): Promise<User[]>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<User>;
}

export class UserReposotiry implements userInterface {
  async save(user: User): Promise<User> {
    const savedUser = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        contact_number_id: user.contactNumber.id,
        address_id: user.address.id,
        status_id: user.status.id,
      },
    });
    return User.create(savedUser);
  }

  async list(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map((u) => User.create(u));
  }

  async update(user: User): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        contact_number_id: user.contactNumber.id,
        address_id: user.address.id,
        status_id: user.status.id,
      },
    });
    return User.create(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id: id },
    });
  }

  async getById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    return User.create(user);
  }
}
