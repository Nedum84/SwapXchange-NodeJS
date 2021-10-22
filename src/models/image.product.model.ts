import { BuildOptions, Sequelize } from "sequelize";
import { Model, Optional, DataTypes } from "sequelize";
import sequelize, { Product, ProductChats } from ".";
import CONSTANTS from "../utils/constants";

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

export type ImageProductStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ImageProductInstance;
};

export function ImageProductFactory(sequelize: Sequelize) {
  const ImageProduct = <ImageProductStatic>sequelize.define(
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
  return ImageProduct;
}
