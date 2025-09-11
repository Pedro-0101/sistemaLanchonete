import { PrismaClient } from '../../generated/prisma';
import { Category } from '../../entities/category/category';
import { Status } from '../../entities/status/Status';
import { DomainError } from '../../errors/domainError';

const prisma = new PrismaClient();

export interface CategoryRepositoryInterface {
  save(category: Category): Promise<Category>;
  list(): Promise<Category[]>;
  update(category: Category): Promise<Category>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<Category>;
}

export class CategoryRepositury implements CategoryRepositoryInterface {
  async save(category: Category): Promise<Category> {
    const savedCategory = await prisma.category.create({
      data: {
        id: category.id,
        name: category.name,
        status_id: category.status.id,
      },
    });
    return Category.create({ savedCategory });
  }

  async list(): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      include: { status: true },
    });

    return categories.map((c) =>
      Category.create({
        id: c.id,
        name: c.name,
        status: Status.create({
          id: c.status.id,
          name: c.status.name,
          active: c.status.active,
          created_at: c.status.created_at,
        }),
        created_at: c.created_at,
      }),
    );
  }

  async update(category: Category): Promise<Category> {
    const updatedCategory = prisma.category.update({
      where: { id: category.id },
      data: {
        id: category.id,
        name: category.name,
        status_id: category.status.id,
      },
    });

    return Category.create(updatedCategory);
  }

  async delete(id: number): Promise<void> {
    await prisma.category.delete({
      where: { id: id },
    });
  }

  async getById(id: number): Promise<Category> {
    const category = await prisma.category.findFirst({
      where: { id: id },
      include: { status: true },
    });

    if (!category) {
      throw new DomainError('CATEGORY_NOT_FOUND', 'Category not found', { id });
    }

    const parsedCategory = Category.create(category);
    return parsedCategory;
  }
}
