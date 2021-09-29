"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var feedback_enum_1 = require("../enum/feedback.enum");
var custom_validation_1 = require("./custom.validation");
var findOne = {
    params: joi_1.default.object().keys({
        feedback_id: joi_1.default.string().required(),
    }),
};
var findAll = {
    query: joi_1.default.object().keys(__assign({ status: (_a = joi_1.default.string()
            .default("all"))
            .valid.apply(_a, __spreadArray(["all"], Object.values(feedback_enum_1.FeedbackStatus), false)) }, custom_validation_1.paginateDefault)),
};
var update = {
    params: joi_1.default.object().keys({
        feedback_id: joi_1.default.string().required(),
    }),
    body: joi_1.default.object().keys({
        status: (_b = joi_1.default.string()
            .required())
            .valid.apply(_b, Object.values(feedback_enum_1.FeedbackStatus)),
    }),
};
var create = {
    body: joi_1.default.object().keys({
        message: joi_1.default.string().required(),
    }),
};
exports.default = {
    create: create,
    update: update,
    findOne: findOne,
    findAll: findAll,
};
//# sourceMappingURL=feedback.validation.js.map