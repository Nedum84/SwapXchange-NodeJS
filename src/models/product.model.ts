import { Model, Optional, DataTypes } from "sequelize";
import sequelize from ".";
import { ProductCondition, ProductStatus } from "../enum/product.enum";
import CONSTANTS from "../utils/constants";
import { Category, CategoryAttributes } from "./category.model";
import { ImageProduct, ImageProductAttributes } from "./image.product.model";
import { SubCategory } from "./subcategory.model";
import { User } from "./user.model";

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
  suggestions: CategoryAttributes[];
}

const Product = sequelize.define<ProductInstance>(
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
  const exclude = ["version", "id", "createdAt", "updatedAt"];
  exclude.forEach((e) => delete values[e]);
  return values;
};
async function productAssociate(): Promise<void> {
  Product.belongsTo(User, {
    as: "user",
    foreignKey: "user_id",
    targetKey: "user_id",
  });
  Product.hasMany(ImageProduct, {
    as: "images",
    foreignKey: "product_id",
    sourceKey: "product_id",
  });
  Product.belongsTo(Category, {
    // as: "category",
    foreignKey: "category",
    targetKey: "category_id",
  });
  Product.belongsTo(SubCategory, {
    as: "subcategory",
    foreignKey: "sub_category",
    targetKey: "sub_category_id",
  });
}
export { Product, productAssociate };
