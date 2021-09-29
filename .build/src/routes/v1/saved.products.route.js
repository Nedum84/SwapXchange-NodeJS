"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validate_1 = __importDefault(require("../../middlewares/validate"));
var saved_products_validation_1 = __importDefault(require("../../validations/saved.products.validation"));
var saved_products_controller_1 = __importDefault(require("../../controller/saved.products.controller"));
var router = express_1.default.Router();
router.get("/all/:offset/:limit", (0, validate_1.default)(saved_products_validation_1.default.findAllForUser), saved_products_controller_1.default.findAllForUser);
router.get("/:product_id", (0, validate_1.default)(saved_products_validation_1.default.checkSaved), saved_products_controller_1.default.checkSaved);
router.post("", (0, validate_1.default)(saved_products_validation_1.default.create), saved_products_controller_1.default.create);
router.delete("/:product_id", (0, validate_1.default)(saved_products_validation_1.default.removeSaved), saved_products_controller_1.default.removeSaved);
exports.default = router;
//# sourceMappingURL=saved.products.route.js.map