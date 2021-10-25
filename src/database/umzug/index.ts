import Umzug from "umzug";
import sequelize from "../../models";
import path from "path";

const umzug = new Umzug({
  migrations: {
    // indicates the folder containing the migration .js files
    path: path.join(__dirname, "../migrations"),
    pattern: /\.ts|\.js$/,
    // inject sequelize's QueryInterface in the migrations
    params: [sequelize],
    // params: [sequelize.getQueryInterface()],
  },
  // indicates that the migration data should be store in the database
  // itself through sequelize. The default configuration creates a table
  storage: "sequelize",
  storageOptions: {
    sequelize: sequelize,
  },
  //   logging:false,
});

export default umzug;
