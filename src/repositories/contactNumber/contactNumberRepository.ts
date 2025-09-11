import { PrismaClient } from '../../generated/prisma';
import { ContactNumber } from '../../entities/contactNumber/contactNumber';

const prisma = new PrismaClient();

export interface contactNumberInterface {
  save(contact: ContactNumber): Promise<ContactNumber>;
  list(userId: number): Promise<ContactNumber[]>;
  update(contact: ContactNumber): Promise<ContactNumber>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<ContactNumber>;
}
