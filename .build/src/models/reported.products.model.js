"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportedProductsFactory = void 0;
var sequelize_1 = require("sequelize");
var reported_products_enum_1 = require("../enum/reported.products.enum");
var constants_1 = __importDefault(require("../utils/constants"));
function ReportedProductsFactory(sequelize) {
    var ReportedProducts = sequelize.define("ReportedProducts", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        reported_id: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: constants_1.default.UUID,
            primaryKey: true,
            comment: "ReportedProducts Id",
        },
        reported_by: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        product_id: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        reported_message: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        uploaded_by: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.ENUM,
            values: Object.values(reported_products_enum_1.ReportedProductStatus),
            defaultValue: reported_products_enum_1.ReportedProductStatus.OPEN,
        },
        resolved_by: {
            type: sequelize_1.DataTypes.STRING,
        },
    }, {
        timestamps: true,
        tableName: "ReportedProducts",
        version: true,
    });
    return ReportedProducts;
}
exports.ReportedProductsFactory = ReportedProductsFactory;
//# sourceMappingURL=reported.products.model.js.map