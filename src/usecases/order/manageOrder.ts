// usecases/order/ManageOrder.ts
import { Order } from '../../entities/order/order';
import { DomainError } from '../../errors/domainError';
import {
  OrderRepository,
  OrderInterface,
} from '../../repositories/order/orderRepository';

interface ManageOrderInterface {
  create(order: Order): Promise<Order>;
  update(order: Order): Promise<Order>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Order | null>;
  list(): Promise<Order[]>;
}

export class ManageOrder implements ManageOrderInterface {
  constructor(private readonly repo: OrderInterface = new OrderRepository()) {}

  async create(order: Order): Promise<Order> {
    return this.repo.save(order);
  }

  async update(order: Order): Promise<Order> {
    if (!order.id) {
      throw new DomainError('MISSING_ID', 'Missing id for update', {
        entity: 'Order',
      });
    }
    return this.repo.update(order);
  }

  async delete(id: string): Promise<void> {
    if (!id) {
      throw new DomainError('MISSING_ID', 'Missing id for delete', {
        entity: 'Order',
      });
    }
    await this.repo.delete(id);
  }

  async findById(id: string): Promise<Order | null> {
    if (!id) {
      throw new DomainError('MISSING_ID', 'Missing id for search', {
        entity: 'Order',
      });
    }
    return this.repo.getById(id);
  }

  async list(): Promise<Order[]> {
    return this.repo.list();
  }
}
