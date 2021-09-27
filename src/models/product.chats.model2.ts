import { Model, Optional, DataTypes, Sequelize } from "sequelize";
import { ChatStatus } from "../enum/product.chats.enum";
import CONSTANTS from "../utils/constants";

export interface ProductChatsAttributes {
  id: number;
  product_chat_id: string;
  product_id: string;
  offer_product_id: string;
  sender_id: string;
  receiver_id: string;
  sender_closed_deal: boolean;
  receiver_closed_deal: boolean;
  chat_status: ChatStatus;
}

interface ProductChatsCreationAttributes
  extends Optional<ProductChatsAttributes, "id" | "product_chat_id"> {}

interface ProductChatsInstance
  extends Model<ProductChatsAttributes, ProductChatsCreationAttributes>,
    ProductChatsAttributes {}

export default (sequelize: any) => {
  const ProductChats = sequelize.define(
    "ProductChats",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      product_chat_id: {
        type: DataTypes.STRING,
        defaultValue: CONSTANTS.UUID,
        primaryKey: true,
        comment: "ProductChats Id",
      },
      product_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      offer_product_id: {
        type: DataTypes.STRING,
      },
      sender_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      receiver_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sender_closed_deal: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      receiver_closed_deal: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      chat_status: {
        type: DataTypes.ENUM,
        values: Object.values(ChatStatus),
        defaultValue: ChatStatus.OPEN,
      },
    },
    {
      timestamps: true,
      tableName: "ProductChats",
      version: true,
    }
  );
  //@ts-ignore
  ProductChats.associate = function (models: any) {
    // associations can be defined here
    ProductChats.belongsTo(models.Merchant, {
      as: "product_images",
      onDelete: "cascade",
      foreignKey: "product_id",
      // sourceKey: "product_id",
    });
    ProductChats.hasMany(models.model("ImageProduct"), {
      as: "product_offer_images",
      onDelete: "cascade",
      foreignKey: "product_id",
      sourceKey: "offer_product_id",
    });
  };
};
