// repositories/itemOrder/ItemOrderRepository.ts
import { PrismaClient } from '../../generated/prisma';
import { ItemOrder } from '../../entities/itemOrder/ItemOrder';

const prisma = new PrismaClient();

export interface ItemOrderInterface {
  save(itemOrder: ItemOrder): Promise<ItemOrder>;
  list(orderId: string): Promise<ItemOrder[]>;
  update(itemOrder: ItemOrder): Promise<ItemOrder>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<ItemOrder | null>;
}

export class ItemOrderRepository implements ItemOrderInterface {
  private static instance: ItemOrderRepository;

  private constructor() {}

  static getInstance(): ItemOrderRepository {
    if (!ItemOrderRepository.instance) {
      ItemOrderRepository.instance = new ItemOrderRepository();
    }

    return ItemOrderRepository.instance;
  }

  async save(itemOrder: ItemOrder): Promise<ItemOrder> {
    const saved = await prisma.item_order.create({
      data: {
        id: itemOrder.id,
        order_id: itemOrder.order.id,
        item_menu_id: itemOrder.item.id,
        quantity: itemOrder.quantity,
        obs: itemOrder.obs,
        price: itemOrder.price,
        status_id: itemOrder.status.id,
      },
      include: {
        order: true,
        item_menu: true,
        status: true,
      },
    });
    return ItemOrder.create(saved);
  }

  async list(orderId: string): Promise<ItemOrder[]> {
    const rows = await prisma.item_order.findMany({
      where: { order_id: orderId },
      include: {
        order: true,
        item_menu: true,
        status: true,
      },
    });
    return rows.map((r) => ItemOrder.create(r));
  }

  async update(itemOrder: ItemOrder): Promise<ItemOrder> {
    const updated = await prisma.item_order.update({
      where: { id: itemOrder.id },
      data: {
        order_id: itemOrder.order.id,
        item_menu_id: itemOrder.item.id,
        quantity: itemOrder.quantity,
        obs: itemOrder.obs,
        price: itemOrder.price,
        status_id: itemOrder.status.id,
      },
      include: {
        order: true,
        item_menu: true,
        status: true,
      },
    });
    return ItemOrder.create(updated);
  }

  async delete(id: string): Promise<void> {
    await prisma.item_order.delete({ where: { id } });
  }

  async getById(id: string): Promise<ItemOrder | null> {
    const row = await prisma.item_order.findUnique({
      where: { id },
      include: {
        order: true,
        item_menu: true,
        status: true,
      },
    });
    if (!row) return null;
    return ItemOrder.create(row);
  }
}
