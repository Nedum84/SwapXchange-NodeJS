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
var http_status_1 = __importDefault(require("http-status"));
var error_response_1 = require("../apiresponse/error.response");
var reported_products_model_1 = require("../models/reported.products.model");
var helpers_1 = __importDefault(require("../utils/helpers"));
var product_service_1 = __importDefault(require("./product.service"));
var findOne = function (reported_id) { return __awaiter(void 0, void 0, void 0, function () {
    var report;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, reported_products_model_1.ReportedProducts.findOne({ where: { reported_id: reported_id } })];
            case 1:
                report = _a.sent();
                if (!report) {
                    throw new error_response_1.ErrorResponse("Not found", http_status_1.default.NOT_FOUND);
                }
                return [2 /*return*/, report];
        }
    });
}); };
var update = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var reported_id, status, user_level, report;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                reported_id = req.params.reported_id;
                status = req.body.status;
                user_level = req.user.user_level;
                if (!user_level || user_level == 1) {
                    throw new error_response_1.ErrorResponse("Access denied", http_status_1.default.UNAUTHORIZED);
                }
                return [4 /*yield*/, findOne(reported_id)];
            case 1:
                report = _a.sent();
                report.status = status;
                return [4 /*yield*/, report.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, report.reload()];
        }
    });
}); };
var create = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, product_id, reported_message, reported_by, product, report;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, product_id = _a.product_id, reported_message = _a.reported_message;
                reported_by = req.user.user_id;
                return [4 /*yield*/, product_service_1.default.findOne(product_id)];
            case 1:
                product = _b.sent();
                return [4 /*yield*/, reported_products_model_1.ReportedProducts.create({
                        reported_by: reported_by,
                        product_id: product_id,
                        reported_message: reported_message,
                        uploaded_by: product.user_id,
                    })];
            case 2:
                report = _b.sent();
                return [2 /*return*/, report];
        }
    });
}); };
var findByProductId = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, status, product_id, product, reports;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.params, status = _a.status, product_id = _a.product_id;
                return [4 /*yield*/, product_service_1.default.findOne(product_id)];
            case 1:
                product = _b.sent();
                return [4 /*yield*/, reported_products_model_1.ReportedProducts.findAll({
                        where: {
                            status: status,
                            product_id: product.product_id,
                        },
                    })];
            case 2:
                reports = _b.sent();
                return [2 /*return*/, reports];
        }
    });
}); };
var findAll = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var paginateOptions, status, where, reports;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                paginateOptions = helpers_1.default.getPaginate(req.params);
                status = req.params.status;
                where = status === "all" ? {} : { status: status };
                return [4 /*yield*/, reported_products_model_1.ReportedProducts.findAll(__assign({ where: where, order: [["id", "DESC"]] }, paginateOptions))];
            case 1:
                reports = _a.sent();
                return [2 /*return*/, reports];
        }
    });
}); };
exports.default = {
    update: update,
    findOne: findOne,
    create: create,
    findAll: findAll,
    findByProductId: findByProductId,
};
//# sourceMappingURL=reported.products.service.js.map