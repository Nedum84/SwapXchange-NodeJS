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
var moment_1 = __importDefault(require("moment"));
var sequelize_1 = require("sequelize");
var sequelize_2 = require("sequelize");
var error_response_1 = require("../apiresponse/error.response");
var coins_enum_1 = require("../enum/coins.enum");
var coins_model_1 = require("../models/coins.model");
var product_model_1 = require("../models/product.model");
var constants_1 = __importDefault(require("../utils/constants"));
var request_1 = require("../utils/request");
var user_service_1 = __importDefault(require("./user.service"));
var findAllByUserId = function (user_id) { return __awaiter(void 0, void 0, void 0, function () {
    var user, coins;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, user_service_1.default.findOne(user_id)];
            case 1:
                user = _b.sent();
                return [4 /*yield*/, coins_model_1.Coins.findAll({
                        where: (_a = {},
                            _a[sequelize_2.Op.or] = [{ user_id: user.user_id }, { reference: user.user_id }],
                            _a),
                        limit: 500,
                        order: [["id", "DESC"]],
                    })];
            case 2:
                coins = _b.sent();
                return [2 /*return*/, coins];
        }
    });
}); };
var create = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var amount, reference, method_of_subscription, user_id, checkRef, allowedMethods, checkBonus, verifyRef, checkReward, amounts, purchaseAmounts, coinsAmount, coin;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                amount = data.amount, reference = data.reference, method_of_subscription = data.method_of_subscription, user_id = data.user_id;
                return [4 /*yield*/, coins_model_1.Coins.findOne({ where: { reference: reference } })];
            case 1:
                checkRef = _b.sent();
                if (checkRef) {
                    throw new error_response_1.ErrorResponse("Duplicate transaction ref not allowed");
                }
                allowedMethods = [
                    coins_enum_1.MethodOfSub.REGISTRATION,
                    coins_enum_1.MethodOfSub.PURCHASE,
                    coins_enum_1.MethodOfSub.DAILY_OPENING,
                ];
                if (!allowedMethods.includes(method_of_subscription)) {
                    throw new error_response_1.ErrorResponse("Method of subscription not allowed currently");
                }
                if (!(method_of_subscription === coins_enum_1.MethodOfSub.REGISTRATION)) return [3 /*break*/, 3];
                return [4 /*yield*/, coins_model_1.Coins.findOne({
                        where: { user_id: user_id, method_of_subscription: method_of_subscription },
                    })];
            case 2:
                checkBonus = _b.sent();
                if (checkBonus) {
                    throw new error_response_1.ErrorResponse("User already claimed registration bonus");
                }
                _b.label = 3;
            case 3:
                if (!(method_of_subscription === coins_enum_1.MethodOfSub.PURCHASE)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, request_1.verifyReference)(reference)];
            case 4:
                verifyRef = _b.sent();
                if (!verifyRef) {
                    throw new error_response_1.ErrorResponse("Invalid reference");
                }
                _b.label = 5;
            case 5:
                if (!(method_of_subscription === coins_enum_1.MethodOfSub.DAILY_OPENING)) return [3 /*break*/, 7];
                return [4 /*yield*/, coins_model_1.Coins.findOne({
                        where: {
                            user_id: user_id,
                            method_of_subscription: method_of_subscription,
                            createdAt: (_a = {},
                                _a[sequelize_2.Op.gte] = (0, moment_1.default)().startOf("day").toDate(),
                                _a),
                        },
                    })];
            case 6:
                checkReward = _b.sent();
                if (checkReward) {
                    throw new error_response_1.ErrorResponse("You can't receive daily coins twice per daily. try again tomorrow");
                }
                _b.label = 7;
            case 7:
                amounts = Object.values(coins_enum_1.AmountsEnum);
                if (method_of_subscription === coins_enum_1.MethodOfSub.PURCHASE) {
                    if (!amounts.includes(amount)) {
                        throw new error_response_1.ErrorResponse("Invalid amount for this reference::1");
                    }
                    purchaseAmounts = reference.split("_");
                    if (purchaseAmounts.length < 3) {
                        throw new error_response_1.ErrorResponse("Invalid reference number");
                    }
                    coinsAmount = parseInt(purchaseAmounts[1]);
                    if (coinsAmount !== amount) {
                        throw new error_response_1.ErrorResponse("Invalid amount for this reference::2");
                    }
                }
                coin = coins_model_1.Coins.create({
                    user_id: user_id,
                    amount: amount,
                    reference: reference,
                    method_of_subscription: method_of_subscription,
                });
                return [2 /*return*/, coin];
        }
    });
}); };
var createForUser = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var user_level, user_id, user, coin;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_level = req.user.user_level;
                user_id = req.params.user_id;
                if (!user_level || user_level == 1) {
                    throw new error_response_1.ErrorResponse("Access denied", http_status_1.default.UNAUTHORIZED);
                }
                return [4 /*yield*/, user_service_1.default.findOne(user_id)];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, create(__assign({ user_id: user.user_id }, req.body))];
            case 2:
                coin = _a.sent();
                return [2 /*return*/, coin];
        }
    });
}); };
var getBalance = function (user_id) { return __awaiter(void 0, void 0, void 0, function () {
    var userCoins, userTotalCoins, uploadAmount, totalUploadAmount, transfers, totalTransfers, last_credit, balance;
    var _a, _b, _c, _d, _e, _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0: return [4 /*yield*/, coins_model_1.Coins.findAll({
                    where: { user_id: user_id },
                    attributes: [[sequelize_1.Sequelize.fn("sum", sequelize_1.Sequelize.col("amount")), "total_coins"]],
                    raw: true,
                })];
            case 1:
                userCoins = _g.sent();
                userTotalCoins = parseInt((_b = (_a = userCoins[0]) === null || _a === void 0 ? void 0 : _a.total_coins) !== null && _b !== void 0 ? _b : 0);
                return [4 /*yield*/, product_model_1.Product.findAll({
                        where: { user_id: user_id },
                        attributes: [
                            [
                                sequelize_1.Sequelize.fn("sum", sequelize_1.Sequelize.col("upload_price")),
                                "total_upload_amount",
                            ],
                        ],
                        raw: true,
                    })];
            case 2:
                uploadAmount = _g.sent();
                totalUploadAmount = parseInt((_d = (_c = uploadAmount[0]) === null || _c === void 0 ? void 0 : _c.total_upload_amount) !== null && _d !== void 0 ? _d : 0);
                return [4 /*yield*/, coins_model_1.Coins.findAll({
                        where: { reference: user_id },
                        attributes: [
                            [sequelize_1.Sequelize.fn("sum", sequelize_1.Sequelize.col("amount")), "total_transfers"],
                        ],
                        raw: true,
                    })];
            case 3:
                transfers = _g.sent();
                totalTransfers = parseInt((_f = (_e = transfers[0]) === null || _e === void 0 ? void 0 : _e.total_transfers) !== null && _f !== void 0 ? _f : 0);
                return [4 /*yield*/, coins_model_1.Coins.findOne({
                        where: { user_id: user_id },
                        limit: 1,
                        order: [["id", "DESC"]],
                    })];
            case 4:
                last_credit = _g.sent();
                //@ts-ignore
                last_credit === null || last_credit === void 0 ? void 0 : last_credit.current_time = constants_1.default.NOW;
                balance = userTotalCoins - totalUploadAmount - totalTransfers;
                return [2 /*return*/, {
                        total_coins: userTotalCoins,
                        total_upload_amount: totalUploadAmount,
                        total_transfers: totalTransfers,
                        balance: balance,
                        last_credit: last_credit,
                    }];
        }
    });
}); };
exports.default = {
    findAllByUserId: findAllByUserId,
    create: create,
    createForUser: createForUser,
    getBalance: getBalance,
};
//# sourceMappingURL=coins.service.js.map