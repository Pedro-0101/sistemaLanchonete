import { describe, it, expect } from 'vitest';
import { createAddressDto } from '../../dtos/address/addressDtos';
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
};

describe('Create address dto', () => {
  it('Cria um endereco valido', () => {
    const address = Address.create(validAddress);

    expect(address).toBeInstanceOf(Address);
    expect(address.id).toBe(id);
    expect(address.country).toBe(country);
    expect(address.state).toBe(state);
    expect(address.city).toBe(city);
    expect(address.cep).toBe(cep);
    expect(address.neighborhood).toBe(neighborhood);
    expect(address.street).toBe(street);
    expect(address.number).toBe(number);
    expect(address.addicional).toBe(addicional);
  });
});
