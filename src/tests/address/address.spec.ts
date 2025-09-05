import { describe, it, expect } from 'vitest';
import { Address } from '../../entities/address/address';

const country = 'Brasil';
const state = 'SP';
const city = 'Tiete';
const cep = '18530-000';
const neighborhood = 'Centro';
const street = 'Avenida sao joao';
const number = 122;
const addicional = 'Teste';
const id = 1;
const date = new Date();

var validAddress = {
  id,
  country,
  state,
  city,
  cep,
  neighborhood,
  street,
  number,
  addicional,
  date,
};

describe('Create address dto', () => {
  it('Cria um endereco valido', () => {
    const parsedAddress = Address.create(validAddress);

    expect(parsedAddress).toBeInstanceOf(Address);
    expect(parsedAddress).toHaveProperty('id', validAddress.id);
    expect(parsedAddress).toHaveProperty('country', validAddress.country);
    expect(parsedAddress).toHaveProperty('state', validAddress.state);
    expect(parsedAddress).toHaveProperty('city', validAddress.city);
    expect(parsedAddress).toHaveProperty('cep', validAddress.cep);
    expect(parsedAddress).toHaveProperty(
      'neighborhood',
      validAddress.neighborhood,
    );
    expect(parsedAddress).toHaveProperty('street', validAddress.street);
    expect(parsedAddress).toHaveProperty('number', validAddress.number);
    expect(parsedAddress).toHaveProperty('addicional', validAddress.addicional);
    expect(parsedAddress).toHaveProperty('createdAt');
  });

  it('Nao cria endereco com nome de pais menor de 3 letras', () => {
    const bad = { ...validAddress, country: 'co' };
    const result = Address.safeParse(bad);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'country'),
      ).toBe(true);
    }
  });

  it('Nao cria endereco com nome de pais maior que 30 letras', () => {
    const bad = {
      ...validAddress,
      country:
        'nomeInvalidoDePaisnomeInvalidoDePaisnomeInvalidoDePaisnomeInvalidoDePaisnomeInvalidoDePais',
    };
    const result = Address.safeParse(bad);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'country'),
      ).toBe(true);
    }
  });

  it('Nao cria endereco com nome de state no formato diferente de 2 letras', () => {
    const bad = { ...validAddress, state: 'spp' };
    const result = Address.safeParse(bad);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'state'),
      ).toBe(true);
    }
  });

  it('Nao cria endereco com nome de cidade menor que 3 letras', () => {
    const bad = { ...validAddress, city: 'ci' };
    const result = Address.safeParse(bad);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'city')).toBe(
        true,
      );
    }
  });

  it('Nao cria endereco com nome de cidade maior que 50 letras', () => {
    const bad = {
      ...validAddress,
      city: 'nomeInvalidoDeCidadeMaiorQue50LetrasnomeInvalidoDeCidadeMaiorQue50LetrasnomeInvalidoDeCidadeMaiorQue50LetrasnomeInvalidoDeCidadeMaiorQue50Letras',
    };
    const result = Address.safeParse(bad);

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'city')).toBe(
        true,
      );
    }
  });

  it('Nao cria endereco com cep no formato diferente do padrao brasileiro', () => {
    const bad = { ...validAddress, cep: '18530-00' };
    const result = Address.safeParse(bad);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(result.error.issues.some((i) => i.path.join('.') === 'cep')).toBe(
        true,
      );
    }
  });

  it('Nao cria endereco com bairro menor que 3 letras', () => {
    const bad = { ...validAddress, neighborhood: 'aa' };
    const result = Address.safeParse(bad);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'neighborhood'),
      ).toBe(true);
    }
  });

  it('Nao cria endereco com bairro maior que 50 letras', () => {
    const bad = {
      ...validAddress,
      neighborhood:
        'nomeInvalidoDeDeBairroMariorQue50LetrasnomeInvalidoDeDeBairroMariorQue50LetrasnomeInvalidoDeDeBairroMariorQue50Letras',
    };
    const result = Address.safeParse(bad);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'neighborhood'),
      ).toBe(true);
    }
  });

  it('Nao cria endereco com rua menor que 3 letras', () => {
    const bad = { ...validAddress, street: 'aa' };
    const result = Address.safeParse(bad);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'street'),
      ).toBe(true);
    }
  });

  it('Nao cria endereco com rua maior que 50 letras', () => {
    const bad = {
      ...validAddress,
      street:
        'nomeInvalidoDeRuaMaiorQue50LetrasnomeInvalidoDeRuaMaiorQue50LetrasnomeInvalidoDeRuaMaiorQue50LetrasnomeInvalidoDeRuaMaiorQue50Letras',
    };
    const result = Address.safeParse(bad);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'street'),
      ).toBe(true);
    }
  });

  it('Nao cria endereco com numero vazio', () => {
    const bad = { ...validAddress, number: '' };
    const result = Address.safeParse(bad);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'number'),
      ).toBe(true);
    }
  });

  it('Nao cria endereco com complemento maior que 255 letras', () => {
    const bad = {
      ...validAddress,
      addicional:
        'complementoInvalidoMaiorQue255LetrascomplementoInvalidoMaiorQue255LetrascomplementoInvalidoMaiorQue255LetrascomplementoInvalidoMaiorQue255LetrascomplementoInvalidoMaiorQue255LetrascomplementoInvalidoMaiorQue255LetrascomplementoInvalidoMaiorQue255LetrascomplementoInvalidoMaiorQue255LetrascomplementoInvalidoMaiorQue255LetrascomplementoInvalidoMaiorQue255LetrascomplementoInvalidoMaiorQue255LetrascomplementoInvalidoMaiorQue255LetrascomplementoInvalidoMaiorQue255LetrascomplementoInvalidoMaiorQue255LetrascomplementoInvalidoMaiorQue255Letras',
    };
    const result = Address.safeParse(bad);

    expect(result.success).toBe(false);

    if (!result.success) {
      expect(
        result.error.issues.some((i) => i.path.join('.') === 'addicional'),
      ).toBe(true);
    }
  });
});
