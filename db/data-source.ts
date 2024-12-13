import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

// console.log(process.env.DATABASE_URL);
// console.log(process.env.NODE_ENV);

const isDev = process.env.NODE_ENV?.trim() === 'dev';
const isProd = process.env.NODE_ENV?.trim() === 'prod';

// console.log(isDev);
// console.log(isProd);

const devConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'root',
  database: 'nest',
  entities: ['dist/**/*.entity{.ts,.js}'],
  // synchronize: true, // Enabled for live database updates
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'migration_table',
};

const prodConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: false,
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'migration_table',
};

const dataSourceOptions: DataSourceOptions = isProd ? prodConfig : devConfig;

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

export { dataSourceOptions };
