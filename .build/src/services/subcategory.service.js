"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var models_1 = __importStar(require("../models"));
var error_response_1 = require("../apiresponse/error.response");
var product_utils_1 = __importDefault(require("../utils/product.utils"));
var product_enum_1 = require("../enum/product.enum");
var sequelize_1 = require("sequelize");
var user_service_1 = __importDefault(require("./user.service"));
var category_service_1 = __importDefault(require("./category.service"));
var findOne = function (sub_category_id) { return __awaiter(void 0, void 0, void 0, function () {
    var subCat;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1.SubCategory.findOne({ where: { sub_category_id: sub_category_id } })];
            case 1:
                subCat = _a.sent();
                if (!subCat) {
                    throw new error_response_1.ErrorResponse("sub category not found", http_status_1.default.NOT_FOUND);
                }
                return [2 /*return*/, subCat];
        }
    });
}); };
var update = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var sub_category_id, body, user_level, category;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                sub_category_id = req.params.sub_category_id;
                body = req.body;
                user_level = req.user.user_level;
                if (!user_level || user_level == 1) {
                    throw new error_response_1.ErrorResponse("Access denied", http_status_1.default.UNAUTHORIZED);
                }
                return [4 /*yield*/, findOne(sub_category_id)];
            case 1:
                category = _a.sent();
                Object.assign(category, body);
                return [4 /*yield*/, category.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, category.reload()];
        }
    });
}); };
var create = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var body, user_level, category;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                user_level = req.user.user_level;
                if (!user_level || user_level == 1) {
                    throw new error_response_1.ErrorResponse("Access denied", http_status_1.default.UNAUTHORIZED);
                }
                return [4 /*yield*/, category_service_1.default.findOne(body.category_id)];
            case 1:
                _a.sent();
                return [4 /*yield*/, models_1.SubCategory.create(body)];
            case 2:
                category = _a.sent();
                return [2 /*return*/, category];
        }
    });
}); };
var findAll = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, user, query, subcategories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.user.user_id;
                return [4 /*yield*/, user_service_1.default.findOne(user_id)];
            case 1:
                user = _a.sent();
                query = "SELECT \n                  \"SubCategory\".*, \n                  (SELECT COUNT(id) \n                    FROM \"Product\" \n                    WHERE \"Product\".product_status = '" + product_enum_1.ProductStatus.ACTIVE + "'\n                    AND \"Product\".sub_category = \"SubCategory\".sub_category_id\n                    AND " + product_utils_1.default.radiusGeometry(user) + " < " + user.radius + "\n                  ) AS no_of_products\n\n                  FROM \"SubCategory\"\n                  ORDER BY idx ";
                return [4 /*yield*/, models_1.default.query(query, {
                        type: sequelize_1.QueryTypes.SELECT,
                        nest: true,
                        mapToModel: true,
                    })];
            case 2:
                subcategories = _a.sent();
                return [2 /*return*/, subcategories];
        }
    });
}); };
var findByCategoryId = function (category_id) { return __awaiter(void 0, void 0, void 0, function () {
    var categories;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1.SubCategory.findAll({
                    where: { category_id: category_id },
                    order: [["id", "DESC"]],
                })];
            case 1:
                categories = _a.sent();
                return [2 /*return*/, categories];
        }
    });
}); };
exports.default = {
    update: update,
    findOne: findOne,
    create: create,
    findAll: findAll,
    findByCategoryId: findByCategoryId,
};
//# sourceMappingURL=subcategory.service.js.map