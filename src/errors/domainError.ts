// DomainError.ts
export class DomainError extends Error {
  constructor(
    public code: string,
    message?: string,
    public details?: unknown,
    options?: ErrorOptions,
  ) {
    super(message ?? code, options);
    this.name = 'DomainError';
  }
}
