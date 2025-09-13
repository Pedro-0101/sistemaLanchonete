import { describe, it, expect } from 'vitest';
import { Establishment } from '../../entities/establishment/establishment';
import { User } from '../../entities/user/user';
import { ContactNumber } from '../../entities/contactNumber/contactNumber';
import { Address } from '../../entities/address/address';
import { Status } from '../../entities/status/Status';
import { ItemMenu } from '../../entities/itemMenu/itemMenu';
import { ItemOrder } from '../../entities/itemOrder/ItemOrder';
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

const validEstablishment = Establishment.create({
  id: nanoid(),
  name: 'Teste',
  description: 'Teste',
  user: validUser,
  status: validStatus,
  isOpen: true,
});

const validItemMenu = ItemMenu.create({
  id: nanoid(),
  establishment: validEstablishment,
  name: 'teste',
  description: 'teste',
  price: 19.99,
  status: validStatus,
});

const validItemOrder = {
  id: nanoid()
}

describe('Item order', () => {
  
});
