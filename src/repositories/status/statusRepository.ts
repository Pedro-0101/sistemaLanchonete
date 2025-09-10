import { Status } from '../../entities/status/Status';

export interface StatusRepository {
  list(): Promise<Status[]>;
  findById(statusId: number): Promise<Status | null>;
}
