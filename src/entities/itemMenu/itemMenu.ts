import { Establishment } from '../establishment/establishment';
import { Status } from '../status/Status';

export type itemMenuProps = {
  id: number;
  establishment: Establishment;
  name: string;
  description: string;
  price: number;
  status: Status;
  createdAt: Date;
};

export class ItemMenu {
  private constructor(readonly props: itemMenuProps) {}

  public static create(
    id: number,
    establishment: Establishment,
    name: string,
    description: string,
    price: number,
    status: Status,
  ) {
    const createdAt = new Date();
    return new ItemMenu({
      id,
      establishment,
      name,
      description,
      price,
      status,
      createdAt,
    });
  }
}
