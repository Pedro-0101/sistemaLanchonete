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

export class ItemMenuRepository implements itemMenuInterface {
  async save(itemMenu: ItemMenu): Promise<ItemMenu> {
    await prisma.item_menu.create({
      data: {
        id: itemMenu.id,
        name: itemMenu.name,
        description: itemMenu.description,
        price: itemMenu.price,
        establishment_id: itemMenu.establishment.id,
        status_id: itemMenu.status.id,
      },
    });

    // Follow pattern: return parsed entity
    return ItemMenu.create(itemMenu);
  }

  async list(establishmentId: number): Promise<ItemMenu[]> {
    const rows = await prisma.item_menu.findMany({
      where: { establishment_id: String(establishmentId) },
    });

    // Cast DB rows to domain type to mirror other repos' lightweight mapping
    return rows.map((r) => r as unknown as ItemMenu);
  }

  async update(itemMenu: ItemMenu): Promise<ItemMenu> {
    await prisma.item_menu.update({
      where: { id: itemMenu.id },
      data: {
        name: itemMenu.name,
        description: itemMenu.description,
        price: itemMenu.price,
        establishment_id: itemMenu.establishment.id,
        status_id: itemMenu.status.id,
      },
    });

    return ItemMenu.create(itemMenu);
  }

  async delete(id: number): Promise<void> {
    await prisma.item_menu.delete({ where: { id: String(id) } });
  }

  async listByCategory(_categoryId: number): Promise<ItemMenu[]> {
    // No category relation on item_menu in current schema; return all for now
    const rows = await prisma.item_menu.findMany();
    return rows.map((r) => r as unknown as ItemMenu);
  }

  async getById(id: number): Promise<ItemMenu> {
    const row = await prisma.item_menu.findFirst({ where: { id: String(id) } });
    if (!row) {
      // Use generic error pattern seen in other repositories
      throw new Error('Nao encontrado');
    }
    return row as unknown as ItemMenu;
  }
}
