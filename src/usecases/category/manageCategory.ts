import { Category } from '../../entities/category/category';
import { DomainError } from '../../errors/domainError';
import { CategoryRepository } from '../../repositories/category/categoryRepository';

interface ManageCategoryInterface {
  create(category: Category): Promise<Category>;
  update(category: Category): Promise<Category>;
  delete(id: number): Promise<void>;
  findById(id: number): Promise<Category | null>;
  list(): Promise<Category[]>;
}

export class ManageCategory implements ManageCategoryInterface {
  constructor(private readonly repo: CategoryRepository) {}

  async create(category: Category): Promise<Category> {
    return this.repo.save(category);
  }

  async update(category: Category): Promise<Category> {
    if (category.id == null) {
      throw new DomainError('MISSING_ID', 'Missing id for update', {
        entity: 'Category',
      });
    }
    return this.repo.update(category);
  }

  async delete(id: number): Promise<void> {
    if (id == null) {
      throw new DomainError('MISSING_ID', 'Missing id for delete', {
        entity: 'Category',
      });
    }
    await this.repo.delete(id);
  }

  async findById(id: number): Promise<Category | null> {
    if (id == null) {
      throw new DomainError('MISSING_ID', 'Missing id for search', {
        entity: 'Category',
      });
    }
    return this.repo.getById(id);
  }

  async list(): Promise<Category[]> {
    return this.repo.list();
  }
}
