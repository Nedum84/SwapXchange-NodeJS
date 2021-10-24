"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validate_1 = __importDefault(require("../../middlewares/validate"));
var product_chats_validation_1 = __importDefault(require("../../validations/product.chats.validation"));
var product_chats_controller_1 = __importDefault(require("../../controller/product.chats.controller"));
var router = express_1.default.Router();
router.get("/all", product_chats_controller_1.default.findAll);
router.post("", (0, validate_1.default)(product_chats_validation_1.default.create), product_chats_controller_1.default.create);
router.patch("/:product_chat_id", (0, validate_1.default)(product_chats_validation_1.default.update), product_chats_controller_1.default.update);
router.get("/user/:second_user_id", (0, validate_1.default)(product_chats_validation_1.default.findLatestForTwoUsers), product_chats_controller_1.default.findLatestForTwoUsers);
router.get("/:product_chat_id", (0, validate_1.default)(product_chats_validation_1.default.findOne), product_chats_controller_1.default.findOne);
router.post("/completed/:product_chat_id", (0, validate_1.default)(product_chats_validation_1.default.markCompleted), product_chats_controller_1.default.markCompleted);
exports.default = router;
//# sourceMappingURL=product.chats.route.js.map