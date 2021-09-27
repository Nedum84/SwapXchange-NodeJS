import { Model, Optional, DataTypes } from "sequelize";
import sequelize from ".";

export interface AppSettingsAttributes {
  id: number;
  d_key: string;
  value: string;
  last_updated_by: string;
}

interface AppSettingsCreationAttributes
  extends Optional<AppSettingsAttributes, "id"> {}

interface AppSettingsInstance
  extends Model<AppSettingsAttributes, AppSettingsCreationAttributes>,
    AppSettingsAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const AppSettings = sequelize.define<AppSettingsInstance>(
  "AppSettings",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    d_key: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.TEXT,
    },
    last_updated_by: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "AppSettings",
    version: true,
    freezeTableName: true,
  }
);

export { AppSettings };
