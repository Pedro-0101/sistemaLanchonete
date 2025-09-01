import { Status } from '../status/Status';

export type categoryProps = {
  id: number;
  name: string;
  status: Status;
  createdAt: Date;
};

export class Category {
  private constructor(readonly props: categoryProps) {}

  public static create(id: number, name: string, status: Status) {
    const createdAt = new Date();
    return new Category({
      id,
      name,
      status,
      createdAt,
    });
  }
}
