"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStatus = exports.ProductCondition = void 0;
var ProductCondition;
(function (ProductCondition) {
    ProductCondition["NEW"] = "new";
    ProductCondition["FAIRLY_USED"] = "fairly_used";
    ProductCondition["LONDON_USED"] = "london_used";
})(ProductCondition = exports.ProductCondition || (exports.ProductCondition = {}));
var ProductStatus;
(function (ProductStatus) {
    ProductStatus["UNPUBLISHED"] = "1";
    ProductStatus["PENDING_APPROVAL"] = "2";
    ProductStatus["ACTIVE"] = "3";
    ProductStatus["COMPLETED"] = "4";
    ProductStatus["DELETED"] = "5";
    ProductStatus["BLOCKED"] = "6";
})(ProductStatus = exports.ProductStatus || (exports.ProductStatus = {}));
//# sourceMappingURL=product.enum.js.map