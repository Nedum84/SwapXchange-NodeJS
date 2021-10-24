"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var uuid_1 = require("uuid");
var CONSTANTS = /** @class */ (function () {
    function CONSTANTS() {
    }
    CONSTANTS.NOW = (0, moment_1.default)().toDate(); //Date
    CONSTANTS.UUID = function () { return (0, uuid_1.v4)(); };
    return CONSTANTS;
}());
exports.default = CONSTANTS;
//# sourceMappingURL=constants.js.map