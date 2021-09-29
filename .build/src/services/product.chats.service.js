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
var sequelize_1 = require("sequelize");
var error_response_1 = require("../apiresponse/error.response");
var image_product_model_1 = require("../models/image.product.model");
var product_chats_model_1 = require("../models/product.chats.model");
var product_service_1 = __importDefault(require("./product.service"));
var user_service_1 = __importDefault(require("./user.service"));
var findOne = function (product_chat_id) { return __awaiter(void 0, void 0, void 0, function () {
    var chat;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, product_chats_model_1.ProductChats.findOne({ where: { product_chat_id: product_chat_id } })];
            case 1:
                chat = _a.sent();
                if (!chat) {
                    throw new error_response_1.ErrorResponse("Not found", http_status_1.default.NOT_FOUND);
                }
                return [2 /*return*/, chat];
        }
    });
}); };
var update = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var product_chat_id, body, product_id, offer_product_id, sender_id, receiver_id, chat;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                product_chat_id = req.params.product_chat_id;
                body = req.body;
                product_id = body.product_id, offer_product_id = body.offer_product_id, sender_id = body.sender_id, receiver_id = body.receiver_id;
                return [4 /*yield*/, findOne(product_chat_id)];
            case 1:
                chat = _a.sent();
                //--> Products validations
                return [4 /*yield*/, product_service_1.default.findOnlyById(product_id)];
            case 2:
                //--> Products validations
                _a.sent();
                if (!offer_product_id) return [3 /*break*/, 4];
                return [4 /*yield*/, product_service_1.default.findOnlyById(offer_product_id)];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4: 
            //--> Users
            return [4 /*yield*/, user_service_1.default.findOne(sender_id)];
            case 5:
                //--> Users
                _a.sent();
                return [4 /*yield*/, user_service_1.default.findOne(receiver_id)];
            case 6:
                _a.sent();
                Object.assign(chat, body);
                return [4 /*yield*/, chat.save()];
            case 7:
                _a.sent();
                return [2 /*return*/, chat.reload()];
        }
    });
}); };
var create = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var body, product_id, offer_product_id, sender_id, receiver_id, chat;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                product_id = body.product_id, offer_product_id = body.offer_product_id, sender_id = body.sender_id, receiver_id = body.receiver_id;
                //--> Products validations
                return [4 /*yield*/, product_service_1.default.findOnlyById(product_id)];
            case 1:
                //--> Products validations
                _a.sent();
                if (!offer_product_id) return [3 /*break*/, 3];
                return [4 /*yield*/, product_service_1.default.findOnlyById(offer_product_id)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: 
            //--> Users
            return [4 /*yield*/, user_service_1.default.findOne(sender_id)];
            case 4:
                //--> Users
                _a.sent();
                return [4 /*yield*/, user_service_1.default.findOne(receiver_id)];
            case 5:
                _a.sent();
                return [4 /*yield*/, product_chats_model_1.ProductChats.create(body)];
            case 6:
                chat = _a.sent();
                return [2 /*return*/, chat];
        }
    });
}); };
var findLatestForTwoUsers = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, second_user_id, findMatch;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                user_id = req.user.user_id;
                second_user_id = req.params.second_user_id;
                console.log(user_id, second_user_id);
                return [4 /*yield*/, product_chats_model_1.ProductChats.findOne({
                        where: (_a = {},
                            _a[sequelize_1.Op.or] = [
                                {
                                    receiver_id: user_id,
                                    sender_id: second_user_id,
                                },
                                {
                                    receiver_id: second_user_id,
                                    sender_id: user_id,
                                },
                            ],
                            _a),
                        order: [["id", "DESC"]],
                        include: [
                            {
                                model: image_product_model_1.ImageProduct,
                                as: "product_images",
                                attributes: ["image_id", "image_path", "product_id", "idx"],
                            },
                            {
                                model: image_product_model_1.ImageProduct,
                                as: "product_offer_images",
                                attributes: ["image_id", "image_path", "product_id", "idx"],
                            },
                        ],
                    })];
            case 1:
                findMatch = _b.sent();
                if (!findMatch) {
                    throw new error_response_1.ErrorResponse("No product chat found!", http_status_1.default.NOT_FOUND);
                }
                return [2 /*return*/, findMatch];
        }
    });
}); };
var findAll = function () { return __awaiter(void 0, void 0, void 0, function () {
    var findMatchs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, product_chats_model_1.ProductChats.findAll({
                    limit: 30,
                    order: [["id", "DESC"]],
                    include: [
                        {
                            model: image_product_model_1.ImageProduct,
                            as: "product_images",
                            attributes: ["image_id", "image_path", "product_id", "idx"],
                        },
                        {
                            model: image_product_model_1.ImageProduct,
                            as: "product_offer_images",
                            attributes: ["image_id", "image_path", "product_id", "idx"],
                        },
                    ],
                })];
            case 1:
                findMatchs = _a.sent();
                return [2 /*return*/, findMatchs];
        }
    });
}); };
exports.default = {
    update: update,
    findOne: findOne,
    create: create,
    findLatestForTwoUsers: findLatestForTwoUsers,
    findAll: findAll,
};
//# sourceMappingURL=product.chats.service.js.map