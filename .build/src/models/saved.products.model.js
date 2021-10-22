"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavedProductsFactory = void 0;
var sequelize_1 = require("sequelize");
function SavedProductsFactory(sequelize) {
    var SavedProducts = sequelize.define("SavedProducts", {
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
    return SavedProducts;
}
exports.SavedProductsFactory = SavedProductsFactory;
//# sourceMappingURL=saved.products.model.js.map