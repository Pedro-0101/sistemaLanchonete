import { PrismaClient } from '../../generated/prisma';
import { Establishment } from '../../entities/establishment/establishment';

const prisma = new PrismaClient();

export interface establishmentInterface {
  save(establishment: Establishment): Promise<Establishment>;
  list(userId: number): Promise<Establishment[]>;
  update(establishment: Establishment): Promise<Establishment>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<Establishment>;
}
