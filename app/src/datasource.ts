import 'reflect-metadata';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig({ path: '.env' });

// const isTest = process.env.NODE_ENV === 'test';

const options: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.POSTGRES_HOST}`,
  port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
  username: `${process.env.POSTGRES_USER}`,
  password: `${process.env.POSTGRES_PASSWORD}`,
  database: `${process.env.POSTGRES_DB}`,
  logging: ['error', 'warn', 'migration'],
  synchronize: false,
  entities: [join(__dirname, '/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './database/migrations/**/*{.ts,.js}')],
  migrationsTableName: 'migrations',
  // Disable in Production, should call migration manually for safety
  migrationsRun: true,
};

export const dataSource = new DataSource(options);
