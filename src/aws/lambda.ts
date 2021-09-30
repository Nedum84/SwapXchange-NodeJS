"use strict";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  Context,
} from "aws-lambda";
import awsServerlessExpress from "aws-serverless-express";
import { app } from "../app";

const server = awsServerlessExpress.createServer(app);

const handler: APIGatewayProxyHandler = (
  event: APIGatewayProxyEvent,
  context: Context
) => {
  awsServerlessExpress.proxy(server, event, context);
};
export = {
  handler,
};
