import { BuildOptions, Sequelize } from "sequelize";
import { Model, Optional, DataTypes } from "sequelize";
import sequelize from ".";

export interface SavedProductsAttributes {
  id: number;
  product_id: string;
  user_id: string;
}

interface SavedProductsCreationAttributes
  extends Optional<SavedProductsAttributes, "id"> {}

interface SavedProductsInstance
  extends Model<SavedProductsAttributes, SavedProductsCreationAttributes>,
    SavedProductsAttributes {}

export type SavedProductsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): SavedProductsInstance;
};

export function SavedProductsFactory(sequelize: Sequelize) {
  const SavedProducts = <SavedProductsStatic>sequelize.define(
    "SavedProducts",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "SavedProducts Id",
      },
      product_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "SavedProducts",
    }
  );
  return SavedProducts;
}
