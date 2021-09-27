import { Model, Optional, DataTypes } from "sequelize";
import sequelize from ".";
import CONSTANTS from "../utils/constants";
import { Product } from "./product.model";

export interface SubCategoryAttributes {
  id: number;
  sub_category_id: string;
  sub_category_name: string;
  sub_category_icon: string;
  category_id: string;
  idx: number;
}

interface SubCategoryCreationAttributes
  extends Optional<SubCategoryAttributes, "id" | "sub_category_id"> {}

interface SubCategoryInstance
  extends Model<SubCategoryAttributes, SubCategoryCreationAttributes>,
    SubCategoryAttributes {}

const SubCategory = sequelize.define<SubCategoryInstance>(
  "SubCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sub_category_id: {
      type: DataTypes.STRING,
      defaultValue: CONSTANTS.UUID,
      primaryKey: true,
      comment: "SubCategory Id",
    },
    sub_category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sub_category_icon: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category_id: {
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
    tableName: "SubCategory",
    version: true,
  }
);

SubCategory.prototype.toJSON = function () {
  const values = { ...this.get() };
  const exclude = ["version", "id", "createdAt", "updatedAt"];
  exclude.forEach((e) => delete values[e]);
  return values;
};
function subcategoryAssociate(): void {
  SubCategory.hasMany(Product, {
    as: "products",
    onDelete: "cascade",
    foreignKey: "sub_category",
    sourceKey: "sub_category_id",
  });
}
export { SubCategory, subcategoryAssociate };
