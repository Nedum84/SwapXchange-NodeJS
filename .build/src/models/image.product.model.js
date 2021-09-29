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
exports.imageProductAssociate = exports.ImageProduct = void 0;
var sequelize_1 = require("sequelize");
var _1 = __importDefault(require("."));
var constants_1 = __importDefault(require("../utils/constants"));
var product_chats_model_1 = require("./product.chats.model");
var product_model_1 = require("./product.model");
var ImageProduct = _1.default.define("ImageProduct", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    image_id: {
        type: sequelize_1.DataTypes.STRING,
        defaultValue: constants_1.default.UUID,
        primaryKey: true,
        comment: "ImageProduct Id",
    },
    product_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image_path: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    idx: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 200,
    },
}, {
    timestamps: true,
    tableName: "ImageProduct",
    version: true,
});
exports.ImageProduct = ImageProduct;
ImageProduct.prototype.toJSON = function () {
    var values = __assign({}, this.get());
    var exclude = ["version", "id", "createdAt", "updatedAt"];
    exclude.forEach(function (e) { return delete values[e]; });
    return values;
};
function imageProductAssociate() {
    ImageProduct.belongsTo(product_chats_model_1.ProductChats, {
        // as: "product_images",
        foreignKey: "product_id",
        targetKey: "product_id",
    });
    ImageProduct.belongsTo(product_chats_model_1.ProductChats, {
        // as: "product_offer_images",
        foreignKey: "product_id",
        targetKey: "offer_product_id",
    });
    ImageProduct.belongsTo(product_model_1.Product, {
        as: "product",
        foreignKey: "product_id",
        targetKey: "product_id",
    });
}
exports.imageProductAssociate = imageProductAssociate;
//# sourceMappingURL=image.product.model.js.map