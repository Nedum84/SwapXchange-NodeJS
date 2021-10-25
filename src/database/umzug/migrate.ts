import umzug from ".";
import sequelize from "../../models";

(async () => {
  // checks migrations and run them if they are not already applied
  await umzug.up();
  // await sequelize.sync({ force: true });
  console.log("All migrations performed successfully");
})();
