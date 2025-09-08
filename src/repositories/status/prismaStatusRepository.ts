import { Status } from '../../entities/status/Status';
import { StatusRepository } from './statusRepository';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export class PrismaStatusRepository implements StatusRepository {
  async save(statusToSave: Status): Promise<void> {
    await prisma.status.create({
      data: {
        id: statusToSave.id,
        name: statusToSave.name,
        active: statusToSave.active,
        created_at: statusToSave.createdAt,
      },
    });
  }

  async list(): Promise<Status[]> {
    const statuses = await prisma.status.findMany();
    return statuses.map(
      (s) =>
        new Status({
          id: s.id,
          name: s.name,
          active: s.active,
          createdAt: s.created_at,
        }),
    );
  }

  async update(status: Status): Promise<void> {
    await prisma.status.update({
      where: { id: status.id },
      data: {
        name: status.name,
        active: status.active,
      },
    });
  }

  async delete(statusId: number): Promise<void> {
    await prisma.status.delete({
      where: { id: statusId },
    });
  }

  async findById(statusId: number): Promise<Status | null> {
    const status = await prisma.status.findUnique({
      where: { id: statusId },
    });
    if (!status) {
      return null;
    }
    return Status.create(status);
  }
}
