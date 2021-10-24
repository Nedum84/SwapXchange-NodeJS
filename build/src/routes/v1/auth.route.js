"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validate_1 = __importDefault(require("../../middlewares/validate"));
var auth_controller_1 = __importDefault(require("../../controller/auth.controller"));
var auth_validation_1 = __importDefault(require("../../validations/auth.validation"));
var router = express_1.default.Router();
router.post("", (0, validate_1.default)(auth_validation_1.default.register), auth_controller_1.default.register);
router.post("/refreshtoken", (0, validate_1.default)(auth_validation_1.default.refreshToken), auth_controller_1.default.refreshToken);
exports.default = router;
//# sourceMappingURL=auth.route.js.map