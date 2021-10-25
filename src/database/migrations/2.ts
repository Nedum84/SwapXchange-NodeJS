import { DataTypes, QueryInterface } from "sequelize";

async function up({ queryInterface }: { queryInterface: QueryInterface }) {
  // async function up(context) {
  // const queryInterface: QueryInterface = context.sequelize.queryInterface;

  await queryInterface.createTable("UserOooooo", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "nelly@gmail.com",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
}

async function down({ queryInterface }: { queryInterface: QueryInterface }) {
  await queryInterface.dropTable("UserOooooo");
}

export default { up, down };
