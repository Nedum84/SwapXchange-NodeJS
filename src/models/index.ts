"use strict";
import { Sequelize } from "sequelize";
import dbConfig from "../database/config/db.config";
import config from "../config/config";
import pg from "pg";
pg.defaults.parseInt8 = true; //Convert Int returned as strings to Int...
// require("pg").defaults.parseInt8 = true; //Convert Int returned as strings to Int...

// @ts-ignore
const database = dbConfig[config.env] || dbConfig.development;

const sequelize = new Sequelize(
  database.dbname,
  database.username,
  database.password,
  {
    ...database,
    dialect: database.dialect,
  }
);

export default sequelize;
