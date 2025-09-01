import { nanoid } from 'nanoid';
import { User } from '../user/user';
import { Status } from '../status/Status';

export type contactNumberProps = {
  id: string;
  ddd: number;
  number: number;
  user: User;
  status: Status;
  createdAt: Date;
};

export class ContactNumber {
  private constructor(readonly props: contactNumberProps) {}

  public static create(
    ddd: number,
    number: number,
    user: User,
    status: Status,
  ) {
    const id = nanoid();
    const createdAt = new Date();
    return new ContactNumber({ id, ddd, number, user, status, createdAt });
  }

  public getContact() {
    return { ddd: this.props.ddd, number: this.props.number };
  }

  public getUser() {
    return this.props.user;
  }

  public getStatus() {
    return this.props.status;
  }
}
