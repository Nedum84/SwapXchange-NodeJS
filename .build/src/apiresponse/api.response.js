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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_1 = __importDefault(require("http-status"));
var ApiResponse = /** @class */ (function () {
    function ApiResponse() {
    }
    ApiResponse.response = function (res, statusCode, payload, message, extra) {
        if (extra === void 0) { extra = {}; }
        var success = statusCode === http_status_1.default.OK || statusCode === http_status_1.default.CREATED
            ? true
            : false;
        res.status(statusCode).send(__assign({ status: statusCode, success: success, message: message, data: payload }, extra));
    };
    ApiResponse.ok = function (res, payload, message) {
        var msg = message !== null && message !== void 0 ? message : "success";
        var status = http_status_1.default.OK;
        return ApiResponse.response(res, status, payload, msg);
    };
    ApiResponse.created = function (res, payload, message) {
        var msg = message !== null && message !== void 0 ? message : "success";
        var status = http_status_1.default.CREATED;
        return ApiResponse.response(res, status, payload, msg);
    };
    ApiResponse.customError = function (res, statusCode, message, stack) {
        if (message === void 0) { message = "Error occured"; }
        var status = statusCode !== null && statusCode !== void 0 ? statusCode : http_status_1.default.BAD_REQUEST;
        return ApiResponse.response(res, status, "", message, stack);
    };
    return ApiResponse;
}());
exports.default = ApiResponse;
//# sourceMappingURL=api.response.js.map