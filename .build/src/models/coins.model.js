"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.coinsAssociate = exports.Coins = void 0;
var sequelize_1 = require("sequelize");
var sequelize_2 = require("sequelize");
var _1 = __importDefault(require("."));
var coins_enum_1 = require("../enum/coins.enum");
var user_model_1 = require("./user.model");
var Coins = _1.default.define("Coins", {
    id: {
        type: sequelize_2.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        comment: "Coins Id",
    },
    user_id: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: sequelize_2.DataTypes.BIGINT,
        allowNull: false,
    },
    reference: {
        type: sequelize_2.DataTypes.STRING,
        allowNull: false,
    },
    method_of_subscription: {
        type: sequelize_2.DataTypes.ENUM,
        values: Object.values(coins_enum_1.MethodOfSub),
        allowNull: false,
    },
    createdAt: {
        type: sequelize_2.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP"),
    },
}, {
    timestamps: true,
    tableName: "Coins",
});
exports.Coins = Coins;
function coinsAssociate() {
    Coins.belongsTo(user_model_1.User, {
        as: "user",
        onDelete: "cascade",
        foreignKey: "user_id",
    });
}
exports.coinsAssociate = coinsAssociate;
//# sourceMappingURL=coins.model.js.map