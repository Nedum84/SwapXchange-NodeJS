"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var create = {
    body: joi_1.default.object().keys({
        uid: joi_1.default.string().required(),
        channel_name: joi_1.default.string().required(),
    }),
};
exports.default = {
    create: create,
};
//# sourceMappingURL=agora.validation.js.map