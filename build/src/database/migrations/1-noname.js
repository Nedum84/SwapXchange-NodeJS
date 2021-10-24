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
var sequelize_1 = require("sequelize");
var sequelize_2 = require("sequelize");
var coins_enum_1 = require("../../enum/coins.enum");
var feedback_enum_1 = require("../../enum/feedback.enum");
var product_chats_enum_1 = require("../../enum/product.chats.enum");
var product_enum_1 = require("../../enum/product.enum");
var reported_products_enum_1 = require("../../enum/reported.products.enum");
var token_enum_1 = require("../../enum/token.enum");
var user_enum_1 = require("../../enum/user.enum");
var constants_1 = __importDefault(require("../../utils/constants"));
/**
 * Actions summary:
 *
 * createTable "BusinessCategories", deps: []
 * createTable "ErrorQueueLogs", deps: []
 * createTable "Files", deps: []
 * createTable "Industries", deps: []
 * createTable "Merchants", deps: [Merchants, Files]
 * createTable "Accounts", deps: [Merchants]
 * createTable "Beneficiaries", deps: [Merchants]
 * createTable "DevKits", deps: [Merchants]
 * createTable "KYC", deps: [Merchants, Files, Files, BusinessCategories, Industries]
 * createTable "KycFiles", deps: [KYC, Files]
 * createTable "KYCHistory", deps: [KYC]
 * createTable "KYCPersonnel", deps: [KYC]
 * createTable "Otps", deps: [Merchants]
 * createTable "Settings", deps: [Merchants]
 * createTable "Settlements", deps: [Merchants]
 * createTable "StatusHistory", deps: [Merchants]
 * addIndex "otps_merchant_id_code" to table "Otps"
 *
 **/
