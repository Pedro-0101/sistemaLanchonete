import 'reflect-metadata';
import { join } from 'path';

const dataSourceParams = {
  type: (process.env.TYPEORM_CONNECTION as string) || 'mysql',
  host: process.env.TYPEORM_HOST as string,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME as string,
  password: process.env.TYPEORM_PASSWORD as string,
  database: process.env.TYPEORM_DATABASE as string,
  entities: [join(__dirname, '../entities/**/*.{ts,js}')],
  migrations: [join(__dirname, './migrations/**/*.{ts,js}')],
  logging: [],
  synchronize: true,
} as DataSourceOptions;

export const AppDataSource = new DataSource(dataSourceParams);
