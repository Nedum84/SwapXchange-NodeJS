import { Model, Optional, DataTypes, BuildOptions, Sequelize } from "sequelize";
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
    AppSettingsAttributes {}

export type AppSettingsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): AppSettingsInstance;
};
export function AppSettingsFactory(sequelize: Sequelize) {
  const AppSettings = <AppSettingsStatic>sequelize.define(
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
      tableName: "AppSettings",
      version: true,
      freezeTableName: true,
    }
  );
  return AppSettings;
}
