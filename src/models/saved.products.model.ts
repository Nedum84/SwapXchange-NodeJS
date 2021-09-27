import { Sequelize } from "sequelize";
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

const SavedProducts = sequelize.define<SavedProductsInstance>(
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

export { SavedProducts };
