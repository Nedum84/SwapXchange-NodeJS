"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cli_service_1 = require("./cli.service");
/**
 * Register command for all stages
 * @type {string}
 */
//@ts-ignore
cli_service_1.register["cmd:sample1"] = function (args, callback, context) {
    console.log("Running sample 1 command for all stages");
};
/**
 * Register commands for development only
 * @type {string}
 */
//@ts-ignore
cli_service_1.registerDev["cmd:sample2"] = function (args, callback, context) {
    console.log("Running sample command 2 only on development");
};
exports.default = cli_service_1.handler;
//# sourceMappingURL=cli.js.map