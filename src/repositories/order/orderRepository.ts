import { PrismaClient } from '../../generated/prisma';
import { Order } from '../../entities/order/order';

const prisma = new PrismaClient();

export interface OrderInterface {
  save(order: Order): Promise<Order>;
  list(): Promise<Order[]>;
  update(order: Order): Promise<Order>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<Order | null>;
}

export class OrderRepository implements OrderInterface {
  private static instance: OrderRepository;

  private constructor() {}

  static getInstance(): OrderRepository {
    if (!OrderRepository.instance) {
      OrderRepository.instance = new OrderRepository();
    }

    return OrderRepository.instance;
  }

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
      include: {
        user: true,
        establishment: true,
        payment_method: true,
        delivery_type: true,
        status: true,
      },
    });
    return Order.create(savedOrder);
  }

  async list(): Promise<Order[]> {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        establishment: true,
        payment_method: true,
        delivery_type: true,
        status: true,
      },
    });
    return orders.map((o) => Order.create(o));
  }

  async update(order: Order): Promise<Order> {
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        user_id: order.user.id,
        establishment_id: order.establishment.id,
        payment_method_id: order.paymentMethod.id,
        delivery_type_id: order.deliveryType.id,
        status_id: order.status.id,
        sent_date: order.sentDate,
        delivery_date: order.deliveryDate,
      },
      include: {
        user: true,
        establishment: true,
        payment_method: true,
        delivery_type: true,
        status: true,
      },
    });
    return Order.create(updatedOrder);
  }

  async delete(id: string): Promise<void> {
    await prisma.order.delete({
      where: { id },
    });
  }

  async getById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
        establishment: true,
        payment_method: true,
        delivery_type: true,
        status: true,
      },
    });
    if (!order) return null;
    return Order.create(order);
  }
}