var info = {
    revision: 1,
    name: "noname",
    created: "2021-09-08T11:08:52.647Z",
    comment: "",
};
// var migrationCommands:MigrationCommands[] = [
var migrationCommands = [
    {
        fn: "createTable",
        params: [
            "AppSettings",
            {
                id: {
                    type: sequelize_2.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                d_key: {
                    type: sequelize_2.DataTypes.STRING,
                },
                value: {
                    type: sequelize_2.DataTypes.TEXT,
                },
                last_updated_by: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: true,
                },
            },
            {},
        ],
    },
    {
        fn: "createTable",
        params: [
            "Category",
            {
                id: {
                    type: sequelize_2.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                category_id: {
                    type: sequelize_2.DataTypes.STRING,
                    primaryKey: true,
                    defaultValue: constants_1.default.UUID,
                    comment: "Category Id",
                },
                category_name: {
                    type: sequelize_2.DataTypes.STRING,
                },
                category_icon: {
                    type: sequelize_2.DataTypes.STRING,
                },
                idx: {
                    type: sequelize_2.DataTypes.INTEGER,
                    defaultValue: 200,
                },
            },
            {},
        ],
    },
    {
        fn: "createTable",
        params: [
            "Coins",
            {
                id: {
                    type: sequelize_2.DataTypes.BIGINT,
                    autoIncrement: true,
                    primaryKey: true,
                    comment: "Coins Id",
                },
                user_id: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                amount: {
                    type: sequelize_2.DataTypes.BIGINT,
                    allowNull: false,
                },
                reference: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                method_of_subscription: {
                    type: sequelize_2.DataTypes.ENUM,
                    values: Object.values(coins_enum_1.MethodOfSub),
                    allowNull: false,
                },
                createdAt: {
                    type: sequelize_2.DataTypes.DATE,
                    allowNull: false,
                    defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP"),
                },
            },
            {},
        ],
    },
    {
        fn: "createTable",
        params: [
            "Faqs",
            {
                id: {
                    type: sequelize_2.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                faq_id: {
                    type: sequelize_2.DataTypes.STRING,
                    defaultValue: constants_1.default.UUID,
                    primaryKey: true,
                    comment: "Faqs Id",
                },
                question: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                answer: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                category: {
                    type: sequelize_2.DataTypes.STRING,
                    defaultValue: 0,
                },
                added_by: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
            },
            {},
        ],
    },
    {
        fn: "createTable",
        params: [
            "Feedback",
            {
                id: {
                    type: sequelize_2.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                feedback_id: {
                    type: sequelize_2.DataTypes.STRING,
                    defaultValue: constants_1.default.UUID,
                    primaryKey: true,
                    comment: "Feedback Id",
                },
                user_id: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                message: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                status: {
                    type: sequelize_2.DataTypes.STRING,
                    values: Object.values(feedback_enum_1.FeedbackStatus),
                    defaultValue: feedback_enum_1.FeedbackStatus.OPEN,
                },
                resolved_by: {
                    type: sequelize_2.DataTypes.STRING,
                },
            },
            {},
        ],
    },
    {
        fn: "createTable",
        params: [
            "ImageProduct",
            {
                id: {
                    type: sequelize_2.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                image_id: {
                    type: sequelize_2.DataTypes.STRING,
                    defaultValue: constants_1.default.UUID,
                    primaryKey: true,
                    comment: "ImageProduct Id",
                },
                product_id: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                image_path: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                idx: {
                    type: sequelize_2.DataTypes.INTEGER,
                    defaultValue: 200,
                },
            },
            {},
        ],
    },
    {
        fn: "createTable",
        params: [
            "ProductChats",
            {
                id: {
                    type: sequelize_2.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                product_chat_id: {
                    type: sequelize_2.DataTypes.STRING,
                    defaultValue: constants_1.default.UUID,
                    primaryKey: true,
                    comment: "ProductChats Id",
                },
                product_id: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                offer_product_id: {
                    type: sequelize_2.DataTypes.STRING,
                },
                sender_id: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                receiver_id: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                sender_closed_deal: {
                    type: sequelize_2.DataTypes.BOOLEAN,
                    defaultValue: false,
                },
                receiver_closed_deal: {
                    type: sequelize_2.DataTypes.BOOLEAN,
                    defaultValue: false,
                },
                chat_status: {
                    type: sequelize_2.DataTypes.ENUM,
                    values: Object.values(product_chats_enum_1.ChatStatus),
                    defaultValue: product_chats_enum_1.ChatStatus.OPEN,
                },
            },
            {},
        ],
    },
    {
        fn: "createTable",
        params: [
            "Product",
            {
                id: {
                    type: sequelize_2.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                product_id: {
                    type: sequelize_2.DataTypes.STRING,
                    defaultValue: constants_1.default.UUID,
                    primaryKey: true,
                    comment: "Product Id",
                },
                order_id: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                product_name: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                category: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                sub_category: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                price: {
                    type: sequelize_2.DataTypes.INTEGER,
                    allowNull: false,
                },
                product_description: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                product_suggestion: {
                    type: sequelize_2.DataTypes.ARRAY(sequelize_2.DataTypes.STRING),
                    allowNull: false,
                },
                product_condition: {
                    type: sequelize_2.DataTypes.ENUM,
                    values: Object.values(product_enum_1.ProductCondition),
                    defaultValue: product_enum_1.ProductCondition.FAIRLY_USED,
                },
                product_status: {
                    type: sequelize_2.DataTypes.ENUM,
                    values: Object.values(product_enum_1.ProductStatus),
                    defaultValue: product_enum_1.ProductStatus.ACTIVE,
                },
                user_id: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                user_address: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                user_address_city: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                user_address_lat: {
                    type: sequelize_2.DataTypes.FLOAT,
                    allowNull: false,
                },
                user_address_long: {
                    type: sequelize_2.DataTypes.FLOAT,
                    allowNull: false,
                },
                upload_price: {
                    type: sequelize_2.DataTypes.INTEGER,
                    defaultValue: 100,
                },
            },
            {},
        ],
    },
    {
        fn: "createTable",
        params: [
            "ProductViews",
            {
                id: {
                    type: sequelize_2.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                view_id: {
                    type: sequelize_2.DataTypes.STRING,
                    defaultValue: constants_1.default.UUID,
                    primaryKey: true,
                    comment: "ProductViews Id",
                },
                user_id: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                product_id: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
            },
            {},
        ],
    },
    {
        fn: "createTable",
        params: [
            "ReportedProducts",
            {
                id: {
                    type: sequelize_2.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                reported_id: {
                    type: sequelize_2.DataTypes.STRING,
                    defaultValue: constants_1.default.UUID,
                    primaryKey: true,
                    comment: "ReportedProducts Id",
                },
                reported_by: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                product_id: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                reported_message: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                uploaded_by: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                status: {
                    type: sequelize_2.DataTypes.ENUM,
                    values: Object.values(reported_products_enum_1.ReportedProductStatus),
                    defaultValue: reported_products_enum_1.ReportedProductStatus.OPEN,
                },
                resolved_by: {
                    type: sequelize_2.DataTypes.STRING,
                },
            },
            {},
        ],
    },
    {
        fn: "createTable",
        params: [
            "SavedProducts",
            {
                id: {
                    type: sequelize_2.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    comment: "SavedProducts Id",
                },
                product_id: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                user_id: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
            },
            {},
        ],
    },
    {
        fn: "createTable",
        params: [
            "SubCategory",
            {
                id: {
                    type: sequelize_2.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                sub_category_id: {
                    type: sequelize_2.DataTypes.STRING,
                    defaultValue: constants_1.default.UUID,
                    primaryKey: true,
                    comment: "SubCategory Id",
                },
                sub_category_name: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                sub_category_icon: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                category_id: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                idx: {
                    type: sequelize_2.DataTypes.INTEGER,
                    defaultValue: 200,
                },
            },
            {},
        ],
    },
    {
        fn: "createTable",
        params: [
            "Token",
            {
                id: {
                    type: sequelize_2.DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    comment: "Token Id",
                },
                user_id: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                type: {
                    type: sequelize_2.DataTypes.STRING,
                    values: Object.values(token_enum_1.TokenTypes),
                    defaultValue: token_enum_1.TokenTypes.REFRESH,
                },
                token: {
                    type: sequelize_2.DataTypes.STRING,
                    allowNull: false,
                },
                expires: {
                    type: sequelize_2.DataTypes.DATE,
                    allowNull: false,
                },
            },
            {},
        ],
    },
    {
        fn: "createTable",
        params: [
            "User",
            {
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
            },
            {},
        ],
    },
    //   {
    //     fn: "addIndex",
    //     params: [
    //       "Otps",
    //       ["merchant_id", "code"],
    //       {
    //         indexName: "otps_merchant_id_code",
    //         name: "otps_merchant_id_code",
    //         indicesType: "UNIQUE",
    //         type: "UNIQUE",
    //       },
    //     ],
    //   },
];
var dateDefault = {
    createdAt: {
        type: sequelize_2.DATE,
        field: "createdAt",
        defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    updatedAt: {
        type: sequelize_2.DATE,
        field: "updatedAt",
        defaultValue: sequelize_1.Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
    },
    deletedAt: {
        type: sequelize_2.DATE,
        field: "deletedAt",
    },
    version: {
        type: sequelize_2.DataTypes.INTEGER,
        defaultValue: 0,
    },
};
function up(_a) {
    var queryInterface = _a.queryInterface;
    var index = 0;
    return new Promise(function (resolve, reject) {
        function next() {
            if (index < migrationCommands.length) {
                var command = migrationCommands[index];
                console.log("[#" + index + "] execute: " + command.fn);
                index++;
                //@ts-ignore
                // command.params[1] = { ...command.params[1], ...dateDefault };
                //@ts-ignore
                // queryInterface[command.fn]
                //   .apply(queryInterface, command.params)
                //   .then(next, reject);
                if (command.fn == "createTable") {
                    var params = command.params;
                    var tableName = params[0];
                    var model = params[1];
                    var options = params[2];
                    var attributes = __assign(__assign({}, model), dateDefault);
                    queryInterface
                        .createTable(tableName, attributes, options)
                        .then(next, reject);
                }
                else if (command.fn == "addIndex") {
                    var params = command.params;
                    var tableName = params[0];
                    var attributes = params[1];
                    var options = params[2];
                    queryInterface
                        .addIndex(tableName, attributes, options)
                        .then(next, reject);
                }
            }
            else
                resolve();
        }
        next();
    });
}
function down(_a) {
    var queryInterface = _a.queryInterface;
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_b) {
        return [2 /*return*/];
    }); });
}
exports.default = { up: up, down: down };
//# sourceMappingURL=1-noname.js.map