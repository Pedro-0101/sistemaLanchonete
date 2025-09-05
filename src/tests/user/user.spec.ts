import { describe, it, expect } from 'vitest';
import { User } from '../../entities/user/user';
import { Address } from '../../entities/address/address';
import { ContactNumber } from '../../entities/contactNumber/contactNumber';
import { Status } from '../../entities/status/Status';
import { nanoid } from 'nanoid';

const validStatus = Status.create({
  id: 1,
  name: 'Valid status',
  active: true,
});

const validAddress = Address.create({
  id: 1,
  country: 'Brasil',
  state: 'SP',
  city: 'Sao Paulo',
  cep: '19885-085',
  neighborhood: 'Sao joao',
  street: 'teste ',
  number: 999,
  addicional: 'teste',
  status: validStatus,
});

const validContact = ContactNumber.create({
  id: 1,
  ddd: 15,
  number: 997979797,
  status: validStatus,
});

const validUser = {
  id: nanoid(),
  name: 'Valid user name',
  contactNumber: validContact,
  email: 'email@email.com',
  address: validAddress,
  status: validStatus,
};

describe('User', () => {
  it('Cria um usuario valido', () => {
    const user = User.create(validUser);

    expect(user).toBeInstanceOf(User);
    expect(user).toHaveProperty('id', validUser.id);
    expect(user).toHaveProperty('name', validUser.name.toUpperCase());
    expect(user).toHaveProperty('contactNumber', validUser.contactNumber);
    expect(user).toHaveProperty('email', validUser.email);
    expect(user).toHaveProperty('address', validUser.address);
    expect(user).toHaveProperty('status', validUser.status);
    expect(user).toHaveProperty('createdAt');
  });
  it('Nao cria usuario sem id', () => {
    const db = { ...validUser, id: '' };
    const result = User.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'id')).toBe(
        true,
      );
    }
  });
  it('Nao cria usuario com nome menor que 3', () => {
    const db = { ...validUser, name: 'te' };
    const result = User.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'name')).toBe(
        true,
      );
    }
  });
  it('Nao cria usuario com nome maior que 50', () => {
    const db = {
      ...validUser,
      name: 'invalidUserNameMaiorQue50LetrasinvalidUserNameMaiorQue50LetrasinvalidUserNameMaiorQue50LetrasinvalidUserNameMaiorQue50Letras',
    };
    const result = User.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'name')).toBe(
        true,
      );
    }
  });
  it('Nao cria usuario sem contact number', () => {
    const db = { ...validUser, contactNumber: '' };
    const result = User.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'contactNumber'),
      ).toBe(true);
    }
  });
  it('Nao cria usuario com email formato invalido', () => {
    const db = { ...validUser, email: 'eeee.com@enail' };
    const result = User.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'email'),
      ).toBe(true);
    }
  });
  it('Nao cria usuario sem endereco', () => {
    const db = { ...validUser, address: '' };
    const result = User.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'address'),
      ).toBe(true);
    }
  });
  it('Nao cria usuario sem status', () => {
    const db = { ...validUser, status: '' };
    const result = User.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'status'),
      ).toBe(true);
    }
  });
});
