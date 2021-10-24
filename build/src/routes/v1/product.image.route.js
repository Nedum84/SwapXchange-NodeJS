"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validate_1 = __importDefault(require("../../middlewares/validate"));
var product_image_validation_1 = __importDefault(require("../../validations/product.image.validation"));
var product_image_controller_1 = __importDefault(require("../../controller/product.image.controller"));
var router = express_1.default.Router();
router.get("/all/:product_id", (0, validate_1.default)(product_image_validation_1.default.findAll), product_image_controller_1.default.findAll);
router.post("", (0, validate_1.default)(product_image_validation_1.default.create), product_image_controller_1.default.create);
router.patch("/:image_id", (0, validate_1.default)(product_image_validation_1.default.update), product_image_controller_1.default.update);
router.get("/:image_id", (0, validate_1.default)(product_image_validation_1.default.findOne), product_image_controller_1.default.findOne);
router.delete("/:image_id", (0, validate_1.default)(product_image_validation_1.default.deleteOne), product_image_controller_1.default.deleteOne);
exports.default = router;
//# sourceMappingURL=product.image.route.js.map