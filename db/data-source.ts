import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

let environment = 'development';
if (process.env.NODE_ENV == 'test') environment = 'test';
else if (process.env.NODE_ENV == 'production') environment = 'production';

config({ path: `.env.${environment}` });

export const options: DataSourceOptions = {
  type: 'mysql',
  host: process.env.host,
  port: parseInt(process.env.port),
  username: process.env.user,
  password: process.env.password,
  database: process.env.database,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};

const dataSoruce = new DataSource(options);
export default dataSoruce;
