"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryAssociate = exports.Category = void 0;
var sequelize_1 = require("sequelize");
var _1 = __importDefault(require("."));
var constants_1 = __importDefault(require("../utils/constants"));
var product_model_1 = require("./product.model");
var Category = _1.default.define("Category", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    category_id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        defaultValue: constants_1.default.UUID,
        comment: "Category Id",
    },
    category_name: {
        type: sequelize_1.DataTypes.STRING,
    },
    category_icon: {
        type: sequelize_1.DataTypes.STRING,
    },
    idx: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 200,
    },
}, {
    timestamps: true,
    tableName: "Category",
    version: true,
});
exports.Category = Category;
Category.prototype.toJSON = function () {
    var values = __assign({}, this.get());
    var exclude = ["version", "id", "createdAt", "updatedAt"];
    exclude.forEach(function (e) { return delete values[e]; });
    return values;
};
Category.addScope("defaultScope", {
// attributes: { exclude: ["version", "createdAt", "updatedAt"] },
});
function categoryAssociate() {
    Category.hasMany(product_model_1.Product, {
        as: "products",
        foreignKey: "category",
        sourceKey: "category_id",
    });
}
exports.categoryAssociate = categoryAssociate;
//# sourceMappingURL=category.model.js.map