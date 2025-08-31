import { z } from 'zod';

const Nome = z.string().min(3).max(50);
const Id = z.number();
const Ativo = z.union([z.literal(0), z.literal(1)]);

type statusProps = {
  id: number;
  nome: string;
  ativo: number;
};

export class Status {
  private constructor(
    public readonly id: number,
    private nome: string,
    private ativo: number,
  ) {}

  static create(input: statusProps) {
    const id = Id.parse(input.id);
    const nome = Nome.parse(input.nome);
    const ativo = Ativo.parse(input.ativo);
    return new Status(id, nome, ativo);
  }

  getNome() {
    return this.nome;
  }
  getAtivo() {
    return this.ativo;
  }
}
