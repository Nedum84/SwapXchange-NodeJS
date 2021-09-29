"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSettings = void 0;
var sequelize_1 = require("sequelize");
var _1 = __importDefault(require("."));
var AppSettings = _1.default.define("AppSettings", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    d_key: {
        type: sequelize_1.DataTypes.STRING,
    },
    value: {
        type: sequelize_1.DataTypes.TEXT,
    },
    last_updated_by: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
    tableName: "AppSettings",
    version: true,
    freezeTableName: true,
});
exports.AppSettings = AppSettings;
//# sourceMappingURL=app.settings.model.js.map