import { BuildOptions, Sequelize } from "sequelize";
import { Model, Optional, DataTypes } from "sequelize";
import { MethodOfSub } from "../enum/coins.enum";

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

export type CoinsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CoinsInstance;
};

export function CoinsFactory(sequelize: Sequelize) {
  const Coins = <CoinsStatic>sequelize.define(
    "Coins",
    {
      id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        comment: "Coins Id",
        // references: { model: sequelize.model("Users"),key:"id to be referenced" },
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
      indexes: [
        {
          type: "FULLTEXT",
          name: "reference_idx",
          fields: [
            "reference",
            // {
            //     name:"reference",
            //     order:"DESC",
            // }
          ],
        },
      ],
    }
  );
  return Coins;
}
