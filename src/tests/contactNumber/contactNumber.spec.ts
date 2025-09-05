import { describe, it, expect } from 'vitest';
import { ContactNumber } from '../../entities/contactNumber/contactNumber';
import { Status } from '../../entities/status/Status';

const status = Status.create({
  id: 1,
  name: 'Status name',
  active: true,
  createdAt: new Date(),
});

const validContactNumber = {
  id: 1,
  ddd: 15,
  number: 999999999,
  status: status,
  createdAt: new Date(),
};

describe('Contact number', () => {
  it('Cria um contato valido', () => {
    const contactNumber = ContactNumber.create(validContactNumber);

    expect(contactNumber).toBeInstanceOf(ContactNumber);
    expect(contactNumber.status).toBeInstanceOf(Status);
    expect(contactNumber).toHaveProperty('id', validContactNumber.id);
    expect(contactNumber).toHaveProperty('ddd', validContactNumber.ddd);
    expect(contactNumber).toHaveProperty('number', validContactNumber.number);
    expect(contactNumber).toHaveProperty('status', validContactNumber.status);
    expect(contactNumber).toHaveProperty(
      'createdAt',
      validContactNumber.createdAt,
    );
  });

  it('Nao cria um contato sem id', () => {
    const db = { ...validContactNumber, id: '' };
    const result = ContactNumber.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'id')).toBe(
        true,
      );
    }
  });

  it('Nao cria um contato com ddd menor que 2 digitos', () => {
    const db = { ...validContactNumber, ddd: 1 };
    const result = ContactNumber.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'ddd')).toBe(
        true,
      );
    }
  });

  it('Nao cria um contato com ddd maior que 2 digitos', () => {
    const db = { ...validContactNumber, ddd: 999 };
    const result = ContactNumber.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'ddd')).toBe(
        true,
      );
    }
  });

  it('Nao cria um contato com numero menor que 8 digitos', () => {
    const db = { ...validContactNumber, number: 9999999 };
    const result = ContactNumber.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'number'),
      ).toBe(true);
    }
  });

  it('Nao cria um contato com numero maior que 9 digitos', () => {
    const db = { ...validContactNumber, number: 99999999999 };
    const result = ContactNumber.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'number'),
      ).toBe(true);
    }
  });

  it('Nao cria um contato com status invalido', () => {
    const db = { ...validContactNumber, status: 'a' };
    const result = ContactNumber.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'status'),
      ).toBe(true);
    }
  });

  it('Nao cria um contato com data invalida', () => {
    const db = { ...validContactNumber, createdAt: 'a' };
    const result = ContactNumber.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'createdAt'),
      ).toBe(true);
    }
  });
});
