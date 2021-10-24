"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
var jsonwebtoken_1 = require("jsonwebtoken");
var http_status_1 = require("http-status");
var moment_1 = __importDefault(require("moment"));
var config_1 = __importDefault(require("../config/config"));
var error_response_1 = require("../apiresponse/error.response");
var requireAuth = function (req, res, next) {
    var authHeader = req.headers["authorization"];
    var token = authHeader && authHeader.split(" ")[1];
    if (token == null)
        return res.sendStatus(http_status_1.UNAUTHORIZED);
    (0, jsonwebtoken_1.verify)(token, config_1.default.jwt.secret, function (err, data) {
        var _a;
        var dateNow = (0, moment_1.default)().unix();
        var exp = data === null || data === void 0 ? void 0 : data.exp;
        if (err || dateNow > exp) {
            throw new error_response_1.ErrorResponse((_a = err === null || err === void 0 ? void 0 : err.message) !== null && _a !== void 0 ? _a : "Unauthorized", http_status_1.UNAUTHORIZED, err === null || err === void 0 ? void 0 : err.stack);
        }
        req.user = data.user;
        next();
    });
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=auth.middleware.js.map