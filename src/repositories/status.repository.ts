import { Status } from '../entities/status/Status';

export interface ststusRepository {
  save(status: Status): Promise<void>;
  list(): Promise<Status[] | null>;
  update(status: Status): Promise<void>;
  delete(statusId: number): Promise<void>;
}

export class StatusRepository implements StatusRepository {
  static async save(status: Status): Promise<void> {
    console.log('Funcao executada, save status');
  }
}
