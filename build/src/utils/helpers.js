"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Helpers = /** @class */ (function () {
    function Helpers() {
    }
    /**
     * stripes limit & offset from express req.query
     * @param query express Req Query
     * @returns Paginate instance
     */
    Helpers.getPaginate = function (query) {
        var _a = query.limit, limit = _a === void 0 ? 10 : _a, _b = query.offset, offset = _b === void 0 ? 0 : _b;
        return {
            limit: limit,
            offset: offset,
        };
    };
    return Helpers;
}());
exports.default = Helpers;
//# sourceMappingURL=helpers.js.map