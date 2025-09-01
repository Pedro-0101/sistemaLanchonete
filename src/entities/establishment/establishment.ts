import { nanoid } from 'nanoid';
import { Status } from '../status/Status';
import { User } from '../user/user';

export type establishmentProps = {
  id: string;
  name: string;
  description: string;
  user: User;
  status: Status;
  isOpen: boolean;
  createdAt: Date;
};

export class Establishment {
  private constructor(readonly props: establishmentProps) {}

  public static create(
    name: string,
    description: string,
    user: User,
    status: Status,
  ) {
    const id = nanoid();
    const isOpen = false;
    const createdAt = new Date();
    return new Establishment({
      id,
      name,
      description,
      user,
      status,
      isOpen,
      createdAt,
    });
  }

  public getEstablishment() {
    return {
      id: this.props.id,
      name: this.props.name,
      description: this.props.description,
      user: this.props.user,
      status: this.props.status,
      isOpen: this.props.isOpen,
      createdAt: this.props.createdAt,
    };
  }
  public setOpen() {
    if (!this.props.isOpen) {
      this.props.isOpen = true;
    }
  }

  public setClose() {
    if (this.props.isOpen) {
      this.props.isOpen = false;
    }
  }
}
