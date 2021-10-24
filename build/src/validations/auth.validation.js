"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var custom_validation_1 = require("./custom.validation");
var joi_1 = __importDefault(require("joi"));
var user_enum_1 = require("../enum/user.enum");
var register = {
    body: joi_1.default.object()
        .keys({
        uid: joi_1.default.string().required(),
        name: joi_1.default.string().custom(custom_validation_1.name),
        // mobile_number: Joi.string().custom(phone),
        mobile_number: joi_1.default.string(),
        email: joi_1.default.string().custom(custom_validation_1.email),
        radius: joi_1.default.number().default(user_enum_1.UserRadius.MILE_200),
        address: joi_1.default.string(),
        address_lat: joi_1.default.number(),
        address_long: joi_1.default.number(),
        state: joi_1.default.string(),
        profile_photo: joi_1.default.string(),
        device_token: joi_1.default.string(),
        notification: joi_1.default.object().keys({
            general: joi_1.default.boolean().default(true),
            call: joi_1.default.boolean().default(true),
            chat: joi_1.default.boolean().default(true),
            product: joi_1.default.boolean().default(true),
        }),
        user_level: joi_1.default.number().default(1),
    })
        .min(3),
};
var refreshToken = {
    body: joi_1.default.object().keys({
        refresh_token: joi_1.default.string().required(),
    }),
};
exports.default = {
    register: register,
    refreshToken: refreshToken,
};
//# sourceMappingURL=auth.validation.js.map