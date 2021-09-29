"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var findOne = {
    params: joi_1.default.object().keys({
        sub_category_id: joi_1.default.string().required(),
    }),
};
var findByCategoryId = {
    params: joi_1.default.object().keys({
        category_id: joi_1.default.string().required(),
    }),
};
var update = {
    params: joi_1.default.object().keys({
        sub_category_id: joi_1.default.string().required(),
    }),
    body: joi_1.default.object().keys({
        category_id: joi_1.default.string().required(),
        sub_category_name: joi_1.default.string().required(),
        sub_category_icon: joi_1.default.string().required(),
        idx: joi_1.default.number().default(200),
    }),
};
var create = {
    body: joi_1.default.object().keys({
        category_id: joi_1.default.string().required(),
        sub_category_name: joi_1.default.string().required(),
        sub_category_icon: joi_1.default.string(),
    }),
};
exports.default = {
    create: create,
    update: update,
    findOne: findOne,
    findByCategoryId: findByCategoryId,
};
//# sourceMappingURL=subcategory.validation.js.map