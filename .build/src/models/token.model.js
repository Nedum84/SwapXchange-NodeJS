"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
var sequelize_1 = require("sequelize");
var _1 = __importDefault(require("."));
var token_enum_1 = require("../enum/token.enum");
var Token = _1.default.define("Token", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        comment: "Token Id",
    },
    user_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
        values: Object.values(token_enum_1.TokenTypes),
        defaultValue: token_enum_1.TokenTypes.REFRESH,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    expires: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: "Token",
});
exports.Token = Token;
//# sourceMappingURL=token.model.js.map