"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = __importDefault(require("../../config/config"));
exports.default = {
    development: {
        dbname: config_1.default.DB_NAME,
        username: config_1.default.DB_USERNAME,
        password: config_1.default.DB_PASSWORD,
        host: config_1.default.DB_HOST,
        dialect: "postgres",
        port: Number(config_1.default.DB_PORT) || 5432,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
    test: {
        dbname: config_1.default.DB_TEST_NAME,
        username: config_1.default.DB_USERNAME,
        password: config_1.default.DB_PASSWORD,
        host: config_1.default.DB_HOST,
        dialect: "postgres",
        logging: false,
        port: Number(config_1.default.DB_PORT) || 5432,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
    production: {
        dbname: config_1.default.DB_NAME,
        username: config_1.default.DB_USERNAME,
        password: config_1.default.DB_PASSWORD,
        host: config_1.default.DB_HOST,
        dialect: "postgres",
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    },
};
//# sourceMappingURL=db.config.js.map