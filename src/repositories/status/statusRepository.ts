import { Status } from '../../entities/status/Status';

export interface StatusRepository {
  save(status: Status): Promise<void>;
  list(): Promise<Status[]>;
  update(status: Status): Promise<void>;
  delete(statusId: number): Promise<void>;
  findById(statusId: number): Promise<Status | null>;
}
