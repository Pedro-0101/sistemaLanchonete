import { describe, it, expect } from 'vitest';
import { Category } from '../../entities/category/category';
import { Status } from '../../entities/status/Status';

const status = Status.create({
  id: 1,
  name: 'Status name',
  active: true,
  createdAt: new Date(),
});

const validcategory = Category.create({
  id: 1,
  name: 'category type name',
  status: status,
  createdAt: new Date(),
});

describe('category type', () => {
  it('Cria um category type valido', () => {
    const db = { ...validcategory };
    const category = Category.create(db);

    expect(category).toBeInstanceOf(Category);
    expect(category.status).toBeInstanceOf(Status);
    expect(category).toHaveProperty('id', validcategory.id);
    expect(category).toHaveProperty('name', validcategory.name.toUpperCase());
    expect(category).toHaveProperty('status', validcategory.status);
    expect(category).toHaveProperty('createdAt', validcategory.createdAt);
  });

  it('Nao cria category type com id vazio ', () => {
    const db = { ...validcategory, id: '' };
    const result = Category.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'id')).toBe(
        true,
      );
    }
  });

  it('Nao cria um category type com nome menor que 3 letras', () => {
    const db = { ...validcategory, name: 'aa' };
    const result = Category.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'name')).toBe(
        true,
      );
    }
  });

  it('Nao cria um category type com nome maior que 50 letras', () => {
    const db = {
      ...validcategory,
      name: 'nomeInvalidoParacategoryMaiorQue50nomeInvalidoParacategoryMaiorQue50nomeInvalidoParacategoryMaiorQue50nomeInvalidoParacategoryMaiorQue50',
    };
    const result = Category.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'name')).toBe(
        true,
      );
    }
  });

  it('Nao cria um category type com status que nao seja da classe status', () => {
    const db = { ...validcategory, status: 1 };
    const result = Category.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'status'),
      ).toBe(true);
    }
  });

  it('Nao cria um category type com data de criacao de tipo nao data', () => {
    const db = { ...validcategory, createdAt: 'aa' };
    const result = Category.safeParse(db);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'createdAt'),
      ).toBe(true);
    }
  });
});
