import { Sequelize } from "sequelize";
import { Model, Optional, DataTypes } from "sequelize";
import sequelize from ".";
import CONSTANTS from "../utils/constants";
import { ProductChats } from "./product.chats.model";
import { Product } from "./product.model";

export interface ImageProductAttributes {
  id: number;
  image_id: string;
  product_id: string;
  image_path: string;
  idx: number;
}

interface ImageProductCreationAttributes
  extends Optional<ImageProductAttributes, "image_id" | "id"> {}

interface ImageProductInstance
  extends Model<ImageProductAttributes, ImageProductCreationAttributes>,
    ImageProductAttributes {}

const ImageProduct = sequelize.define<ImageProductInstance>(
  "ImageProduct",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    image_id: {
      type: DataTypes.STRING,
      defaultValue: CONSTANTS.UUID,
      primaryKey: true,
      comment: "ImageProduct Id",
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idx: {
      type: DataTypes.INTEGER,
      defaultValue: 200,
    },
  },
  {
    timestamps: true,
    tableName: "ImageProduct",
    version: true,
  }
);

ImageProduct.prototype.toJSON = function () {
  const values = { ...this.get() };
  const exclude = ["version", "id", "createdAt", "updatedAt"];
  exclude.forEach((e) => delete values[e]);
  return values;
};
function imageProductAssociate(): void {
  ImageProduct.belongsTo(ProductChats, {
    // as: "product_images",
    foreignKey: "product_id",
    targetKey: "product_id",
  });
  ImageProduct.belongsTo(ProductChats, {
    // as: "product_offer_images",
    foreignKey: "product_id",
    targetKey: "offer_product_id",
  });
  ImageProduct.belongsTo(Product, {
    as: "product",
    foreignKey: "product_id",
    targetKey: "product_id",
  });
}

export { ImageProduct, imageProductAssociate };
