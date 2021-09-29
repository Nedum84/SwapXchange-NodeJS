"use strict";
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
var faqs_model_1 = require("../models/faqs.model");
var findOne = function (faq_id) { return __awaiter(void 0, void 0, void 0, function () {
    var faq;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, faqs_model_1.Faqs.findOne({ where: { faq_id: faq_id } })];
            case 1:
                faq = _a.sent();
                if (!faq) {
                    throw new error_response_1.ErrorResponse("No faq found!");
                }
                return [2 /*return*/, faq];
        }
    });
}); };
var update = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var faq_id, _a, question, answer, faq, user_level;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                faq_id = req.params.faq_id;
                _a = req.body, question = _a.question, answer = _a.answer;
                return [4 /*yield*/, findOne(faq_id)];
            case 1:
                faq = _b.sent();
                user_level = req.user.user_level;
                if (!user_level || user_level == 1) {
                    throw new error_response_1.ErrorResponse("Access denied", http_status_1.default.UNAUTHORIZED);
                }
                Object.assign(faq, { question: question, answer: answer });
                return [4 /*yield*/, faq.save()];
            case 2:
                _b.sent();
                return [2 /*return*/, faq.reload()];
        }
    });
}); };
var create = function (req) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, question, answer, user_id, user_level, faq;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, question = _a.question, answer = _a.answer;
                user_id = req.user.user_id;
                user_level = req.user.user_level;
                if (!user_level || user_level == 1) {
                    throw new error_response_1.ErrorResponse("Access denied", http_status_1.default.UNAUTHORIZED);
                }
                return [4 /*yield*/, faqs_model_1.Faqs.create({
                        question: question,
                        answer: answer,
                        added_by: user_id,
                    })];
            case 1:
                faq = _b.sent();
                return [2 /*return*/, faq];
        }
    });
}); };
var findAll = function () { return __awaiter(void 0, void 0, void 0, function () {
    var faqs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, faqs_model_1.Faqs.findAll({ order: [["id", "DESC"]] })];
            case 1:
                faqs = _a.sent();
                return [2 /*return*/, faqs];
        }
    });
}); };
exports.default = {
    update: update,
    findOne: findOne,
    create: create,
    findAll: findAll,
};
//# sourceMappingURL=faqs.service.js.map