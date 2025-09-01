export type statusProps = {
  id: number;
  name: string;
  active: boolean;
  createdAt: Date;
};

export class Status {
  private constructor(readonly props: statusProps) {}

  public static create(id: number, name: string, active: boolean) {
    const createdAt = new Date();
    return new Status({
      id,
      name,
      active,
      createdAt,
    });
  }

  public getName() {
    return this.props.name;
  }
  public getActive() {
    return this.props.active;
  }
}
