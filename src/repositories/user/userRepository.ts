import { PrismaClient } from '../../generated/prisma';
import { User } from '../../entities/user/user';

const prisma = new PrismaClient();

export interface UserInterface {
  save(user: User): Promise<User>;
  list(): Promise<User[]>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<User | null>;
}

export class UserRepository implements UserInterface {
  async save(user: User): Promise<User> {
    const savedUser = await prisma.user.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        user_type: user.userType,
        contact_number_id: user.contactNumber.id,
        address_id: user.address.id,
        status_id: user.status.id,
        created_at: user.createdAt ?? new Date(),
      },
      include: {
        contact_number: true,
        address: true,
        status: true,
      },
    });

    return User.create(savedUser);
  }

  async list(): Promise<User[]> {
    const users = await prisma.user.findMany({
      include: {
        contact_number: true,
        address: true,
        status: true,
      },
    });

    return users.map((u) => User.create(u));
  }

  async update(user: User): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        email: user.email,
        user_type: user.userType,
        contact_number_id: user.contactNumber.id,
        address_id: user.address.id,
        status_id: user.status.id,
      },
      include: {
        contact_number: true,
        address: true,
        status: true,
      },
    });

    return User.create(updatedUser);
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }

  async getById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        contact_number: true,
        address: true,
        status: true,
      },
    });

    if (!user) return null;
    return User.create(user);
  }
}
