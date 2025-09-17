export const ExampleAddress = {
  country: 'BRASIL',
  state: 'SP',
  city: 'SÃO PAULO',
  cep: '01001-000',
  neighborhood: 'CENTRO',
  street: 'RUA XV DE NOVEMBRO',
  number: 123,
  addicional: 'APTO 45',
};

export const ExampleContactNumber = {
  ddd: 11,
  number: 987654321,
  status_id: 1,
};

export const ExampleUser = {
  name: 'JOÃO SILVA',
  email: 'joao.silva@email.com',
  contactNumber: ExampleContactNumber,
  address: ExampleAddress,
  status_id: 1,
  userType: 'CLIENT', // ou "OWNER"
};
