import { ApiConfig } from '@tms/api-config';
import { DataSource } from 'typeorm';
import * as DatabaseEntities from './entities';
import * as DatabaseMigrations from './migrations';

const entities = Object.values(DatabaseEntities);
const migrations = Object.values(DatabaseMigrations);

const dataSource = new DataSource({
  entities,
  migrations,
  type: 'postgres',
  migrationsTableName: 'migrations',
  database: ApiConfig.database.name,
  host: ApiConfig.database.host,
  port: ApiConfig.database.port,
  username: ApiConfig.database.username,
  password: ApiConfig.database.password,
  synchronize: ApiConfig.database.sync,
  ssl: { rejectUnauthorized: true },
});

async function initDatabase(): Promise<void> {
  await dataSource.initialize();
  entities.forEach((entity) => entity.useDataSource(dataSource));
  await dataSource.runMigrations({ transaction: 'each' });
}

initDatabase();
