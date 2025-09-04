import { describe, it, expect } from 'vitest';
import { DeliveryType } from '../../entities/deliveryType/deliveryType';
import { Status } from '../../entities/status/Status';

const status = Status.create({
  id: 1,
  name: 'Status name',
  active: true,
  createdAt: new Date(),
});

const validDeliveryType = DeliveryType.create({
  id: 1,
  name: 'delivery type name',
  status: status,
  createdAt: new Date(),
});

describe('Delivery type', () => {
  it('Cria um delivery type valido', () => {
    const db = { ...validDeliveryType };
    const deliveryType = DeliveryType.create(db);

    expect(deliveryType).toBeInstanceOf(DeliveryType);
    expect(deliveryType.status).toBeInstanceOf(Status);
    expect(deliveryType).toHaveProperty('id', validDeliveryType.id);
    expect(deliveryType).toHaveProperty('name', validDeliveryType.name);
    expect(deliveryType).toHaveProperty('status', validDeliveryType.status);
    expect(deliveryType).toHaveProperty(
      'createdAt',
      validDeliveryType.createdAt,
    );
  });

  it('Nao cria delivery type com id vazio ', () => {
    const db = { ...validDeliveryType, id: '' };
    const result = DeliveryType.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'id')).toBe(
        true,
      );
    }
  });

  it('Nao cria um delivery type com nome menor que 3 letras', () => {
    const db = { ...validDeliveryType, name: 'aa' };
    const result = DeliveryType.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'name')).toBe(
        true,
      );
    }
  });

  it('Nao cria um delivery type com nome maior que 50 letras', () => {
    const db = {
      ...validDeliveryType,
      name: 'nomeInvalidoParaDeliveryTypeMaiorQue50nomeInvalidoParaDeliveryTypeMaiorQue50nomeInvalidoParaDeliveryTypeMaiorQue50nomeInvalidoParaDeliveryTypeMaiorQue50',
    };
    const result = DeliveryType.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'name')).toBe(
        true,
      );
    }
  });

  it('Nao cria um delivery type com status que nao seja da classe status', () => {
    const db = { ...validDeliveryType, status: 1 };
    const result = DeliveryType.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'status'),
      ).toBe(true);
    }
  });

  it('Nao cria um delivery type com data de criacao de tipo nao data', () => {
    const db = { ...validDeliveryType, createdAt: 'aa' };
    const result = DeliveryType.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'createdAt'),
      ).toBe(true);
    }
  });
});
