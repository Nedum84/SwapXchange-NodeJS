"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validate_1 = __importDefault(require("../../middlewares/validate"));
var product_validation_1 = __importDefault(require("../../validations/product.validation"));
var product_controller_1 = __importDefault(require("../../controller/product.controller"));
var router = express_1.default.Router();
router.post("", (0, validate_1.default)(product_validation_1.default.create), product_controller_1.default.create);
router.patch("/:product_id", (0, validate_1.default)(product_validation_1.default.update), product_controller_1.default.update);
//---> offset/limit  eg all/1/21
router.get("/", (0, validate_1.default)(product_validation_1.default.findAll), product_controller_1.default.findAll);
//---> search suggestions
router.get("/search/suggest", (0, validate_1.default)(product_validation_1.default.findSearchSuggestions), product_controller_1.default.findSearchSuggestions);
router.get("/search", (0, validate_1.default)(product_validation_1.default.findBySearch), product_controller_1.default.findBySearch);
router.get("/category/:category", (0, validate_1.default)(product_validation_1.default.findByCategory), product_controller_1.default.findByCategory);
router.get("/subcategory/:subcategory", (0, validate_1.default)(product_validation_1.default.findBySubCategory), product_controller_1.default.findBySubCategory);
router.get("/me", (0, validate_1.default)(product_validation_1.default.findMyProducts), product_controller_1.default.findMyProducts);
router.get("/user/:user_id", (0, validate_1.default)(product_validation_1.default.findUserProducts), product_controller_1.default.findUserProducts);
router.get("/exchange/:product_id", (0, validate_1.default)(product_validation_1.default.findExchangeOptions), product_controller_1.default.findExchangeOptions);
router.get("/:product_id", (0, validate_1.default)(product_validation_1.default.findOne), product_controller_1.default.findOne);
router.get("/nearbyusers/:product_id", (0, validate_1.default)(product_validation_1.default.findNearUsers), product_controller_1.default.findNearUsers);
exports.default = router;
//# sourceMappingURL=product.route.js.map