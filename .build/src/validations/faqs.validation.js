"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var findOne = {
    params: joi_1.default.object().keys({
        faq_id: joi_1.default.string().required(),
    }),
};
var update = {
    params: joi_1.default.object().keys({
        faq_id: joi_1.default.string().required(),
    }),
    body: joi_1.default.object().keys({
        question: joi_1.default.string().required(),
        answer: joi_1.default.string().required(),
    }),
};
var create = {
    body: joi_1.default.object().keys({
        question: joi_1.default.string().required(),
        answer: joi_1.default.string().required(),
    }),
};
exports.default = {
    create: create,
    update: update,
    findOne: findOne,
};
//# sourceMappingURL=faqs.validation.js.map