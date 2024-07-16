import { config } from 'dotenv';
import { Company } from './src/company/entity/company.entity';
import { UpdateTag1721022363597 } from './src/migrations/1721022363597-updateTag';
import { Tag } from './src/tag/entity/tag.entity';
import { DataSource } from 'typeorm';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT),
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_DB,
  entities: [Company, Tag],
  migrations: [UpdateTag1721022363597],
});
