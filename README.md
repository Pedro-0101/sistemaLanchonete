# Node TypeScript Template

Template para projetos Node.js com TypeScript, Vitest, ESLint, Prettier, Husky, Standard-Version e TypeORM.

## Scripts

- `npm run dev` – executa o projeto com ts-node
- `npm run build` – compila os arquivos TypeScript para `dist`
- `npm test` – executa os testes com Vitest
- `npm run lint` – executa o ESLint
- `npm run format` – formata o código com Prettier
- `npm run release` – gera versionamento com standard-version

## Configuração

- Husky configurado com hooks de `pre-commit` e `pre-push`
- Lint-Staged para executar ESLint e Prettier nos arquivos commitados
- TypeORM configurado com driver `sql.js`

## Como começar

```bash
npm install
npm run dev
```

## Checklist pós-clone

- [ ] Copie `.env.example` para `.env`
- [ ] Instale as dependências com `npm install`
- [ ] Execute `npm test`
