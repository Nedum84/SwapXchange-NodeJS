"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenFactory = void 0;
var sequelize_1 = require("sequelize");
var token_enum_1 = require("../enum/token.enum");
function TokenFactory(sequelize) {
    var Token = sequelize.define("Token", {
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
    return Token;
}
exports.TokenFactory = TokenFactory;
//# sourceMappingURL=token.model.js.map