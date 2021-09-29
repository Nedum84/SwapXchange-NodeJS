"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductViews = void 0;
var sequelize_1 = require("sequelize");
var _1 = __importDefault(require("."));
var constants_1 = __importDefault(require("../utils/constants"));
var ProductViews = _1.default.define("ProductViews", {
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
exports.ProductViews = ProductViews;
//# sourceMappingURL=product.views.model.js.map