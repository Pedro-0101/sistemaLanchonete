import { Status } from '../../entities/status/Status';
import { StatusRepository } from '../../repositories/status/statusRepository';
import { DomainError } from '../../errors/domainError';

const statusRepo = StatusRepository.getInstance();

export class ManageStatus {
  async listStatus(): Promise<Status[]> {
    return await statusRepo.list();
  }
  async getStatusById(id: number): Promise<Status> {
    if (!Number.isInteger(id) || id < 0) {
      throw new DomainError(
        'STATUS_MISSING_ID',
        'Missing id for realize the search',
        { id },
      );
    }

    const status = await statusRepo.findById(id);

    if (!status) {
      throw new DomainError('STATUS_TYPE_NOT_FOUND', 'Status not found');
    }
    return status;
  }
}
