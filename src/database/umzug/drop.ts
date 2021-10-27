import sequelize from "../../models";
import config from "../../config/config";

(async () => {
  await sequelize.dropAllSchemas({});
  await sequelize.getQueryInterface().dropAllTables();
  await  sequelize.query(`DROP DATABASE ${config.DB_NAME}`)
  console.log('Database dropped successfully!')
})();
