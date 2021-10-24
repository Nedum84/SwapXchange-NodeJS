"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSettingsFactory = void 0;
var sequelize_1 = require("sequelize");
function AppSettingsFactory(sequelize) {
    var AppSettings = sequelize.define("AppSettings", {
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
        tableName: "AppSettings",
        version: true,
        freezeTableName: true,
    });
    return AppSettings;
}
exports.AppSettingsFactory = AppSettingsFactory;
//# sourceMappingURL=app.settings.model.js.map