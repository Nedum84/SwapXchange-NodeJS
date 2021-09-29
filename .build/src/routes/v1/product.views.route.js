"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validate_1 = __importDefault(require("../../middlewares/validate"));
var product_views_validation_1 = __importDefault(require("../../validations/product.views.validation"));
var product_views_controller_1 = __importDefault(require("../../controller/product.views.controller"));
var router = express_1.default.Router();
router.get("/:product_id", (0, validate_1.default)(product_views_validation_1.default.findAll), product_views_controller_1.default.findAll);
router.post("", (0, validate_1.default)(product_views_validation_1.default.create), product_views_controller_1.default.create);
exports.default = router;
//# sourceMappingURL=product.views.route.js.map