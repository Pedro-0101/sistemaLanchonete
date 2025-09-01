import { nanoid } from 'nanoid';
import { Address } from '../address/address';
import { Status } from '../status/Status';
import { ContactNumber } from '../contactNumber/contactNumber';

export type userProps = {
  id: string;
  name: string;
  contactNumber: ContactNumber;
  email: string;
  address: Address;
  status: Status;
  createdAt: Date;
};

export class User {
  private constructor(readonly props: userProps) {}

  public static create(
    name: string,
    contactNumber: ContactNumber,
    email: string,
    address: Address,
    status: Status,
  ) {
    const id = nanoid();
    const createdAt = new Date();

    return new User({
      id,
      name,
      contactNumber,
      email,
      address,
      status,
      createdAt,
    });
  }

  public getName() {
    return this.props.name;
  }

  public getContact() {
    return this.props.contactNumber;
  }

  public getEmail() {
    return this.props.email;
  }

  public getAddress() {
    return this.props.address;
  }

  public getStatus() {
    return this.props.status;
  }

  public getCreatedAt() {
    return this.props.createdAt;
  }
}
