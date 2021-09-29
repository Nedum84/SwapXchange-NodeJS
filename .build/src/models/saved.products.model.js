"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedProducts = void 0;
var sequelize_1 = require("sequelize");
var _1 = __importDefault(require("."));
var SavedProducts = _1.default.define("SavedProducts", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "SavedProducts Id",
    },
    product_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: "SavedProducts",
});
exports.SavedProducts = SavedProducts;
//# sourceMappingURL=saved.products.model.js.map