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
var coins_enum_1 = require("../enum/coins.enum");
var user_model_1 = require("../models/user.model");
var coins_service_1 = __importDefault(require("./coins.service"));
var createUser = function (body) { return __awaiter(void 0, void 0, void 0, function () {
    var uid, email, user, isEmailTaken, newUser, amount, reference, method_of_subscription, data, coin;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                uid = body.uid, email = body.email;
                return [4 /*yield*/, user_model_1.User.findOne({ where: { uid: uid } })];
            case 1:
                user = _a.sent();
                if (!user) return [3 /*break*/, 3];
                user.last_login = new Date();
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, user.reload()];
            case 3: return [4 /*yield*/, user_model_1.User.findOne({
                    where: { email: email },
                })];
            case 4:
                isEmailTaken = _a.sent();
                if (email && !!isEmailTaken) {
                    throw new error_response_1.ErrorResponse("Email already taken");
                }
                return [4 /*yield*/, user_model_1.User.create(body)];
            case 5:
                newUser = _a.sent();
                amount = coins_enum_1.AmountsEnum.H500;
                reference = newUser.uid + "-" + newUser.user_id;
                method_of_subscription = coins_enum_1.MethodOfSub.REGISTRATION;
                data = {
                    amount: amount,
                    reference: reference,
                    method_of_subscription: method_of_subscription,
                    user_id: newUser.user_id,
                };
                return [4 /*yield*/, coins_service_1.default.create(data)];
            case 6:
                coin = _a.sent();
                return [2 /*return*/, newUser];
        }
    });
}); };
var findMe = function (user_id) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.User.findOne({ where: { user_id: user_id } })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new error_response_1.ErrorResponse("Detail not found");
                }
                return [2 /*return*/, user];
        }
    });
}); };
var findOne = function (user_id) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, user_model_1.User.findOne({ where: { user_id: user_id } })];
            case 1:
                user = _a.sent();
                if (!user) {
                    throw new error_response_1.ErrorResponse("user not found", http_status_1.default.NOT_FOUND);
                }
                return [2 /*return*/, user];
        }
    });
}); };
var updateUser = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, body, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.user.user_id;
                body = req.body;
                return [4 /*yield*/, findOne(user_id)];
            case 1:
                user = _a.sent();
                Object.assign(user, body);
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, user.reload()];
        }
    });
}); };
var updateUserAddress = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var user_id, body, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user_id = req.user.user_id;
                body = req.body;
                return [4 /*yield*/, findOne(user_id)];
            case 1:
                user = _a.sent();
                Object.assign(user, body);
                return [4 /*yield*/, user.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, user.reload()];
        }
    });
}); };
exports.default = {
    createUser: createUser,
    findMe: findMe,
    findOne: findOne,
    updateUser: updateUser,
    updateUserAddress: updateUserAddress,
};
//# sourceMappingURL=user.service.js.map