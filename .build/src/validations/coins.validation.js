"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var coins_enum_1 = require("../enum/coins.enum");
var findAllByUserId = {
    params: joi_1.default.object().keys({
        user_id: joi_1.default.string().required(),
    }),
};
var create = {
    body: joi_1.default.object().keys({
        amount: joi_1.default.number().required(),
        reference: joi_1.default.string().required(),
        method_of_subscription: (_a = joi_1.default.string()).valid.apply(_a, Object.values(coins_enum_1.MethodOfSub)),
    }),
};
var createForUser = {
    params: joi_1.default.object().keys({
        user_id: joi_1.default.string().required(),
    }),
    body: joi_1.default.object().keys({
        amount: joi_1.default.number().required(),
        reference: joi_1.default.string().required(),
        method_of_subscription: (_b = joi_1.default.string()).valid.apply(_b, Object.values(coins_enum_1.MethodOfSub)),
    }),
};
exports.default = {
    create: create,
    findAllByUserId: findAllByUserId,
    createForUser: createForUser,
};
//# sourceMappingURL=coins.validation.js.map