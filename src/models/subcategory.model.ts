import { Model, Optional, DataTypes, BuildOptions, Sequelize } from "sequelize";
import { Product } from ".";
import CONSTANTS from "../utils/constants";

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

export type SubCategoryStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): SubCategoryInstance;
};

export function SubCategoryFactory(sequelize: Sequelize) {
  const SubCategory = <SubCategoryStatic>sequelize.define(
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
    const exclude = ["version", "id"];
    exclude.forEach((e) => delete values[e]);
    return values;
  };
  return SubCategory;
}
