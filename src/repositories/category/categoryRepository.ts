import { PrismaClient } from '../../generated/prisma';
import { Category } from '../../entities/category/category';
import { Status } from '../../entities/status/Status';

const prisma = new PrismaClient();

export interface CategoryRepositoryInterface {
  save(category: Category): Promise<Category>;
  list(): Promise<Category[]>;
  update(category: Category): Promise<Category>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<Category | null>;
}

export class CategoryRepository implements CategoryRepositoryInterface {
  async save(category: Category): Promise<Category> {
    const saved = await prisma.category.create({
      data: {
        id: category.id,
        name: category.name,
        status_id: category.status.id,
      },
      include: { status: true },
    });

    return Category.create({
      id: saved.id,
      name: saved.name,
      status: Status.create({
        id: saved.status.id,
        name: saved.status.name,
        active: saved.status.active,
        created_at: saved.status.created_at,
      }),
      created_at: saved.created_at,
    });
  }

  async list(): Promise<Category[]> {
    const rows = await prisma.category.findMany({ include: { status: true } });

    return rows.map((c) =>
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
    const updated = await prisma.category.update({
      where: { id: category.id },
      data: {
        name: category.name,
        status_id: category.status.id,
      },
      include: { status: true },
    });

    return Category.create({
      id: updated.id,
      name: updated.name,
      status: Status.create({
        id: updated.status.id,
        name: updated.status.name,
        active: updated.status.active,
        created_at: updated.status.created_at,
      }),
      created_at: updated.created_at,
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.category.delete({ where: { id } });
  }

  async getById(id: number): Promise<Category | null> {
    const c = await prisma.category.findFirst({
      where: { id },
      include: { status: true },
    });

    if (!c) return null;

    return Category.create({
      id: c.id,
      name: c.name,
      status: Status.create({
        id: c.status.id,
        name: c.status.name,
        active: c.status.active,
        created_at: c.status.created_at,
      }),
      created_at: c.created_at,
    });
  }
}
