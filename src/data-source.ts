import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'sqljs',
  synchronize: true,
  entities: [],
});

export default AppDataSource;
