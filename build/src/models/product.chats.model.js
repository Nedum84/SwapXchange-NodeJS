"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductChatsFactory = void 0;
var sequelize_1 = require("sequelize");
var product_chats_enum_1 = require("../enum/product.chats.enum");
var constants_1 = __importDefault(require("../utils/constants"));
function ProductChatsFactory(sequelize) {
    var ProductChats = sequelize.define("ProductChats", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        product_chat_id: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: constants_1.default.UUID,
            primaryKey: true,
            comment: "ProductChats Id",
        },
        product_id: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            // primaryKey: true,
        },
        offer_product_id: {
            type: sequelize_1.DataTypes.STRING,
            // primaryKey: true,
        },
        sender_id: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        receiver_id: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        sender_closed_deal: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        receiver_closed_deal: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        chat_status: {
            type: sequelize_1.DataTypes.ENUM,
            values: Object.values(product_chats_enum_1.ChatStatus),
            defaultValue: product_chats_enum_1.ChatStatus.OPEN,
        },
    }, {
        timestamps: true,
        tableName: "ProductChats",
        version: true,
    });
    return ProductChats;
}
exports.ProductChatsFactory = ProductChatsFactory;
//# sourceMappingURL=product.chats.model.js.map