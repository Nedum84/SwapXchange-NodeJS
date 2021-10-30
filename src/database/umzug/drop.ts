import sequelize from "../../models";
import config from "../../config/config";

(async () => {
  try {
    await sequelize.query(`DROP DATABASE ${config.DB_NAME}`)
  } catch (e) {
    console.log(e)
    await sequelize.dropAllSchemas({});
    await sequelize.getQueryInterface().dropAllTables();
  }
  console.log('Database dropped successfully!')
})();
