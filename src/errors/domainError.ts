// DomainError.ts
export class DomainError extends Error {
  constructor(
    public code: string,
    message?: string,
    public details?: unknown,
    options?: ErrorOptions, // <- nativo do TS quando lib ES2022 está habilitada
  ) {
    super(message ?? code, options); // <- passa { cause } para o Error
    this.name = 'DomainError';
  }
}
