"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var findOne = {
    params: joi_1.default.object().keys({
        category_id: joi_1.default.string().required(),
    }),
};
var update = {
    params: joi_1.default.object().keys({
        category_id: joi_1.default.string().required(),
    }),
    body: joi_1.default.object().keys({
        category_name: joi_1.default.string().required(),
        category_icon: joi_1.default.string().required(),
        // idx: Joi.string().default(200),
    }),
};
var create = {
    body: joi_1.default.object().keys({
        category_name: joi_1.default.string().required(),
        category_icon: joi_1.default.string().required(),
    }),
};
exports.default = {
    create: create,
    update: update,
    findOne: findOne,
};
//# sourceMappingURL=category.validation.js.map