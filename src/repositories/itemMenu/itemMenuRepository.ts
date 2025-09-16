import { PrismaClient } from '../../generated/prisma';
import { ItemMenu } from '../../entities/itemMenu/itemMenu';

const prisma = new PrismaClient();

export interface ItemMenuInterface {
  save(itemMenu: ItemMenu): Promise<ItemMenu>;
  list(establishmentId: string): Promise<ItemMenu[]>;
  update(itemMenu: ItemMenu): Promise<ItemMenu>;
  delete(id: string): Promise<void>;
  listByCategory(
    categoryId: number,
    establishmentId?: string,
  ): Promise<ItemMenu[]>;
  getById(id: string): Promise<ItemMenu | null>;
}

export class ItemMenuRepository implements ItemMenuInterface {
  private static instance: ItemMenuRepository;

  private constructor() {}

  static getInstance(): ItemMenuRepository {
    if (!ItemMenuRepository.instance) {
      ItemMenuRepository.instance = new ItemMenuRepository();
    }

    return ItemMenuRepository.instance;
  }

  async save(itemMenu: ItemMenu): Promise<ItemMenu> {
    const saved = await prisma.item_menu.create({
      data: {
        id: itemMenu.id,
        name: itemMenu.name,
        description: itemMenu.description,
        price: itemMenu.price,
        establishment_id: itemMenu.establishment.id,
        status_id: itemMenu.status.id,
        category_id: itemMenu.category.id,
      },
      include: {
        status: true,
        establishment: true,
        category: true,
      },
    });
    return ItemMenu.create(saved);
  }

  async list(establishmentId: string): Promise<ItemMenu[]> {
    const rows = await prisma.item_menu.findMany({
      where: { establishment_id: establishmentId },
      include: {
        status: true,
        establishment: true,
        category: true,
      },
    });
    return rows.map((r) => ItemMenu.create(r));
  }

  async update(itemMenu: ItemMenu): Promise<ItemMenu> {
    const updated = await prisma.item_menu.update({
      where: { id: itemMenu.id },
      data: {
        name: itemMenu.name,
        description: itemMenu.description,
        price: itemMenu.price,
        establishment_id: itemMenu.establishment.id,
        status_id: itemMenu.status.id,
        category_id: itemMenu.category.id,
      },
      include: {
        status: true,
        establishment: true,
        category: true,
      },
    });
    return ItemMenu.create(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.item_menu.delete({ where: { id } });
  }

  async listByCategory(
    categoryId: number,
    establishmentId?: string,
  ): Promise<ItemMenu[]> {
    const rows = await prisma.item_menu.findMany({
      where: {
        category_id: categoryId,
        ...(establishmentId ? { establishment_id: establishmentId } : {}),
      },
      include: {
        status: true,
        establishment: true,
        category: true,
      },
    });
    return rows.map((r) => ItemMenu.create(r));
  }

  async getById(id: string): Promise<ItemMenu | null> {
    const row = await prisma.item_menu.findFirst({
      where: { id },
      include: {
        status: true,
        establishment: true,
        category: true,
      },
    });
    if (!row) return null;
    return ItemMenu.create(row);
  }
}
