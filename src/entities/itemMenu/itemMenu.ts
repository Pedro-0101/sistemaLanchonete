import { nanoid } from 'nanoid';
import { Establishment } from '../establishment/establishment';
import { Status } from '../status/Status';

export type itemMenuProps = {
  id: string;
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
    establishment: Establishment,
    name: string,
    description: string,
    price: number,
    status: Status,
  ) {
    const id = nanoid();
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
