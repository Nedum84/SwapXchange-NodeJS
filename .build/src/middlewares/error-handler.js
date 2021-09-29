"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
var http_status_1 = __importDefault(require("http-status"));
var custom_error_1 = require("../apiresponse/custom-error");
var errorHandler = function (err, req, res, next) {
    var _a, _b;
    if (err instanceof custom_error_1.CustomError) {
        return res
            .status(err.statusCode)
            .send({ status: err.statusCode, success: false, message: err.message });
    }
    var status = http_status_1.default.BAD_REQUEST;
    console.error(err);
    res.status(status).send({
        status: status,
        success: false,
        message: (_a = err.message) !== null && _a !== void 0 ? _a : "Something went wrong.",
        stack: (_b = err.stack) !== null && _b !== void 0 ? _b : "",
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map