import { Model, Optional, DataTypes, Sequelize } from "sequelize";
import sequelize from ".";
import { ChatStatus } from "../enum/product.chats.enum";
import CONSTANTS from "../utils/constants";
import { ImageProduct } from "./image.product.model";

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
    ProductChatsAttributes {
  associate: any;
}

const ProductChats = sequelize.define<ProductChatsInstance>(
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

function productChatsAssociate(): void {
  ProductChats.hasMany(ImageProduct, {
    as: "product_images",
    onDelete: "cascade",
    foreignKey: "product_id", //image product
    sourceKey: "product_id", // product chats
  });
  ProductChats.hasMany(ImageProduct, {
    as: "product_offer_images",
    onDelete: "cascade",
    foreignKey: "product_id",
    sourceKey: "offer_product_id",
  });
}

export { ProductChats, productChatsAssociate };
