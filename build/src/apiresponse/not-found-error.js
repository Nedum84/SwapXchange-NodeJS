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
exports.NotFoundError = void 0;
var custom_error_1 = require("./custom-error");
var NotFoundError = /** @class */ (function (_super) {
    __extends(NotFoundError, _super);
    function NotFoundError(message, stack) {
        if (message === void 0) { message = "Not found"; }
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.stack = stack;
        _this.statusCode = 404;
        Object.setPrototypeOf(_this, NotFoundError.prototype);
        return _this;
    }
    return NotFoundError;
}(custom_error_1.CustomError));
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=not-found-error.js.map