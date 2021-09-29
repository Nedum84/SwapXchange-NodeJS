"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { object, string, required, any, date } from "joi";
var joi_1 = __importDefault(require("joi"));
var findOne = {
    params: joi_1.default.object().keys({
        key: joi_1.default.string().required(),
    }),
};
var update = {
    body: joi_1.default.object().keys({
        key: joi_1.default.string().required(),
        value: joi_1.default.string().required(),
    }),
};
var addNew = {
    body: joi_1.default.object().keys({
        key: joi_1.default.string().required(),
        value: joi_1.default.string().required(),
    }),
};
exports.default = {
    addNew: addNew,
    update: update,
    findOne: findOne,
};
//# sourceMappingURL=app.settings.validation.js.map