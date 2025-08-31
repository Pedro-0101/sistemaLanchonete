import { z } from 'zod';

const Id = z.number();
const Nome = z.string().min(3).max(50);
const Status = z.number();

type tipoEntregaProps = {
  id: number;
  nome: string;
  status: number;
};

export class TipoEntrega {
  private constructor(
    public readonly id: number,
    private nome: string,
    private status: number,
  ) {}

  static create(input: tipoEntregaProps) {
    const id = Id.parse(input.id);
    const nome = Nome.parse(input.nome);
    const status = Status.parse(input.status);
    return new TipoEntrega(id, nome, status);
  }

  getNome() {
    return this.nome;
  }
  getStatus() {
    return this.status;
  }
}
