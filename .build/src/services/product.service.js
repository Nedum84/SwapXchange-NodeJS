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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_1 = __importDefault(require("http-status"));
var sequelize_1 = require("sequelize");
var error_response_1 = require("../apiresponse/error.response");
var models_1 = __importDefault(require("../models"));
var category_model_1 = require("../models/category.model");
var image_product_model_1 = require("../models/image.product.model");
var product_model_1 = require("../models/product.model");
var subcategory_model_1 = require("../models/subcategory.model");
var user_model_1 = require("../models/user.model");
var helpers_1 = __importDefault(require("../utils/helpers"));
var product_utils_1 = __importDefault(require("../utils/product.utils"));
var user_utils_1 = __importDefault(require("../utils/user.utils"));
var category_service_1 = __importDefault(require("./category.service"));
var product_image_service_1 = __importDefault(require("./product.image.service"));
var product_views_service_1 = __importDefault(require("./product.views.service"));
var subcategory_service_1 = __importDefault(require("./subcategory.service"));
var user_service_1 = __importDefault(require("./user.service"));
var findOnlyById = function (product_id) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, product_model_1.Product.findOne({
                    where: { product_id: product_id },
                })];
            case 1:
                product = _a.sent();
                if (!product) {
                    throw new error_response_1.ErrorResponse("Product not found!", http_status_1.default.NOT_FOUND);
                }
                return [2 /*return*/, product];
        }
    });
}); };
var findOne = function (product_id) { return __awaiter(void 0, void 0, void 0, function () {
    var product, suggestions, noOfViews;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, product_model_1.Product.findOne({
                    where: { product_id: product_id },
                    include: [
                        {
                            model: user_model_1.User,
                            as: "user",
                            attributes: [
                                "user_id",
                                "name",
                                "mobile_number",
                                "address",
                                "profile_photo",
                            ],
                        },
                        {
                            model: image_product_model_1.ImageProduct,
                            as: "images",
                        },
                        {
                            model: category_model_1.Category,
                            // as: "images",
                        },
                        {
                            model: subcategory_model_1.SubCategory,
                            as: "subcategory",
                        },
                    ],
                })];
            case 1:
                product = _a.sent();
                if (!product) {
                    throw new error_response_1.ErrorResponse("Product not found!", http_status_1.default.NOT_FOUND);
                }
                return [4 /*yield*/, category_service_1.default.findByCatIds(product.product_suggestion)];
            case 2:
                suggestions = _a.sent();
                if (suggestions) {
                    // product.suggestions = suggestions;
                    //@ts-ignore no_of_views
                    product.setDataValue("suggestions", suggestions);
                }
                return [4 /*yield*/, product_views_service_1.default.findAll(product.product_id)];
            case 3:
                noOfViews = _a.sent();
                //@ts-ignore
                product.setDataValue("no_of_views", noOfViews !== null && noOfViews !== void 0 ? noOfViews : 0);
                return [2 /*return*/, product];
        }
    });
}); };
var update = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var product_id, user_id, body, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                product_id = req.params.product_id;
                user_id = req.user.user_id;
                body = req.body;
                return [4 /*yield*/, findOne(product_id)];
            case 1:
                product = _a.sent();
                if (product.user_id != user_id) {
                    throw new error_response_1.ErrorResponse("You are not authorized to edit this product", http_status_1.default.UNAUTHORIZED);
                }
                Object.assign(product, body);
                return [4 /*yield*/, product.save()];
            case 2:
                _a.sent();
                // return product.reload();
                return [2 /*return*/, findOne(product.product_id)];
        }
    });
}); };
var create = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, body, product, imgs, images;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.user.user_id;
                body = req.body;
                body.user_id = user_id;
                return [4 /*yield*/, product_model_1.Product.create(body)];
            case 1:
                product = _a.sent();
                if (!(body === null || body === void 0 ? void 0 : body.images)) return [3 /*break*/, 3];
                imgs = body.images
                    .filter(function (img) { return img.image_path !== ""; })
                    .map(function (img, index) {
                    var _a;
                    return {
                        image_path: img.image_path,
                        product_id: product.product_id,
                        idx: (_a = img.idx) !== null && _a !== void 0 ? _a : index + 1,
                    };
                });
                if (!(imgs.length !== 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, product_image_service_1.default.createMany(imgs)];
            case 2:
                images = _a.sent();
                product.images = images;
                _a.label = 3;
            case 3: 
            // return product;
            return [2 /*return*/, findOne(product.product_id)];
        }
    });
}); };
var findByCategory = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, category, options, cat, extra, query, products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.user.user_id;
                category = req.params.category;
                options = helpers_1.default.getPaginate(req.query);
                return [4 /*yield*/, category_service_1.default.findOne(category)];
            case 1:
                cat = _a.sent();
                extra = "AND category = '" + cat.category_id + "'";
                return [4 /*yield*/, product_utils_1.default.selectQuery(__assign(__assign({ user_id: user_id }, options), { extra: extra }))];
            case 2:
                query = _a.sent();
                return [4 /*yield*/, models_1.default.query(query, {
                        type: sequelize_1.QueryTypes.SELECT,
                        nest: true,
                        mapToModel: true,
                    })];
            case 3:
                products = _a.sent();
                return [2 /*return*/, products];
        }
    });
}); };
var findBySubCategory = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, subcategory, options, sub_cat, extra, query, products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.user.user_id;
                subcategory = req.params.subcategory;
                options = helpers_1.default.getPaginate(req.query);
                return [4 /*yield*/, subcategory_service_1.default.findOne(subcategory)];
            case 1:
                sub_cat = _a.sent();
                extra = "AND sub_category = '" + sub_cat.sub_category_id + "'";
                return [4 /*yield*/, product_utils_1.default.selectQuery(__assign(__assign({ user_id: user_id }, options), { extra: extra }))];
            case 2:
                query = _a.sent();
                return [4 /*yield*/, models_1.default.query(query, {
                        type: sequelize_1.QueryTypes.SELECT,
                        nest: true,
                        mapToModel: true,
                    })];
            case 3:
                products = _a.sent();
                return [2 /*return*/, products];
        }
    });
}); };
var findBySearch = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, _a, search_query, filters, options, searchQuery, extra, order, query, products;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user_id = req.user.user_id;
                _a = req.query, search_query = _a.search_query, filters = _a.filters;
                options = helpers_1.default.getPaginate(req.query);
                searchQuery = search_query != "none" ? search_query : "";
                extra = "\n      AND (\n            product_name LIKE '%" + searchQuery + "%' \n          OR category IN \n              (SELECT category_id FROM \"Category\" WHERE category_name LIKE '%" + searchQuery + "%' ) \n          OR sub_category IN \n              (SELECT sub_category_id FROM \"SubCategory\" WHERE sub_category_name LIKE '%" + searchQuery + "%' ) \n      )\n";
                order = null;
                if (filters) {
                    switch (filters) {
                        case "best-match":
                            order = "ORDER BY id DESC";
                            break;
                        case "price-high":
                            order = "ORDER BY price DESC";
                            break;
                        case "price-low":
                            order = "ORDER BY price ASC";
                            break;
                        case "newest":
                            order = "ORDER BY id DESC";
                            break;
                        case "oldest":
                            order = "ORDER BY id ASC";
                            break;
                        default:
                            order = "ORDER BY id DESC";
                            break;
                    }
                }
                return [4 /*yield*/, product_utils_1.default.selectQuery(__assign(__assign({ user_id: user_id }, options), { extra: extra, filters: filters, order: order }))];
            case 1:
                query = _b.sent();
                return [4 /*yield*/, models_1.default.query(query, {
                        type: sequelize_1.QueryTypes.SELECT,
                        nest: true,
                        mapToModel: true,
                    })];
            case 2:
                products = _b.sent();
                return [2 /*return*/, products];
        }
    });
}); };
var findSearchSuggestions = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var search_query, query, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                search_query = req.query.search_query;
                query = "SELECT DISTINCT product_name as item FROM \"Product\" WHERE product_name LIKE '%" + search_query + "%'\n              UNION\n            SELECT DISTINCT category_name as item FROM \"Category\" WHERE category_name LIKE '%" + search_query + "%'\n              UNION\n            SELECT DISTINCT sub_category_name as item FROM \"SubCategory\" WHERE sub_category_name LIKE '%" + search_query + "%'\n        ";
                return [4 /*yield*/, models_1.default.query(query, {
                        type: sequelize_1.QueryTypes.SELECT,
                        nest: true,
                        mapToModel: true,
                    })];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var findExchangeOptions = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, product_id, options, product, suggestions, extra, query, products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.user.user_id;
                product_id = req.params.product_id;
                options = helpers_1.default.getPaginate(req.query);
                return [4 /*yield*/, findOne(product_id)];
            case 1:
                product = _a.sent();
                suggestions = product.product_suggestion.map(function (i) { return "'" + i + "'"; });
                extra = "AND product_id != '" + product.product_id + "' AND category = ANY(ARRAY[" + suggestions + "])";
                return [4 /*yield*/, product_utils_1.default.selectQuery(__assign(__assign({ user_id: user_id }, options), { extra: extra }))];
            case 2:
                query = _a.sent();
                return [4 /*yield*/, models_1.default.query(query, {
                        type: sequelize_1.QueryTypes.SELECT,
                        nest: true,
                        mapToModel: true,
                    })];
            case 3:
                products = _a.sent();
                return [2 /*return*/, products];
        }
    });
}); };
var findMyProducts = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, _a, limit, offset, query, products;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user_id = req.user.user_id;
                _a = helpers_1.default.getPaginate(req.query), limit = _a.limit, offset = _a.offset;
                query = "SELECT \"Product\".*, \n                  " + product_utils_1.default.imgSubQuery() + ", \n                  " + product_utils_1.default.userSubQuery() + ", \n                  " + product_utils_1.default.suggestionSubQuery() + "\n                  FROM \"Product\"\n                      WHERE \"Product\".user_id = '" + user_id + "'\n                          ORDER BY id DESC\n                              LIMIT " + limit + " OFFSET " + offset + " ";
                return [4 /*yield*/, models_1.default.query(query, {
                        type: sequelize_1.QueryTypes.SELECT,
                        nest: true,
                        mapToModel: true,
                    })];
            case 1:
                products = _b.sent();
                return [2 /*return*/, products];
        }
    });
}); };
var findUserProducts = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, filter, _a, limit, offset, extra, user, query, products;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user_id = req.params.user_id;
                filter = req.query.filter;
                _a = helpers_1.default.getPaginate(req.query), limit = _a.limit, offset = _a.offset;
                extra = filter == "all" ? "" : "AND product_status = '" + filter + "'";
                return [4 /*yield*/, user_service_1.default.findOne(user_id)];
            case 1:
                user = _b.sent();
                query = "SELECT \"Product\".*,\n                  " + product_utils_1.default.imgSubQuery() + ", \n                  " + product_utils_1.default.userSubQuery() + ", \n                  " + product_utils_1.default.suggestionSubQuery() + "\n                  FROM \"Product\" \n                      WHERE \"Product\".user_id = '" + user.user_id + "' \n                        " + extra + "\n                          ORDER BY id DESC \n                              LIMIT " + limit + " OFFSET " + offset + " ";
                return [4 /*yield*/, models_1.default.query(query, {
                        type: sequelize_1.QueryTypes.SELECT,
                        nest: true,
                        mapToModel: true,
                    })];
            case 2:
                products = _b.sent();
                return [2 /*return*/, products];
        }
    });
}); };
var findNearUsers = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, product_id, user, _a, lat, long, query, result;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user_id = req.user.user_id;
                product_id = req.params.product_id;
                return [4 /*yield*/, user_service_1.default.findOne(user_id)];
            case 1:
                user = _b.sent();
                return [4 /*yield*/, findOne(product_id)];
            case 2:
                _a = _b.sent(), lat = _a.user_address_lat, long = _a.user_address_long;
                query = "SELECT user_id, device_token, notification, name\n            from \"User\" \n            WHERE " + user_utils_1.default.radiusGeometry(lat, long) + " < " + user.radius + " \n            AND \"User\".user_id != '" + user_id + "'\n            LIMIT 100\n        ";
                return [4 /*yield*/, models_1.default.query(query, {
                        type: sequelize_1.QueryTypes.SELECT,
                        nest: true,
                        mapToModel: true,
                    })];
            case 3:
                result = _b.sent();
                return [2 /*return*/, result];
        }
    });
}); };
var findAll = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, options, query, products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.user.user_id;
                options = helpers_1.default.getPaginate(req.query);
                return [4 /*yield*/, product_utils_1.default.selectQuery(__assign({ user_id: user_id }, options))];
            case 1:
                query = _a.sent();
                return [4 /*yield*/, models_1.default.query(query, {
                        type: sequelize_1.QueryTypes.SELECT,
                        nest: true,
                        mapToModel: true,
                    })];
            case 2:
                products = _a.sent();
                return [2 /*return*/, products];
        }
    });
}); };
exports.default = {
    findOnlyById: findOnlyById,
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
    update: update,
    create: create,
};
//# sourceMappingURL=product.service.js.map