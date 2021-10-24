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
exports.UserFactory = void 0;
var sequelize_1 = require("sequelize");
var sequelize_2 = require("sequelize");
var user_enum_1 = require("../enum/user.enum");
var constants_1 = __importDefault(require("../utils/constants"));
function UserFactory(sequelize) {
    var _this = this;
    var User = sequelize.define("User", {
        id: {
            type: sequelize_2.DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: sequelize_2.DataTypes.STRING,
            defaultValue: constants_1.default.UUID,
            primaryKey: true,
            comment: "Users Id",
        },
        uid: {
            type: sequelize_2.DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        name: sequelize_2.DataTypes.STRING,
        mobile_number: sequelize_2.DataTypes.STRING,
        email: {
            type: sequelize_2.DataTypes.STRING,
            unique: true,
        },
        radius: sequelize_2.DataTypes.INTEGER,
        address: sequelize_2.DataTypes.STRING,
        address_lat: sequelize_2.DataTypes.FLOAT,
        address_long: sequelize_2.DataTypes.FLOAT,
        state: sequelize_2.DataTypes.STRING,
        profile_photo: sequelize_2.DataTypes.STRING,
        device_token: sequelize_2.DataTypes.STRING,
        notification: {
            type: sequelize_2.DataTypes.JSONB,
            defaultValue: {
                general: true,
                call: true,
                chat: true,
                product: true,
            },
        },
        user_level: sequelize_2.DataTypes.INTEGER,
        online_status: {
            type: sequelize_2.DataTypes.ENUM,
            values: Object.values(user_enum_1.OnlineStatus),
            defaultValue: user_enum_1.OnlineStatus.ONLINE,
        },
        user_app_version: sequelize_2.DataTypes.INTEGER,
        base_currency: {
            type: sequelize_2.DataTypes.ENUM,
            values: Object.values(user_enum_1.BaseCurrency),
            defaultValue: user_enum_1.BaseCurrency.NGN,
        },
        last_login: {
            type: sequelize_2.DataTypes.DATE,
            defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        suspended: {
            type: sequelize_2.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        suspended_at: {
            type: sequelize_2.DataTypes.DATE,
            defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        un_suspended_at: {
            type: sequelize_2.DataTypes.DATE,
            defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP"),
        },
        ip_ban: {
            type: sequelize_2.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        is_verified: {
            type: sequelize_2.DataTypes.BOOLEAN,
            defaultValue: false,
        },
        version: {
            type: sequelize_2.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    }, {
        timestamps: true,
        tableName: "User",
        version: true,
        freezeTableName: true,
        hooks: {
            beforeCreate: function (user) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/];
                });
            }); },
        },
    });
    User.prototype.toJSON = function () {
        var values = __assign({}, this.get());
        var exclude = ["version", "id"];
        exclude.forEach(function (e) { return delete values[e]; });
        return values;
    };
    return User;
}
exports.UserFactory = UserFactory;
//# sourceMappingURL=user.model.js.map