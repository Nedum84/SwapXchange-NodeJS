import { QueryTypes } from "sequelize";
import { DataTypes, QueryInterface } from "sequelize";

async function up({ queryInterface }: { queryInterface: QueryInterface }) {
  // async function up(context) {
  // const queryInterface: QueryInterface = context.sequelize.queryInterface;

  // queryInterface.sequelize.query(
  //   'SELECT * FROM "Users" WHERE username = ? ', {
  //     replacements: ['admin'],
  //     type: QueryTypes.SELECT
  //   })
  await queryInterface.addColumn("UserPeoplexz", "emails", {
    type: DataTypes.STRING,
  });
}

async function down({ queryInterface }: { queryInterface: QueryInterface }) {
  await queryInterface.dropTable("UserPeoplexz");
}

export default { up, down };
