"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validate_1 = __importDefault(require("../../middlewares/validate"));
var reported_products_validation_1 = __importDefault(require("../../validations/reported.products.validation"));
var reported_products_controller_1 = __importDefault(require("../../controller/reported.products.controller"));
var router = express_1.default.Router();
router.get("/all/:status", (0, validate_1.default)(reported_products_validation_1.default.findAll), reported_products_controller_1.default.findAll);
router.get("/:product_id/:status", (0, validate_1.default)(reported_products_validation_1.default.findByProductId), reported_products_controller_1.default.findByProductId);
router.post("", (0, validate_1.default)(reported_products_validation_1.default.create), reported_products_controller_1.default.create);
router.patch("/:reported_id", (0, validate_1.default)(reported_products_validation_1.default.update), reported_products_controller_1.default.update);
router.get("/:reported_id", (0, validate_1.default)(reported_products_validation_1.default.findOne), reported_products_controller_1.default.findOne);
exports.default = router;
//# sourceMappingURL=reported.products.route.js.map