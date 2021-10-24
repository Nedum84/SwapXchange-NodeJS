"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = __importDefault(require("winston"));
var config_1 = __importDefault(require("./config"));
var enumerateErrorFormat = winston_1.default.format(function (info) {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});
var logger = winston_1.default.createLogger({
    level: config_1.default.env === 'development' ? 'debug' : 'info',
    format: winston_1.default.format.combine(enumerateErrorFormat(), config_1.default.env === 'development' ? winston_1.default.format.colorize() : winston_1.default.format.uncolorize(), winston_1.default.format.splat(), winston_1.default.format.printf(function (_a) {
        var level = _a.level, message = _a.message;
        return level + ": " + message;
    })),
    transports: [
        new winston_1.default.transports.Console({
            stderrLevels: ['error'],
        }),
    ],
});
exports.default = logger;
//# sourceMappingURL=logger.js.map