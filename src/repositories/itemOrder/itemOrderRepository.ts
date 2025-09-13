import { PrismaClient } from '../../generated/prisma';
import { ItemOrder } from '../../entities/itemOrder/ItemOrder';

const prisma = new PrismaClient();

export interface itemOrderInterface {
  save(itemOrder: ItemOrder): Promise<ItemOrder>;
  list(order: string): Promise<ItemOrder[]>;
  update(itemOrder: ItemOrder): Promise<ItemOrder>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<ItemOrder>;
}

export class ItemOrderRepository implements itemOrderInterface {
  async save(itemOrder: ItemOrder): Promise<ItemOrder> {
    const savedItem = await prisma.item_order.create({
      data: {
        id: itemOrder.id,
        order_id: itemOrder.order.id,
        item_menu_id: itemOrder.item.id,
        quantity: itemOrder.quantity,
        obs: itemOrder.obs,
        price: itemOrder.price,
        status_id: itemOrder.status.id,
      },
    });
    return ItemOrder.create(savedItem);
  }

  async list(order: string): Promise<ItemOrder[]> {
    const orders = await prisma.item_order.findMany({
      where: { order_id: order },
    });
    return orders.map((i) => ItemOrder.create(i));
  }

  async update(itemOrder: ItemOrder): Promise<ItemOrder> {
    const updatedItem = await prisma.item_order.update({
      where: { id: itemOrder.id },
      data: {
        id: itemOrder.id,
        order_id: itemOrder.order.id,
        item_menu_id: itemOrder.item.id,
        quantity: itemOrder.quantity,
        obs: itemOrder.obs,
        price: itemOrder.price,
        status_id: itemOrder.status.id,
      },
    });
    return ItemOrder.create(updatedItem);
  }

  async delete(id: string): Promise<void> {
    await prisma.item_menu.delete({
      where: { id: id },
    });
  }

  async getById(id: string): Promise<ItemOrder> {
    const itemOrder = await prisma.item_order.findUnique({
      where: { id: id },
    });
    return ItemOrder.create(itemOrder);
  }
}
