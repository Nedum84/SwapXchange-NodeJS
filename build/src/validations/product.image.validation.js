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
var findOne = {
    params: joi_1.default.object().keys({
        image_id: joi_1.default.string().required(),
    }),
};
var deleteOne = {
    params: joi_1.default.object().keys({
        image_id: joi_1.default.string().required(),
    }),
};
var update = {
    params: joi_1.default.object().keys({
        image_id: joi_1.default.string().required(),
    }),
    body: joi_1.default.object()
        .keys({
        idx: joi_1.default.number().required(),
    })
        .min(1),
};
var create = {
    body: joi_1.default.object().keys({
        // image_id: Joi.string().default(0),
        product_id: joi_1.default.string().required(),
        image_path: joi_1.default.string().required(),
        idx: joi_1.default.number().default(0),
    }),
};
exports.default = {
    create: create,
    update: update,
    findAll: findAll,
    findOne: findOne,
    deleteOne: deleteOne,
};
//# sourceMappingURL=product.image.validation.js.map