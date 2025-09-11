import { PrismaClient } from '../../generated/prisma';
import { Establishment } from '../../entities/establishment/establishment';
import { DomainError } from '../../errors/domainError';

const prisma = new PrismaClient();

export interface establishmentInterface {
  save(establishment: Establishment): Promise<Establishment>;
  list(): Promise<Establishment[]>;
  update(establishment: Establishment): Promise<Establishment>;
  delete(id: string): Promise<void>;
  getById(id: string): Promise<Establishment>;
}

export class EstablishmentRepository implements establishmentInterface {
  async save(establishment: Establishment): Promise<Establishment> {
    const savedStablishment = await prisma.establishment.create({
      data: {
        id: establishment.id,
        name: establishment.name,
        description: establishment.description,
        user_id: establishment.user.id,
        status_id: establishment.status.id,
        isOpen: establishment.isOpen,
      },
    });

    return Establishment.create(savedStablishment);
  }

  async list(): Promise<Establishment[]> {
    const establishments = await prisma.establishment.findMany();

    return establishments.map((e) => Establishment.create(e));
  }

  async update(establishment: Establishment): Promise<Establishment> {
    const updatedEstablishment = prisma.establishment.update({
      where: { id: establishment.id },
      data: {
        id: establishment.id,
        name: establishment.name,
        description: establishment.description,
        user_id: establishment.user.id,
        status_id: establishment.status.id,
        isOpen: establishment.isOpen,
      },
    });

    return Establishment.create(updatedEstablishment);
  }

  async delete(id: string): Promise<void> {
    await prisma.establishment.delete({
      where: { id: id },
    });
  }

  async getById(id: string): Promise<Establishment> {
    const establishment = await prisma.establishment.findFirst({
      where: { id: id },
    });

    if (!establishment) {
      throw new DomainError(
        'ESTABLISHMENT_NOT_FOUND',
        'Establishment not found',
        { id },
      );
    }

    return Establishment.create(establishment);
  }
}
