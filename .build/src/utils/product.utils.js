"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var product_enum_1 = require("../enum/product.enum");
var user_service_1 = __importDefault(require("../services/user.service"));
var ProductUtils = /** @class */ (function () {
    function ProductUtils() {
    }
    var _a;
    _a = ProductUtils;
    ProductUtils.userSubQuery = function () {
        return "(\n        select (row_to_json(u))\n        from (\n          select \n          u.user_id, \n          u.name, \n          u.mobile_number, \n          u.address, \n          u.profile_photo\n          from \"User\" u\n          where \"Product\".user_id = u.user_id        \n        ) u\n      ) AS user";
    };
    ProductUtils.imgSubQuery = function () {
        return "(\n        select array_to_json(array_agg(row_to_json(img)))\n        from (\n          select \n          img.image_id, \n          img.product_id,\n          img.image_path,\n          img.idx\n          from \"ImageProduct\" img\n          where \"Product\".product_id = img.product_id        \n        ) img\n      ) AS images";
    };
    ProductUtils.suggestionSubQuery = function () {
        return "(\n      select array_to_json(array_agg(row_to_json(cat)))\n      from (\n        select \n        cat.category_id, \n        cat.category_name,\n        cat.category_icon,\n        cat.idx\n        from \"Category\" cat\n        where cat.category_id = ANY(ARRAY[\"Product\".product_suggestion])        \n      ) cat\n    ) AS suggestions";
    };
    ProductUtils.radiusGeometry = function (user) {
        return "(\n        (((acos(sin((" + user.address_lat + "*pi()/180)) * \n        sin((\"Product\".user_address_lat*pi()/180))+cos((" + user.address_lat + "*pi()/180))\n        *  cos((\"Product\".user_address_lat*pi()/180)) * \n        cos(((" + user.address_long + "- \"Product\".user_address_long)*pi()/180))))*180/pi())*60*1.1515)\n    )";
    };
    ProductUtils.selectQuery = function (data) { return __awaiter(void 0, void 0, void 0, function () {
        var user_id, _b, product_status, limit, offset, _c, extra, order, user, orderBy;
        return __generator(_a, function (_d) {
            switch (_d.label) {
                case 0:
                    user_id = data.user_id, _b = data.product_status, product_status = _b === void 0 ? product_enum_1.ProductStatus.ACTIVE : _b, limit = data.limit, offset = data.offset, _c = data.extra, extra = _c === void 0 ? "" : _c, order = data.order;
                    return [4 /*yield*/, user_service_1.default.findMe(user_id)];
                case 1:
                    user = _d.sent();
                    orderBy = order !== null && order !== void 0 ? order : "ORDER BY \"Product\".id DESC";
                    return [2 /*return*/, "SELECT \n          \"Product\".*, \n          (SELECT COUNT(id) \n            FROM \"ProductViews\" WHERE \n            \"ProductViews\".product_id = \"Product\".product_id\n          ) AS no_of_views,\n          " + this.radiusGeometry(user) + " AS distance,\n  \n          -- Product Images objects array\n          " + this.imgSubQuery() + ",\n          -- User object\n          " + this.userSubQuery() + ",\n          -- Product Suggestions\n          " + this.suggestionSubQuery() + "\n  \n  \n          FROM \"Product\" \n        WHERE \"Product\".\"product_status\" = '" + product_status + "' " + extra + " \n          AND " + this.radiusGeometry(user) + " < " + user.radius + "\n          " + orderBy + "\n          LIMIT " + limit + " OFFSET " + offset + " \n        "];
            }
        });
    }); };
    return ProductUtils;
}());
exports.default = ProductUtils;
//# sourceMappingURL=product.utils.js.map