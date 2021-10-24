"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var validate_1 = __importDefault(require("../../middlewares/validate"));
var app_settings_validation_1 = __importDefault(require("../../validations/app.settings.validation"));
var app_settings_controller_1 = __importDefault(require("../../controller/app.settings.controller"));
var auth_middleware_1 = require("../../middlewares/auth.middleware");
var router = express_1.default.Router();
router.get("/:key", (0, validate_1.default)(app_settings_validation_1.default.findOne), app_settings_controller_1.default.findOne);
//-->Authenticated route
router.use(auth_middleware_1.requireAuth);
router.post("", (0, validate_1.default)(app_settings_validation_1.default.addNew), app_settings_controller_1.default.addNew);
router.patch("", (0, validate_1.default)(app_settings_validation_1.default.update), app_settings_controller_1.default.update);
exports.default = router;
//# sourceMappingURL=app.settings.route.js.map