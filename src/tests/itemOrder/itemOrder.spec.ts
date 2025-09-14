import { describe, it, expect } from 'vitest';
import { nanoid } from 'nanoid';

import { Status } from '../../entities/status/Status';
import { Address } from '../../entities/address/address';
import { ContactNumber } from '../../entities/contactNumber/contactNumber';
import { User } from '../../entities/user/user';
import { Establishment } from '../../entities/establishment/establishment';
import { PaymentMethod } from '../../entities/paymentMethod/paymentMethod';
import { DeliveryType } from '../../entities/deliveryType/deliveryType';
import { ItemMenu } from '../../entities/itemMenu/itemMenu';
import { Order } from '../../entities/order/order';
import { ItemOrder } from '../../entities/itemOrder/ItemOrder';

// ---- FIXTURES BÁSICOS ----
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
  street: 'Rua Teste',
  number: 999,
  addicional: 'Casa',
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
  name: 'Valid User',
  contactNumber: validContact,
  email: 'email@email.com',
  address: validAddress,
  status: validStatus,
});

const validEstablishment = Establishment.create({
  id: nanoid(),
  name: 'Lanchonete Teste',
  description: 'Descricao teste',
  user: validUser,
  status: validStatus,
  isOpen: true,
});

// Assumindo modelos simples p/ PaymentMethod e DeliveryType (id, name, status)
const validPayment = PaymentMethod.create({
  id: 1,
  name: 'Cartão de Crédito',
  status: validStatus,
});

const validDelivery = DeliveryType.create({
  id: 1,
  name: 'Retirada no balcão',
  status: validStatus,
});

const validItemMenu = ItemMenu.create({
  id: nanoid(),
  establishment: validEstablishment,
  name: 'X-Salada',
  description: 'Pão, carne, salada',
  price: 19.99,
  status: validStatus,
});

const validOrder = Order.create({
  id: nanoid(),
  user: validUser,
  establishment: validEstablishment,
  paymentMethod: validPayment,
  deliveryType: validDelivery,
  status: validStatus,
  sentDate: null,
  deliveryDate: null,
});

const baseItemOrder = {
  id: nanoid(),
  order: validOrder,
  item: validItemMenu,
  quantity: 2,
  obs: 'Sem cebola',
  price: 19.99,
  status: validStatus,
};

// ---- TESTES ----
describe('ItemOrder', () => {
  it('Cria um itemOrder válido', () => {
    const io = ItemOrder.create(baseItemOrder);

    expect(io).toBeInstanceOf(ItemOrder);
    expect(io).toHaveProperty('id', baseItemOrder.id);
    expect(io).toHaveProperty('order', baseItemOrder.order);
    expect(io).toHaveProperty('item', baseItemOrder.item);
    expect(io).toHaveProperty('quantity', baseItemOrder.quantity);
    expect(io).toHaveProperty('obs', baseItemOrder.obs);
    expect(io).toHaveProperty('price', baseItemOrder.price); // já arredondado pelo schema
    expect(io).toHaveProperty('status', baseItemOrder.status);
    expect(io).toHaveProperty('createdAt');
    expect(io.createdAt).toBeInstanceOf(Date);
  });

  it('Arredonda price para 2 casas decimais', () => {
    const io1 = ItemOrder.create({
      ...baseItemOrder,
      id: nanoid(),
      price: 10.129,
    });
    expect(io1.price).toBe(10.13);

    const io2 = ItemOrder.create({
      ...baseItemOrder,
      id: nanoid(),
      price: 10.125,
    });
    expect(io2.price).toBe(10.13);

    const io3 = ItemOrder.create({ ...baseItemOrder, id: nanoid(), price: 10 });
    expect(io3.price).toBe(10);
  });

  it('Define createdAt automaticamente quando omitido', () => {
    const result = ItemOrder.safeParse({
      ...baseItemOrder,
      id: nanoid(),
      createdAt: undefined,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.createdAt).toBeInstanceOf(Date);
    }
  });

  it('Não cria sem id', () => {
    const result = ItemOrder.safeParse({ ...baseItemOrder, id: '' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'id')).toBe(
        true,
      );
    }
  });

  it('Não cria sem order', () => {
    const result = ItemOrder.safeParse({ ...baseItemOrder, order: '' as any });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'order'),
      ).toBe(true);
    }
  });

  it('Não cria sem item', () => {
    const result = ItemOrder.safeParse({ ...baseItemOrder, item: '' as any });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'item')).toBe(
        true,
      );
    }
  });

  it('Não cria com quantity zero ou negativa', () => {
    const r1 = ItemOrder.safeParse({ ...baseItemOrder, quantity: 0 });
    const r2 = ItemOrder.safeParse({ ...baseItemOrder, quantity: -3 });

    expect(r1.success).toBe(false);
    expect(r2.success).toBe(false);

    if (!r1.success) {
      expect(r1.error.issues.some((i) => i.path.join('.') === 'quantity')).toBe(
        true,
      );
    }
    if (!r2.success) {
      expect(r2.error.issues.some((i) => i.path.join('.') === 'quantity')).toBe(
        true,
      );
    }
  });

  it('Não cria com quantity não-inteira', () => {
    const result = ItemOrder.safeParse({
      ...baseItemOrder,
      quantity: 1.5 as any,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'quantity'),
      ).toBe(true);
    }
  });

  it('Não cria com obs menor que 3 letras', () => {
    const result = ItemOrder.safeParse({ ...baseItemOrder, obs: 'ok' });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'obs')).toBe(
        true,
      );
    }
  });

  it('Não cria com obs maior que 255 letras', () => {
    const big = 'x'.repeat(256);
    const result = ItemOrder.safeParse({ ...baseItemOrder, obs: big });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'obs')).toBe(
        true,
      );
    }
  });

  it('Não cria sem price', () => {
    const result = ItemOrder.safeParse({ ...baseItemOrder, price: '' as any });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'price'),
      ).toBe(true);
    }
  });

  it('Não cria com price negativo', () => {
    const result = ItemOrder.safeParse({ ...baseItemOrder, price: -9.9 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'price'),
      ).toBe(true);
    }
  });

  it('Não cria sem status', () => {
    const result = ItemOrder.safeParse({ ...baseItemOrder, status: '' as any });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'status'),
      ).toBe(true);
    }
  });
});
