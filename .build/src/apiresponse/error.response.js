"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
var custom_error_1 = require("./custom-error");
var ErrorResponse = /** @class */ (function (_super) {
    __extends(ErrorResponse, _super);
    function ErrorResponse(message, statusCode, stack) {
        if (statusCode === void 0) { statusCode = 400; }
        if (stack === void 0) { stack = ""; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.statusCode = statusCode;
        _this.stack = stack;
        _this.errorName = stack;
        Object.setPrototypeOf(_this, ErrorResponse.prototype);
        return _this;
    }
    return ErrorResponse;
}(custom_error_1.CustomError));
exports.ErrorResponse = ErrorResponse;
//# sourceMappingURL=error.response.js.map