"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validate_1 = __importDefault(require("../../middlewares/validate"));
var coins_validation_1 = __importDefault(require("../../validations/coins.validation"));
var coins_controller_1 = __importDefault(require("../../controller/coins.controller"));
var router = express_1.default.Router();
router.post("", (0, validate_1.default)(coins_validation_1.default.create), coins_controller_1.default.create);
router.post("/:user_id", (0, validate_1.default)(coins_validation_1.default.createForUser), coins_controller_1.default.createForUser);
router.get("/me", coins_controller_1.default.getBalance);
router.get("/:user_id", (0, validate_1.default)(coins_validation_1.default.findAllByUserId), coins_controller_1.default.findAllByUserId);
exports.default = router;
//# sourceMappingURL=coins.route.js.map