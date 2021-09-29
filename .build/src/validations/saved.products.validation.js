"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var custom_validation_1 = require("./custom.validation");
var removeSaved = {
    params: joi_1.default.object().keys({
        product_id: joi_1.default.string().required(),
    }),
};
var findAllForUser = {
    params: joi_1.default.object().keys(custom_validation_1.paginateDefault),
};
var checkSaved = {
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
    removeSaved: removeSaved,
    findAllForUser: findAllForUser,
    checkSaved: checkSaved,
    create: create,
};
//# sourceMappingURL=saved.products.validation.js.map