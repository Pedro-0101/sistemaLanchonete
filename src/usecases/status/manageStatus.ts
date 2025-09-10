import { Status } from '../../entities/status/Status';
import { StatusRepository } from '../../repositories/status/statusRepository';

const statusRepo = new StatusRepository();

export class ManageStatus {
  async listStatus(): Promise<Status[]> {
    return await statusRepo.list();
  }
  async getStatusById(id: number): Promise<Status | null> {
    return await statusRepo.findById(id);
  }
}
