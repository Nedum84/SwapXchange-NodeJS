import { app } from "./app";
import config from "./config/config";
import logger from "./config/logger";
// import shell from "shelljs";
// import {resolve} from "path";

//Start app server
const start = async () => {
  const server = app.listen(config.PORT, () => {
    console.log(`Listening on port http://localhost:${config.PORT} !...`);
    //
    // const tsNode = resolve(__dirname, '../node_modules/.bin/ts-node');
    // shell.exec(`${tsNode} src/database/umzug/migrate.ts`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        logger.info("Server closed");
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  };

  const unexpectedErrorHandler = (error: any) => {
    logger.error(error);
    exitHandler();
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);

  process.on("SIGTERM", () => {
    logger.info("SIGTERM received");
    if (server) {
      server.close();
    }
  });
};

start();
