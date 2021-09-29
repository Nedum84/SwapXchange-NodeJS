"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validate_1 = __importDefault(require("../../middlewares/validate"));
var category_validation_1 = __importDefault(require("../../validations/category.validation"));
var category_controller_1 = __importDefault(require("../../controller/category.controller"));
var router = express_1.default.Router();
router.get("/", category_controller_1.default.findAll);
router.post("", (0, validate_1.default)(category_validation_1.default.create), category_controller_1.default.create);
router.patch("/:category_id", (0, validate_1.default)(category_validation_1.default.update), category_controller_1.default.update);
router.get("/:category_id", (0, validate_1.default)(category_validation_1.default.findOne), category_controller_1.default.findOne);
exports.default = router;
//# sourceMappingURL=category.route.js.map