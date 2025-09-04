import { describe, it, expect } from 'vitest';
import { Status } from '../../entities/status/Status';

const validId = 1;
const validName = 'Status Name';
const validActive = true;
const validCreatedAtDate = new Date();
const validStatus = {
  id: validId,
  name: validName,
  active: validActive,
  createdAt: validCreatedAtDate,
};

describe('Status', () => {
  it('Cria um status valido', () => {
    const status = Status.create(validStatus);

    expect(status).toBeInstanceOf(Status);
    expect(status).toMatchObject(validStatus);
    expect(status).toHaveProperty('id', validId);
    expect(status).toHaveProperty('name', validName);
    expect(status).toHaveProperty('active', validActive);
    expect(status).toHaveProperty('createdAt', validCreatedAtDate);
  });

  it('Nao cria status id nao numerico', () => {
    const db = { ...validStatus, id: 'a' };
    const result = Status.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'id')).toBe(
        true,
      );
    }
  });

  it('Nao cria status id menor que 1', () => {
    const db = { ...validStatus, id: -1 };
    const result = Status.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'id')).toBe(
        true,
      );
    }
  });

  it('Nao cria status com nome menor que 3 letras', () => {
    const db = { ...validStatus, name: 'te' };
    const result = Status.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'name')).toBe(
        true,
      );
    }
  });

  it('Nao cria status com nome maior que 50 letras', () => {
    const db = {
      ...validStatus,
      name: 'nomeInvalidoParaStatusMaiorQue50LetrasvnomeInvalidoParaStatusMaiorQue50LetrasnomeInvalidoParaStatusMaiorQue50Letras',
    };
    const result = Status.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'name')).toBe(
        true,
      );
    }
  });

  it('Nao cria status com active invalido', () => {
    const db = { ...validStatus, active: 'a' };
    const result = Status.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'active'),
      ).toBe(true);
    }
  });

  it('Nao cria status com createdAt formato nao data', () => {
    const db = { ...validStatus, createdAt: 'a' };
    const result = Status.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'createdAt'),
      ).toBe(true);
    }
  });
});
