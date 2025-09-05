import { describe, it, expect } from 'vitest';
import { PaymentMethod } from '../../entities/paymentMethod/paymentMethod';
import { DeliveryType } from '../../entities/deliveryType/deliveryType';
import { ContactNumber } from '../../entities/contactNumber/contactNumber';
import { Address } from '../../entities/address/address';
import { User } from '../../entities/user/user';
import { Establishment } from '../../entities/establishment/establishment';
import { Status } from '../../entities/status/Status';
import { nanoid } from 'nanoid';
import { Order } from '../../entities/order/order';

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

const validPaymentMethod = PaymentMethod.create({
  id: 1,
  name: 'payment method name',
  status: validStatus,
  createdAt: new Date(),
});

const validDeliveryType = DeliveryType.create({
  id: 1,
  name: 'delivery type name',
  status: validStatus,
  createdAt: new Date(),
});

const validOrder = {
  id: nanoid(),
  user: validUser,
  establishment: validEstablishment,
  paymentMethod: validPaymentMethod,
  deliveryType: validDeliveryType,
  status: validStatus,
  // createdAt nao passsado, default data atual
  sentDate: null,
  deliveryDate: null,
};

describe('Order', () => {
  it('Cria um order valido', () => {
    const order = Order.create(validOrder);

    expect(order).toBeInstanceOf(Order);
    expect(order).toHaveProperty('id', validOrder.id);
    expect(order).toHaveProperty('user', validOrder.user);
    expect(order).toHaveProperty('establishment', validOrder.establishment);
    expect(order).toHaveProperty('paymentMethod', validOrder.paymentMethod);
    expect(order).toHaveProperty('deliveryType', validOrder.deliveryType);
    expect(order).toHaveProperty('status', validOrder.status);
    expect(order).toHaveProperty('sentDate', validOrder.sentDate);
    expect(order).toHaveProperty('deliveryDate', validOrder.deliveryDate);
  });

  it('Nao cria order sem id', () => {
    const db = { ...validOrder, id: '' };
    const result = Order.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'id')).toBe(
        true,
      );
    }
  });

  it('Nao cria order sem user', () => {
    const db = { ...validOrder, user: '' };
    const result = Order.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'user')).toBe(
        true,
      );
    }
  });

  it('Nao cria order sem establishment', () => {
    const db = { ...validOrder, establishment: '' };
    const result = Order.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'establishment'),
      ).toBe(true);
    }
  });

  it('Nao cria order sem paymentMethod', () => {
    const db = { ...validOrder, paymentMethod: '' };
    const result = Order.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'paymentMethod'),
      ).toBe(true);
    }
  });

  it('Nao cria order sem deliveryType', () => {
    const db = { ...validOrder, deliveryType: '' };
    const result = Order.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'deliveryType'),
      ).toBe(true);
    }
  });

  it('Nao cria order sem status', () => {
    const db = { ...validOrder, status: '' };
    const result = Order.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'status'),
      ).toBe(true);
    }
  });
});
