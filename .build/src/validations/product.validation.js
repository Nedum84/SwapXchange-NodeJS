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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var product_enum_1 = require("../enum/product.enum");
var custom_validation_1 = require("./custom.validation");
var findOne = {
    params: joi_1.default.object().keys({
        product_id: joi_1.default.string().required(),
    }),
};
var findAll = {
    query: joi_1.default.object().keys(custom_validation_1.paginateDefault),
};
var findByCategory = {
    params: joi_1.default.object().keys({
        category: joi_1.default.string().required(),
    }),
    query: joi_1.default.object().keys(__assign({}, custom_validation_1.paginateDefault)),
};
var findBySubCategory = {
    params: joi_1.default.object().keys({
        subcategory: joi_1.default.string().required(),
    }),
    query: joi_1.default.object().keys(__assign({ filters: joi_1.default.string()
            .default("newest")
            .valid("best-match", "price-high", "price-low", "newest", "oldest") }, custom_validation_1.paginateDefault)),
};
var findBySearch = {
    query: joi_1.default.object().keys(__assign({ search_query: joi_1.default.string().required(), filters: joi_1.default.string()
            .default(null)
            .valid("best-match", "price-high", "price-low", "newest", "oldest") }, custom_validation_1.paginateDefault)),
};
var findExchangeOptions = {
    params: joi_1.default.object().keys({
        product_id: joi_1.default.string().required(),
    }),
    query: joi_1.default.object().keys(__assign({}, custom_validation_1.paginateDefault)),
};
var findMyProducts = {
    query: joi_1.default.object().keys(custom_validation_1.paginateDefault),
};
var findNearUsers = {
    params: joi_1.default.object().keys({
        product_id: joi_1.default.string().required(),
    }),
};
var findSearchSuggestions = {
    query: joi_1.default.object().keys({
        search_query: joi_1.default.string().required(),
    }),
};
var findUserProducts = {
    params: joi_1.default.object().keys({
        user_id: joi_1.default.string().required(),
    }),
    query: joi_1.default.object().keys(__assign({ filter: (_a = joi_1.default.string()
            .default("all"))
            .valid.apply(_a, __spreadArray(["all"], Object.values(product_enum_1.ProductStatus), false)) }, custom_validation_1.paginateDefault)),
};
var update = {
    params: joi_1.default.object().keys({
        product_id: joi_1.default.string().required(),
    }),
    body: joi_1.default.object().keys({
        product_name: joi_1.default.string().required(),
        category: joi_1.default.string().required(),
        sub_category: joi_1.default.string().required(),
        price: joi_1.default.number().required(),
        product_description: joi_1.default.string().required(),
        product_suggestion: joi_1.default.array(),
        product_condition: (_b = joi_1.default.string()).valid.apply(_b, Object.values(product_enum_1.ProductCondition)),
        product_status: (_c = joi_1.default.string()
            .required())
            .valid.apply(_c, Object.values(product_enum_1.ProductStatus)),
        user_address: joi_1.default.string().required(),
        user_address_city: joi_1.default.string().required(),
        user_address_lat: joi_1.default.number().required(),
        user_address_long: joi_1.default.number().required(),
    }),
};
var create = {
    body: joi_1.default.object().keys({
        order_id: joi_1.default.string().required(),
        product_name: joi_1.default.string().required(),
        category: joi_1.default.string().required(),
        sub_category: joi_1.default.string().required(),
        price: joi_1.default.number().required(),
        product_description: joi_1.default.string().required(),
        product_suggestion: joi_1.default.array().items(joi_1.default.string().required()).required(),
        product_condition: (_d = joi_1.default.string()).valid.apply(_d, Object.values(product_enum_1.ProductCondition)),
        product_status: (_e = joi_1.default.string()
            .required())
            .valid.apply(_e, Object.values(product_enum_1.ProductStatus)),
        user_address: joi_1.default.string().required(),
        user_address_city: joi_1.default.string().required(),
        user_address_lat: joi_1.default.number().required(),
        user_address_long: joi_1.default.number().required(),
        upload_price: joi_1.default.number().default(100),
        images: joi_1.default.array()
            .items(joi_1.default.object().keys({
            image_path: joi_1.default.string().required(),
            idx: joi_1.default.number().default(200),
        }))
            .required(),
    }),
};
exports.default = {
    create: create,
    update: update,
    findOne: findOne,
    findAll: findAll,
    findByCategory: findByCategory,
    findBySubCategory: findBySubCategory,
    findBySearch: findBySearch,
    findExchangeOptions: findExchangeOptions,
    findMyProducts: findMyProducts,
    findNearUsers: findNearUsers,
    findSearchSuggestions: findSearchSuggestions,
    findUserProducts: findUserProducts,
};
//# sourceMappingURL=product.validation.js.map