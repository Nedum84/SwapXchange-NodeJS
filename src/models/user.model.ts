import { BuildOptions, Sequelize } from "sequelize";
import { Model, Optional, DataTypes } from "sequelize";
import { Product } from ".";
import { BaseCurrency, OnlineStatus } from "../enum/user.enum";
import CONSTANTS from "../utils/constants";

export interface UserAttributes {
  id: string;
  user_id: string;
  uid: string;
  name: string;
  mobile_number: string;
  email: string;
  radius: number;
  address: string;
  address_lat: number;
  address_long: number;
  state: string;
  profile_photo: string;
  device_token: string;
  notification: object;
  user_level: number;
  online_status: OnlineStatus;
  user_app_version: number;
  base_currency: BaseCurrency;
  last_login: Date;
  suspended: boolean;
  suspended_at: Date;
  un_suspended_at: Date;
  ip_ban: boolean;
  is_verified: boolean;
  version?: number;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "user_id"> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserInstance;
};

export function UserFactory(sequelize: Sequelize) {
  const User = <UserStatic>sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING,
        defaultValue: CONSTANTS.UUID,
        primaryKey: true,
        comment: "Users Id",
      },
      uid: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
      mobile_number: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      radius: DataTypes.INTEGER,
      address: DataTypes.STRING,
      address_lat: DataTypes.FLOAT,
      address_long: DataTypes.FLOAT,
      state: DataTypes.STRING,
      profile_photo: DataTypes.STRING,
      device_token: DataTypes.STRING,
      notification: {
        type: DataTypes.JSONB,
        defaultValue: {
          general: true,
          call: true,
          chat: true,
          product: true,
        },
      },
      user_level: DataTypes.INTEGER,
      online_status: {
        type: DataTypes.ENUM,
        values: Object.values(OnlineStatus),
        defaultValue: OnlineStatus.ONLINE,
      },
      user_app_version: DataTypes.INTEGER,
      base_currency: {
        type: DataTypes.ENUM,
        values: Object.values(BaseCurrency),
        defaultValue: BaseCurrency.NGN,
      },
      last_login: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      suspended: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      suspended_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      un_suspended_at: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      ip_ban: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      version: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
      tableName: "User",
      version: true,
      freezeTableName: true,
      hooks: {
        beforeCreate: async (user: UserInstance) => {
          // user.password = await UserUtils.hashPassword(user.password);
        },
      },
    }
  );

  User.prototype.toJSON = function () {
    const values = { ...this.get() };
    const exclude = ["version", "id"];
    exclude.forEach((e) => delete values[e]);
    return values;
  };

  return User;
}
