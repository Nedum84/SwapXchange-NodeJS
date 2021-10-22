import { Model, Optional, DataTypes, BuildOptions, Sequelize } from "sequelize";
import { ProductCondition, ProductStatus } from "../enum/product.enum";
import CONSTANTS from "../utils/constants";
import { ImageProductAttributes } from "./image.product.model";

export interface ProductAttributes {
  id: number;
  product_id: string;
  order_id: string;
  product_name: string;
  category: string;
  sub_category: string;
  price: number;
  product_description: string;
  product_suggestion: string[];
  product_condition: ProductCondition;
  product_status: ProductStatus;
  user_id: string;
  user_address: string;
  user_address_city: string;
  user_address_lat: number;
  user_address_long: number;
  upload_price: number;
}

interface ProductCreationAttributes
  extends Optional<ProductAttributes, "id" | "product_id"> {}

interface ProductInstance
  extends Model<ProductAttributes, ProductCreationAttributes>,
    ProductAttributes {
  //-->Images
  images: ImageProductAttributes[];
  suggestions: ProductAttributes[];
}
export type ProductStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ProductInstance;
};

export function ProductFactory(sequelize: Sequelize) {
  const Product = <ProductStatic>sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_id: {
        type: DataTypes.STRING,
        defaultValue: CONSTANTS.UUID,
        primaryKey: true,
        comment: "Product Id",
      },
      order_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      product_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sub_category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      product_suggestion: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      product_condition: {
        type: DataTypes.ENUM,
        values: Object.values(ProductCondition),
        defaultValue: ProductCondition.FAIRLY_USED,
      },
      product_status: {
        type: DataTypes.ENUM,
        values: Object.values(ProductStatus),
        defaultValue: ProductStatus.ACTIVE,
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_address_city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_address_lat: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      user_address_long: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      upload_price: {
        type: DataTypes.INTEGER,
        defaultValue: 100,
      },
    },
    {
      timestamps: true,
      tableName: "Product",
      version: true,
    }
  );
  Product.prototype.toJSON = function () {
    const values = { ...this.get() };
    const exclude = ["version", "id"];
    exclude.forEach((e) => delete values[e]);
    return values;
  };
  return Product;
}
