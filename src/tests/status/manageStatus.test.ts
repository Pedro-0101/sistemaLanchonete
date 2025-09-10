import { it, expect } from 'vitest';
import { ManageStatus } from '../../usecases/status/manageStatus';

const manageStatus = new ManageStatus();

it('Realiza a consulta e retorna lista de status', async () => {
  const statusList = await manageStatus.listStatus();
  expect(statusList.length).toBeGreaterThan(0);
});

it('Realiza a consulta de status por id e retorna o status 1', async () => {
  const status = await manageStatus.getStatusById(1);
  expect(status?.id).toBe(1);
});
