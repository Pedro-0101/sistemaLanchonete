import { Status } from '../../entities/status/Status';
import { PrismaStatusRepository } from '../../repositories/status/prismaStatusRepository';

const statusRepo = new PrismaStatusRepository();

export class ManageStatus {
  async listStatus(): Promise<Status[]> {
    return await statusRepo.list();
  }
  async getStatusById(id: number): Promise<Status | null> {
    return await statusRepo.findById(id);
  }
}
