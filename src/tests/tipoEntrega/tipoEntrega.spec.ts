import { describe, it, expect } from 'vitest';
import { TipoEntrega } from '../../entities/tipoEntrega/TipoEntrega';

describe('TipoEntrega', async () => {
  it('Cria um tipo de entrega', () => {
    const idValido = 1;
    const nomeValido = 'NomeTipoEntrega';
    const statusValido = 1;

    const tipoEntrega = TipoEntrega.create({
      id: idValido,
      nome: nomeValido,
      status: statusValido,
    });

    expect(tipoEntrega).toBeInstanceOf(TipoEntrega);
    expect(tipoEntrega.id).toBe(idValido);
    expect(tipoEntrega.getNome()).toBe(nomeValido);
    expect(tipoEntrega.getStatus()).toBe(statusValido);
  });
});
