import { PrismaClient } from '../../generated/prisma';
import { User } from '../../entities/user/user';

const prisma = new PrismaClient();

export interface userInterface {
  save(user: User): Promise<User>;
  list(): Promise<User[]>;
  update(user: User): Promise<User>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<User>;
}
