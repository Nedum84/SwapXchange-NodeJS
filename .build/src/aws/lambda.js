// lambda.js
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var aws_serverless_express_1 = __importDefault(require("aws-serverless-express"));
var app_1 = require("../app");
var server = aws_serverless_express_1.default.createServer(app_1.app);
var handler = function (event, context) {
    aws_serverless_express_1.default.proxy(server, event, context);
};
module.exports = {
    handler: handler,
};
//# sourceMappingURL=lambda.js.map