import { Status } from '../status/Status';

export type deliveryTypeProps = {
  id: number;
  name: string;
  status: Status;
  createdAt: Date;
};

export class deliveryType {
  private constructor(readonly props: deliveryTypeProps) {}

  public static create(id: number, name: string, status: Status) {
    const createdAt = new Date();
    return new deliveryType({
      id,
      name,
      status,
      createdAt,
    });
  }
}
