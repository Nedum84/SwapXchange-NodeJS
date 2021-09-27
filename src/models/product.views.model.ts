import { Model, Optional, DataTypes } from "sequelize";
import sequelize from ".";
import CONSTANTS from "../utils/constants";

export interface ProductViewsAttributes {
  id: number;
  view_id: string;
  user_id: string;
  product_id: string;
}

interface ProductViewsCreationAttributes
  extends Optional<ProductViewsAttributes, "id" | "view_id"> {}

interface ProductViewsInstance
  extends Model<ProductViewsAttributes, ProductViewsCreationAttributes>,
    ProductViewsAttributes {}

const ProductViews = sequelize.define<ProductViewsInstance>(
  "ProductViews",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    view_id: {
      type: DataTypes.STRING,
      defaultValue: CONSTANTS.UUID,
      primaryKey: true,
      comment: "ProductViews Id",
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "ProductViews",
    version: true,
  }
);

export { ProductViews };
