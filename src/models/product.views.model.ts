import { Model, Optional, DataTypes, BuildOptions, Sequelize } from "sequelize";
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

export type ProductViewsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProductViewsInstance;
};

export function ProductViewsFactory(sequelize: Sequelize) {
  const ProductViews = <ProductViewsStatic>sequelize.define(
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
  return ProductViews;
}
