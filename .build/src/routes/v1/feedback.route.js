"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validate_1 = __importDefault(require("../../middlewares/validate"));
var feedback_validation_1 = __importDefault(require("../../validations/feedback.validation"));
var feedback_controller_1 = __importDefault(require("../../controller/feedback.controller"));
var router = express_1.default.Router();
router.get("/all", (0, validate_1.default)(feedback_validation_1.default.findAll), feedback_controller_1.default.findAll);
router.post("", (0, validate_1.default)(feedback_validation_1.default.create), feedback_controller_1.default.create);
router.patch("/:feedback_id", (0, validate_1.default)(feedback_validation_1.default.update), feedback_controller_1.default.update);
router.get("/:feedback_id", (0, validate_1.default)(feedback_validation_1.default.findOne), feedback_controller_1.default.findOne);
exports.default = router;
//# sourceMappingURL=feedback.route.js.map