"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackFactory = void 0;
var sequelize_1 = require("sequelize");
var feedback_enum_1 = require("../enum/feedback.enum");
var constants_1 = __importDefault(require("../utils/constants"));
function FeedbackFactory(sequelize) {
    var Feedback = sequelize.define("Feedback", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        feedback_id: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: constants_1.default.UUID,
            primaryKey: true,
            comment: "Feedback Id",
        },
        user_id: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        message: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: sequelize_1.DataTypes.STRING,
            values: Object.values(feedback_enum_1.FeedbackStatus),
            defaultValue: feedback_enum_1.FeedbackStatus.OPEN,
        },
        resolved_by: {
            type: sequelize_1.DataTypes.STRING,
        },
    }, {
        timestamps: true,
        tableName: "Feedback",
        version: true,
    });
    return Feedback;
}
exports.FeedbackFactory = FeedbackFactory;
//# sourceMappingURL=feedback.model.js.map