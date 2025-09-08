import { Status } from '../entities/status/Status';
import { DomainError } from '../errors/domainError';
import { StatusRepository } from '../repositories/status.repository';

export type createStatusDto = {
  id: number;
  name: string;
  active: boolean;
};

export async function createStatus(
  newStatus: createStatusDto,
): Promise<Status> {
  const parsedStatus = Status.safeParse(newStatus);

  if (!parsedStatus.success) {
    throw new DomainError('1001', 'Insuficient arguments to create status');
  }
  console.log(parsedStatus.data);
  StatusRepository.save(parsedStatus.data);
  return parsedStatus.data;
}
