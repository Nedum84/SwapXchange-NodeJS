"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validate_1 = __importDefault(require("../../middlewares/validate"));
var faqs_validation_1 = __importDefault(require("../../validations/faqs.validation"));
var faqs_controller_1 = __importDefault(require("../../controller/faqs.controller"));
var router = express_1.default.Router();
router.get("/all", faqs_controller_1.default.findAll);
router.post("", (0, validate_1.default)(faqs_validation_1.default.create), faqs_controller_1.default.create);
router.patch("/:faq_id", (0, validate_1.default)(faqs_validation_1.default.update), faqs_controller_1.default.update);
router.get("/:faq_id", (0, validate_1.default)(faqs_validation_1.default.findOne), faqs_controller_1.default.findOne);
exports.default = router;
//# sourceMappingURL=faqs.route.js.map