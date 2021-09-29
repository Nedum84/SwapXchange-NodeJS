"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var user_enum_1 = require("../enum/user.enum");
var custom_validation_1 = require("./custom.validation");
var updateUser = {
    body: joi_1.default.object()
        .keys({
        uid: joi_1.default.string(),
        name: joi_1.default.string().custom(custom_validation_1.name),
        mobile_number: joi_1.default.string().custom(custom_validation_1.phone),
        email: joi_1.default.string().custom(custom_validation_1.email),
        radius: (_a = joi_1.default.number()).valid.apply(_a, Object.values(user_enum_1.UserRadius)),
        address: joi_1.default.string(),
        address_lat: joi_1.default.number(),
        address_long: joi_1.default.number(),
        state: joi_1.default.string(),
        profile_photo: joi_1.default.string(),
        device_token: joi_1.default.string(),
        notification: joi_1.default.object().keys({
            general: joi_1.default.boolean(),
            call: joi_1.default.boolean(),
            chat: joi_1.default.boolean(),
            product: joi_1.default.boolean(),
        }),
        user_level: joi_1.default.number(),
        // online_status: Joi.string().valid('away','offline',"online"),
        online_status: (_b = joi_1.default.string()).valid.apply(_b, Object.values(user_enum_1.OnlineStatus)),
        user_app_version: joi_1.default.number(),
        base_currency: (_c = joi_1.default.string()).valid.apply(_c, Object.values(user_enum_1.BaseCurrency)),
        last_login: joi_1.default.date(),
        suspended: joi_1.default.boolean(),
        suspended_at: joi_1.default.date(),
        un_suspended_at: joi_1.default.date(),
        ip_ban: joi_1.default.boolean(),
    })
        .min(1),
};
var updateAddress = {
    body: joi_1.default.object()
        .keys({
        address: joi_1.default.string().required(),
        address_lat: joi_1.default.number().required(),
        address_long: joi_1.default.number().required(),
        state: joi_1.default.string(),
    })
        .min(3),
};
//by user_id or email
var getUser = {
    params: joi_1.default.object().keys({
        user_id: joi_1.default.string().required(),
    }),
};
exports.default = {
    getUser: getUser,
    updateUser: updateUser,
    updateAddress: updateAddress,
};
//# sourceMappingURL=user.validation.js.map