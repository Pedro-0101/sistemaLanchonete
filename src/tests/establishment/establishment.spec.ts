import { describe, it, expect } from 'vitest';
import { Establishment } from '../../entities/establishment/establishment';
import { User } from '../../entities/user/user';
import { ContactNumber } from '../../entities/contactNumber/contactNumber';
import { Address } from '../../entities/address/address';
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

const validUser = User.create({
  id: nanoid(),
  name: 'Valid user name',
  contactNumber: validContact,
  email: 'email@email.com',
  address: validAddress,
  status: validStatus,
});

const validEstablishment = {
  id: nanoid(),
  name: 'Teste',
  description: 'Teste',
  user: validUser,
  status: validStatus,
  isOpen: true,
};

describe('Establishment', () => {
  it('Cria um estabelecimento valido', () => {
    const estabelecimento = Establishment.create(validEstablishment);

    expect(estabelecimento).toBeInstanceOf(Establishment);
    expect(estabelecimento).toHaveProperty('id', validEstablishment.id);
    expect(estabelecimento).toHaveProperty('name', validEstablishment.name);
    expect(estabelecimento).toHaveProperty(
      'description',
      validEstablishment.description,
    );
    expect(estabelecimento).toHaveProperty('user', validEstablishment.user);
    expect(estabelecimento).toHaveProperty('status', validEstablishment.status);
    expect(estabelecimento).toHaveProperty('isOpen', validEstablishment.isOpen);
  });

  it('Nao cria estabelecimento sem id', () => {
    const db = { ...validEstablishment, id: '' };
    const result = Establishment.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'id')).toBe(
        true,
      );
    }
  });
  it('Nao cria estabelecimento com nome menor que 3 letras', () => {
    const db = { ...validEstablishment, name: 'te' };
    const result = Establishment.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'name')).toBe(
        true,
      );
    }
  });
  it('Nao cria estabelecimento com nome maior que 50 letras', () => {
    const db = {
      ...validEstablishment,
      name: 'NomeInvalidoDeEstabelecimentoMaiorQue50LetrasNomeInvalidoDeEstabelecimentoMaiorQue50LetrasNomeInvalidoDeEstabelecimentoMaiorQue50LetrasNomeInvalidoDeEstabelecimentoMaiorQue50LetrasNomeInvalidoDeEstabelecimentoMaiorQue50Letras',
    };
    const result = Establishment.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'name')).toBe(
        true,
      );
    }
  });
  it('Nao cria estabelecimento com descricao menor que 3 letras', () => {
    const db = { ...validEstablishment, description: 'te' };
    const result = Establishment.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'description'),
      ).toBe(true);
    }
  });
  it('Nao cria estabelecimento com descricao maior que 255 letras', () => {
    const db = {
      ...validEstablishment,
      description: `
        descricaoInvalidaDeEstabelecimentoMaiorQue255LetrasdescricaoInvalidaDeEstabelecimentoMaiorQue255Letras
        descricaoInvalidaDeEstabelecimentoMaiorQue255LetrasdescricaoInvalidaDeEstabelecimentoMaiorQue255Letras
        descricaoInvalidaDeEstabelecimentoMaiorQue255LetrasdescricaoInvalidaDeEstabelecimentoMaiorQue255Letras
        descricaoInvalidaDeEstabelecimentoMaiorQue255LetrasdescricaoInvalidaDeEstabelecimentoMaiorQue255Letras
        descricaoInvalidaDeEstabelecimentoMaiorQue255LetrasdescricaoInvalidaDeEstabelecimentoMaiorQue255Letras
        descricaoInvalidaDeEstabelecimentoMaiorQue255LetrasdescricaoInvalidaDeEstabelecimentoMaiorQue255Letras
        descricaoInvalidaDeEstabelecimentoMaiorQue255LetrasdescricaoInvalidaDeEstabelecimentoMaiorQue255Letras
        descricaoInvalidaDeEstabelecimentoMaiorQue255LetrasdescricaoInvalidaDeEstabelecimentoMaiorQue255Letras
      `,
    };
    const result = Establishment.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'description'),
      ).toBe(true);
    }
  });
  it('Nao cria estabelecimento sem user', () => {
    const db = { ...validEstablishment, user: '' };
    const result = Establishment.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'user')).toBe(
        true,
      );
    }
  });
  it('Nao cria estabelecimento sem status', () => {
    const db = { ...validEstablishment, status: '' };
    const result = Establishment.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'status'),
      ).toBe(true);
    }
  });
  it('Nao cria estabelecimento sem isOpen', () => {
    const db = { ...validEstablishment, isOpen: '' };
    const result = Establishment.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'isOpen'),
      ).toBe(true);
    }
  });
});
