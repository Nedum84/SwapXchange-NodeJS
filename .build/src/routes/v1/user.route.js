"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_controller_1 = __importDefault(require("../../controller/user.controller"));
var validate_1 = __importDefault(require("../../middlewares/validate"));
var user_validation_1 = __importDefault(require("../../validations/user.validation"));
var router = express_1.default.Router();
router.patch("/me", (0, validate_1.default)(user_validation_1.default.updateUser), user_controller_1.default.updateUser);
router.patch("/address", (0, validate_1.default)(user_validation_1.default.updateAddress), user_controller_1.default.updateUserAddress);
router.get("/me", user_controller_1.default.findMe);
router.get("/user/:user_id", (0, validate_1.default)(user_validation_1.default.getUser), user_controller_1.default.findOne);
exports.default = router;
//# sourceMappingURL=user.route.js.map