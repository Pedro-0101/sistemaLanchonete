import { describe, it, expect } from 'vitest';
import { Establishment } from '../../entities/establishment/establishment';
import { User } from '../../entities/user/user';
import { ContactNumber } from '../../entities/contactNumber/contactNumber';
import { Address } from '../../entities/address/address';
import { Status } from '../../entities/status/Status';
import { nanoid } from 'nanoid';
import { ItemMenu } from '../../entities/itemMenu/itemMenu';

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

const validEstablishment = Establishment.create({
  id: nanoid(),
  name: 'Teste',
  description: 'Teste',
  user: validUser,
  status: validStatus,
  isOpen: true,
});

const validItemMenu = {
  id: nanoid(),
  establishment: validEstablishment,
  name: 'teste',
  description: 'teste',
  price: 19.99,
  status: validStatus,
};

describe('Item Menu', () => {
  it('Cria um item valido', () => {
    const item = ItemMenu.create(validItemMenu);

    expect(item).toBeInstanceOf(ItemMenu);
    expect(item).toHaveProperty('id', validItemMenu.id);
    expect(item).toHaveProperty('establishment', validItemMenu.establishment);
    expect(item).toHaveProperty('name', validItemMenu.name.toUpperCase());
    expect(item).toHaveProperty('description', validItemMenu.description);
    expect(item).toHaveProperty('price', validItemMenu.price);
    expect(item).toHaveProperty('status', validItemMenu.status);
  });

  it('Nao cria um item sem id', () => {
    const db = { ...validItemMenu, id: '' };
    const result = ItemMenu.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'id')).toBe(
        true,
      );
    }
  });
  it('Nao cria um item sem establishement', () => {
    const db = { ...validItemMenu, establishment: '' };
    const result = ItemMenu.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'establishment'),
      ).toBe(true);
    }
  });
  it('Nao cria um item com nome menor que 3', () => {
    const db = { ...validItemMenu, name: 'te' };
    const result = ItemMenu.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'name')).toBe(
        true,
      );
    }
  });
  it('Nao cria um item com nome maior que 50', () => {
    const db = {
      ...validItemMenu,
      name: 'nomeInvalidoParaItemMenuMaiorQue50LetrasnomeInvalidoParaItemMenuMaiorQue50LetrasnomeInvalidoParaItemMenuMaiorQue50LetrasnomeInvalidoParaItemMenuMaiorQue50Letras',
    };
    const result = ItemMenu.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'name')).toBe(
        true,
      );
    }
  });
  it('Nao cria um item com description menor que 3 letras', () => {
    const db = { ...validItemMenu, description: 'te' };
    const result = ItemMenu.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'description'),
      ).toBe(true);
    }
  });
  it('Nao cria um item com description maior que 255 letras', () => {
    const db = {
      ...validItemMenu,
      description: `
        descricaoInvalidaParaItemMenuMaiorQue255LetrasdescricaoInvalidaParaItemMenuMaiorQue255Letras
        descricaoInvalidaParaItemMenuMaiorQue255LetrasdescricaoInvalidaParaItemMenuMaiorQue255Letras
        descricaoInvalidaParaItemMenuMaiorQue255LetrasdescricaoInvalidaParaItemMenuMaiorQue255Letras
        descricaoInvalidaParaItemMenuMaiorQue255LetrasdescricaoInvalidaParaItemMenuMaiorQue255Letras
        descricaoInvalidaParaItemMenuMaiorQue255LetrasdescricaoInvalidaParaItemMenuMaiorQue255Letras
        descricaoInvalidaParaItemMenuMaiorQue255LetrasdescricaoInvalidaParaItemMenuMaiorQue255Letras
        descricaoInvalidaParaItemMenuMaiorQue255LetrasdescricaoInvalidaParaItemMenuMaiorQue255Letras
        descricaoInvalidaParaItemMenuMaiorQue255LetrasdescricaoInvalidaParaItemMenuMaiorQue255Letras
      `,
    };
    const result = ItemMenu.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'description'),
      ).toBe(true);
    }
  });
  it('Nao cria um item sem preco', () => {
    const db = { ...validItemMenu, price: '' };
    const result = ItemMenu.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'price'),
      ).toBe(true);
    }
  });
  it('Nao cria um item com preco negativo', () => {
    const db = { ...validItemMenu, price: -50 };
    const result = ItemMenu.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'price'),
      ).toBe(true);
    }
  });
  it('Nao cria um item sem status', () => {
    const db = { ...validItemMenu, status: '' };
    const result = ItemMenu.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'status'),
      ).toBe(true);
    }
  });
});
