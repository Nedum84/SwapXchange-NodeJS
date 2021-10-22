"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductViewsFactory = void 0;
var sequelize_1 = require("sequelize");
var constants_1 = __importDefault(require("../utils/constants"));
function ProductViewsFactory(sequelize) {
    var ProductViews = sequelize.define("ProductViews", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        view_id: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: constants_1.default.UUID,
            primaryKey: true,
            comment: "ProductViews Id",
        },
        user_id: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        product_id: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true,
        tableName: "ProductViews",
        version: true,
    });
    return ProductViews;
}
exports.ProductViewsFactory = ProductViewsFactory;
//# sourceMappingURL=product.views.model.js.map