"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var umzug_1 = __importDefault(require("umzug"));
var models_1 = __importDefault(require("../../models"));
var path_1 = __importDefault(require("path"));
var umzug = new umzug_1.default({
    migrations: {
        // indicates the folder containing the migration .js files
        path: path_1.default.join(__dirname, "../migrations"),
        pattern: /\.ts$/,
        // inject sequelize's QueryInterface in the migrations
        params: [models_1.default],
        // params: [sequelize.getQueryInterface()],
    },
    // indicates that the migration data should be store in the database
    // itself through sequelize. The default configuration creates a table
    storage: "sequelize",
    storageOptions: {
        sequelize: models_1.default,
    },
    //   logging:false,
});
exports.default = umzug;
//# sourceMappingURL=index.js.map