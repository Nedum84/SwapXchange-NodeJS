"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var morgan_1 = __importDefault(require("morgan"));
var config_1 = __importDefault(require("./config"));
var logger_1 = __importDefault(require("./logger"));
morgan_1.default.token("message", function (req, res) { return res.locals.errorMessage || ""; });
var getIpFormat = function () {
    return config_1.default.env === "production" ? ":remote-addr - " : "";
};
var successResponseFormat = getIpFormat() + ":method :url :status - :response-time ms";
var errorResponseFormat = getIpFormat() + ":method :url :status - :response-time ms - message: :message";
var successHandler = (0, morgan_1.default)(successResponseFormat, {
    skip: function (req, res) { return res.statusCode >= 400; },
    stream: { write: function (message) { return logger_1.default.info(message.trim()); } },
});
var errorHandler = (0, morgan_1.default)(errorResponseFormat, {
    skip: function (req, res) { return res.statusCode < 400; },
    stream: { write: function (message) { return logger_1.default.error(message.trim()); } },
});
module.exports = {
    successHandler: successHandler,
    errorHandler: errorHandler,
};
//# sourceMappingURL=morgan.js.map