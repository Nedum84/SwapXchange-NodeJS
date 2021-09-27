import express from "express";
import { json } from "body-parser";
import "express-async-errors"; //To enable async on route function
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./apiresponse/not-found-error";
import v1Routes from "./routes/v1";
import config from "./config/config";
import helmet from "helmet";
import morgan from "./config/morgan";
const xss = require("xss-clean");
// var compression = require('compression')

const app = express();

app.use(json());
// parse json request body!
app.use(express.json({ limit: "50mb" }));

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
app.use(helmet());

// sanitize request data
app.use(xss());

app.get("/", (req, res) => {
  res.send("Hi! Welcome to SwapXchange.");
});

//Routing to the api
app.use("/v1", v1Routes);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});
//Catch all Errors
app.use(errorHandler);

export { app };
