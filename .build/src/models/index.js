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
var sequelize_1 = require("sequelize");
var db_config_1 = __importDefault(require("../database/config/db.config"));
var config_1 = __importDefault(require("../config/config"));
var pg_1 = __importDefault(require("pg"));
pg_1.default.defaults.parseInt8 = true; //Convert Int returned as strings to Int...
// require("pg").defaults.parseInt8 = true; //Convert Int returned as strings to Int...
// @ts-ignore
var database = db_config_1.default[config_1.default.env] || db_config_1.default.development;
var sequelize = new sequelize_1.Sequelize(database.dbname, database.username, database.password, __assign(__assign({}, database), { dialect: database.dialect }));
exports.default = sequelize;
//# sourceMappingURL=index.js.map