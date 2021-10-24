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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.registerDev = exports.register = void 0;
var child_process_1 = require("child_process");
var models_1 = __importDefault(require("../models"));
var post_migration_1 = __importDefault(require("../database/post-migration"));
require("dotenv").config();
var execCommand = function (cmd, callback, throwError) {
    if (callback === void 0) { callback = null; }
    if (throwError === void 0) { throwError = true; }
    console.log("Executing \"" + cmd + "\"");
    console.log(" ");
    return new Promise(function (resolve, reject) {
        (0, child_process_1.exec)(cmd, function (error, stdout, stderr) { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!callback) return [3 /*break*/, 2];
                        return [4 /*yield*/, callback(error, stdout, stderr)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (error && throwError) {
                            reject(error);
                        }
                        else {
                            resolve(stdout || stderr || error);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    });
};
// const s_cli = _resolve(__dirname, '../../node_modules/sequelize-cli/lib/sequelize');
var s_cli = "npx run";
var dropDB = function () { return execCommand(s_cli + " db:drop"); };
var dbCreate = function () { return execCommand(s_cli + " db:create", null, false); };
var dbMigrate = function (args, callback) {
    return execCommand(s_cli + " db:migrate", function (error, stdout, stderr) {
        if (error || stderr)
            return callback(error, stdout, stderr);
        // seed real data
        console.log("Running post migration script...");
        return (0, post_migration_1.default)()
            .then(function () {
            callback(error, stdout, stderr);
        })
            .catch(function (err) { return console.error(err); });
    });
};
var dbSeedAll = function () { return execCommand(s_cli + " db:seed:all"); };
var dbSync = function () { return models_1.default.sync({ force: true }); };
var bash = function (args) {
    return args.cmd
        ? execCommand("" + args.cmd)
        : console.log("cmd parameter is required");
};
var handler = function (event, context, callback) {
    return __awaiter(this, void 0, void 0, function () {
        var command, env, handle, all, res, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("Arguments: ", event);
                    command = typeof event === "string" ? event : event.fn;
                    console.log("Running \"" + command + "\" in " + process.env.NODE_ENV + " mode.");
                    env = process.env.NODE_ENV;
                    if (["development", "staging", "test"].includes(env)) {
                        all = __assign(__assign({}, register), registerDev);
                        handle = all[command];
                    }
                    else {
                        //@ts-ignore
                        handle = register[command];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    res = "";
                    if (!handle) return [3 /*break*/, 3];
                    return [4 /*yield*/, handle(event, callback, context)];
                case 2:
                    res = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    console.log("Command " + command + " not found in environment " + env);
                    _a.label = 4;
                case 4:
                    callback(null, res);
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    callback(e_1);
                    process.exit(1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
};
exports.handler = handler;
var register = {
    "db:migrate": dbMigrate,
    "db:create": dbCreate,
};
exports.register = register;
var registerDev = {
    "db:drop": dropDB,
    "db:seed:all": dbSeedAll,
    "db:sync": dbSync,
    bash: bash,
};
exports.registerDev = registerDev;
//# sourceMappingURL=cli.service.js.map