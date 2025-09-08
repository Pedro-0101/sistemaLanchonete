import { Status } from '../../entities/status/Status';
import { DomainError } from '../../errors/domainError';
import { PrismaStatusRepository } from '../../repositories/status/prismaStatusRepository';

const statusRepository = new PrismaStatusRepository();

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
    throw new DomainError(
      '1001',
      'Insufficient arguments to create status',
      parsedStatus.error.format(),
    );
  }
  await statusRepository.save(parsedStatus.data);
  return parsedStatus.data;
}
