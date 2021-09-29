"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = exports.email = exports.phone = exports.password = exports.paginateDefault = void 0;
var joi_1 = __importDefault(require("joi"));
var password = function (value, helpers) {
    if (value.length < 6) {
        return helpers.message("password must be at least 6 characters");
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
        return helpers.message("password must contain at least 1 letter and 1 number");
    }
    return value;
};
exports.password = password;
var email = function (value, helpers) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!value.match(emailRex)) {
        return helpers.message("Invalid email address");
    }
    return value;
};
exports.email = email;
var phone = function (value, helpers) {
    if (value.length < 11 || value.length > 11) {
        return helpers.message("Phone must be 11 characters");
    }
    if (!value.match(/[789][01][0-9]{8}$/)) {
        return helpers.message("password must contain at least 1 letter and 1 number");
    }
    return value;
};
exports.phone = phone;
var name = function (value, helpers) {
    if (value.split(" ").length < 2) {
        return helpers.message("Full name required");
    }
    return value;
};
exports.name = name;
exports.paginateDefault = {
    limit: joi_1.default.number().default(10),
    offset: joi_1.default.number().default(0),
};
//# sourceMappingURL=custom.validation.js.map