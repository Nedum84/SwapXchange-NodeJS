import { Sequelize } from "sequelize";
import { Model, Optional, DataTypes } from "sequelize";
import sequelize from ".";
import CONSTANTS from "../utils/constants";
import { Product } from "./product.model";

export interface CategoryAttributes {
  id: number;
  category_id: string;
  category_name: string;
  category_icon: string;
  idx: number;
}

interface CategoryCreationAttributes
  extends Optional<CategoryAttributes, "id" | "category_id"> {}

interface CategoryInstance
  extends Model<CategoryAttributes, CategoryCreationAttributes>,
    CategoryAttributes {}

const Category = sequelize.define<CategoryInstance>(
  "Category",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: CONSTANTS.UUID,
      comment: "Category Id",
    },
    category_name: {
      type: DataTypes.STRING,
    },
    category_icon: {
      type: DataTypes.STRING,
    },
    idx: {
      type: DataTypes.INTEGER,
      defaultValue: 200,
    },
  },
  {
    timestamps: true,
    tableName: "Category",
    version: true,
  }
);

Category.prototype.toJSON = function () {
  const values = { ...this.get() };
  const exclude = ["version", "id", "createdAt", "updatedAt"];
  exclude.forEach((e) => delete values[e]);
  return values;
};
Category.addScope("defaultScope", {
  // attributes: { exclude: ["version", "createdAt", "updatedAt"] },
});
function categoryAssociate(): void {
  Category.hasMany(Product, {
    as: "products",
    foreignKey: "category",
    sourceKey: "category_id",
  });
}
export { Category, categoryAssociate };
