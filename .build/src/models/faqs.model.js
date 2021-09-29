"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faqs = void 0;
var sequelize_1 = require("sequelize");
var _1 = __importDefault(require("."));
var constants_1 = __importDefault(require("../utils/constants"));
var Faqs = _1.default.define("Faqs", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    faq_id: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: constants_1.default.UUID,
        primaryKey: true,
        comment: "Faqs Id",
    },
    question: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    answer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: 0,
    },
    added_by: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: "Faqs",
    version: true,
});
exports.Faqs = Faqs;
//# sourceMappingURL=faqs.model.js.map