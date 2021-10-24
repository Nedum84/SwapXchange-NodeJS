"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRadius = exports.BaseCurrency = exports.OnlineStatus = void 0;
var OnlineStatus;
(function (OnlineStatus) {
    OnlineStatus["AWAY"] = "away";
    OnlineStatus["ONLINE"] = "online";
    OnlineStatus["OFFLINE"] = "offline";
})(OnlineStatus = exports.OnlineStatus || (exports.OnlineStatus = {}));
var BaseCurrency;
(function (BaseCurrency) {
    BaseCurrency["NGN"] = "NGN";
    BaseCurrency["USD"] = "USD";
})(BaseCurrency = exports.BaseCurrency || (exports.BaseCurrency = {}));
var UserRadius;
(function (UserRadius) {
    UserRadius[UserRadius["MILE_1"] = 1] = "MILE_1";
    UserRadius[UserRadius["MILE_5"] = 5] = "MILE_5";
    UserRadius[UserRadius["MILE_10"] = 10] = "MILE_10";
    UserRadius[UserRadius["MILE_50"] = 50] = "MILE_50";
    UserRadius[UserRadius["MILE_200"] = 200] = "MILE_200";
    UserRadius[UserRadius["MILE_500"] = 500] = "MILE_500";
})(UserRadius = exports.UserRadius || (exports.UserRadius = {}));
//# sourceMappingURL=user.enum.js.map