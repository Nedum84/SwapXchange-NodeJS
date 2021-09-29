"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var product_chats_enum_1 = require("../enum/product.chats.enum");
var findOne = {
    params: joi_1.default.object().keys({
        product_chat_id: joi_1.default.string().required(),
    }),
};
var findLatestForTwoUsers = {
    params: joi_1.default.object().keys({
        second_user_id: joi_1.default.string().required(),
    }),
};
var update = {
    params: joi_1.default.object().keys({
        product_chat_id: joi_1.default.string().required(),
    }),
    body: joi_1.default.object()
        .keys({
        product_id: joi_1.default.string(),
        offer_product_id: joi_1.default.string(),
        sender_id: joi_1.default.string(),
        receiver_id: joi_1.default.string(),
        sender_closed_deal: joi_1.default.boolean(),
        receiver_closed_deal: joi_1.default.boolean(),
        chat_status: (_a = joi_1.default.string()).valid.apply(_a, Object.values(product_chats_enum_1.ChatStatus)),
    })
        .min(1),
};
var create = {
    body: joi_1.default.object().keys({
        product_id: joi_1.default.string().required(),
        offer_product_id: joi_1.default.string(),
        sender_id: joi_1.default.string(),
        receiver_id: joi_1.default.string(),
        sender_closed_deal: joi_1.default.boolean(),
        receiver_closed_deal: joi_1.default.boolean(),
        chat_status: (_b = joi_1.default.string())
            .valid.apply(_b, Object.values(product_chats_enum_1.ChatStatus)).default(product_chats_enum_1.ChatStatus.OPEN),
    }),
};
exports.default = {
    create: create,
    update: update,
    findOne: findOne,
    findLatestForTwoUsers: findLatestForTwoUsers,
};
//# sourceMappingURL=product.chats.validation.js.map