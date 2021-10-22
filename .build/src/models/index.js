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
exports.User = exports.Token = exports.SubCategory = exports.SavedProducts = exports.ReportedProducts = exports.ProductViews = exports.Product = exports.ProductChats = exports.ImageProduct = exports.Feedback = exports.Faqs = exports.Coins = exports.Category = exports.AppSettings = void 0;
var sequelize_1 = require("sequelize");
var db_config_1 = __importDefault(require("../database/config/db.config"));
var config_1 = __importDefault(require("../config/config"));
var pg_1 = __importDefault(require("pg"));
var user_model_1 = require("./user.model");
var app_settings_model_1 = require("./app.settings.model");
var category_model_1 = require("./category.model");
var coins_model_1 = require("./coins.model");
var faqs_model_1 = require("./faqs.model");
var feedback_model_1 = require("./feedback.model");
var image_product_model_1 = require("./image.product.model");
var product_chats_model_1 = require("./product.chats.model");
var product_model_1 = require("./product.model");
var product_views_model_1 = require("./product.views.model");
var reported_products_model_1 = require("./reported.products.model");
var saved_products_model_1 = require("./saved.products.model");
var subcategory_model_1 = require("./subcategory.model");
var token_model_1 = require("./token.model");
pg_1.default.defaults.parseInt8 = true; //Convert Int returned as strings to Int...
// require("pg").defaults.parseInt8 = true; //Convert Int returned as strings to Int...
// @ts-ignore
var database = db_config_1.default[config_1.default.env] || db_config_1.default.development;
var sequelize = new sequelize_1.Sequelize(database.dbname, database.username, database.password, __assign(__assign({}, database), { dialect: database.dialect }));
exports.AppSettings = (0, app_settings_model_1.AppSettingsFactory)(sequelize);
exports.Category = (0, category_model_1.CategoryFactory)(sequelize);
exports.Coins = (0, coins_model_1.CoinsFactory)(sequelize);
exports.Faqs = (0, faqs_model_1.FaqsFactory)(sequelize);
exports.Feedback = (0, feedback_model_1.FeedbackFactory)(sequelize);
exports.ImageProduct = (0, image_product_model_1.ImageProductFactory)(sequelize);
exports.ProductChats = (0, product_chats_model_1.ProductChatsFactory)(sequelize);
exports.Product = (0, product_model_1.ProductFactory)(sequelize);
exports.ProductViews = (0, product_views_model_1.ProductViewsFactory)(sequelize);
exports.ReportedProducts = (0, reported_products_model_1.ReportedProductsFactory)(sequelize);
exports.SavedProducts = (0, saved_products_model_1.SavedProductsFactory)(sequelize);
exports.SubCategory = (0, subcategory_model_1.SubCategoryFactory)(sequelize);
exports.Token = (0, token_model_1.TokenFactory)(sequelize);
exports.User = (0, user_model_1.UserFactory)(sequelize);
//-->Category Relationship
exports.Category.hasMany(exports.Product, {
    as: "products",
    foreignKey: "category",
    sourceKey: "category_id",
});
//--> Coins Relationship
exports.Coins.belongsTo(exports.User, {
    as: "user",
    onDelete: "cascade",
    foreignKey: "user_id",
});
exports.ImageProduct.belongsTo(exports.Product, {
    as: "product",
    foreignKey: "product_id",
    targetKey: "product_id",
});
//--> ProductChats Relationship
// ProductChats.hasMany(ImageProduct, {
//   as: "product_images",
//   // onDelete: "cascade",
//   foreignKey: "product_id", //image product
//   sourceKey: "product_id", // product chats
// });
// ProductChats.hasMany(ImageProduct, {
//   as: "product_offer_images",
//   // onDelete: "cascade",
//   foreignKey: "product_id",
//   sourceKey: "offer_product_id",
// });
//--> Product Relationship
exports.Product.belongsTo(exports.User, {
    as: "user",
    foreignKey: "user_id",
    targetKey: "user_id",
});
exports.Product.hasMany(exports.ImageProduct, {
    as: "images",
    foreignKey: "product_id",
    sourceKey: "product_id",
});
exports.Product.belongsTo(exports.Category, {
    // as: "category",
    foreignKey: "category",
    targetKey: "category_id",
});
exports.Product.belongsTo(exports.SubCategory, {
    as: "subcategory",
    foreignKey: "sub_category",
    targetKey: "sub_category_id",
});
//--> SubCategory Relationship
exports.SubCategory.hasMany(exports.Product, {
    as: "products",
    onDelete: "cascade",
    foreignKey: "sub_category",
    sourceKey: "sub_category_id",
});
// //--> User Relationship
exports.User.hasMany(exports.Product, {
    as: "products",
    foreignKey: "user_id",
    sourceKey: "user_id",
});
// SavedProducts.hasOne(Product, {
//   as: "product",
//   foreignKey: "product_id",
//   // targetKey: "product_id",
//   // sourceKey: "user_id",
// });
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); })();
exports.default = sequelize;
//# sourceMappingURL=index.js.map