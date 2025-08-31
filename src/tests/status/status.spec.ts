import { describe, it, expect } from 'vitest';
import { Status } from '../../entities/status/Status';

describe('Status', async () => {
  it('Cria um status valido', async () => {
    const idValido = 1;
    const nomeValido = 'StatusTesteNome';
    const validAtivo = 1;

    const status = Status.create({
      id: idValido,
      nome: nomeValido,
      ativo: validAtivo,
    });

    expect(status.id).toBe(idValido);
    expect(status.getNome()).toBe(nomeValido);
    expect(status.getAtivo()).toBe(validAtivo);
  });

  it('Falha com nome muito curto', () => {
    const idValido = 1;
    const nomeValido = 'st';
    const validAtivo = 1;

    expect(() => {
      Status.create({ id: idValido, nome: nomeValido, ativo: validAtivo });
    }).toThrowError();
  });

  it('Falha com nome muito longo', () => {
    const idValido = 1;
    const nomeValido =
      'nomeDeStatusInvalidonomeDeStatusInvalidonomeDeStatusInvalidonomeDeStatusInvalidonomeDeStatusInvalidonomeDeStatusInvalidonomeDeStatusInvalido';
    const validAtivo = 1;

    expect(() => {
      Status.create({ id: idValido, nome: nomeValido, ativo: validAtivo });
    }).toThrowError();
  });

  it('Falha com valor invalido no campo ativo', () => {
    const idValido = 1;
    const nomeValido = 'StatusTesteNome';
    const validAtivo = 2;

    expect(() => {
      Status.create({ id: idValido, nome: nomeValido, ativo: validAtivo });
    }).toThrowError();
  });
});
