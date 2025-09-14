import { PrismaClient } from '../../generated/prisma';
import { ContactNumber } from '../../entities/contactNumber/contactNumber';

const prisma = new PrismaClient();

export interface ContactNumberRepo {
  save(contact: ContactNumber): Promise<ContactNumber>;
  list(userId?: number): Promise<ContactNumber[]>;
  update(contact: ContactNumber): Promise<ContactNumber>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<ContactNumber | null>;
}

export class ContactNumberRepository implements ContactNumberRepo {
  async save(contact: ContactNumber): Promise<ContactNumber> {
    const saved = await prisma.contact_number.create({
      data: {
        id: contact.id,
        ddd: contact.ddd,
        number: contact.number,
        status_id: contact.status.id,
        // user_id: contact.userId,  // caso exista relação
      },
      include: { status: true },
    });
    return ContactNumber.create(saved);
  }

  async list(userId?: number): Promise<ContactNumber[]> {
    const contactNumberList = await prisma.contact_number.findMany({
      where:
        userId != null
          ? {
              /* user_id: userId */
            }
          : undefined,
      include: { status: true },
    });
    return contactNumberList.map((cn) => ContactNumber.create(cn));
  }

  async update(contact: ContactNumber): Promise<ContactNumber> {
    const updated = await prisma.contact_number.update({
      where: { id: contact.id },
      data: {
        ddd: contact.ddd,
        number: contact.number,
        status_id: contact.status.id,
      },
      include: { status: true },
    });
    return ContactNumber.create(updated);
  }

  async delete(id: number): Promise<void> {
    await prisma.contact_number.delete({ where: { id } });
  }

  async getById(id: number): Promise<ContactNumber | null> {
    const contactNumber = await prisma.contact_number.findFirst({
      where: { id },
      include: { status: true },
    });

    if (!contactNumber) {
      return null;
    }

    return ContactNumber.create(contactNumber);
  }
}
