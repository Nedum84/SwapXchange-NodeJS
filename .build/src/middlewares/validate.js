"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var joi_1 = __importDefault(require("joi"));
var http_status_1 = __importDefault(require("http-status"));
var error_response_1 = require("../apiresponse/error.response");
var validate = function (schema) { return function (req, res, next) {
    var _a;
    var validSchema = pick(schema, ["params", "query", "body"]);
    var object = pick(req, Object.keys(validSchema));
    var _b = joi_1.default.compile(validSchema)
        .prefs({ errors: { label: "key" } })
        .validate(object), value = _b.value, error = _b.error;
    if (error) {
        var errorMessage = void 0;
        if (error.details.length > 0) {
            errorMessage = error.details
                .map(function (details) { return details.message; })
                .join(", ");
        }
        else {
            errorMessage = (_a = error.details) === null || _a === void 0 ? void 0 : _a[0].message;
        }
        return next(new error_response_1.ErrorResponse(errorMessage, http_status_1.default.BAD_REQUEST));
    }
    Object.assign(req, value);
    return next();
}; };
var pick = function (object, keys) {
    return keys.reduce(function (obj, key) {
        if (object && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {});
};
module.exports = validate;
//# sourceMappingURL=validate.js.map