import sequelize from "../../models";

(async () => {
  // await sequelize.dropAllSchemas({ logging: true, benchmark: true });
  await sequelize.dropAllSchemas({});
  await sequelize.getQueryInterface().dropAllTables();
  // await sequelize.getQueryInterface().dropDatabase(config.DB_NAME);
  // sequelize.query("DELETE FROM SequelizeMeta")// Deletes all sequelize migration history(NO for prod)
  // await sequelize.drop();
  // await sequelize.sync({ force: true });
})();
