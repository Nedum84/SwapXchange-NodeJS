import { Dialect } from "sequelize/types";
import config from "../../config/config";

export default {
  development: {
    dbname: config.DB_NAME!,
    username: config.DB_USERNAME!,
    password: config.DB_PASSWORD!,
    host: config.DB_HOST,
    dialect: "postgres" as Dialect,
    port: Number(config.DB_PORT) || 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  test: {
    dbname: config.DB_TEST_NAME,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    host: config.DB_HOST,
    dialect: "postgres" as Dialect,
    logging: false,
    port: Number(config.DB_PORT) || 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
  production: {
    dbname: config.DB_NAME,
    username: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    host: config.DB_HOST,
    dialect: "postgres" as Dialect,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
