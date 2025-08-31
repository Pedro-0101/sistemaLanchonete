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

  (it('Falha com nome menor que 3'),
    async () => {
      const idValido = 1;
      const nomeValido = 'Nom';
      const statusValido = 1;

      expect(() => {
        TipoEntrega.create({
          id: idValido,
          nome: nomeValido,
          status: statusValido,
        });
      }).toThrowError();
    });

  it('Falha com nome maior que 50', () => {
    const idValido = 1;
    const nomeValido =
      'nodeDeTipoDeEntregaInvalidonodeDeTipoDeEntregaInvalidonodeDeTipoDeEntregaInvalido';
    const statusValido = 1;

    expect(() => {
      TipoEntrega.create({
        id: idValido,
        nome: nomeValido,
        status: statusValido,
      });
    }).toThrowError();
  });
});
