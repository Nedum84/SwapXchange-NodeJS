"use strict";
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
var error_response_1 = require("../apiresponse/error.response");
var models_1 = require("../models");
var product_service_1 = __importDefault(require("./product.service"));
var sequelize_1 = require("sequelize");
var findOne = function (image_id) { return __awaiter(void 0, void 0, void 0, function () {
    var image;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1.ImageProduct.findOne({
                    where: { image_id: image_id },
                    include: { model: models_1.Product, as: "product" },
                })];
            case 1:
                image = _a.sent();
                if (!image) {
                    throw new error_response_1.ErrorResponse("Image not found!", http_status_1.default.NOT_FOUND);
                }
                return [2 /*return*/, image];
        }
    });
}); };
var findAll = function (product_id) { return __awaiter(void 0, void 0, void 0, function () {
    var images;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1.ImageProduct.findAll({ where: { product_id: product_id } })];
            case 1:
                images = _a.sent();
                return [2 /*return*/, images];
        }
    });
}); };
var deleteOne = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var image_id, user_id, image, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                image_id = req.params.image_id;
                user_id = req.user.user_id;
                return [4 /*yield*/, findOne(image_id)];
            case 1:
                image = _a.sent();
                return [4 /*yield*/, product_service_1.default.findOnlyById(image.product_id)];
            case 2:
                product = _a.sent();
                if (product.user_id !== user_id) {
                    throw new error_response_1.ErrorResponse("No permission to delete image", http_status_1.default.FORBIDDEN);
                }
                return [2 /*return*/, !!image.destroy()];
        }
    });
}); };
var createMany = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var images;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1.ImageProduct.bulkCreate(body, {
                    fields: ["image_id", "product_id", "image_path", "idx"],
                    updateOnDuplicate: ["image_id"],
                })];
            case 1:
                images = _a.sent();
                return [2 /*return*/, images];
        }
    });
}); };
var createOne = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var image;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1.ImageProduct.create(body)];
            case 1:
                image = _a.sent();
                return [2 /*return*/, image];
        }
    });
}); };
var update = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var image_id, idx, image, updateOthers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                image_id = req.params.image_id;
                idx = req.body.idx;
                return [4 /*yield*/, findOne(image_id)];
            case 1:
                image = _a.sent();
                return [4 /*yield*/, models_1.ImageProduct.update(
                    // { idx: Sequelize.literal("idx + 1") },
                    { idx: sequelize_1.Sequelize.fn("1 + ", sequelize_1.Sequelize.col("idx")) }, { where: { product_id: image.product_id } })];
            case 2:
                updateOthers = _a.sent();
                image.idx = idx;
                return [4 /*yield*/, image.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, image.reload()];
        }
    });
}); };
exports.default = {
    findAll: findAll,
    findOne: findOne,
    createMany: createMany,
    createOne: createOne,
    update: update,
    deleteOne: deleteOne,
};
//# sourceMappingURL=product.image.service.js.map