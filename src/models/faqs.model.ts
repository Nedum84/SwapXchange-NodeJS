import { Model, Optional, DataTypes, BuildOptions, Sequelize } from "sequelize";
import sequelize from ".";
import CONSTANTS from "../utils/constants";

export interface FaqsAttributes {
  id: number;
  faq_id: string;
  question: string;
  answer: string;
  category: string;
  added_by: string;
}

interface FaqsCreationAttributes
  extends Optional<FaqsAttributes, "id" | "faq_id" | "category"> {}

interface FaqsInstance
  extends Model<FaqsAttributes, FaqsCreationAttributes>,
    FaqsAttributes {}
export type FaqsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): FaqsInstance;
};

export function FaqsFactory(sequelize: Sequelize) {
  const Faqs = <FaqsStatic>sequelize.define(
    "Faqs",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      faq_id: {
        type: DataTypes.STRING,
        defaultValue: CONSTANTS.UUID,
        primaryKey: true,
        comment: "Faqs Id",
      },
      question: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      answer: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        defaultValue: 0,
      },
      added_by: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "Faqs",
      version: true,
    }
  );
  return Faqs;
}
