import { ItemMenu } from '../../entities/itemMenu/itemMenu';
import { DomainError } from '../../errors/domainError';
import {
  ItemMenuRepository,
  ItemMenuInterface,
} from '../../repositories/itemMenu/itemMenuRepository';

interface ManageItemMenuInterface {
  create(item: ItemMenu): Promise<ItemMenu>;
  update(item: ItemMenu): Promise<ItemMenu>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<ItemMenu | null>;
  list(establishmentId: string): Promise<ItemMenu[]>;
  listByCategory(
    categoryId: number,
    establishmentId?: string,
  ): Promise<ItemMenu[]>;
}

export class ManageItemMenu implements ManageItemMenuInterface {
  constructor(
    private readonly repo: ItemMenuInterface = new ItemMenuRepository(),
  ) {}

  async create(item: ItemMenu): Promise<ItemMenu> {
    return this.repo.save(item);
  }

  async update(item: ItemMenu): Promise<ItemMenu> {
    if (!item.id) {
      throw new DomainError('MISSING_ID', 'Missing id for update', {
        entity: 'ItemMenu',
      });
    }
    return this.repo.update(item);
  }

  async delete(id: string): Promise<void> {
    if (!id) {
      throw new DomainError('MISSING_ID', 'Missing id for delete', {
        entity: 'ItemMenu',
      });
    }
    await this.repo.delete(id);
  }

  async findById(id: string): Promise<ItemMenu | null> {
    if (!id) {
      throw new DomainError('MISSING_ID', 'Missing id for search', {
        entity: 'ItemMenu',
      });
    }
    return this.repo.getById(id);
  }

  async list(establishmentId: string): Promise<ItemMenu[]> {
    if (!establishmentId) {
      throw new DomainError(
        'MISSING_ESTABLISHMENT_ID',
        'Missing establishment id for list',
      );
    }
    return this.repo.list(establishmentId);
  }

  async listByCategory(
    categoryId: number,
    establishmentId?: string,
  ): Promise<ItemMenu[]> {
    if (!categoryId) {
      throw new DomainError(
        'MISSING_CATEGORY_ID',
        'Missing category id for listByCategory',
      );
    }
    return this.repo.listByCategory(categoryId, establishmentId);
  }
}
