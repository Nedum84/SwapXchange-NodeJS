import { DataTypes, QueryInterface } from "sequelize";

async function up({ queryInterface }: { queryInterface: QueryInterface }) {
  // async function up(context) {
  // const queryInterface: QueryInterface = context.sequelize.queryInterface;
  // await queryInterface.addColumn("UserPeopleTest", "emailsc", {
  //   type: DataTypes.STRING,
  // });
}

async function down({ queryInterface }: { queryInterface: QueryInterface }) {
  await queryInterface.dropTable("UserPeopleTest");
}

export default { up, down };
