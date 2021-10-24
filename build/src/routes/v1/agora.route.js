"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var agora_controller_1 = __importDefault(require("../../controller/agora.controller"));
var router = express_1.default.Router();
router.post("/generatetoken", agora_controller_1.default.create);
exports.default = router;
//# sourceMappingURL=agora.route.js.map