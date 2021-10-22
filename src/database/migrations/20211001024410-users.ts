import { QueryTypes } from "sequelize";
import { DataTypes, QueryInterface } from "sequelize";

async function up({ queryInterface }: { queryInterface: QueryInterface }) {
  // await queryInterface.addColumn("User", "is_verified", {
  //   type: DataTypes.BOOLEAN,
  //   defaultValue: false,
  // });
}

async function down({ queryInterface }: { queryInterface: QueryInterface }) {
  await queryInterface.dropTable("User");
}

export default { up, down };
