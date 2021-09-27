import { Sequelize } from "sequelize";
import { Model, Optional, DataTypes } from "sequelize";
import sequelize from ".";
import { MethodOfSub } from "../enum/coins.enum";
import { User } from "./user.model";

export interface CoinsAttributes {
  id: number;
  user_id: string;
  amount: number;
  reference: string;
  method_of_subscription: MethodOfSub;
  createdAt?: Date;
}

interface CoinsCreationAttributes extends Optional<CoinsAttributes, "id"> {}

interface CoinsInstance
  extends Model<CoinsAttributes, CoinsCreationAttributes>,
    CoinsAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

const Coins = sequelize.define<CoinsInstance>(
  "Coins",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
      comment: "Coins Id",
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    method_of_subscription: {
      type: DataTypes.ENUM,
      values: Object.values(MethodOfSub),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    timestamps: true,
    tableName: "Coins",
  }
);

function coinsAssociate(): void {
  Coins.belongsTo(User, {
    as: "user",
    onDelete: "cascade",
    foreignKey: "user_id",
  });
}

export { Coins, coinsAssociate };
