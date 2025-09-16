import { PrismaClient } from '../../generated/prisma';
import { Establishment } from '../../entities/establishment/establishment';

const prisma = new PrismaClient();

export interface EstablishmentInterface {
  save(establishment: Establishment): Promise<Establishment>;
  list(): Promise<Establishment[]>;
  update(establishment: Establishment): Promise<Establishment>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<Establishment | null>;
}

export class EstablishmentRepository implements EstablishmentInterface {
  private static instance: EstablishmentRepository;

  private constructor() {}

  static getInstance(): EstablishmentRepository {
    if (!EstablishmentRepository.instance) {
      EstablishmentRepository.instance = new EstablishmentRepository();
    }

    return EstablishmentRepository.instance;
  }

  async save(establishment: Establishment): Promise<Establishment> {
    const savedEstablishment = await prisma.establishment.create({
      data: {
        id: establishment.id,
        name: establishment.name,
        description: establishment.description,
        user_id: establishment.user.id,
        status_id: establishment.status.id,
        isOpen: establishment.isOpen,
      },
      include: {
        user: true,
        status: true,
      },
    });

    return Establishment.create(savedEstablishment);
  }

  async list(): Promise<Establishment[]> {
    const establishments = await prisma.establishment.findMany({
      include: {
        user: true,
        status: true,
      },
    });

    return establishments.map((e) => Establishment.create(e));
  }

  async update(establishment: Establishment): Promise<Establishment> {
    const updatedEstablishment = await prisma.establishment.update({
      where: { id: establishment.id },
      data: {
        name: establishment.name,
        description: establishment.description,
        user_id: establishment.user.id,
        status_id: establishment.status.id,
        isOpen: establishment.isOpen,
      },
      include: {
        user: true,
        status: true,
      },
    });

    return Establishment.create(updatedEstablishment);
  }

  async delete(id: string): Promise<void> {
    await prisma.establishment.delete({
      where: { id },
    });
  }

  async getById(id: string): Promise<Establishment | null> {
    const establishment = await prisma.establishment.findFirst({
      where: { id },
      include: {
        user: true,
        status: true,
      },
    });

    if (!establishment) return null;

    return Establishment.create(establishment);
  }
}
