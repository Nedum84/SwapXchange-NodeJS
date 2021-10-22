"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinsFactory = void 0;
var sequelize_1 = require("sequelize");
var sequelize_2 = require("sequelize");
var coins_enum_1 = require("../enum/coins.enum");
function CoinsFactory(sequelize) {
    var Coins = sequelize.define("Coins", {
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
    return Coins;
}
exports.CoinsFactory = CoinsFactory;
//# sourceMappingURL=coins.model.js.map