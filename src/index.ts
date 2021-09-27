import { app } from "./app";
import config from "./config/config";
import logger from "./config/logger";
import { runAssociations } from "./models/associations";

//Start app server
const start = async () => {
  const server = app.listen(config.PORT, () => {
    runAssociations();
    console.log(`Listening on port http://localhost:${config.PORT} !...`);
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
