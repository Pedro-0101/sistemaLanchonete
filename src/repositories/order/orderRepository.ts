import { PrismaClient } from '../../generated/prisma';
import { Order } from '../../entities/order/order';

const prisma = new PrismaClient();

export interface orderInterface {
  save(order: Order): Promise<Order>;
  list(): Promise<Order[]>;
  update(order: Order): Promise<Order>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<Order>;
}

export class OrderRepository implements orderInterface {
  async save(order: Order): Promise<Order> {
    const savedOrder = await prisma.order.create({
      data: {
        id: order.id,
        user_id: order.user.id,
        establishment_id: order.establishment.id,
        payment_method_id: order.paymentMethod.id,
        delivery_type_id: order.deliveryType.id,
        status_id: order.status.id,
        sent_date: order.sentDate,
        delivery_date: order.deliveryDate,
      },
    });
    return Order.create(savedOrder);
  }

  async list(): Promise<Order[]> {
    const orders = await prisma.order.findMany();
    return orders.map((o) => Order.create(o));
  }

  async update(order: Order): Promise<Order> {
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        id: order.id,
        user_id: order.user.id,
        establishment_id: order.establishment.id,
        payment_method_id: order.paymentMethod.id,
        delivery_type_id: order.deliveryType.id,
        status_id: order.status.id,
        sent_date: order.sentDate,
        delivery_date: order.deliveryDate,
      },
    });
    return Order.create(updatedOrder);
  }

  async delete(id: string): Promise<void> {
    await prisma.order.delete({
      where: {
        id: id,
      },
    });
  }

  async getById(id: string): Promise<Order> {
    const order = await prisma.order.findUnique({
      where: { id: id },
    });
    return Order.create(order);
  }
}
