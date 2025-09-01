export type addressProps = {
  country: string;
  state: string;
  city: string;
  cep: string;
  neighbor: string;
  street: string;
  number: number;
  addicional: string;
  id: number;
};

export class Address {
  private constructor(readonly props: addressProps) {}

  static create(
    country: string,
    state: string,
    city: string,
    cep: string,
    neighbor: string,
    street: string,
    number: number,
    addicional: string,
    id: number,
  ) {
    return new Address({
      id,
      country,
      state,
      city,
      cep,
      neighbor,
      street,
      number,
      addicional,
    });
  }
}
