import { Sequelize } from 'sequelize-typescript';
import config from './config';

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize({
  database: dbConfig.database,
  dialect: dbConfig.dialect,
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
  models: [__dirname + '/models'], 
});

export default sequelize;
