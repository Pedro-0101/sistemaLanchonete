module.exports = {
  root: true,
  ignorePatterns: ['dist'],
  env: {
    node: true,
    es2022: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    // Adicione regras personalizadas aqui, se necessário
  },
  overrides: [
    {
      files: ['**/*.ts'],
      rules: {
        // Regras específicas para arquivos TS (opcional)
      },
    },
  ],
};
