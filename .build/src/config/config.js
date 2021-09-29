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
var joi_1 = __importDefault(require("joi"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var envVarsSchema = joi_1.default.object()
    .keys({
    NODE_ENV: joi_1.default.string().default("development"),
    REGION: joi_1.default.string().default("eu-west-2"),
    PORT: joi_1.default.number().default(8000),
    JWT_SECRET: joi_1.default.string()
        .description("JWT secret key")
        .default("jwt-token-secret"),
    JWT_ACCESS_EXPIRATION_MINUTES: joi_1.default.number()
        .default(30)
        .description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: joi_1.default.number()
        .default(90)
        .description("days after which refresh tokens expire"),
    DB_NAME: joi_1.default.string().default("db-name"),
    DB_TEST_NAME: joi_1.default.string().default("test_db"),
    DB_USERNAME: joi_1.default.string().default("postgres"),
    DB_PASSWORD: joi_1.default.string().default("1223"),
    DB_HOST: joi_1.default.string().default("localhost"),
    DB_PORT: joi_1.default.number().default(5432),
    PAYSTACK_TEST_KEY: joi_1.default.string().default("key"),
    PAYSTACK_LIVE_KEY: joi_1.default.string().default("key"),
    AGORA_APP_ID: joi_1.default.string().default("agora_app_id"),
    AGORA_APP_CERT: joi_1.default.string().default("agora_app_cert"),
})
    .unknown();
var _a = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env), envVars = _a.value, error = _a.error;
if (error) {
    throw new Error("Config validation error: " + error.message);
}
exports.default = __assign(__assign({}, process.env), { env: envVars.NODE_ENV, PORT: envVars.PORT, REGION: envVars.REGION, NODE_ENV: envVars.NODE_ENV, DB_NAME: envVars.DB_NAME, DB_TEST_NAME: envVars.DB_TEST_NAME, DB_USERNAME: envVars.DB_USERNAME, DB_PASSWORD: envVars.DB_PASSWORD, DB_HOST: envVars.DB_HOST, DB_PORT: envVars.DB_PORT, PAYSTACK_TEST_KEY: envVars.PAYSTACK_TEST_KEY, PAYSTACK_LIVE_KEY: envVars.PAYSTACK_LIVE_KEY, AGORA_APP_ID: envVars.AGORA_APP_ID, AGORA_APP_CERT: envVars.AGORA_APP_CERT, jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    } });
//# sourceMappingURL=config.js.map