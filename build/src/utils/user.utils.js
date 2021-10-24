"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserUtils = /** @class */ (function () {
    function UserUtils() {
    }
    UserUtils.radiusGeometry = function (product_lat, product_long) {
        return "(\n        (((acos(sin((" + product_lat + "*pi()/180)) * \n        sin((\"User\".address_lat*pi()/180))+cos((" + product_lat + "*pi()/180))\n        *  cos((\"User\".address_lat*pi()/180)) * \n        cos(((" + product_long + "- \"User\".address_long)*pi()/180))))*180/pi())*60*1.1515)\n    )";
    };
    return UserUtils;
}());
exports.default = UserUtils;
//# sourceMappingURL=user.utils.js.map