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
exports.SubCategoryFactory = void 0;
var sequelize_1 = require("sequelize");
var constants_1 = __importDefault(require("../utils/constants"));
function SubCategoryFactory(sequelize) {
    var SubCategory = sequelize.define("SubCategory", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        sub_category_id: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: constants_1.default.UUID,
            primaryKey: true,
            comment: "SubCategory Id",
        },
        sub_category_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        sub_category_icon: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        category_id: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        idx: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 200,
        },
    }, {
        timestamps: true,
        tableName: "SubCategory",
        version: true,
    });
    SubCategory.prototype.toJSON = function () {
        var values = __assign({}, this.get());
        var exclude = ["version", "id"];
        exclude.forEach(function (e) { return delete values[e]; });
        return values;
    };
    return SubCategory;
}
exports.SubCategoryFactory = SubCategoryFactory;
//# sourceMappingURL=subcategory.model.js.map