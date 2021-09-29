"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validate_1 = __importDefault(require("../../middlewares/validate"));
var subcategory_validation_1 = __importDefault(require("../../validations/subcategory.validation"));
var subcategory_controller_1 = __importDefault(require("../../controller/subcategory.controller"));
var router = express_1.default.Router();
router.get("/all", subcategory_controller_1.default.findAll);
router.post("", (0, validate_1.default)(subcategory_validation_1.default.create), subcategory_controller_1.default.create);
router.patch("/:sub_category_id", (0, validate_1.default)(subcategory_validation_1.default.update), subcategory_controller_1.default.update);
router.get("/:sub_category_id", (0, validate_1.default)(subcategory_validation_1.default.findOne), subcategory_controller_1.default.findOne);
router.get("/category/:category_id", (0, validate_1.default)(subcategory_validation_1.default.findByCategoryId), subcategory_controller_1.default.findByCategoryId);
exports.default = router;
//# sourceMappingURL=subcategory.route.js.map