import { Model, Optional, DataTypes, Sequelize, BuildOptions } from "sequelize";
import { TokenTypes } from "../enum/token.enum";

export interface TokenAttributes {
  id: number;
  user_id: string;
  token: string;
  type: TokenTypes;
  expires: Date;
}

interface TokenCreationAttributes extends Optional<TokenAttributes, "id"> {}

interface TokenInstance
  extends Model<TokenAttributes, TokenCreationAttributes>,
    TokenAttributes {}

export type TokenStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TokenInstance;
};

export function TokenFactory(sequelize: Sequelize) {
  const Token = <TokenStatic>sequelize.define(
    "Token",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Token Id",
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        values: Object.values(TokenTypes),
        defaultValue: TokenTypes.REFRESH,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expires: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "Token",
    }
  );
  return Token;
}
