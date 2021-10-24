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
exports.ProductFactory = void 0;
var sequelize_1 = require("sequelize");
var product_enum_1 = require("../enum/product.enum");
var constants_1 = __importDefault(require("../utils/constants"));
function ProductFactory(sequelize) {
    var Product = sequelize.define("Product", {
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        product_id: {
            type: sequelize_1.DataTypes.STRING,
            defaultValue: constants_1.default.UUID,
            primaryKey: true,
            comment: "Product Id",
        },
        order_id: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        product_name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        sub_category: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        product_description: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        product_suggestion: {
            type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
            allowNull: false,
        },
        product_condition: {
            type: sequelize_1.DataTypes.ENUM,
            values: Object.values(product_enum_1.ProductCondition),
            defaultValue: product_enum_1.ProductCondition.FAIRLY_USED,
        },
        product_status: {
            type: sequelize_1.DataTypes.ENUM,
            values: Object.values(product_enum_1.ProductStatus),
            defaultValue: product_enum_1.ProductStatus.ACTIVE,
        },
        user_id: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        user_address: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        user_address_city: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        user_address_lat: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
        user_address_long: {
            type: sequelize_1.DataTypes.FLOAT,
            allowNull: false,
        },
        upload_price: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 100,
        },
    }, {
        timestamps: true,
        tableName: "Product",
        version: true,
    });
    Product.prototype.toJSON = function () {
        var values = __assign({}, this.get());
        var exclude = ["version", "id"];
        exclude.forEach(function (e) { return delete values[e]; });
        return values;
    };
    return Product;
}
exports.ProductFactory = ProductFactory;
//# sourceMappingURL=product.model.js.map