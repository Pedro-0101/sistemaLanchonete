import { PrismaClient } from '../../generated/prisma';
import { Order } from '../../entities/order/order';

const prisma = new PrismaClient();

export interface orderInterface {
  save(order: Order): Promise<Order>;
  list(): Promise<Order[]>;
  update(order: Order): Promise<Order>;
  delete(id: number): Promise<void>;
  listByUser(userId: number): Promise<Order[]>;
  getById(id: number): Promise<Order>;
}
