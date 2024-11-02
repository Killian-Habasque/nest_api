import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 54321,
  username: 'root',
  password: 'root',
  database: 'nest',
  entities: ['dist/**/*.entity{.ts,.js}'],
  // synchronize: true, // Enabled for live database updates
  migrations: ['dist/db/migrations/*.js'],
  migrationsTableName: 'migration_table',
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
