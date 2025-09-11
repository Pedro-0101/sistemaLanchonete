import { PrismaClient } from '../../generated/prisma';
import { ItemMenu } from '../../entities/itemMenu/itemMenu';

const prisma = new PrismaClient();

export interface itemMenuInterface {
  save(itemMenu: ItemMenu): Promise<ItemMenu>;
  list(establishmentId: number): Promise<ItemMenu[]>;
  update(itemMenu: ItemMenu): Promise<ItemMenu>;
  delete(id: number): Promise<void>;
  listByCategory(categoryId: number): Promise<ItemMenu[]>;
  getById(id: number): Promise<ItemMenu>;
}
