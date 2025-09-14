// usecases/itemOrder/ManageItemOrder.ts
import { ItemOrder } from '../../entities/itemOrder/ItemOrder';
import { DomainError } from '../../errors/domainError';
import {
  ItemOrderRepository,
  ItemOrderInterface,
} from '../../repositories/itemOrder/itemOrderRepository';

interface ManageItemOrderInterface {
  create(itemOrder: ItemOrder): Promise<ItemOrder>;
  update(itemOrder: ItemOrder): Promise<ItemOrder>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<ItemOrder | null>;
  list(orderId: string): Promise<ItemOrder[]>;
}

export class ManageItemOrder implements ManageItemOrderInterface {
  constructor(
    private readonly repo: ItemOrderInterface = new ItemOrderRepository(),
  ) {}

  async create(itemOrder: ItemOrder): Promise<ItemOrder> {
    // Se precisar validar campos do domínio, faça aqui antes de salvar
    return this.repo.save(itemOrder);
  }

  async update(itemOrder: ItemOrder): Promise<ItemOrder> {
    if (!itemOrder.id) {
      throw new DomainError('MISSING_ID', 'Missing id for update', {
        entity: 'ItemOrder',
      });
    }
    return this.repo.update(itemOrder);
  }

  async delete(id: string): Promise<void> {
    if (!id) {
      throw new DomainError('MISSING_ID', 'Missing id for delete', {
        entity: 'ItemOrder',
      });
    }
    await this.repo.delete(id);
  }

  async findById(id: string): Promise<ItemOrder | null> {
    if (!id) {
      throw new DomainError('MISSING_ID', 'Missing id for search', {
        entity: 'ItemOrder',
      });
    }
    return this.repo.getById(id);
  }

  async list(orderId: string): Promise<ItemOrder[]> {
    if (!orderId) {
      throw new DomainError('MISSING_ORDER_ID', 'Missing order id for list', {
        entity: 'ItemOrder',
      });
    }
    return this.repo.list(orderId);
  }
}
