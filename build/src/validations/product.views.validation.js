"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var findAll = {
    params: joi_1.default.object().keys({
        product_id: joi_1.default.string().required(),
    }),
};
var create = {
    body: joi_1.default.object().keys({
        product_id: joi_1.default.string().required(),
    }),
};
exports.default = {
    create: create,
    findAll: findAll,
};
//# sourceMappingURL=product.views.validation.js.map