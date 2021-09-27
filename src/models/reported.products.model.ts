import { Model, Optional, DataTypes } from "sequelize";
import sequelize from ".";
import { ReportedProductStatus } from "../enum/reported.products.enum";
import CONSTANTS from "../utils/constants";

export interface ReportedProductsAttributes {
  id: number;
  reported_id: string;
  reported_by: string;
  product_id: string;
  reported_message: string;
  uploaded_by: string;
  status: ReportedProductStatus;
  resolved_by: string;
}

interface ReportedProductsCreationAttributes
  extends Optional<
    ReportedProductsAttributes,
    "id" | "reported_id" | "status" | "resolved_by"
  > {}

interface ReportedProductsInstance
  extends Model<ReportedProductsAttributes, ReportedProductsCreationAttributes>,
    ReportedProductsAttributes {}

const ReportedProducts = sequelize.define<ReportedProductsInstance>(
  "ReportedProducts",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    reported_id: {
      type: DataTypes.STRING,
      defaultValue: CONSTANTS.UUID,
      primaryKey: true,
      comment: "ReportedProducts Id",
    },
    reported_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reported_message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uploaded_by: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: Object.values(ReportedProductStatus),
      defaultValue: ReportedProductStatus.OPEN,
    },
    resolved_by: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    tableName: "ReportedProducts",
    version: true,
  }
);

export { ReportedProducts };
