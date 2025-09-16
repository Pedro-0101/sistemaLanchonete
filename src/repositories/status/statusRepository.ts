import { Status } from '../../entities/status/Status';
import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient();

export interface StatusRepositoryInterface {
  list(): Promise<Status[]>;
  findById(statusId: number): Promise<Status | null>;
}

export class StatusRepository implements StatusRepositoryInterface {
  private static instance: StatusRepository;

  private constructor() {}

  static getInstance(): StatusRepository {
    if (!StatusRepository.instance) {
      StatusRepository.instance = new StatusRepository();
    }

    return StatusRepository.instance;
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
