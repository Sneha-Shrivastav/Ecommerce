import { Dialect } from 'sequelize';
import * as dotenv from 'dotenv'

dotenv.config({
    path: ".env"
});

interface DBConfig {
  username: string;
  password: string;
  database: string;
  host: string;
  port: number;
  dialect: Dialect;
}


const config: { [key: string]: DBConfig } = {
  development: {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string, 10),
    dialect: process.env.DB_DRIVER as Dialect,
  },
  test: {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string, 10),
    dialect: process.env.DB_DRIVER as Dialect,
  },
  production: {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
    port: parseInt(process.env.DB_PORT as string, 10),
    dialect: process.env.DB_DRIVER as Dialect,
  },
};

export default config;



