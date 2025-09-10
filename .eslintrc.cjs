// .eslintrc.js
module.exports = {
  root: true,
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    'coverage/',
    '.eslintcache',
    // gerados
    'src/generated/**',
    '**/generated/**',
    'prisma/**/migrations/**',
    'prisma/**/client/**',
    '**/swagger/**',
    '**/*.d.ts',
  ],
  env: { node: true, es2022: true },
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
  rules: {},
  overrides: [
    // se ainda precisar, você pode DESLIGAR regras só em arquivos gerados
    {
      files: ['**/generated/**', 'prisma/**/client/**', '**/swagger/**'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/ban-types': 'off',
      },
    },
  ],
};
