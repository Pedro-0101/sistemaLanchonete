import { describe, it, expect } from 'vitest';
import { PaymentMethod } from '../../entities/paymentMethod/paymentMethod';
import { Status } from '../../entities/status/Status';

const status = Status.create({
  id: 1,
  name: 'Status name',
  active: true,
  createdAt: new Date(),
});

const validPaymentMethod = PaymentMethod.create({
  id: 1,
  name: 'payment method name',
  status: status,
  createdAt: new Date(),
});

describe('payment method', () => {
  it('Cria um payment method valido', () => {
    const db = { ...validPaymentMethod };
    const paymentMethod = PaymentMethod.create(db);

    expect(paymentMethod).toBeInstanceOf(PaymentMethod);
    expect(paymentMethod.status).toBeInstanceOf(Status);
    expect(paymentMethod).toHaveProperty('id', validPaymentMethod.id);
    expect(paymentMethod).toHaveProperty('name', validPaymentMethod.name);
    expect(paymentMethod).toHaveProperty('status', validPaymentMethod.status);
    expect(paymentMethod).toHaveProperty(
      'createdAt',
      validPaymentMethod.createdAt,
    );
  });

  it('Nao cria payment method com id vazio ', () => {
    const db = { ...validPaymentMethod, id: '' };
    const result = PaymentMethod.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'id')).toBe(
        true,
      );
    }
  });

  it('Nao cria um payment method com nome menor que 3 letras', () => {
    const db = { ...validPaymentMethod, name: 'aa' };
    const result = PaymentMethod.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'name')).toBe(
        true,
      );
    }
  });

  it('Nao cria um payment method com nome maior que 50 letras', () => {
    const db = {
      ...validPaymentMethod,
      name: 'nomeInvalidoParapaymentMethodMaiorQue50nomeInvalidoParapaymentMethodMaiorQue50nomeInvalidoParapaymentMethodMaiorQue50nomeInvalidoParapaymentMethodMaiorQue50',
    };
    const result = PaymentMethod.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'name')).toBe(
        true,
      );
    }
  });

  it('Nao cria um payment method com status que nao seja da classe status', () => {
    const db = { ...validPaymentMethod, status: 1 };
    const result = PaymentMethod.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'status'),
      ).toBe(true);
    }
  });

  it('Nao cria um payment method com data de criacao de tipo nao data', () => {
    const db = { ...validPaymentMethod, createdAt: 'aa' };
    const result = PaymentMethod.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'createdAt'),
      ).toBe(true);
    }
  });
});
