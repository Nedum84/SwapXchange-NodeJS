import { Model, Optional, DataTypes } from "sequelize";
import sequelize from ".";
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

const Token = sequelize.define<TokenInstance>(
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

export { Token };
