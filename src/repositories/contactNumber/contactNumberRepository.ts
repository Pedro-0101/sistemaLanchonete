import { PrismaClient } from '../../generated/prisma';
import { ContactNumber } from '../../entities/contactNumber/contactNumber';
import { DomainError } from '../../errors/domainError';

const prisma = new PrismaClient();

export interface contactNumberInterface {
  save(contact: ContactNumber): Promise<ContactNumber>;
  list(userId: number): Promise<ContactNumber[]>;
  update(contact: ContactNumber): Promise<ContactNumber>;
  delete(id: number): Promise<void>;
  getById(id: number): Promise<ContactNumber>;
}

export class ContactNumberRepository implements contactNumberInterface {
  async save(contact: ContactNumber): Promise<ContactNumber> {
    const savedContact = await prisma.contact_number.create({
      data: {
        id: contact.id,
        ddd: contact.ddd,
        number: contact.number,
        status_id: contact.status.id,
      },
    });
    return ContactNumber.create(savedContact);
  }

  async list(): Promise<ContactNumber[]> {
    const contactNumberList = await prisma.contact_number.findMany({
      include: { status: true },
    });
    return contactNumberList.map((cn) => ContactNumber.create(cn));
  }

  async update(contact: ContactNumber): Promise<ContactNumber> {
    const updatedContactNumber = await prisma.contact_number.update({
      where: { id: contact.id },
      data: {
        id: contact.id,
        ddd: contact.ddd,
        number: contact.number,
        status_id: contact.status.id,
      },
    });

    return ContactNumber.create(updatedContactNumber);
  }

  async delete(id: number): Promise<void> {
    await prisma.contact_number.delete({
      where: { id: id },
    });
  }

  async getById(id: number): Promise<ContactNumber> {
    const contactNumber = prisma.contact_number.findFirst({
      where: { id: id },
    });

    if (!contactNumber) {
      throw new DomainError(
        'CONTACT_NUMBER_NOT_FOUND',
        'Contact number not found',
        { id },
      );
    }

    return ContactNumber.create(contactNumber);
  }
}
