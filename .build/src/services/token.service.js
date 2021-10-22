"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var config_1 = __importDefault(require("../config/config"));
var moment_1 = __importDefault(require("moment"));
var http_status_1 = __importDefault(require("http-status"));
var error_response_1 = require("../apiresponse/error.response");
var user_service_1 = __importDefault(require("./user.service"));
var token_enum_1 = require("../enum/token.enum");
var models_1 = require("../models");
/**
 * Generate token
 * @param {Object} data
 * @param {Moment} expires
 * @returns {string}
 */
var generateToken = function (data, expires, tokenType, secret) {
    if (secret === void 0) { secret = config_1.default.jwt.secret; }
    var payload = {
        user: data,
        iat: (0, moment_1.default)().unix(),
        exp: expires.unix(),
        type: tokenType,
    };
    return jsonwebtoken_1.default.sign(payload, secret);
};
/**
 * Save a token
 * @param {string} token
 * @param {int} user_id
 * @param {string} uuid
 * @param {Moment} expires
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
var saveToken = function (token, user_id, expires, tokenType) { return __awaiter(void 0, void 0, void 0, function () {
    var tk, tokenDoc;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, models_1.Token.findOne({
                    where: { user_id: user_id, type: tokenType },
                })];
            case 1:
                tk = _a.sent();
                if (!tk) return [3 /*break*/, 4];
                tk.token = token;
                tk.expires = expires.toDate();
                // tk.blacklisted = blacklisted ?? false;
                return [4 /*yield*/, tk.save()];
            case 2:
                // tk.blacklisted = blacklisted ?? false;
                _a.sent();
                return [4 /*yield*/, tk.reload()];
            case 3:
                _a.sent();
                return [2 /*return*/, tk];
            case 4: return [4 /*yield*/, models_1.Token.create({
                    token: token,
                    user_id: user_id,
                    expires: expires.toDate(),
                    type: tokenType,
                })];
            case 5:
                tokenDoc = _a.sent();
                return [2 /*return*/, tokenDoc];
        }
    });
}); };
/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} secret
 * @returns {Promise<Token>}
 */
var verifyToken = function (token, tokenType) { return __awaiter(void 0, void 0, void 0, function () {
    var payload, tokenDoc;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                payload = jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret);
                if (payload == null) {
                    throw new error_response_1.ErrorResponse("Invalid or Expired token");
                }
                return [4 /*yield*/, models_1.Token.findOne({
                        where: {
                            token: token,
                            type: tokenType,
                            user_id: payload.user.user_id,
                        },
                    })];
            case 1:
                tokenDoc = _a.sent();
                if (!tokenDoc) {
                    throw new error_response_1.ErrorResponse("Token not found", http_status_1.default.NOT_FOUND);
                }
                return [2 /*return*/, tokenDoc];
        }
    });
}); };
/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
var generateAuthTokens = function (user) { return __awaiter(void 0, void 0, void 0, function () {
    var accessTokenExpires, accessToken, refreshTokenExpires, refreshToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                accessTokenExpires = (0, moment_1.default)().add(config_1.default.jwt.accessExpirationMinutes, 
                // 900000000,
                "minutes");
                accessToken = generateToken({ user_id: user.user_id, user_level: user.user_level }, accessTokenExpires, token_enum_1.TokenTypes.ACCESS);
                refreshTokenExpires = (0, moment_1.default)().add(config_1.default.jwt.refreshExpirationDays, "days");
                refreshToken = generateToken({ user_id: user.user_id, user_level: user.user_level }, refreshTokenExpires, token_enum_1.TokenTypes.REFRESH);
                return [4 /*yield*/, saveToken(refreshToken, user.user_id, refreshTokenExpires, token_enum_1.TokenTypes.REFRESH)];
            case 1:
                _a.sent();
                return [2 /*return*/, {
                        access: {
                            token: accessToken,
                            expires: accessTokenExpires.toDate(),
                        },
                        refresh: {
                            token: refreshToken,
                            expires: refreshTokenExpires.toDate(),
                        },
                    }];
        }
    });
}); };
var refreshToken = function (refresh_token) { return __awaiter(void 0, void 0, void 0, function () {
    var verified, user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, verifyToken(refresh_token, token_enum_1.TokenTypes.REFRESH)];
            case 1:
                verified = _a.sent();
                if (!verified) {
                    throw new error_response_1.ErrorResponse("Refresh Token not found", http_status_1.default.NOT_FOUND);
                }
                return [4 /*yield*/, user_service_1.default.findOne(verified.user_id)];
            case 2:
                user = _a.sent();
                return [2 /*return*/, generateAuthTokens(user)];
        }
    });
}); };
module.exports = {
    generateToken: generateToken,
    generateAuthTokens: generateAuthTokens,
    saveToken: saveToken,
    verifyToken: verifyToken,
    refreshToken: refreshToken,
};
//# sourceMappingURL=token.service.js.map